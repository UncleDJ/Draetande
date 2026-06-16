import { createClient } from '@supabase/supabase-js';

// These will be replaced with real values during deployment
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── Auth ───────────────────────────────────────────────────────────────────────
export async function signUp(email, password, playerName) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { player_name: playerName } },
  });
  return { data, error };
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
}

export async function signOut() {
  return supabase.auth.signOut();
}

export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

// ── Character CRUD (multi-character library) ─────────────────────────────────
export async function getMyCharacters(userId) {
  const { data, error } = await supabase
    .from('characters')
    .select('*')
    .eq('user_id', userId)
    .order('character_name');
  return { data, error };
}

export async function getCharacterById(id) {
  const { data, error } = await supabase
    .from('characters')
    .select('*')
    .eq('id', id)
    .single();
  return { data, error };
}

export async function createCharacter(character) {
  const { data, error } = await supabase
    .from('characters')
    .insert(character)
    .select()
    .single();
  return { data, error };
}

export async function upsertCharacter(character) {
  const { data, error } = await supabase
    .from('characters')
    .upsert(character, { onConflict: 'id' })
    .select()
    .single();
  return { data, error };
}

export async function deleteCharacter(id) {
  const { error } = await supabase
    .from('characters')
    .delete()
    .eq('id', id);
  return { error };
}

// ── Party / DM view (scoped to a session) ────────────────────────────────────
export async function getSessionCharacters(sessionId) {
  const { data, error } = await supabase
    .from('session_members')
    .select('character_id, user_id, characters(*)')
    .eq('session_id', sessionId);
  if (error) return { data: null, error };
  return { data: (data || []).map(row => row.characters).filter(Boolean), error: null };
}

// ── Real-time subscriptions ───────────────────────────────────────────────────
export function subscribeToCharacter(characterId, callback) {
  return supabase
    .channel(`character-${characterId}`)
    .on('postgres_changes',
      { event: '*', schema: 'public', table: 'characters', filter: `id=eq.${characterId}` },
      (payload) => callback(payload)
    )
    .subscribe();
}

export function subscribeToSessionCharacters(sessionId, callback) {
  // Subscribe to all character changes; the caller filters by session membership
  return supabase
    .channel(`session-chars-${sessionId}`)
    .on('postgres_changes',
      { event: '*', schema: 'public', table: 'characters' },
      (payload) => callback(payload)
    )
    .subscribe();
}

export function subscribeToSessionMembers(sessionId, callback) {
  return supabase
    .channel(`session-members-${sessionId}`)
    .on('postgres_changes',
      { event: '*', schema: 'public', table: 'session_members', filter: `session_id=eq.${sessionId}` },
      (payload) => callback(payload)
    )
    .subscribe();
}

// ── Profiles ───────────────────────────────────────────────────────────────────
export async function getMyProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();
  return { data, error };
}

export async function getAllProfiles() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*');
  return { data, error };
}

// ── Sessions ───────────────────────────────────────────────────────────────────
function generateJoinCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no ambiguous chars
  let code = '';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

export async function createSession(name, dmUserId) {
  const join_code = generateJoinCode();
  const { data, error } = await supabase
    .from('sessions')
    .insert({ name, dm_user_id: dmUserId, join_code })
    .select()
    .single();
  return { data, error };
}

export async function getMySessions(userId) {
  // Sessions I DM
  const { data: dmSessions, error: dmErr } = await supabase
    .from('sessions')
    .select('*')
    .eq('dm_user_id', userId)
    .eq('active', true);

  // Sessions I've joined as a player
  const { data: memberRows, error: memErr } = await supabase
    .from('session_members')
    .select('session_id, sessions(*)')
    .eq('user_id', userId);

  const joinedSessions = (memberRows || [])
    .map(r => r.sessions)
    .filter(s => s && s.active);

  // Dedupe
  const all = [...(dmSessions || [])];
  joinedSessions.forEach(s => { if (!all.find(a => a.id === s.id)) all.push(s); });

  return { data: all, error: dmErr || memErr };
}

export async function getSessionByJoinCode(joinCode) {
  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .eq('join_code', joinCode.toUpperCase().trim())
    .eq('active', true)
    .maybeSingle();
  return { data, error };
}

export async function joinSession(sessionId, characterId, userId) {
  const { data, error } = await supabase
    .from('session_members')
    .upsert({ session_id: sessionId, character_id: characterId, user_id: userId },
            { onConflict: 'session_id,character_id' })
    .select()
    .single();
  return { data, error };
}

export async function leaveSession(sessionId, characterId) {
  const { error } = await supabase
    .from('session_members')
    .delete()
    .eq('session_id', sessionId)
    .eq('character_id', characterId);
  return { error };
}

export async function getSessionMembers(sessionId) {
  const { data, error } = await supabase
    .from('session_members')
    .select('*, characters(*)')
    .eq('session_id', sessionId);
  return { data, error };
}

// ── DM Requests ──────────────────────────────────────────────────────────────
export async function requestDMAccess(userId) {
  const { data, error } = await supabase
    .from('dm_requests')
    .upsert({ user_id: userId, status: 'pending', resolved_at: null },
            { onConflict: 'user_id' })
    .select()
    .single();
  return { data, error };
}

export async function getMyDMRequest(userId) {
  const { data, error } = await supabase
    .from('dm_requests')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();
  return { data, error };
}

export async function getPendingDMRequests() {
  const { data, error } = await supabase
    .from('dm_requests')
    .select('*, profiles(player_name)')
    .eq('status', 'pending');
  return { data, error };
}

export async function resolveDMRequest(requestId, userId, approve) {
  const { error: reqError } = await supabase
    .from('dm_requests')
    .update({ status: approve ? 'approved' : 'denied', resolved_at: new Date().toISOString() })
    .eq('id', requestId);
  if (reqError) return { error: reqError };

  if (approve) {
    const { error: profError } = await supabase
      .from('profiles')
      .update({ is_approved_dm: true })
      .eq('user_id', userId);
    if (profError) return { error: profError };
  }
  return { error: null };
}

// ── Custom Spells (global, all users can see) ────────────────────────────────
export async function getAllCustomSpells() {
  const { data, error } = await supabase
    .from('custom_spells')
    .select('*')
    .order('created_at');
  return { data, error };
}

export async function saveCustomSpell(userId, spell) {
  const payload = { ...spell, user_id: userId };
  const { data, error } = await supabase
    .from('custom_spells')
    .upsert(payload, { onConflict: 'id' })
    .select()
    .single();
  return { data, error };
}

export async function deleteCustomSpell(spellId) {
  const { error } = await supabase
    .from('custom_spells')
    .delete()
    .eq('id', spellId);
  return { error };
}

// ── Custom Weapons (global, all users can see) ───────────────────────────────
export async function getAllCustomWeapons() {
  const { data, error } = await supabase
    .from('custom_weapons')
    .select('*')
    .order('created_at');
  return { data, error };
}

export async function saveCustomWeapon(userId, weapon) {
  const payload = { ...weapon, user_id: userId };
  const { data, error } = await supabase
    .from('custom_weapons')
    .upsert(payload, { onConflict: 'id' })
    .select()
    .single();
  return { data, error };
}

export async function deleteCustomWeapon(weaponId) {
  const { error } = await supabase
    .from('custom_weapons')
    .delete()
    .eq('id', weaponId);
  return { error };
}
