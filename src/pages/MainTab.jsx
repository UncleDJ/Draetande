import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { CLASSES, RACES, ALIGNMENTS, BACKGROUNDS, DEITIES, SKILLS,
         getMod, fmtMod, getProfBonus, getClassResources, COINS } from '../data/gameData';
import { WEAPON_PROFICIENCIES, ARMOR_PROFICIENCIES, TOOL_PROFICIENCIES, LANGUAGES } from '../data/weaponsData';
import { MultiSelect } from '../components/SearchSelect';
import { AttackRow } from '../components/AttackRow';

// ── Sub-components ─────────────────────────────────────────────────────────────

function Field({ label, children, style }) {
  return (
    <div style={style}>
      <label>{label}</label>
      {children}
    </div>
  );
}

// Number input that lets you fully clear the field while typing (mobile-friendly).
// Shows empty instead of snapping to 0/min; commits the parsed value to the parent.
function NumberInput({ value, onCommit, min, style, ...rest }) {
  const [local, setLocal] = useState(String(value ?? ''));

  // Keep local in sync when the external value changes (e.g. race bonus, reset)
  useEffect(() => { setLocal(String(value ?? '')); }, [value]);

  return (
    <input
      type="number"
      inputMode="numeric"
      value={local}
      min={min}
      onChange={e => {
        setLocal(e.target.value);
        if (e.target.value !== '') {
          let n = parseInt(e.target.value);
          if (!isNaN(n)) {
            if (min !== undefined && n < min) n = min;
            onCommit(n);
          }
        }
      }}
      onBlur={() => {
        if (local === '' || isNaN(parseInt(local))) {
          const fallback = min !== undefined ? min : 0;
          setLocal(String(fallback));
          onCommit(fallback);
        }
      }}
      style={style}
      {...rest}
    />
  );
}


function StatBlock({ stat, score, raceMod = 0, onScore }) {
  const total = (score || 0) + raceMod;
  const mod = getMod(total);
  return (
    <div className="stat-block">
      <span className="stat-label">{stat}</span>
      <NumberInput
        className="stat-input"
        min={0}
        value={score || 0}
        onCommit={v => onScore(v)}
        style={{ width: '50px' }}
      />
      {raceMod !== 0 && (
        <span style={{ fontSize: '0.6rem', color: 'var(--c-green-light)' }}>+{raceMod} race</span>
      )}
      <span className="stat-mod">{fmtMod(mod)}</span>
    </div>
  );
}

function HPTracker({ char }) {
  const { adjustHP, setField } = useStore();
  const pct = char.max_hp > 0 ? Math.max(0, char.current_hp / char.max_hp) : 0;
  const color = pct > 0.5 ? 'var(--c-green-light)' : pct > 0.25 ? '#ffa726' : 'var(--c-red-bright)';

  return (
    <div className="card" style={{ padding: '12px' }}>
      <div className="section-header" style={{ margin: '-12px -12px 12px' }}>❤ Hit Points</div>

      {/* HP bar */}
      <div style={{
        height: 6, background: 'var(--c-surface-3)', borderRadius: 3,
        marginBottom: 12, overflow: 'hidden',
      }}>
        <div style={{
          height: '100%', width: `${pct * 100}%`,
          background: color, borderRadius: 3, transition: 'width 0.3s, background 0.3s',
        }} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center' }}>
        <button className="hp-adjust-btn minus" onClick={() => adjustHP(-1)}>−</button>
        <div style={{ textAlign: 'center' }}>
          <div className="hp-display">{char.current_hp}</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--c-text-muted)' }}>
            / {char.max_hp} max
          </div>
        </div>
        <button className="hp-adjust-btn plus" onClick={() => adjustHP(1)}>+</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 12 }}>
        <div>
          <label>Max HP</label>
          <NumberInput value={char.max_hp || 0} min={0}
            onCommit={v => { setField('max_hp', v); setField('current_hp', Math.min(char.current_hp, v)); }} />
        </div>
        <div>
          <label>Current</label>
          <NumberInput value={char.current_hp || 0} min={0}
            onCommit={v => setField('current_hp', Math.min(v, char.max_hp))} />
        </div>
        <div>
          <label>Temp HP</label>
          <NumberInput value={char.temp_hp || 0} min={0}
            onCommit={v => setField('temp_hp', v)} />
        </div>
      </div>

      {/* Death saves */}
      <div style={{ marginTop: 12 }}>
        <label>Death Saves</label>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--c-green-light)' }}>✓</span>
            {[0,1,2].map(i => (
              <button key={i} className={`pip ${(char.death_saves_success||0) > i ? 'filled' : ''}`}
                onClick={() => setField('death_saves_success', (char.death_saves_success||0) > i ? i : i+1)} />
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--c-red-bright)' }}>✗</span>
            {[0,1,2].map(i => (
              <button key={i} className={`pip ${(char.death_saves_fail||0) > i ? 'filled' : ''}`}
                style={{ borderColor: 'var(--c-red)' }}
                onClick={() => setField('death_saves_fail', (char.death_saves_fail||0) > i ? i : i+1)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ResourceTracker({ char }) {
  const { useResource, recoverResource, resetResourcesShortRest, resetResourcesLongRest } = useStore();
  const cls = CLASSES[char.class_name];
  if (!cls || !char.level) return null;

  const chaMod = getMod((char.cha||10) + (RACES.find(r=>r.name===char.race)?.bonuses?.CHA||0));
  const wisMod = getMod((char.wis||10) + (RACES.find(r=>r.name===char.race)?.bonuses?.WIS||0));
  const resources = getClassResources(char.class_name, char.level, chaMod, wisMod);

  return (
    <div className="card">
      <div className="section-header">⚡ Class Resources</div>
      <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {resources.map(res => {
          const used = char.resources_used?.[res.name] || 0;
          const remaining = Math.max(0, res.max - used);
          if (res.max === 0 || res.reset === '—') {
            return (
              <div key={res.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem' }}>{res.name}</span>
                {res.note && <span className="badge badge-gold">{res.note}</span>}
              </div>
            );
          }
          return (
            <div key={res.name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontSize: '0.85rem' }}>{res.name}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--c-text-dim)' }}>{remaining}/{res.max}</span>
                  <span style={{ fontSize: '0.6rem', color: 'var(--c-text-muted)' }}>{res.reset}</span>
                </div>
              </div>
              <div className="resource-pips">
                {Array.from({ length: res.max }, (_, i) => (
                  <button key={i} className={`pip ${i < remaining ? 'filled' : ''}`}
                    onClick={() => i < remaining ? useResource(res.name) : recoverResource(res.name)}
                    aria-label={i < remaining ? 'Use' : 'Recover'} />
                ))}
              </div>
            </div>
          );
        })}
        {resources.length === 0 && (
          <p style={{ color: 'var(--c-text-muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>
            No special class resources at this level.
          </p>
        )}
        {/* Rest buttons */}
        <div style={{ display: 'flex', gap: 8, marginTop: 4, paddingTop: 8, borderTop: '1px solid var(--c-border)' }}>
          <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}
            onClick={() => resetResourcesShortRest(resources)}>
            🌙 Short Rest
          </button>
          <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}
            onClick={() => resetResourcesLongRest(resources, char.max_hp)}>
            🌅 Long Rest
          </button>
        </div>
      </div>
    </div>
  );
}

function SavingThrowsPanel({ char, scores, profBonus, toggleSave }) {
  const statKeys = ['STR','DEX','CON','INT','WIS','CHA'];
  return (
    <div className="card">
      <div className="section-header">🎯 Saving Throws
        <span style={{ marginLeft:'auto', fontSize:'0.6rem', color:'var(--c-text-dim)', fontFamily:'var(--font-body)', textTransform:'none', letterSpacing:0 }}>
          tap to toggle proficiency
        </span>
      </div>
      <div className="card-body">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:6 }}>
          {statKeys.map(stat => {
            const mod = getMod(scores[stat] || 10);
            const isProf = (char.save_profs||[]).includes(stat);
            const saveMod = mod + (isProf ? profBonus : 0);
            return (
              <button key={stat} onClick={() => toggleSave(stat)}
                style={{
                  display:'flex', alignItems:'center', justifyContent:'space-between',
                  padding:'8px 10px', borderRadius:'var(--radius-sm)',
                  background: isProf ? 'rgba(200,169,81,0.1)' : 'var(--c-surface-2)',
                  border: `1px solid ${isProf ? 'var(--c-gold)' : 'var(--c-border)'}`,
                  cursor:'pointer', transition:'all 0.15s',
                }}>
                <span style={{ display:'flex', alignItems:'center', gap:6 }}>
                  <span style={{
                    width:10, height:10, borderRadius:'50%', flexShrink:0,
                    background: isProf ? 'var(--c-gold)' : 'transparent',
                    border:`1.5px solid ${isProf ? 'var(--c-gold)' : 'var(--c-border-gold)'}`,
                  }} />
                  <span style={{ fontSize:'0.8rem', color:'var(--c-text)', fontFamily:'var(--font-display)', letterSpacing:'0.05em' }}>{stat}</span>
                </span>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:'1rem', color: isProf ? 'var(--c-gold)' : 'var(--c-text-dim)' }}>
                  {fmtMod(saveMod)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ProficienciesSection({ char }) {
  const { setField } = useStore();
  return (
    <div className="card">
      <div className="section-header">📚 Proficiencies & Languages</div>
      <div className="card-body" style={{ display:'flex', flexDirection:'column', gap:10 }}>
        <Field label="Weapon Proficiencies">
          <MultiSelect
            values={char.weapon_profs || []}
            onChange={v => setField('weapon_profs', v)}
            options={WEAPON_PROFICIENCIES}
            placeholder="Add weapon proficiency..."
          />
        </Field>
        <Field label="Armor Proficiencies">
          <MultiSelect
            values={char.armor_profs || []}
            onChange={v => setField('armor_profs', v)}
            options={ARMOR_PROFICIENCIES}
            placeholder="Add armor proficiency..."
          />
        </Field>
        <Field label="Tool Proficiencies">
          <MultiSelect
            values={char.tool_profs || []}
            onChange={v => setField('tool_profs', v)}
            options={TOOL_PROFICIENCIES}
            placeholder="Add tool proficiency..."
            allowCustom
          />
        </Field>
        <Field label="Languages">
          <MultiSelect
            values={char.languages || []}
            onChange={v => setField('languages', v)}
            options={LANGUAGES}
            placeholder="Add language..."
            allowCustom
          />
        </Field>
      </div>
    </div>
  );
}

function AttacksSection({ char, scores, profBonus }) {
  const { setField } = useStore();
  const attacks = char.attacks?.length ? char.attacks : [
    { weapon:'', ability:null, customWeapon:null, notes:'' },
    { weapon:'', ability:null, customWeapon:null, notes:'' },
    { weapon:'', ability:null, customWeapon:null, notes:'' },
  ];

  const strMod = getMod(scores.STR || 10);
  const dexMod = getMod(scores.DEX || 10);

  const update = (i, updated) => {
    const next = attacks.map((a,idx) => idx===i ? updated : a);
    setField('attacks', next);
  };

  const addRow = () => setField('attacks', [...attacks, { weapon:'', ability:null, customWeapon:null, notes:'' }]);
  const removeRow = (i) => setField('attacks', attacks.filter((_,idx)=>idx!==i));

  return (
    <div className="card">
      <div className="section-header">
        ⚔ Attacks & Weapons
        <button className="btn btn-ghost btn-icon" style={{ marginLeft:'auto', fontSize:'0.8rem' }} onClick={addRow}>＋</button>
      </div>
      <div style={{ padding: 8, display:'flex', flexDirection:'column', gap:8 }}>
        {attacks.map((atk, i) => (
          <div key={i} style={{ position:'relative' }}>
            <AttackRow attack={atk} onChange={u=>update(i,u)}
              strMod={strMod} dexMod={dexMod} profBonus={profBonus}
              weaponProfs={char.weapon_profs || []} />
            {attacks.length > 1 && (
              <button onClick={()=>removeRow(i)}
                className="btn btn-ghost btn-icon"
                style={{ position:'absolute', top:4, right:4, fontSize:'0.6rem', color:'var(--c-red-bright)', zIndex:2 }}
              >✕</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Tab ───────────────────────────────────────────────────────────────────
export default function MainTab() {
  const { character: char, setField } = useStore();
  if (!char) return null;

  const profBonus = getProfBonus(char.level || 1);
  const raceData  = RACES.find(r => r.name === char.race) || { bonuses: {}, speed: 30 };
  const cls       = CLASSES[char.class_name] || {};

  const statKeys  = ['STR','DEX','CON','INT','WIS','CHA'];
  const statFields = { STR:'str',DEX:'dex',CON:'con',INT:'int',WIS:'wis',CHA:'cha' };

  const scores = {};
  statKeys.forEach(s => {
    scores[s] = (char[statFields[s]] || 0) + (raceData.bonuses[s] || 0);
  });

  const spellAbility = cls.spellAbility;
  const spellMod = spellAbility ? getMod(scores[spellAbility?.slice(0,3).toUpperCase()] || 10) : 0;
  const spellDC  = spellAbility ? 8 + profBonus + spellMod : null;
  const spellAtk = spellAbility ? profBonus + spellMod : null;

  const toggleSave = (stat) => {
    const profs = char.save_profs || [];
    setField('save_profs', profs.includes(stat) ? profs.filter(s=>s!==stat) : [...profs, stat]);
  };

  const toggleSkill = (skill) => {
    const profs = { ...(char.skill_profs || {}) };
    const cur = profs[skill];
    if (!cur)             profs[skill] = 'proficient';
    else if (cur==='proficient') profs[skill] = 'expertise';
    else                  delete profs[skill];
    setField('skill_profs', profs);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '12px 12px 0' }}>

      {/* ── Identity ── */}
      <div className="card">
        <div className="section-header">📜 Character Identity</div>
        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div className="grid-2">
            <Field label="Character Name">
              <input value={char.character_name||''} onChange={e=>setField('character_name',e.target.value)} placeholder="Name" />
            </Field>
            <Field label="Player">
              <input value={char.player_name||''} onChange={e=>setField('player_name',e.target.value)} placeholder="Your name" />
            </Field>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 60px', gap: 8 }}>
            <Field label="Class">
              <select value={char.class_name||''} onChange={e=>setField('class_name',e.target.value)}>
                <option value="">— Choose —</option>
                {Object.keys(CLASSES).sort().map(c=><option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Race">
              <select value={char.race||''} onChange={e=>setField('race',e.target.value)}>
                <option value="">— Choose —</option>
                {RACES.map(r=><option key={r.name}>{r.name}</option>)}
              </select>
            </Field>
            <Field label="Level">
              <select value={char.level||1} onChange={e=>setField('level',parseInt(e.target.value))}>
                {Array.from({length:20},(_, i)=>i+1).map(lvl=>(
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </Field>
          </div>
          <div className="grid-2">
            <Field label="Background">
              <select value={char.background||''} onChange={e=>setField('background',e.target.value)}>
                <option value="">— Choose —</option>
                {BACKGROUNDS.map(b=><option key={b}>{b}</option>)}
              </select>
            </Field>
            <Field label="Alignment">
              <select value={char.alignment||''} onChange={e=>setField('alignment',e.target.value)}>
                <option value="">— Choose —</option>
                {ALIGNMENTS.map(a=><option key={a}>{a}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Deity / Patron">
            <select value={char.deity||''} onChange={e=>setField('deity',e.target.value)}>
              <option value="">— Choose —</option>
              {DEITIES.map(d=><option key={d}>{d}</option>)}
            </select>
          </Field>
          <div className="grid-2">
            <Field label="Experience">
              <NumberInput min={0} value={char.experience||0} onCommit={v=>setField('experience',v)} />
            </Field>
            <Field label="Age / Height / Weight">
              <input value={char.age||''} onChange={e=>setField('age',e.target.value)} placeholder="Age, height, weight" />
            </Field>
          </div>
        </div>
      </div>

      {/* ── Combat quick stats ── */}
      <div className="card">
        <div className="section-header">🛡 Combat</div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {[
              { label: 'Armor Class', field: 'ac', editable: true },
              { label: 'Initiative',  value: fmtMod(getMod(scores.DEX)) },
              { label: 'Speed',       value: `${raceData.speed}ft` },
              { label: 'Prof Bonus',  value: fmtMod(profBonus) },
            ].map(item => (
              <div key={item.label} style={{ textAlign: 'center', background: 'var(--c-surface-2)', borderRadius: 'var(--radius-sm)', padding: '8px 4px', border: '1px solid var(--c-border)' }}>
                <div style={{ fontSize: '0.55rem', fontFamily: 'var(--font-display)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--c-text-muted)', marginBottom: 2 }}>{item.label}</div>
                {item.editable
                  ? <NumberInput min={0} value={char[item.field]||0} onCommit={v=>setField(item.field, v)}
                      style={{ textAlign:'center', background:'transparent', border:'none', fontFamily:'var(--font-mono)', fontSize:'1.3rem', color:'var(--c-text)', padding:0, width:'100%' }} />
                  : <div style={{ fontFamily:'var(--font-mono)', fontSize:'1.3rem', color:'var(--c-text)' }}>{item.value}</div>
                }
              </div>
            ))}
          </div>

          {/* Hit dice + spell stats */}
          <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: spellAbility ? '1fr 1fr 1fr' : '1fr', gap: 8 }}>
            <div style={{ textAlign:'center', background:'var(--c-surface-2)', borderRadius:'var(--radius-sm)', padding:'6px 4px', border:'1px solid var(--c-border)' }}>
              <div style={{ fontSize:'0.55rem', fontFamily:'var(--font-display)', letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--c-text-muted)' }}>Hit Dice</div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'1.1rem', color:'var(--c-gold)' }}>
                {char.level||1}d{cls.hd||8}
              </div>
            </div>
            {spellAbility && <>
              <div style={{ textAlign:'center', background:'var(--c-surface-2)', borderRadius:'var(--radius-sm)', padding:'6px 4px', border:'1px solid var(--c-border)' }}>
                <div style={{ fontSize:'0.55rem', fontFamily:'var(--font-display)', letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--c-text-muted)' }}>Spell DC</div>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:'1.1rem', color:'var(--c-gold)' }}>{spellDC}</div>
              </div>
              <div style={{ textAlign:'center', background:'var(--c-surface-2)', borderRadius:'var(--radius-sm)', padding:'6px 4px', border:'1px solid var(--c-border)' }}>
                <div style={{ fontSize:'0.55rem', fontFamily:'var(--font-display)', letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--c-text-muted)' }}>Spell ATK</div>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:'1.1rem', color:'var(--c-gold)' }}>{fmtMod(spellAtk)}</div>
              </div>
            </>}
          </div>
        </div>
      </div>

      {/* ── HP ── */}
      <HPTracker char={char} />

      {/* ── Ability scores ── */}
      <div className="card">
        <div className="section-header">💪 Ability Scores</div>
        <div className="card-body">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:8 }}>
            {statKeys.map(stat => (
              <StatBlock key={stat} stat={stat}
                score={char[statFields[stat]] || 0}
                raceMod={raceData.bonuses[stat] || 0}
                onScore={v => setField(statFields[stat], v)}
              />
            ))}
          </div>
          <div style={{ marginTop:8, padding:'6px 8px', background:'var(--c-surface-2)', borderRadius:'var(--radius-sm)', fontSize:'0.75rem', color:'var(--c-text-dim)' }}>
            Passive Perception: <strong style={{ color:'var(--c-text)' }}>
              {10 + getMod(scores.WIS) + ((char.skill_profs||{})['Perception']==='expertise' ? profBonus*2 : (char.skill_profs||{})['Perception'] ? profBonus : 0)}
            </strong>
          </div>
        </div>
      </div>

      {/* ── Saving Throws ── */}
      <SavingThrowsPanel char={char} scores={scores} profBonus={profBonus} toggleSave={toggleSave} />

      {/* ── Skills ── */}
      <div className="card">
        <div className="section-header">🎲 Skills
          <span style={{ marginLeft:'auto', fontSize:'0.6rem', color:'var(--c-text-dim)', fontFamily:'var(--font-body)', textTransform:'none', letterSpacing:0 }}>
            tap: none → prof → expertise
          </span>
        </div>
        <div style={{ padding:'8px 0' }}>
          {SKILLS.map(skill => {
            const prof = (char.skill_profs||{})[skill.name];
            const abilScore = scores[skill.ability] || 10;
            const mod = getMod(abilScore) + (prof === 'expertise' ? profBonus * 2 : prof ? profBonus : 0);
            return (
              <button key={skill.name} onClick={() => toggleSkill(skill.name)}
                style={{
                  display:'flex', alignItems:'center', width:'100%',
                  padding:'5px 12px', background: prof ? 'rgba(200,169,81,0.05)' : 'none',
                  border:'none', borderBottom:'1px solid var(--c-border)', cursor:'pointer',
                  gap:8, transition:'background 0.15s',
                }}>
                <span style={{
                  width:8, height:8, borderRadius:'50%', flexShrink:0,
                  background: prof === 'expertise' ? 'var(--c-gold)' : prof ? 'var(--c-gold-dim)' : 'transparent',
                  border: `1.5px solid ${prof ? 'var(--c-gold)' : 'var(--c-border)'}`,
                }} />
                <span style={{ flex:1, textAlign:'left', fontSize:'0.85rem', color:'var(--c-text)' }}>
                  {skill.name}
                </span>
                <span style={{ fontSize:'0.65rem', color:'var(--c-text-muted)', fontFamily:'var(--font-display)' }}>
                  {skill.ability}
                </span>
                <span style={{ width:28, textAlign:'right', fontFamily:'var(--font-mono)', fontSize:'0.9rem', color: mod>=0?'var(--c-gold)':'var(--c-red-bright)' }}>
                  {fmtMod(mod)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Resources ── */}
      <ResourceTracker char={char} />

      {/* ── Attacks ── */}
      <AttacksSection char={char} scores={scores} profBonus={profBonus} />

      {/* ── Proficiencies & Languages ── */}
      <ProficienciesSection char={char} />

      {/* ── Currency ── */}
      <div className="card">
        <div className="section-header">💰 Currency</div>
        <div className="card-body">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:6 }}>
            {COINS.map(coin => (
              <div key={coin} style={{ textAlign:'center' }}>
                <label>{coin}</label>
                <NumberInput min={0} value={char[coin.toLowerCase()]||0}
                  onCommit={v=>setField(coin.toLowerCase(), v)}
                  style={{ textAlign:'center', fontFamily:'var(--font-mono)' }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Personality ── */}
      <div className="card">
        <div className="section-header">📖 Character Notes</div>
        <div className="card-body" style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {[
            ['personality_traits','Personality Traits'],
            ['ideals','Ideals'],
            ['bonds','Bonds'],
            ['flaws','Flaws'],
            ['features_traits','Features & Traits'],
            ['equipment','Equipment'],
          ].map(([field, label]) => (
            <Field key={field} label={label}>
              <textarea value={char[field]||''} onChange={e=>setField(field,e.target.value)}
                placeholder={label} rows={field==='features_traits'||field==='equipment' ? 4 : 2} />
            </Field>
          ))}
        </div>
      </div>

    </div>
  );
}
