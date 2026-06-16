import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { CLASSES } from '../data/gameData';

function CharacterCard({ char, onOpen, onDelete }) {
  const hpPct = char.max_hp > 0 ? Math.max(0, char.current_hp / char.max_hp) : 0;
  const hpColor = hpPct > 0.5 ? 'var(--c-green-light)' : hpPct > 0.25 ? '#ffa726' : 'var(--c-red-bright)';
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="card" style={{ position:'relative' }}>
      <button onClick={() => onOpen(char.id)}
        style={{
          display:'flex', alignItems:'center', gap:12, padding:14,
          width:'100%', background:'none', border:'none', cursor:'pointer', textAlign:'left',
        }}>
        <div style={{
          width:48, height:48, borderRadius:'50%', flexShrink:0,
          background:'var(--c-navy)', border:'2px solid var(--c-border-gold)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'1.4rem', color:'var(--c-gold)',
        }}>
          {char.character_name ? char.character_name[0].toUpperCase() : '?'}
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontFamily:'var(--font-display)', fontSize:'0.95rem', color:'var(--c-gold)', letterSpacing:'0.03em', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
            {char.character_name || 'Unnamed Character'}
          </div>
          <div style={{ fontSize:'0.75rem', color:'var(--c-text-dim)', marginTop:2 }}>
            {char.class_name || '—'} {char.level || 1}{char.race ? ` · ${char.race}` : ''}
          </div>
          {char.max_hp > 0 && (
            <div style={{ marginTop:6, height:4, background:'var(--c-surface-3)', borderRadius:2, overflow:'hidden' }}>
              <div style={{ height:'100%', width:`${hpPct*100}%`, background:hpColor, borderRadius:2 }} />
            </div>
          )}
        </div>
        <span style={{ color:'var(--c-gold)', fontSize:'1.2rem' }}>›</span>
      </button>

      {/* Delete control */}
      <div style={{ position:'absolute', top:8, right:8 }}>
        {confirmDelete ? (
          <div style={{ display:'flex', gap:4 }}>
            <button className="btn btn-danger btn-sm" onClick={() => onDelete(char.id)}>Delete</button>
            <button className="btn btn-ghost btn-sm" onClick={() => setConfirmDelete(false)}>Cancel</button>
          </div>
        ) : (
          <button className="btn btn-ghost btn-icon" style={{ fontSize:'0.7rem', color:'var(--c-text-muted)' }}
            onClick={(e) => { e.stopPropagation(); setConfirmDelete(true); }}>🗑</button>
        )}
      </div>
    </div>
  );
}

export default function CharacterLibrary() {
  const { user, myCharacters, myCharactersLoading, loadMyCharacters,
          createNewCharacter, removeCharacter, openCharacter, setScreen } = useStore();

  useEffect(() => {
    if (user?.id) loadMyCharacters(user.id);
  }, [user?.id]);

  const handleCreate = async () => {
    const { data } = await createNewCharacter(user.id);
    if (data) openCharacter(data.id);
  };

  return (
    <div style={{ padding:'16px 12px', display:'flex', flexDirection:'column', gap:12 }}>
      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
        <button className="btn btn-ghost btn-icon" onClick={() => setScreen('home')}>←</button>
        <h2 style={{ flex:1 }}>📋 My Characters</h2>
        <button className="btn btn-primary btn-sm" onClick={handleCreate}>＋ New</button>
      </div>

      {myCharactersLoading && (
        <div style={{ textAlign:'center', padding:32, color:'var(--c-text-dim)' }}>
          <span className="spin" style={{ fontSize:'2rem', display:'block', marginBottom:8 }}>⟳</span>
          Loading characters...
        </div>
      )}

      {!myCharactersLoading && myCharacters.length === 0 && (
        <div style={{ textAlign:'center', padding:32 }}>
          <div style={{ fontSize:'3rem', marginBottom:12 }}>📜</div>
          <p style={{ color:'var(--c-text-dim)', fontStyle:'italic', marginBottom:16 }}>
            No characters yet. Create your first one!
          </p>
          <button className="btn btn-primary" onClick={handleCreate}>＋ Create Character</button>
        </div>
      )}

      {myCharacters.map(char => (
        <CharacterCard key={char.id} char={char} onOpen={openCharacter} onDelete={removeCharacter} />
      ))}
    </div>
  );
}
