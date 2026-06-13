import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { CLASSES, RACES, getMod, fmtMod, getProfBonus } from '../data/gameData';

function PartyMemberCard({ char }) {
  const cls = CLASSES[char.class_name] || {};
  const raceData = RACES.find(r => r.name === char.race) || { bonuses: {} };
  const level = char.level || 1;
  const profBonus = getProfBonus(level);

  const stats = ['str','dex','con','int','wis','cha'];
  const scores = {};
  stats.forEach(s => {
    scores[s] = (char[s] || 0) + (raceData.bonuses[s.toUpperCase()] || 0);
  });

  const hpPct = char.max_hp > 0 ? Math.max(0, char.current_hp / char.max_hp) : 0;
  const hpColor = hpPct > 0.5 ? 'var(--c-green-light)' : hpPct > 0.25 ? '#ffa726' : 'var(--c-red-bright)';

  const spellAbility = cls.spellAbility;
  const spellMod = spellAbility ? getMod(scores[spellAbility.slice(0,3).toLowerCase()] || 10) : 0;

  return (
    <div className="card" style={{ marginBottom:12 }}>
      {/* Header */}
      <div style={{
        padding:'10px 12px', background:'var(--c-navy)',
        display:'flex', justifyContent:'space-between', alignItems:'center',
      }}>
        <div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:'0.9rem', color:'var(--c-gold)', letterSpacing:'0.05em' }}>
            {char.character_name || 'Unnamed'}
          </div>
          <div style={{ fontSize:'0.7rem', color:'var(--c-text-dim)' }}>
            {char.player_name && `${char.player_name} · `}
            {char.class_name} {level} · {char.race}
          </div>
        </div>
        <div style={{ display:'flex', gap:6, alignItems:'center' }}>
          <span className="badge badge-gold">{char.alignment || '—'}</span>
        </div>
      </div>

      <div className="card-body" style={{ display:'flex', flexDirection:'column', gap:10 }}>

        {/* HP bar */}
        <div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.75rem', marginBottom:3, color:'var(--c-text-dim)' }}>
            <span>Hit Points</span>
            <span style={{ fontFamily:'var(--font-mono)', color: hpColor }}>
              {char.current_hp} / {char.max_hp}
              {char.temp_hp > 0 && <span style={{ color:'var(--c-blue)' }}> (+{char.temp_hp})</span>}
            </span>
          </div>
          <div style={{ height:8, background:'var(--c-surface-3)', borderRadius:4, overflow:'hidden' }}>
            <div style={{ height:'100%', width:`${hpPct*100}%`, background:hpColor, borderRadius:4, transition:'width 0.5s' }} />
          </div>
        </div>

        {/* Quick stats grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:6 }}>
          {[
            { label:'AC',    value: char.ac || '?' },
            { label:'Init',  value: fmtMod(getMod(scores.dex)) },
            { label:'Speed', value: `${(RACES.find(r=>r.name===char.race)||{speed:30}).speed}` },
            { label:'Prof',  value: fmtMod(profBonus) },
          ].map(item => (
            <div key={item.label} style={{
              textAlign:'center', background:'var(--c-surface-2)', padding:'5px 2px',
              borderRadius:'var(--radius-sm)', border:'1px solid var(--c-border)',
            }}>
              <div style={{ fontSize:'0.5rem', fontFamily:'var(--font-display)', letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--c-text-muted)' }}>{item.label}</div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.95rem', color:'var(--c-text)' }}>{item.value}</div>
            </div>
          ))}
        </div>

        {/* Ability scores */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:4 }}>
          {stats.map(s => (
            <div key={s} style={{ textAlign:'center' }}>
              <div style={{ fontSize:'0.5rem', fontFamily:'var(--font-display)', textTransform:'uppercase', color:'var(--c-text-muted)', letterSpacing:'0.06em' }}>{s.toUpperCase()}</div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.85rem', color:'var(--c-text)' }}>{scores[s]||'—'}</div>
              <div style={{ fontSize:'0.65rem', color:'var(--c-gold)' }}>{scores[s] ? fmtMod(getMod(scores[s])) : ''}</div>
            </div>
          ))}
        </div>

        {/* Spell info */}
        {spellAbility && (
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:6 }}>
            {[
              { label:'Spell Ability', value: spellAbility },
              { label:'Spell DC', value: 8 + profBonus + spellMod },
              { label:'Spell ATK', value: fmtMod(profBonus + spellMod) },
            ].map(item => (
              <div key={item.label} style={{
                textAlign:'center', background:'rgba(200,169,81,0.05)', padding:'5px 2px',
                borderRadius:'var(--radius-sm)', border:'1px solid var(--c-border-gold)',
              }}>
                <div style={{ fontSize:'0.5rem', fontFamily:'var(--font-display)', letterSpacing:'0.06em', textTransform:'uppercase', color:'var(--c-gold-dim)' }}>{item.label}</div>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.9rem', color:'var(--c-gold)' }}>{item.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Passive perception */}
        <div style={{ fontSize:'0.8rem', color:'var(--c-text-dim)', display:'flex', justifyContent:'space-between' }}>
          <span>Passive Perception</span>
          <span style={{ fontFamily:'var(--font-mono)', color:'var(--c-text)' }}>
            {10 + getMod(scores.wis) + ((char.skill_profs||{})['Perception']==='expertise' ? profBonus*2 : (char.skill_profs||{})['Perception'] ? profBonus : 0)}
          </span>
        </div>

        {/* Death saves indicator */}
        {(char.current_hp === 0) && (
          <div style={{ padding:'6px 8px', background:'rgba(139,26,42,0.2)', borderRadius:'var(--radius-sm)', border:'1px solid var(--c-red)', fontSize:'0.8rem' }}>
            <span style={{ color:'var(--c-red-bright)' }}>☠ DOWNED</span>
            <span style={{ color:'var(--c-text-dim)', marginLeft:8 }}>
              S: {char.death_saves_success||0}/3 · F: {char.death_saves_fail||0}/3
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PartyTab() {
  const { party, partyLoading, loadSessionParty, subscribeSessionParty,
          activeSession, user, setScreen } = useStore();

  const isDM = activeSession?.dm_user_id === user?.id;

  useEffect(() => {
    if (!activeSession?.id) return;
    loadSessionParty(activeSession.id);
    const unsub = subscribeSessionParty(activeSession.id);
    return () => unsub?.();
  }, [activeSession?.id]);

  if (!activeSession) {
    return (
      <div style={{ padding:24, textAlign:'center' }}>
        <div style={{ fontSize:'3rem', marginBottom:12 }}>🎲</div>
        <h2>No Active Session</h2>
        <p style={{ color:'var(--c-text-dim)', marginTop:8, fontStyle:'italic', marginBottom:16 }}>
          Open a session from the Sessions menu to see its party.
        </p>
        <button className="btn btn-primary" onClick={() => setScreen('sessions')}>
          Go to Sessions
        </button>
      </div>
    );
  }

  if (!isDM) {
    return (
      <div style={{ padding:24, textAlign:'center' }}>
        <div style={{ fontSize:'3rem', marginBottom:12 }}>🛡</div>
        <h2>DM View Only</h2>
        <p style={{ color:'var(--c-text-dim)', marginTop:8, fontStyle:'italic' }}>
          The party overview is only visible to the Dungeon Master.
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding:'12px 12px 0' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4 }}>
        <h2>🐉 {activeSession.name}</h2>
        <div style={{ display:'flex', gap:6, alignItems:'center' }}>
          <span style={{
            width:8, height:8, borderRadius:'50%',
            background:'var(--c-green-light)', display:'inline-block',
            animation:'pulse 1.5s ease infinite',
          }} />
          <span style={{ fontSize:'0.7rem', color:'var(--c-text-dim)' }}>Live</span>
        </div>
      </div>

      <div style={{ marginBottom:12, fontSize:'0.8rem', color:'var(--c-text-dim)' }}>
        Join code: <span className="badge badge-gold" style={{ fontFamily:'var(--font-mono)', fontSize:'0.8rem' }}>{activeSession.join_code}</span>
        <span style={{ marginLeft:8 }}>Share this with your players</span>
      </div>

      {partyLoading && (
        <div style={{ textAlign:'center', padding:32, color:'var(--c-text-dim)' }}>
          <span className="spin" style={{ fontSize:'2rem', display:'block', marginBottom:8 }}>⟳</span>
          Loading party...
        </div>
      )}

      {!partyLoading && party.length === 0 && (
        <div style={{ textAlign:'center', padding:32 }}>
          <p style={{ color:'var(--c-text-dim)', fontStyle:'italic' }}>
            No characters have joined this session yet. Share the join code above with your players.
          </p>
        </div>
      )}

      {party.filter(c => c.character_name).map(char => (
        <PartyMemberCard key={char.id} char={char} />
      ))}

      {/* Summary bar */}
      {party.length > 0 && (
        <div className="card" style={{ marginTop:12 }}>
          <div className="section-header">📊 Party Summary</div>
          <div className="card-body">
            <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:8, fontSize:'0.85rem' }}>
              <div style={{ color:'var(--c-text-dim)' }}>
                Players online: <strong style={{ color:'var(--c-text)' }}>{party.filter(c=>c.character_name).length}</strong>
              </div>
              <div style={{ color:'var(--c-text-dim)' }}>
                Avg Level: <strong style={{ color:'var(--c-text)' }}>
                  {(party.filter(c=>c.level).reduce((s,c)=>s+c.level,0) / Math.max(1,party.filter(c=>c.level).length)).toFixed(1)}
                </strong>
              </div>
              <div style={{ color:'var(--c-text-dim)' }}>
                Downed: <strong style={{ color: party.filter(c=>c.current_hp===0&&c.max_hp>0).length ? 'var(--c-red-bright)' : 'var(--c-text)' }}>
                  {party.filter(c=>c.current_hp===0&&c.max_hp>0).length}
                </strong>
              </div>
              <div style={{ color:'var(--c-text-dim)' }}>
                Full HP: <strong style={{ color:'var(--c-text)' }}>
                  {party.filter(c=>c.current_hp>0&&c.current_hp>=c.max_hp).length}
                </strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
