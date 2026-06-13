import { create } from 'zustand';
import {
  upsertCharacter, createCharacter, getMyCharacters, getCharacterById, deleteCharacter,
  subscribeToCharacter,
  getMyCustomSpells, saveCustomSpell, deleteCustomSpell,
  getMyProfile, getAllProfiles,
  createSession, getMySessions, getSessionByJoinCode,
  joinSession, leaveSession, getSessionMembers,
  subscribeToSessionMembers, subscribeToSessionCharacters,
  requestDMAccess, getMyDMRequest, getPendingDMRequests, resolveDMRequest,
} from '../lib/supabase';
import { defaultCharacter } from '../data/gameData';

let saveTimer = null;
let charRealtimeSub = null;
let membersRealtimeSub = null;
let charsRealtimeSub = null;

export const useStore = create((set, get) => ({
  // ── Auth ───────────────────────────────────────────────────────────────────
  session: null,
  user: null,
  profile: null,        // { user_id, player_name, is_approved_dm }
  setSession: (session) => {
    set({ session, user: session?.user ?? null });
  },

  loadProfile: async (userId) => {
    const { data } = await getMyProfile(userId);
    set({ profile: data });
    return data;
  },

  // ── Navigation ─────────────────────────────────────────────────────────────
  // screen: 'home' | 'characters' | 'sheet' | 'sessions' | 'session-lobby'
  screen: 'home',
  setScreen: (screen) => set({ screen }),
  activeTab: 'main',   // within the character sheet: 'main' | 'spells' | 'library' | 'levelup' | 'party'
  setActiveTab: (tab) => set({ activeTab: tab }),

  // ── Character Library ─────────────────────────────────────────────────────
  myCharacters: [],
  myCharactersLoading: false,

  loadMyCharacters: async (userId) => {
    set({ myCharactersLoading: true });
    const { data } = await getMyCharacters(userId);
    set({ myCharacters: data || [], myCharactersLoading: false });
  },

  createNewCharacter: async (userId, sessionId = null) => {
    const newChar = defaultCharacter(userId, 'draetande');
    if (sessionId) newChar.session_id = sessionId;
    const { data, error } = await createCharacter(newChar);
    if (!error && data) {
      set(state => ({ myCharacters: [...state.myCharacters, data] }));
    }
    return { data, error };
  },

  removeCharacter: async (id) => {
    const { error } = await deleteCharacter(id);
    if (!error) {
      set(state => ({ myCharacters: state.myCharacters.filter(c => c.id !== id) }));
    }
    return { error };
  },

  // ── Active Character (the sheet currently open) ──────────────────────────────
  character: null,
  characterLoading: false,
  characterError: null,

  openCharacter: async (characterId) => {
    set({ characterLoading: true, character: null });
    const { data, error } = await getCharacterById(characterId);
    if (error) { set({ characterError: error.message, characterLoading: false }); return; }
    set({ character: data, characterLoading: false, screen: 'sheet', activeTab: 'main' });
    get().subscribeActiveCharacter();
  },

  closeCharacter: () => {
    if (charRealtimeSub) { charRealtimeSub.unsubscribe(); charRealtimeSub = null; }
    set({ character: null, screen: 'characters' });
  },

  subscribeActiveCharacter: () => {
    if (charRealtimeSub) charRealtimeSub.unsubscribe();
    const char = get().character;
    if (!char?.id) return;
    charRealtimeSub = subscribeToCharacter(char.id, (payload) => {
      // Only apply remote updates if they're newer and we're not mid-edit
      if (payload.eventType === 'UPDATE' && payload.new) {
        set(state => {
          // Don't clobber local unsaved edits within the debounce window
          if (saveTimer) return state;
          return { character: payload.new };
        });
      }
    });
  },

  // Update a field locally and debounce save to Supabase
  setField: (field, value) => {
    set(state => ({
      character: { ...state.character, [field]: value }
    }));
    get().debouncedSave();
  },

  setNestedField: (path, value) => {
    const keys = path.split('.');
    set(state => {
      const char = { ...state.character };
      let obj = char;
      for (let i = 0; i < keys.length - 1; i++) {
        obj[keys[i]] = { ...obj[keys[i]] };
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return { character: char };
    });
    get().debouncedSave();
  },

  debouncedSave: () => {
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(() => { saveTimer = null; get().saveNow(); }, 800);
  },

  saveNow: async () => {
    const char = get().character;
    if (!char) return;
    const { data } = await upsertCharacter(char);
    if (data) {
      // Sync myCharacters list entry too (for library view summaries)
      set(state => ({
        myCharacters: state.myCharacters.map(c => c.id === data.id ? data : c)
      }));
    }
  },

  // HP shortcuts
  adjustHP: (delta) => {
    set(state => {
      const char = state.character;
      const newHP = Math.min(char.max_hp, Math.max(0, char.current_hp + delta));
      return { character: { ...char, current_hp: newHP } };
    });
    get().debouncedSave();
  },

  // Spell slot management
  expendSlot: (slotLevel) => {
    set(state => {
      const expended = [...(state.character.slots_expended || [0,0,0,0,0,0,0,0,0])];
      expended[slotLevel - 1] = (expended[slotLevel - 1] || 0) + 1;
      return { character: { ...state.character, slots_expended: expended } };
    });
    get().debouncedSave();
  },

  recoverSlot: (slotLevel) => {
    set(state => {
      const expended = [...(state.character.slots_expended || [0,0,0,0,0,0,0,0,0])];
      expended[slotLevel - 1] = Math.max(0, (expended[slotLevel - 1] || 0) - 1);
      return { character: { ...state.character, slots_expended: expended } };
    });
    get().debouncedSave();
  },

  // Resource management
  useResource: (resourceName) => {
    set(state => {
      const used = { ...(state.character.resources_used || {}) };
      used[resourceName] = (used[resourceName] || 0) + 1;
      return { character: { ...state.character, resources_used: used } };
    });
    get().debouncedSave();
  },

  recoverResource: (resourceName) => {
    set(state => {
      const used = { ...(state.character.resources_used || {}) };
      used[resourceName] = Math.max(0, (used[resourceName] || 0) - 1);
      return { character: { ...state.character, resources_used: used } };
    });
    get().debouncedSave();
  },

  resetResourcesShortRest: (classResources) => {
    set(state => {
      const used = { ...(state.character.resources_used || {}) };
      classResources.filter(r => r.reset === 'Short Rest').forEach(r => {
        delete used[r.name];
      });
      const char = { ...state.character, resources_used: used };
      if (state.character.class_name === 'Warlock') char.pact_slots_expended = 0;
      return { character: char };
    });
    get().debouncedSave();
  },

  resetResourcesLongRest: (classResources, maxHp) => {
    set(state => ({
      character: {
        ...state.character,
        resources_used: {},
        slots_expended: [0,0,0,0,0,0,0,0,0],
        pact_slots_expended: 0,
        current_hp: maxHp ?? state.character.max_hp,
      }
    }));
    get().debouncedSave();
  },

  // ── Sessions ───────────────────────────────────────────────────────────────
  mySessions: [],
  mySessionsLoading: false,
  activeSession: null,    // session currently being viewed (party/lobby)

  loadMySessions: async (userId) => {
    set({ mySessionsLoading: true });
    const { data } = await getMySessions(userId);
    set({ mySessions: data || [], mySessionsLoading: false });
  },

  createNewSession: async (name, dmUserId) => {
    const { data, error } = await createSession(name, dmUserId);
    if (!error && data) {
      set(state => ({ mySessions: [...state.mySessions, data] }));
    }
    return { data, error };
  },

  findSessionByCode: async (code) => {
    return await getSessionByJoinCode(code);
  },

  joinSessionWithCharacter: async (sessionId, characterId, userId) => {
    const { data, error } = await joinSession(sessionId, characterId, userId);
    if (!error) {
      // Tag the character with this session for convenience
      set(state => ({
        myCharacters: state.myCharacters.map(c => c.id === characterId ? { ...c, session_id: sessionId } : c)
      }));
      await get().loadMySessions(userId);
    }
    return { data, error };
  },

  leaveActiveSession: async (sessionId, characterId) => {
    return await leaveSession(sessionId, characterId);
  },

  // ── Party (DM view, scoped to active session) ────────────────────────────────
  party: [],
  partyLoading: false,

  loadSessionParty: async (sessionId) => {
    set({ partyLoading: true });
    const { data } = await getSessionMembers(sessionId);
    const chars = (data || []).map(row => row.characters).filter(Boolean);
    set({ party: chars, partyLoading: false });
  },

  subscribeSessionParty: (sessionId) => {
    if (membersRealtimeSub) membersRealtimeSub.unsubscribe();
    if (charsRealtimeSub) charsRealtimeSub.unsubscribe();

    // Refresh party list when membership changes
    membersRealtimeSub = subscribeToSessionMembers(sessionId, () => {
      get().loadSessionParty(sessionId);
    });

    // Update individual character data live
    charsRealtimeSub = subscribeToSessionCharacters(sessionId, (payload) => {
      if (payload.eventType === 'UPDATE' && payload.new) {
        set(state => {
          const idx = state.party.findIndex(c => c.id === payload.new.id);
          if (idx < 0) return state; // not in this session's party
          const party = [...state.party];
          party[idx] = payload.new;
          return { party };
        });
      }
    });

    return () => {
      membersRealtimeSub?.unsubscribe();
      charsRealtimeSub?.unsubscribe();
    };
  },

  // ── DM Requests / Approval ─────────────────────────────────────────────────
  myDMRequest: null,
  pendingDMRequests: [],

  loadMyDMRequest: async (userId) => {
    const { data } = await getMyDMRequest(userId);
    set({ myDMRequest: data });
  },

  requestToBeDM: async (userId) => {
    const { data, error } = await requestDMAccess(userId);
    if (!error) set({ myDMRequest: data });
    return { data, error };
  },

  loadPendingDMRequests: async () => {
    const { data } = await getPendingDMRequests();
    set({ pendingDMRequests: data || [] });
  },

  resolveRequest: async (requestId, userId, approve) => {
    const { error } = await resolveDMRequest(requestId, userId, approve);
    if (!error) {
      set(state => ({ pendingDMRequests: state.pendingDMRequests.filter(r => r.id !== requestId) }));
    }
    return { error };
  },

  // ── Custom Spells ─────────────────────────────────────────────────────────
  customSpells: [],
  customSpellsLoading: false,
  spellSearchQuery: '',
  setSpellSearch: (q) => set({ spellSearchQuery: q }),

  loadCustomSpells: async (userId) => {
    set({ customSpellsLoading: true });
    const { data } = await getMyCustomSpells(userId);
    set({ customSpells: data || [], customSpellsLoading: false });
  },

  saveCustomSpell: async (spell) => {
    const userId = get().user?.id;
    if (!userId) return;
    const payload = { ...spell, id: spell.id || crypto.randomUUID() };
    const { data, error } = await saveCustomSpell(userId, payload);
    if (!error && data) {
      set(state => {
        const idx = state.customSpells.findIndex(s => s.id === data.id);
        const spells = [...state.customSpells];
        if (idx >= 0) spells[idx] = data; else spells.push(data);
        return { customSpells: spells };
      });
    }
    return { data, error };
  },

  removeCustomSpell: async (id) => {
    const { error } = await deleteCustomSpell(id);
    if (!error) {
      set(state => ({ customSpells: state.customSpells.filter(s => s.id !== id) }));
    }
    return { error };
  },
}));
