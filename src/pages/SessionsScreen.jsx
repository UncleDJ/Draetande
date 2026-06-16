import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';

// ── Character picker modal (for joining a session) ──────────────────────────
function CharacterPickerModal({ onPick, onCreateNew, onClose }) {
  const { myCharacters } = useStore();
  return (
    <div style={{
      position:'fixed', inset:0, background:'rgba(0,0,0,0.8)', zIndex:300,
      display:'flex', alignItems:'flex-end', justifyContent:'center',
    }} onClick={onClose}>
      <div style={{
        background:'var(--c-surface)', borderRadius:'16px 16px 0 0',
        width:'100%', maxWidth:480, maxHeight:'75vh', overflow:'auto',
        padding:16, display:'flex', flexDirection:'column', gap:10,
      }} onClick={e=>e.stopPropagation()}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <h3>Choose a Character</h3>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
        </div>
        <p style={{ fontSize:'0.8rem', color:'var(--c-text-dim)' }}>
          Pick an existing character to bring into this session, or create a new one.
        </p>

        <button className="btn btn-primary" onClick={onCreateNew}>
          ＋ Create New Character
        </button>

        <div className="divider">or pick existing</div>

        {myCharacters.length === 0 && (
          <p style={{ textAlign:'center', color:'var(--c-text-muted)', fontStyle:'italic', padding:16 }}>
            You don't have any characters yet.
          </p>
        )}

        {myCharacters.map(char => (
          <button key={char.id} onClick={() => onPick(char.id)}
            className="card"
            style={{
              display:'flex', alignItems:'center', gap:12, padding:12,
              background:'var(--c-surface-2)', border:'1px solid var(--c-border)',
              cursor:'pointer', textAlign:'left', width:'100%',
            }}>
            <div style={{
              width:40, height:40, borderRadius:'50%', flexShrink:0,
              background:'var(--c-navy)', border:'2px solid var(--c-border-gold)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'1.1rem', color:'var(--c-gold)',
            }}>
              {char.character_name ? char.character_name[0].toUpperCase() : '?'}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:'var(--font-display)', fontSize:'0.9rem', color:'var(--c-gold)' }}>
                {char.character_name || 'Unnamed'}
              </div>
              <div style={{ fontSize:'0.7rem', color:'var(--c-text-dim)' }}>
                {char.class_name || '—'} {char.level || 1}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Create session modal ─────────────────────────────────────────────────────
function CreateSessionModal({ onCreate, onClose }) {
  const [name, setName] = useState('');
  return (
    <div style={{
      position:'fixed', inset:0, background:'rgba(0,0,0,0.8)', zIndex:300,
      display:'flex', alignItems:'flex-end', justifyContent:'center',
    }} onClick={onClose}>
      <div style={{
        background:'var(--c-surface)', borderRadius:'16px 16px 0 0',
        width:'100%', maxWidth:480, padding:16, display:'flex', flexDirection:'column', gap:12,
      }} onClick={e=>e.stopPropagation()}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <h3>🐉 Create Session</h3>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
        </div>
        <div>
          <label>Session / Campaign Name</label>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Draetande - Main Campaign" autoFocus />
        </div>
        <button className="btn btn-primary" disabled={!name.trim()} onClick={() => onCreate(name.trim())}>
          ✓ Create Session
        </button>
      </div>
    </div>
  );
}

// ── Join by code modal ────────────────────────────────────────────────────────
function JoinCodeModal({ onJoin, onClose, error }) {
  const [code, setCode] = useState('');
  return (
    <div style={{
      position:'fixed', inset:0, background:'rgba(0,0,0,0.8)', zIndex:300,
      display:'flex', alignItems:'flex-end', justifyContent:'center',
    }} onClick={onClose}>
      <div style={{
        background:'var(--c-surface)', borderRadius:'16px 16px 0 0',
        width:'100%', maxWidth:480, padding:16, display:'flex', flexDirection:'column', gap:12,
      }} onClick={e=>e.stopPropagation()}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <h3>🔑 Join Session</h3>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
        </div>
        <div>
          <label>Join Code</label>
          <input value={code} onChange={e=>setCode(e.target.value.toUpperCase())}
            placeholder="e.g. AB12CD" maxLength={6} autoFocus
            style={{ fontFamily:'var(--font-mono)', fontSize:'1.2rem', textAlign:'center', letterSpacing:'0.2em' }} />
        </div>
        {error && <div className="badge badge-red" style={{ width:'100%', padding:'calc(env(safe-area-inset-top, 44px) + 16px) 12px 16px' }}>{error}</div>}
        <button className="btn btn-primary" disabled={code.length < 4} onClick={() => onJoin(code)}>
          Find Session
        </button>
      </div>
    </div>
  );
}

// ── DM Requests panel ──────────────────────────────────────────────────────────
function DMRequestsPanel() {
  const { pendingDMRequests, loadPendingDMRequests, resolveRequest } = useStore();

  useEffect(() => { loadPendingDMRequests(); }, []);

  if (pendingDMRequests.length === 0) return null;

  return (
    <div className="card" style={{ border:'1px solid var(--c-border-gold)' }}>
      <div className="section-header">⚜ Pending DM Requests</div>
      <div className="card-body" style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {pendingDMRequests.map(req => (
          <div key={req.id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ fontSize:'0.9rem' }}>{req.profiles?.player_name || 'Unknown player'}</span>
            <div style={{ display:'flex', gap:6 }}>
              <button className="btn btn-primary btn-sm" onClick={() => resolveRequest(req.id, req.user_id, true)}>✓ Approve</button>
              <button className="btn btn-ghost btn-sm" onClick={() => resolveRequest(req.id, req.user_id, false)}>✕ Deny</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Session card ──────────────────────────────────────────────────────────────
function SessionCard({ session, isDM, onOpen }) {
  return (
    <button onClick={() => onOpen(session)}
      className="card"
      style={{
        display:'flex', alignItems:'center', gap:12, padding:14,
        width:'100%', background: isDM ? 'rgba(200,169,81,0.06)' : 'var(--c-surface)',
        border: `1px solid ${isDM ? 'var(--c-border-gold)' : 'var(--c-border)'}`,
        cursor:'pointer', textAlign:'left',
      }}>
      <span style={{ fontSize:'1.6rem' }}>{isDM ? '🐉' : '🎲'}</span>
      <div style={{ flex:1 }}>
        <div style={{ fontFamily:'var(--font-display)', fontSize:'0.95rem', color:'var(--c-gold)' }}>
          {session.name}
        </div>
        <div style={{ fontSize:'0.7rem', color:'var(--c-text-dim)' }}>
          {isDM ? 'You are the DM' : 'Player'} · Code: <span style={{ fontFamily:'var(--font-mono)' }}>{session.join_code}</span>
        </div>
      </div>
      <span style={{ color:'var(--c-gold)', fontSize:'1.2rem' }}>›</span>
    </button>
  );
}

// ── Main Sessions screen ─────────────────────────────────────────────────────
export default function SessionsScreen() {
  const {
    user, profile, mySessions, mySessionsLoading, loadMySessions,
    createNewSession, findSessionByCode, joinSessionWithCharacter,
    createNewCharacter, openCharacter, myCharacters, loadMyCharacters,
    setScreen, setActiveTab, activeSession,
  } = useStore();

  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [joinError, setJoinError] = useState('');
  const [pendingJoinSession, setPendingJoinSession] = useState(null); // session found by code, awaiting char pick
  const [showCharPicker, setShowCharPicker] = useState(false);

  useEffect(() => {
    if (user?.id) {
      loadMySessions(user.id);
      loadMyCharacters(user.id);
    }
  }, [user?.id]);

  const handleCreateSession = async (name) => {
    const { data, error } = await createNewSession(name, user.id);
    setShowCreate(false);
    if (data) {
      // Open as DM directly -> Party tab
      useStore.setState({ activeSession: data });
      setScreen('party');
    }
  };

  const handleJoinByCode = async (code) => {
    setJoinError('');
    const { data, error } = await findSessionByCode(code);
    if (error || !data) {
      setJoinError('No session found with that code.');
      return;
    }
    setShowJoin(false);
    setPendingJoinSession(data);
    setShowCharPicker(true);
  };

  const handlePickCharacter = async (characterId) => {
    if (!pendingJoinSession) return;
    await joinSessionWithCharacter(pendingJoinSession.id, characterId, user.id);
    setShowCharPicker(false);
    await openCharacter(characterId);
    setPendingJoinSession(null);
  };

  const handleCreateNewForSession = async () => {
    if (!pendingJoinSession) return;
    const { data } = await createNewCharacter(user.id, pendingJoinSession.id);
    if (data) {
      await joinSessionWithCharacter(pendingJoinSession.id, data.id, user.id);
      setShowCharPicker(false);
      await openCharacter(data.id);
      setPendingJoinSession(null);
    }
  };

  const handleOpenSession = (session) => {
    useStore.setState({ activeSession: session });
    if (session.dm_user_id === user.id) {
      // DM -> party view
      setScreen('party');
    } else {
      // Player -> if they have a character in this session, open it; else picker
      setPendingJoinSession(session);
      setShowCharPicker(true);
    }
  };

  return (
    <div style={{ padding:'16px 12px', display:'flex', flexDirection:'column', gap:12 }}>
      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
        <button className="btn btn-ghost btn-icon" onClick={() => setScreen('home')}>←</button>
        <h2 style={{ flex:1 }}>🎲 Sessions</h2>
      </div>

      {/* Actions */}
      <div style={{ display:'flex', gap:8 }}>
        <button className="btn btn-secondary" style={{ flex:1 }} onClick={() => { setJoinError(''); setShowJoin(true); }}>
          🔑 Join by Code
        </button>
        {profile?.is_approved_dm && (
          <button className="btn btn-primary" style={{ flex:1 }} onClick={() => setShowCreate(true)}>
            ＋ Create Session
          </button>
        )}
      </div>

      {/* DM approval requests, if I'm an approved DM */}
      {profile?.is_approved_dm && <DMRequestsPanel />}

      {/* Request DM access */}
      {!profile?.is_approved_dm && <RequestDMCard />}

      {/* My sessions */}
      <div className="divider">My Sessions</div>

      {mySessionsLoading && (
        <div style={{ textAlign:'center', padding:24, color:'var(--c-text-dim)' }}>
          <span className="spin" style={{ fontSize:'1.5rem', display:'block' }}>⟳</span>
        </div>
      )}

      {!mySessionsLoading && mySessions.length === 0 && (
        <p style={{ textAlign:'center', color:'var(--c-text-muted)', fontStyle:'italic', padding:16 }}>
          No sessions yet. Join one with a code from your DM.
        </p>
      )}

      {mySessions.map(session => (
        <SessionCard key={session.id} session={session} isDM={session.dm_user_id === user.id} onOpen={handleOpenSession} />
      ))}

      {/* Modals */}
      {showCreate && <CreateSessionModal onCreate={handleCreateSession} onClose={() => setShowCreate(false)} />}
      {showJoin && <JoinCodeModal onJoin={handleJoinByCode} onClose={() => setShowJoin(false)} error={joinError} />}
      {showCharPicker && (
        <CharacterPickerModal
          onPick={handlePickCharacter}
          onCreateNew={handleCreateNewForSession}
          onClose={() => { setShowCharPicker(false); setPendingJoinSession(null); }}
        />
      )}
    </div>
  );
}

// ── Request DM access card ───────────────────────────────────────────────────
function RequestDMCard() {
  const { user, myDMRequest, loadMyDMRequest, requestToBeDM } = useStore();

  useEffect(() => { if (user?.id) loadMyDMRequest(user.id); }, [user?.id]);

  if (myDMRequest?.status === 'pending') {
    return (
      <div className="card" style={{ padding:12, textAlign:'center' }}>
        <span className="badge badge-gold">⏳ DM request pending approval</span>
      </div>
    );
  }
  if (myDMRequest?.status === 'denied') {
    return (
      <div className="card" style={{ padding:12, textAlign:'center' }}>
        <span className="badge badge-dim">DM request was denied</span>
      </div>
    );
  }

  return (
    <button className="card" onClick={() => requestToBeDM(user.id)}
      style={{ padding:12, textAlign:'center', cursor:'pointer', border:'1px dashed var(--c-border-gold)' }}>
      <span style={{ fontSize:'0.85rem', color:'var(--c-text-dim)' }}>
        Want to run your own campaign? <span style={{ color:'var(--c-gold)' }}>Request DM access →</span>
      </span>
    </button>
  );
}
