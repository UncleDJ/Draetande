import { useStore } from '../store/useStore';
import { supabase } from '../lib/supabase';

export default function HomeScreen() {
  const { profile, setScreen, character, myCharacters } = useStore();

  const MENU = [
    {
      id: 'characters',
      icon: '📋',
      title: 'My Characters',
      desc: `${myCharacters.length} character${myCharacters.length===1?'':'s'} in your library`,
      action: () => setScreen('characters'),
    },
    {
      id: 'sessions',
      icon: '🎲',
      title: 'Sessions',
      desc: 'Join a campaign or view your active sessions',
      action: () => setScreen('sessions'),
    },
  ];

  if (profile?.is_approved_dm) {
    MENU.push({
      id: 'create-session',
      icon: '🐉',
      title: 'Create Session',
      desc: 'Start a new campaign as Dungeon Master',
      action: () => setScreen('sessions'),
      gold: true,
    });
  }

  return (
    <div style={{ padding:'24px 16px', display:'flex', flexDirection:'column', gap:16 }}>
      {/* Hero */}
      <div style={{ textAlign:'center', marginBottom:8 }}>
        <div style={{ fontSize:'2.5rem', marginBottom:8, filter:'drop-shadow(0 0 12px rgba(200,169,81,0.4))' }}>⚔</div>
        <h1 style={{ letterSpacing:'0.15em' }}>DRAETANDE</h1>
        <p style={{ color:'var(--c-text-dim)', fontStyle:'italic', marginTop:4, fontSize:'0.9rem' }}>
          Welcome back{profile?.player_name ? `, ${profile.player_name}` : ''}
        </p>
      </div>

      {/* Menu cards */}
      {MENU.map(item => (
        <button key={item.id} onClick={item.action}
          className="card"
          style={{
            display:'flex', alignItems:'center', gap:14, padding:16,
            background: item.gold ? 'rgba(200,169,81,0.08)' : 'var(--c-surface)',
            border: `1px solid ${item.gold ? 'var(--c-border-gold)' : 'var(--c-border)'}`,
            cursor:'pointer', textAlign:'left', width:'100%',
          }}>
          <span style={{ fontSize:'2rem' }}>{item.icon}</span>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:'var(--font-display)', fontSize:'1rem', color:'var(--c-gold)', letterSpacing:'0.05em' }}>
              {item.title}
            </div>
            <div style={{ fontSize:'0.8rem', color:'var(--c-text-dim)', marginTop:2 }}>
              {item.desc}
            </div>
          </div>
          <span style={{ color:'var(--c-gold)', fontSize:'1.2rem' }}>›</span>
        </button>
      ))}

      {/* Quick resume - if a character was recently open */}
      {character?.id && (
        <button onClick={() => setScreen('sheet')}
          className="card"
          style={{
            display:'flex', alignItems:'center', gap:14, padding:14,
            background:'var(--c-surface-2)', border:'1px solid var(--c-border-gold)',
            cursor:'pointer', textAlign:'left', width:'100%',
          }}>
          <span style={{ fontSize:'1.5rem' }}>↩</span>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:'0.85rem', color:'var(--c-text)' }}>
              Resume <strong style={{ color:'var(--c-gold)' }}>{character.character_name || 'Unnamed'}</strong>
            </div>
            <div style={{ fontSize:'0.7rem', color:'var(--c-text-dim)' }}>
              {character.class_name} {character.level} · {character.race}
            </div>
          </div>
        </button>
      )}

      {/* Approved DM badge */}
      {profile?.is_approved_dm && (
        <div style={{ textAlign:'center' }}>
          <span className="badge badge-gold">⚜ Approved Dungeon Master</span>
        </div>
      )}

      <button onClick={() => supabase.auth.signOut()}
        className="btn btn-ghost" style={{ marginTop:16, alignSelf:'center' }}>
        Sign Out
      </button>
    </div>
  );
}
