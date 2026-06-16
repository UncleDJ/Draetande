import { useState, useMemo, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { CLASSES, SPELL_SLOTS, getSpellSlots, getMod, getProfBonus } from '../data/gameData';
import spellsData from '../data/spells.json';

const LEVEL_LABELS = ['Cantrips','1st Level','2nd Level','3rd Level','4th Level','5th Level','6th Level','7th Level','8th Level','9th Level'];
const LEVEL_KEYS   = ['cantrips','l1','l2','l3','l4','l5','l6','l7','l8','l9'];

function SpellSlotRow({ level, total, expended, onExpend, onRecover }) {
  if (!total) return null;
  return (
    <div style={{ display:'flex', alignItems:'center', gap:8, padding:'4px 0' }}>
      <span style={{ width:24, fontSize:'0.7rem', fontFamily:'var(--font-display)', color:'var(--c-text-dim)' }}>
        {level}
      </span>
      <div style={{ display:'flex', gap:4, flex:1 }}>
        {Array.from({length: total}, (_, i) => (
          <button key={i} onClick={() => i >= (total - expended) ? onRecover() : onExpend()}
            className={`slot-pip ${i >= (total - expended) ? 'expended' : 'available'}`}
            title={i >= (total-expended) ? 'Recover slot' : 'Use slot'}
          />
        ))}
      </div>
      <span style={{ fontSize:'0.7rem', color:'var(--c-text-muted)', fontFamily:'var(--font-mono)', minWidth:32, textAlign:'right' }}>
        {total - expended}/{total}
      </span>
    </div>
  );
}

function SpellEntry({ name, onRemove }) {
  return (
    <div style={{
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'4px 0', borderBottom:'1px solid var(--c-border)',
    }}>
      <span style={{ fontSize:'0.9rem' }}>{name}</span>
      <button onClick={onRemove} className="btn btn-ghost btn-icon" style={{ color:'var(--c-red-bright)', fontSize:'0.7rem' }}>✕</button>
    </div>
  );
}

function SpellPicker({ className, level, currentSpells, customSpells, onAdd, onClose }) {
  const [query, setQuery] = useState('');
  const [showAll, setShowAll] = useState(false);

  const available = useMemo(() => {
    const core = spellsData.filter(s => s.level === level);
    const custom = (customSpells || []).filter(s => s.level === level).map(s => ({ ...s, isCustom: true }));
    const all = [...core, ...custom];
    return all.filter(s =>
      !currentSpells.includes(s.name) &&
      (showAll || !className || (s.classes||[]).includes(className) || s.isCustom) &&
      (query.trim() === '' || s.name.toLowerCase().includes(query.toLowerCase()))
    ).sort((a,b) => a.name.localeCompare(b.name));
  }, [level, currentSpells, customSpells, className, showAll, query]);

  return (
    <div style={{
      position:'fixed', inset:0, background:'rgba(0,0,0,0.8)', zIndex:200,
      display:'flex', alignItems:'flex-end',
    }} onClick={onClose}>
      <div style={{
        background:'var(--c-surface)', borderRadius:'16px 16px 0 0',
        width:'100%', maxHeight:'75vh', overflow:'hidden',
        display:'flex', flexDirection:'column', padding:16,
      }} onClick={e=>e.stopPropagation()}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
          <h3>Add {LEVEL_LABELS[level]} Spell</h3>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
        </div>
        <input placeholder="Search spells..." value={query} onChange={e=>setQuery(e.target.value)}
          style={{ marginBottom:8 }} autoFocus />
        {className && (
          <label style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer', textTransform:'none', fontFamily:'var(--font-body)', fontSize:'0.8rem', color:'var(--c-text-dim)', marginBottom:8 }}>
            <input type="checkbox" style={{ width:'auto' }} checked={showAll}
              onChange={e=>setShowAll(e.target.checked)} />
            Show spells from all classes (not just {className})
          </label>
        )}
        <div style={{ overflow:'auto', flex:1 }}>
          {available.length === 0
            ? <p style={{ color:'var(--c-text-muted)', textAlign:'center', padding:24 }}>No spells found</p>
            : available.map(s => (
              <button key={s.isCustom ? `c-${s.id}` : s.name} onClick={()=>{ onAdd(s.name); onClose(); }}
                style={{
                  display:'flex', alignItems:'center', gap:8, width:'100%', padding:'10px 12px', textAlign:'left',
                  background:'none', border:'none', borderBottom:'1px solid var(--c-border)',
                  color:'var(--c-text)', cursor:'pointer', fontSize:'0.95rem',
                  transition:'background 0.1s',
                }}
                onMouseEnter={e=>e.currentTarget.style.background='var(--c-surface-2)'}
                onMouseLeave={e=>e.currentTarget.style.background='none'}
              >
                <span style={{ flex:1 }}>{s.name}</span>
                {s.isCustom && <span className="badge badge-gold" style={{ fontSize:'0.5rem' }}>custom</span>}
                <span style={{ fontSize:'0.7rem', color:'var(--c-text-muted)' }}>{s.school}</span>
              </button>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default function SpellsTab() {
  const { character: char, setField, expendSlot, recoverSlot, user, customSpells, loadCustomSpells } = useStore();
  const [picker, setPicker] = useState(null); // { level: 0-9 }

  useEffect(() => {
    loadCustomSpells();
  }, [user?.id]);

  if (!char) return null;

  const cls = CLASSES[char.class_name];
  const level = char.level || 1;
  const isWarlock = char.class_name === 'Warlock';
  const hasSpells = cls?.spellAbility && cls?.spellStart <= level;

  const slots = useMemo(() => getSpellSlots(char.class_name, level), [char.class_name, level]);
  const expended = char.slots_expended || [0,0,0,0,0,0,0,0,0];

  const addSpell = (levelKey, name) => {
    const spells = { ...(char.spells || {}) };
    spells[levelKey] = [...(spells[levelKey] || []), name];
    setField('spells', spells);
  };

  const removeSpell = (levelKey, name) => {
    const spells = { ...(char.spells || {}) };
    spells[levelKey] = (spells[levelKey] || []).filter(s => s !== name);
    setField('spells', spells);
  };

  if (!hasSpells) {
    return (
      <div style={{ padding:24, textAlign:'center' }}>
        <div style={{ fontSize:'3rem', marginBottom:12 }}>✨</div>
        <h2>No Spellcasting</h2>
        <p style={{ color:'var(--c-text-dim)', marginTop:8, fontStyle:'italic' }}>
          {char.class_name || 'Your class'} {level < (cls?.spellStart||99)
            ? `gains spellcasting at level ${cls?.spellStart}`
            : 'does not cast spells'}
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding:'12px 12px 0', display:'flex', flexDirection:'column', gap:12 }}>
      {picker && (
        <SpellPicker
          className={char.class_name}
          level={picker.level}
          currentSpells={(char.spells||{})[LEVEL_KEYS[picker.level]] || []}
          customSpells={customSpells}
          onAdd={name => addSpell(LEVEL_KEYS[picker.level], name)}
          onClose={() => setPicker(null)}
        />
      )}

      {/* Spell ability info */}
      <div className="card">
        <div className="section-header">✨ Spellcasting</div>
        <div className="card-body">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8, marginBottom:8 }}>
            {[
              { label:'Ability', value: cls.spellAbility },
              { label:'Save DC', value: (() => { const raceBonus = RACES_MAP[char.race]?.[cls.spellAbility?.slice(0,3).toUpperCase()] || 0; const score = (char[cls.spellAbility?.slice(0,3).toLowerCase()] || 0) + raceBonus; return 8 + getProfBonus(level) + getMod(score); })() },
              { label:'Atk Bonus', value: (() => { const raceBonus = RACES_MAP[char.race]?.[cls.spellAbility?.slice(0,3).toUpperCase()] || 0; const score = (char[cls.spellAbility?.slice(0,3).toLowerCase()] || 0) + raceBonus; return (getMod(score) + getProfBonus(level) >= 0 ? '+' : '') + (getMod(score) + getProfBonus(level)); })() },
            ].map(item => (
              <div key={item.label} style={{ textAlign:'center', background:'var(--c-surface-2)', borderRadius:'var(--radius-sm)', padding:'8px 4px', border:'1px solid var(--c-border)' }}>
                <div style={{ fontSize:'0.55rem', fontFamily:'var(--font-display)', letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--c-text-muted)', marginBottom:2 }}>{item.label}</div>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:'1.1rem', color:'var(--c-gold)' }}>{item.value}</div>
              </div>
            ))}
          </div>
          {cls.hasPrepare && (
            <div style={{ padding:'6px 8px', background:'rgba(200,169,81,0.08)', borderRadius:'var(--radius-sm)', border:'1px solid var(--c-gold-dim)', fontSize:'0.8rem', color:'var(--c-gold)' }}>
              📋 Prepare spells daily: {char.class_name === 'Wizard'
                ? `INT mod (${getMod((char.int||10) + (RACES_MAP[char.race]?.INT||0))}) + level = ${Math.max(1, getMod((char.int||10) + (RACES_MAP[char.race]?.INT||0)) + level)} spells`
                : char.class_name === 'Paladin'
                ? `CHA mod + half level = ${Math.max(1, getMod((char.cha||10) + (RACES_MAP[char.race]?.CHA||0)) + Math.floor(level/2))} spells`
                : `WIS mod (${getMod((char.wis||10) + (RACES_MAP[char.race]?.WIS||0))}) + level = ${Math.max(1, getMod((char.wis||10) + (RACES_MAP[char.race]?.WIS||0)) + level)} spells`
              }
            </div>
          )}
          {isWarlock && (
            <div style={{ padding:'6px 8px', background:'rgba(139,26,42,0.15)', borderRadius:'var(--radius-sm)', border:'1px solid var(--c-red)', fontSize:'0.8rem', color:'#e57373', marginTop:4 }}>
              ⚠ Pact Magic: All slots are the same level, reset on Short Rest
            </div>
          )}
        </div>
      </div>

      {/* Spell slot tracker */}
      {!isWarlock && slots && (
        <div className="card">
          <div className="section-header">🎰 Spell Slots</div>
          <div className="card-body">
            {slots.slice(1).map((total, i) => (
              total > 0 && (
                <SpellSlotRow key={i+1}
                  level={`${i+1}${['st','nd','rd'][i]||'th'}`}
                  total={total}
                  expended={expended[i] || 0}
                  onExpend={() => expendSlot(i+1)}
                  onRecover={() => recoverSlot(i+1)}
                />
              )
            ))}
          </div>
        </div>
      )}

      {/* Warlock pact slots */}
      {isWarlock && (() => {
        const ws = SPELL_SLOTS.Warlock[level];
        if (!ws) return null;
        const pactExp = char.pact_slots_expended || 0;
        return (
          <div className="card">
            <div className="section-header">🎰 Pact Magic Slots</div>
            <div className="card-body">
              <div style={{ marginBottom:4, fontSize:'0.8rem', color:'var(--c-text-dim)' }}>
                Slot Level: <strong style={{color:'var(--c-gold)'}}>{ws.pact.level}</strong>
                {' '}· Resets on Short Rest
              </div>
              <SpellSlotRow
                level={`${ws.pact.level}${['st','nd','rd'][ws.pact.level-1]||'th'}`}
                total={ws.pact.count}
                expended={pactExp}
                onExpend={() => setField('pact_slots_expended', Math.min(ws.pact.count, pactExp+1))}
                onRecover={() => setField('pact_slots_expended', Math.max(0, pactExp-1))}
              />
            </div>
          </div>
        );
      })()}

      {/* Spell list by level */}
      {LEVEL_KEYS.map((key, li) => {
        const spellLevel = li;
        const levelSlots = isWarlock ? null : (slots?.[li] || 0);

        // For non-cantrips, only show levels with slots
        if (li > 0 && !isWarlock && !levelSlots) return null;
        if (li === 0 && !cls.spellAbility) return null;

        const levelSpells = (char.spells || {})[key] || [];

        return (
          <div key={key} className="card">
            <div className="section-header">
              {LEVEL_LABELS[li]}
              {li > 0 && !isWarlock && levelSlots && (
                <span className="badge badge-gold" style={{ marginLeft:4 }}>{levelSlots} slots</span>
              )}
              <button className="btn btn-ghost btn-icon" style={{ marginLeft:'auto', fontSize:'0.8rem' }}
                onClick={() => setPicker({ level: li })}>＋</button>
            </div>
            <div style={{ padding:'0 12px' }}>
              {levelSpells.length === 0
                ? <p style={{ padding:'10px 0', color:'var(--c-text-muted)', fontSize:'0.85rem', fontStyle:'italic' }}>
                    Tap + to add spells
                  </p>
                : levelSpells.map(name => (
                  <SpellEntry key={name} name={name} onRemove={() => removeSpell(key, name)} />
                ))
              }
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Race bonus lookup for spell calculations
import { RACES } from '../data/gameData';
const RACES_MAP = Object.fromEntries(RACES.map(r => [r.name, r.bonuses || {}]));
