import { useState } from 'react';
import { useStore } from '../store/useStore';
import { CLASSES, CLASS_FEATURES, getSpellSlots, getProfBonus,
         getMod, fmtMod, XP_THRESHOLDS } from '../data/gameData';
import { FEATURE_DETAILS } from '../data/featureDetails';
import { SUBCLASS_DETAILS } from '../data/subclassDetails';

function DiceRoller({ hd, conMod, onConfirm }) {
  const [rolled, setRolled] = useState(null);
  const [rolling, setRolling] = useState(false);

  const roll = () => {
    setRolling(true);
    setRolled(null);
    // Animate then settle
    let count = 0;
    const interval = setInterval(() => {
      setRolled(Math.ceil(Math.random() * hd));
      count++;
      if (count >= 8) {
        clearInterval(interval);
        setRolling(false);
        setRolled(prev => Math.max(1, prev));
      }
    }, 80);
  };

  const avg = Math.floor(hd / 2) + 1;
  const total = (rolled !== null ? rolled : avg) + conMod;

  return (
    <div style={{ textAlign:'center', padding:'20px 0' }}>
      <p style={{ fontSize:'0.85rem', color:'var(--c-text-dim)', marginBottom:16 }}>
        Roll 1d{hd} + CON mod ({fmtMod(conMod)}) for HP
      </p>

      {/* Dice display */}
      <div style={{
        fontSize:'4rem', marginBottom:16, cursor:'pointer',
        animation: rolling ? 'roll 0.08s linear infinite' : 'none',
        display:'inline-block', filter:'drop-shadow(0 0 12px rgba(200,169,81,0.4))',
        userSelect:'none',
      }} onClick={roll}>
        🎲
      </div>

      {rolled !== null && (
        <div style={{ marginBottom:16 }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:'2rem', color:'var(--c-gold)' }}>
            {rolled}
          </div>
          <div style={{ fontSize:'0.8rem', color:'var(--c-text-dim)' }}>
            {rolled} + {conMod} CON = <strong style={{ color:'var(--c-gold-light)' }}>+{Math.max(1, total)} HP</strong>
          </div>
        </div>
      )}

      <div style={{ display:'flex', gap:8, justifyContent:'center', flexWrap:'wrap' }}>
        <button className="btn btn-primary" onClick={roll}>
          🎲 {rolled === null ? 'Roll HP' : 'Reroll'}
        </button>
        {rolled !== null && (
          <button className="btn btn-secondary" onClick={() => onConfirm(Math.max(1, total))}>
            ✓ Take {Math.max(1, total)} HP
          </button>
        )}
        <button className="btn btn-ghost" onClick={() => onConfirm(Math.max(1, avg + conMod))}>
          Take Average ({Math.max(1, avg + conMod)})
        </button>
      </div>
    </div>
  );
}

function ManualHP({ hd, conMod, onConfirm }) {
  const [hp, setHp] = useState('');
  const avg = Math.floor(hd / 2) + 1;
  const val = parseInt(hp);
  const valid = !isNaN(val) && val > 0;
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:10, padding:12, background:'var(--c-surface-2)', borderRadius:'var(--radius-md)', border:'1px solid var(--c-border-gold)' }}>
      <div style={{ textAlign:'center', fontSize:'0.85rem', color:'var(--c-text-dim)' }}>
        Enter HP gained for this level (roll 1d{hd} + {fmtMod(conMod)} CON yourself)
      </div>
      <input type="number" inputMode="numeric" value={hp} onChange={e=>setHp(e.target.value)}
        placeholder={`e.g. ${avg + conMod}`} autoFocus
        style={{ textAlign:'center', fontFamily:'var(--font-mono)', fontSize:'1.5rem' }} />
      <button className="btn btn-primary" disabled={!valid}
        onClick={() => onConfirm(Math.max(1, val))}>
        ✓ Confirm {valid ? `+${Math.max(1, val)} HP` : 'HP'}
      </button>
      <button className="btn btn-ghost" onClick={() => onConfirm(Math.max(1, avg + conMod))}>
        Take Average ({Math.max(1, avg + conMod)})
      </button>
    </div>
  );
}

function FeatureDetailsList({ className, subclass, maxLevel }) {
  const [expanded, setExpanded] = useState({});
  const data = FEATURE_DETAILS[className];
  if (!data) return null;

  const feats = data.features.filter(f => f.level <= maxLevel);

  // Subclass features (if a subclass is selected and we have data for it)
  const subData = subclass && SUBCLASS_DETAILS[className]?.[subclass];
  const subFeats = subData ? subData.features.filter(f => f.level <= maxLevel) : [];

  if (feats.length === 0 && subFeats.length === 0) return null;

  const renderGrouped = (list, sourceLink) => {
    const byLevel = {};
    list.forEach(f => { (byLevel[f.level] = byLevel[f.level] || []).push(f); });
    const levels = Object.keys(byLevel).map(Number).sort((a,b)=>a-b);
    return levels.map(lvl => (
      <div key={lvl}>
        <div style={{ fontSize:'0.6rem', fontFamily:'var(--font-display)', letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--c-gold-dim)', margin:'6px 0 2px' }}>
          Level {lvl}
        </div>
        {byLevel[lvl].map((f, i) => {
          const key = `${sourceLink}-${lvl}-${i}`;
          const open = expanded[key];
          return (
            <div key={key} style={{ borderBottom:'1px solid var(--c-border)' }}>
              <button onClick={()=>setExpanded(e=>({...e,[key]:!e[key]}))}
                style={{ display:'flex', alignItems:'center', gap:8, width:'100%', textAlign:'left',
                         background:'none', border:'none', padding:'8px 0', cursor:'pointer', color:'var(--c-text)' }}>
                <span style={{ color:'var(--c-gold)', flexShrink:0, fontSize:'0.7rem' }}>{open ? '▼' : '▸'}</span>
                <span style={{ flex:1, fontSize:'0.9rem' }}>{f.name}</span>
              </button>
              {open && (
                <div style={{ padding:'0 0 10px 22px', fontSize:'0.82rem', color:'var(--c-text-dim)', lineHeight:1.5 }}>
                  {f.summary}
                  <a href={f.link} target="_blank" rel="noopener noreferrer"
                    style={{ display:'inline-block', marginTop:4, color:'var(--c-gold)', fontSize:'0.75rem' }}>
                    Read full rules ↗
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    ));
  };

  return (
    <>
      <div className="card">
        <div className="section-header">📖 {className} Feature Details
          <a href={data.base} target="_blank" rel="noopener noreferrer"
            style={{ marginLeft:'auto', fontSize:'0.6rem', color:'var(--c-gold-dim)', fontFamily:'var(--font-body)', textTransform:'none', letterSpacing:0 }}>
            full text ↗
          </a>
        </div>
        <div className="card-body" style={{ display:'flex', flexDirection:'column', gap:6 }}>
          {renderGrouped(feats, 'base')}
        </div>
      </div>

      {subFeats.length > 0 && (
        <div className="card" style={{ border:'1px solid var(--c-border-gold)' }}>
          <div className="section-header">⭐ {subclass}
            <a href={subData.link} target="_blank" rel="noopener noreferrer"
              style={{ marginLeft:'auto', fontSize:'0.6rem', color:'var(--c-gold-dim)', fontFamily:'var(--font-body)', textTransform:'none', letterSpacing:0 }}>
              full text ↗
            </a>
          </div>
          <div className="card-body" style={{ display:'flex', flexDirection:'column', gap:6 }}>
            {renderGrouped(subFeats, 'sub')}
          </div>
        </div>
      )}
    </>
  );
}

export default function LevelUpTab() {
  const { character: char, setField } = useStore();
  const [showRoller, setShowRoller] = useState(false);

  if (!char) return null;

  const currentLevel = char.level || 1;
  const nextLevel    = currentLevel + 1;
  const cls          = CLASSES[char.class_name];
  const profBonus    = getProfBonus(currentLevel);
  const nextProf     = getProfBonus(nextLevel);

  const currentFeatures = CLASS_FEATURES[char.class_name]?.[currentLevel] || [];
  const nextFeatures    = nextLevel <= 20 ? (CLASS_FEATURES[char.class_name]?.[nextLevel] || []) : [];

  const currentXP = char.experience || 0;
  const nextLevelXP = XP_THRESHOLDS[nextLevel - 1] || 999999;
  const xpProgress = Math.min(1, (currentXP - (XP_THRESHOLDS[currentLevel-1]||0)) / Math.max(1, nextLevelXP - (XP_THRESHOLDS[currentLevel-1]||0)));

  const currentSlots = getSpellSlots(char.class_name, currentLevel);
  const nextSlots    = nextLevel <= 20 ? getSpellSlots(char.class_name, nextLevel) : null;

  const conMod = getMod((char.con || 10));

  const handleLevelUp = (hpGain) => {
    setField('level', nextLevel);
    setField('max_hp', (char.max_hp || 0) + hpGain);
    setField('current_hp', (char.current_hp || 0) + hpGain);
    setShowRoller(false);
  };

  const isASI = currentFeatures.some(f => f.includes('ASI'));
  const nextIsASI = nextFeatures.some(f => f.includes('ASI'));

  return (
    <div style={{ padding:'12px 12px 0', display:'flex', flexDirection:'column', gap:12 }}>

      {/* Current level summary */}
      <div className="card">
        <div className="section-header">⬆ Level Overview</div>
        <div className="card-body">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <div style={{ textAlign:'center', padding:12, background:'var(--c-surface-2)', borderRadius:'var(--radius-md)', border:'1px solid var(--c-border-gold)' }}>
              <div style={{ fontSize:'0.6rem', fontFamily:'var(--font-display)', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--c-text-dim)' }}>Current</div>
              <div style={{ fontSize:'2.5rem', fontFamily:'var(--font-mono)', color:'var(--c-gold)', lineHeight:1 }}>{currentLevel}</div>
              <div style={{ fontSize:'0.75rem', color:'var(--c-text-dim)' }}>Prof {fmtMod(profBonus)}</div>
            </div>
            <div style={{ textAlign:'center', padding:12, background:'var(--c-surface-2)', borderRadius:'var(--radius-md)', border:'1px solid var(--c-border)', opacity: nextLevel > 20 ? 0.5 : 1 }}>
              <div style={{ fontSize:'0.6rem', fontFamily:'var(--font-display)', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--c-text-dim)' }}>Next Level</div>
              <div style={{ fontSize:'2.5rem', fontFamily:'var(--font-mono)', color:'var(--c-text-dim)', lineHeight:1 }}>{Math.min(20, nextLevel)}</div>
              <div style={{ fontSize:'0.75rem', color:'var(--c-text-dim)' }}>Prof {fmtMod(nextProf)}</div>
            </div>
          </div>

          {/* XP bar */}
          {!char.hide_xp && (
          <div style={{ marginTop:16 }}>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.75rem', color:'var(--c-text-dim)', marginBottom:4 }}>
              <span>XP: {currentXP.toLocaleString()}</span>
              <span>Next: {nextLevelXP.toLocaleString()}</span>
            </div>
            <div style={{ height:6, background:'var(--c-surface-3)', borderRadius:3, overflow:'hidden' }}>
              <div style={{ height:'100%', width:`${xpProgress*100}%`, background:'var(--c-gold)', borderRadius:3, transition:'width 0.5s' }} />
            </div>
            <div style={{ textAlign:'center', fontSize:'0.7rem', color:'var(--c-text-muted)', marginTop:4 }}>
              {Math.max(0, nextLevelXP - currentXP).toLocaleString()} XP to level {Math.min(20, nextLevel)}
            </div>
          </div>
          )}
        </div>
      </div>

      {/* Features at current level */}
      <div className="card">
        <div className="section-header">📜 Level {currentLevel} Features</div>
        <div className="card-body">
          {currentFeatures.length === 0
            ? <p style={{ color:'var(--c-text-muted)', fontStyle:'italic', fontSize:'0.85rem' }}>No new features this level.</p>
            : currentFeatures.map((f, i) => (
              <div key={i} style={{
                padding:'8px 0', borderBottom: i < currentFeatures.length-1 ? '1px solid var(--c-border)' : 'none',
                display:'flex', alignItems:'flex-start', gap:8,
              }}>
                <span style={{ color: f.includes('ASI') ? 'var(--c-gold)' : 'var(--c-text-muted)', flexShrink:0 }}>
                  {f.includes('ASI') ? '⚠' : '▸'}
                </span>
                <span style={{ fontSize:'0.9rem', color: f.includes('ASI') ? 'var(--c-gold)' : 'var(--c-text)' }}>
                  {f}
                </span>
              </div>
            ))
          }
          {isASI && (
            <div style={{ marginTop:8, padding:'8px 10px', background:'rgba(200,169,81,0.1)', borderRadius:'var(--radius-sm)', border:'1px solid var(--c-gold-dim)', fontSize:'0.8rem', color:'var(--c-gold)' }}>
              ⚠ Choose: +2 to one stat, or +1/+1 to two stats, or take a Feat
            </div>
          )}
        </div>
      </div>

      {/* Detailed feature reference for this class up to current level */}
      <FeatureDetailsList className={char.class_name} subclass={char.subclass} maxLevel={currentLevel} />

      {/* Level up button */}
      {nextLevel <= 20 && (
        <div className="card">
          <div className="section-header">🆙 Level Up to {nextLevel}</div>
          <div className="card-body" style={{ display:'flex', flexDirection:'column', gap:12 }}>

            {nextFeatures.length > 0 && (
              <div>
                <label>New Features at Level {nextLevel}</label>
                <div style={{ display:'flex', flexDirection:'column', gap:4, marginTop:4 }}>
                  {nextFeatures.map((f,i) => (
                    <div key={i} style={{ display:'flex', gap:8, padding:'4px 0', borderBottom:'1px solid var(--c-border)', alignItems:'flex-start' }}>
                      <span style={{ color:'var(--c-teal)', flexShrink:0 }}>▸</span>
                      <span style={{ fontSize:'0.9rem', color: f.includes('ASI') ? 'var(--c-gold)' : 'var(--c-text)' }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Spell slots comparison */}
            {nextSlots && currentSlots && (
              <div>
                <label>Spell Slots at Level {nextLevel}</label>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginTop:4 }}>
                  {nextSlots.slice(1).map((n,i) => n>0 && (
                    <div key={i} style={{
                      padding:'4px 8px', borderRadius:'var(--radius-sm)',
                      background: n > (currentSlots[i+1]||0) ? 'rgba(27,94,32,0.3)' : 'var(--c-surface-3)',
                      border: `1px solid ${n > (currentSlots[i+1]||0) ? 'var(--c-green)' : 'var(--c-border)'}`,
                      fontSize:'0.75rem', color: n > (currentSlots[i+1]||0) ? 'var(--c-green-light)' : 'var(--c-text-dim)',
                    }}>
                      L{i+1}: {n}{n > (currentSlots[i+1]||0) ? ` (+${n-(currentSlots[i+1]||0)})` : ''}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {nextIsASI && (
              <div style={{ padding:'8px 10px', background:'rgba(200,169,81,0.1)', borderRadius:'var(--radius-sm)', border:'1px solid var(--c-gold-dim)', fontSize:'0.8rem', color:'var(--c-gold)' }}>
                ⚠ Level {nextLevel} includes ASI — remember to update your ability scores!
              </div>
            )}

            {showRoller ? (
              char.manual_hp_levelup
                ? <ManualHP hd={cls?.hd || 8} conMod={conMod} onConfirm={handleLevelUp} />
                : <DiceRoller hd={cls?.hd || 8} conMod={conMod} onConfirm={handleLevelUp} />
            ) : (
              <button className="btn btn-primary" style={{ padding:'14px', fontSize:'0.85rem' }}
                onClick={() => setShowRoller(true)}>
                {char.manual_hp_levelup ? '⬆ Level Up → Enter HP' : '🎲 Level Up → Roll HP'}
              </button>
            )}
          </div>
        </div>
      )}

      {currentLevel >= 20 && (
        <div style={{ textAlign:'center', padding:32 }}>
          <div style={{ fontSize:'3rem', marginBottom:12 }}>👑</div>
          <h2>Level 20 Achieved</h2>
          <p style={{ color:'var(--c-text-dim)', marginTop:8, fontStyle:'italic' }}>Maximum level reached. Legendary status.</p>
        </div>
      )}

      {/* Full level reference table */}
      <div className="card">
        <div className="section-header">📊 All Levels Reference</div>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.8rem' }}>
            <thead>
              <tr style={{ background:'var(--c-navy)' }}>
                {['Lvl','Prof','XP','Features'].map(h => (
                  <th key={h} style={{ padding:'6px 8px', textAlign:h==='Lvl'||h==='Prof'?'center':'left', fontFamily:'var(--font-display)', fontSize:'0.6rem', letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--c-gold)', borderBottom:'1px solid var(--c-border-gold)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({length:20}, (_,i) => i+1).map(lvl => {
                const feats = CLASS_FEATURES[char.class_name]?.[lvl] || [];
                const isCurrentLvl = lvl === currentLevel;
                return (
                  <tr key={lvl} style={{ background: isCurrentLvl ? 'rgba(200,169,81,0.08)' : lvl%2===0 ? 'var(--c-surface-2)' : 'var(--c-surface)', borderBottom:'1px solid var(--c-border)' }}>
                    <td style={{ padding:'5px 8px', textAlign:'center', fontFamily:'var(--font-mono)', color: isCurrentLvl ? 'var(--c-gold)' : 'var(--c-text)', fontWeight: isCurrentLvl ? 'bold' : 'normal' }}>{lvl}{isCurrentLvl ? ' ◀':''}</td>
                    <td style={{ padding:'5px 8px', textAlign:'center', fontFamily:'var(--font-mono)', color:'var(--c-text-dim)' }}>{fmtMod(getProfBonus(lvl))}</td>
                    <td style={{ padding:'5px 8px', fontFamily:'var(--font-mono)', color:'var(--c-text-dim)', whiteSpace:'nowrap' }}>{XP_THRESHOLDS[lvl-1]?.toLocaleString()}</td>
                    <td style={{ padding:'5px 8px', color: feats.some(f=>f.includes('ASI')) ? 'var(--c-gold)' : 'var(--c-text)', fontSize:'0.75rem' }}>
                      {feats.join(', ') || '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
