import { useState, useMemo, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { CLASS_NAMES, SPELL_SCHOOLS, CASTING_TIMES, SPELL_DURATIONS,
         defaultCustomSpell } from '../data/gameData';
import { DAMAGE_TYPES } from '../data/weaponsData';
import spellsData from '../data/spells.json';

const LEVEL_LABELS = ['Cantrip','1st','2nd','3rd','4th','5th','6th','7th','8th','9th'];

// ── Custom spell builder modal ──────────────────────────────────────────────
function CustomSpellModal({ initial, onSave, onClose, onDelete }) {
  const [s, setS] = useState(initial || defaultCustomSpell());

  const toggleClass = (cls) => {
    setS(prev => ({
      ...prev,
      classes: prev.classes.includes(cls) ? prev.classes.filter(c=>c!==cls) : [...prev.classes, cls],
    }));
  };

  return (
    <div style={{
      position:'fixed', inset:0, background:'rgba(0,0,0,0.8)', zIndex:300,
      display:'flex', alignItems:'flex-end', justifyContent:'center',
    }} onClick={onClose}>
      <div style={{
        background:'var(--c-surface)', borderRadius:'16px 16px 0 0',
        width:'100%', maxWidth:480, maxHeight:'88vh', overflow:'auto',
        padding:16, display:'flex', flexDirection:'column', gap:12,
      }} onClick={e=>e.stopPropagation()}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <h3>✨ {initial?.id ? 'Edit' : 'New'} Custom Spell</h3>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
        </div>

        <div>
          <label>Spell Name</label>
          <input value={s.name} onChange={e=>setS({...s,name:e.target.value})} placeholder="e.g. Ember's Whisper" />
        </div>

        <div className="grid-2">
          <div>
            <label>Level</label>
            <select value={s.level} onChange={e=>setS({...s,level:parseInt(e.target.value)})}>
              {LEVEL_LABELS.map((l,i) => <option key={i} value={i}>{i===0?'Cantrip':`${l} Level`}</option>)}
            </select>
          </div>
          <div>
            <label>School</label>
            <select value={s.school} onChange={e=>setS({...s,school:e.target.value})}>
              {SPELL_SCHOOLS.map(sc=><option key={sc}>{sc}</option>)}
            </select>
          </div>
        </div>

        <div className="grid-2">
          <div>
            <label>Casting Time</label>
            <select value={s.time} onChange={e=>setS({...s,time:e.target.value})}>
              {CASTING_TIMES.map(t=><option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label>Range</label>
            <input value={s.range} onChange={e=>setS({...s,range:e.target.value})} placeholder="60 feet / Self / Touch" />
          </div>
        </div>

        <div className="grid-2">
          <div>
            <label>Components</label>
            <input value={s.components} onChange={e=>setS({...s,components:e.target.value})} placeholder="V, S, M (...)" />
          </div>
          <div>
            <label>Duration</label>
            <select value={s.duration} onChange={e=>setS({...s,duration:e.target.value})}>
              {SPELL_DURATIONS.map(d=><option key={d}>{d}</option>)}
            </select>
          </div>
        </div>

        <label style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer', textTransform:'none', fontFamily:'var(--font-body)', fontSize:'0.9rem', color:'var(--c-text)' }}>
          <input type="checkbox" style={{ width:'auto' }} checked={s.ritual}
            onChange={e=>setS({...s, ritual: e.target.checked})} />
          Ritual (can be cast without expending a slot, +10 min)
        </label>

        <div className="divider">Combat (optional)</div>

        <div className="grid-2">
          <div>
            <label>Damage Dice</label>
            <input value={s.damage} onChange={e=>setS({...s,damage:e.target.value})} placeholder="e.g. 3d6" />
          </div>
          <div>
            <label>Damage Type</label>
            <select value={s.damageType} onChange={e=>setS({...s,damageType:e.target.value})}>
              <option value="">—</option>
              {DAMAGE_TYPES.map(t=><option key={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label>Saving Throw (if any)</label>
          <select value={s.savingThrow} onChange={e=>setS({...s,savingThrow:e.target.value})}>
            <option value="">— None —</option>
            {['STR','DEX','CON','INT','WIS','CHA'].map(a=><option key={a}>{a}</option>)}
          </select>
        </div>

        <div className="divider">Classes</div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
          {CLASS_NAMES.map(cls => (
            <button key={cls} type="button" onClick={()=>toggleClass(cls)}
              className={`badge ${s.classes.includes(cls) ? 'badge-gold' : 'badge-dim'}`}
              style={{ cursor:'pointer', border:'none' }}
            >{cls}</button>
          ))}
        </div>

        <div>
          <label>Description</label>
          <textarea value={s.description} onChange={e=>setS({...s,description:e.target.value})}
            placeholder="What does this spell do?" rows={5} />
        </div>

        <div style={{ display:'flex', gap:8, marginTop:8 }}>
          {initial?.id && (
            <button className="btn btn-danger" onClick={() => onDelete(s.id)}>
              🗑 Delete
            </button>
          )}
          <button className="btn btn-primary" style={{ flex:1 }}
            disabled={!s.name.trim()}
            onClick={() => onSave(s)}>
            ✓ Save Spell
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Spell detail modal ────────────────────────────────────────────────────────
function SpellDetailModal({ spell, isCustom, onClose, onEdit, onClone, onDelete, currentUserId, isSuperAdmin }) {
  const isOwner = isCustom && spell.user_id === currentUserId;
  const canDelete = isOwner || isSuperAdmin;
  return (
    <div style={{
      position:'fixed', inset:0, background:'rgba(0,0,0,0.8)', zIndex:250,
      display:'flex', alignItems:'flex-end', justifyContent:'center',
    }} onClick={onClose}>
      <div style={{
        background:'var(--c-surface)', borderRadius:'16px 16px 0 0',
        width:'100%', maxWidth:480, maxHeight:'80vh', overflow:'auto',
        padding:18, display:'flex', flexDirection:'column', gap:10,
      }} onClick={e=>e.stopPropagation()}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
          <div>
            <h2 style={{ marginBottom:2 }}>{spell.name}</h2>
            <div style={{ fontSize:'0.8rem', color:'var(--c-text-dim)', fontStyle:'italic' }}>
              {LEVEL_LABELS[spell.level]}{spell.level===0?'':' level'} {spell.school}
              {spell.ritual ? ' (ritual)' : ''}
            </div>
            {isCustom && (
              <div style={{ marginTop:4 }}>
                <span className="badge badge-gold" style={{ fontSize:'0.55rem' }}>
                  custom{spell.creator_name ? ` · by ${spell.creator_name}` : ''}
                </span>
              </div>
            )}
          </div>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
        </div>

        <div className="grid-2" style={{ marginTop:4 }}>
          {[
            ['Casting Time', spell.time],
            ['Range', spell.range],
            ['Components', spell.components],
            ['Duration', spell.duration],
          ].map(([label,val]) => (
            <div key={label} style={{ background:'var(--c-surface-2)', padding:'6px 10px', borderRadius:'var(--radius-sm)', border:'1px solid var(--c-border)' }}>
              <div style={{ fontSize:'0.55rem', fontFamily:'var(--font-display)', letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--c-text-muted)' }}>{label}</div>
              <div style={{ fontSize:'0.85rem', color:'var(--c-text)' }}>{val || '—'}</div>
            </div>
          ))}
        </div>

        {(spell.damage || spell.savingThrow) && (
          <div style={{ display:'flex', gap:8 }}>
            {spell.damage && (
              <div style={{ flex:1, background:'rgba(200,169,81,0.08)', padding:'6px 10px', borderRadius:'var(--radius-sm)', border:'1px solid var(--c-gold-dim)' }}>
                <div style={{ fontSize:'0.55rem', fontFamily:'var(--font-display)', letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--c-gold-dim)' }}>Damage</div>
                <div style={{ fontFamily:'var(--font-mono)', color:'var(--c-gold)' }}>{spell.damage} {spell.damageType}</div>
              </div>
            )}
            {spell.savingThrow && (
              <div style={{ flex:1, background:'rgba(139,26,42,0.1)', padding:'6px 10px', borderRadius:'var(--radius-sm)', border:'1px solid var(--c-red)' }}>
                <div style={{ fontSize:'0.55rem', fontFamily:'var(--font-display)', letterSpacing:'0.08em', textTransform:'uppercase', color:'#e57373' }}>Save</div>
                <div style={{ fontFamily:'var(--font-mono)', color:'#e57373' }}>{spell.savingThrow}</div>
              </div>
            )}
          </div>
        )}

        {spell.classes?.length > 0 && (
          <div>
            <label style={{ marginBottom:4 }}>Classes</label>
            <div style={{ display:'flex', flexWrap:'wrap', gap:4 }}>
              {spell.classes.map(c => <span key={c} className="badge badge-dim">{c}</span>)}
            </div>
          </div>
        )}

        {isCustom && spell.description && (
          <div>
            <label style={{ marginBottom:4 }}>Description</label>
            <p style={{ fontSize:'0.9rem', color:'var(--c-text)', lineHeight:1.6, whiteSpace:'pre-wrap' }}>{spell.description}</p>
          </div>
        )}

        {!isCustom && (
          <p style={{ fontSize:'0.8rem', color:'var(--c-text-muted)', fontStyle:'italic', marginTop:4 }}>
            For the full spell description, check your Player's Handbook or D&D Beyond.
          </p>
        )}

        {isCustom && (
          <div style={{ display:'flex', flexDirection:'column', gap:8, marginTop:4 }}>
            {isOwner && (
              <button className="btn btn-secondary" onClick={() => onEdit(spell)}>
                ✎ Edit Custom Spell
              </button>
            )}
            <button className="btn btn-ghost" onClick={() => onClone(spell)}
              style={{ border:'1px solid var(--c-border-gold)' }}>
              ⧉ Clone &amp; Edit (make my own copy)
            </button>
            {canDelete && (
              <button className="btn btn-danger" onClick={() => onDelete(spell.id)}>
                🗑 Delete{!isOwner ? ' (admin)' : ''}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Spell Library tab ──────────────────────────────────────────────────────
export default function SpellLibraryTab() {
  const { user, customSpells, loadCustomSpells, saveCustomSpell, removeCustomSpell } = useStore();
  const SUPER_ADMIN_ID = '2eb0738a-15c4-44f2-a879-4f0262ad9161';
  const [query, setQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [classFilter, setClassFilter] = useState('all');
  const [schoolFilter, setSchoolFilter] = useState('all');
  const [showCustomOnly, setShowCustomOnly] = useState(false);
  const [detailSpell, setDetailSpell] = useState(null);
  const [editSpell, setEditSpell] = useState(null);

  useEffect(() => {
    loadCustomSpells();
  }, [user?.id]);

  const allSpells = useMemo(() => {
    const custom = customSpells.map(s => ({ ...s, isCustom: true }));
    return [...spellsData, ...custom];
  }, [customSpells]);

  const filtered = useMemo(() => {
    return allSpells.filter(s => {
      if (showCustomOnly && !s.isCustom) return false;
      if (query.trim() && !s.name.toLowerCase().includes(query.toLowerCase())) return false;
      if (levelFilter !== 'all' && s.level !== parseInt(levelFilter)) return false;
      if (classFilter !== 'all' && !(s.classes||[]).includes(classFilter)) return false;
      if (schoolFilter !== 'all' && s.school !== schoolFilter) return false;
      return true;
    }).sort((a,b) => a.level - b.level || a.name.localeCompare(b.name));
  }, [allSpells, query, levelFilter, classFilter, schoolFilter, showCustomOnly]);

  const SCHOOL_COLORS = {
    Abjuration: 'var(--c-blue)', Conjuration: 'var(--c-green-light)',
    Divination: 'var(--c-gold)', Enchantment: '#e57373',
    Evocation: '#ff8a65', Illusion: '#ba68c8',
    Necromancy: '#90a4ae', Transmutation: 'var(--c-teal)',
  };

  return (
    <div style={{ padding:'12px 12px 0', display:'flex', flexDirection:'column', gap:10 }}>

      {detailSpell && (
        <SpellDetailModal spell={detailSpell} isCustom={detailSpell.isCustom}
          currentUserId={user?.id} isSuperAdmin={user?.id === SUPER_ADMIN_ID}
          onClose={() => setDetailSpell(null)}
          onEdit={(s) => { setDetailSpell(null); setEditSpell(s); }}
          onClone={(s) => {
            setDetailSpell(null);
            // Strip ownership/id so it saves as a fresh copy owned by current user
            const { id, user_id, creator_name, isCustom, ...rest } = s;
            setEditSpell({ ...rest, name: `${s.name} (copy)` });
          }}
          onDelete={async (id) => { await removeCustomSpell(id); setDetailSpell(null); }}
        />
      )}
      {editSpell && (
        <CustomSpellModal initial={editSpell}
          onClose={() => setEditSpell(null)}
          onSave={async (s) => { await saveCustomSpell(s); setEditSpell(null); }}
          onDelete={async (id) => { await removeCustomSpell(id); setEditSpell(null); }}
        />
      )}

      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <h2>✨ Spell Library</h2>
        <button className="btn btn-primary btn-sm" onClick={() => setEditSpell(defaultCustomSpell())}>
          ＋ Custom Spell
        </button>
      </div>

      {/* Search */}
      <input placeholder="Search spells by name..." value={query} onChange={e=>setQuery(e.target.value)} />

      {/* Filters */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:6 }}>
        <select value={levelFilter} onChange={e=>setLevelFilter(e.target.value)}>
          <option value="all">All Levels</option>
          {LEVEL_LABELS.map((l,i) => <option key={i} value={i}>{i===0?'Cantrip':`${l} Lvl`}</option>)}
        </select>
        <select value={classFilter} onChange={e=>setClassFilter(e.target.value)}>
          <option value="all">All Classes</option>
          {CLASS_NAMES.map(c=><option key={c}>{c}</option>)}
        </select>
        <select value={schoolFilter} onChange={e=>setSchoolFilter(e.target.value)}>
          <option value="all">All Schools</option>
          {SPELL_SCHOOLS.map(s=><option key={s}>{s}</option>)}
        </select>
      </div>

      <label style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer', textTransform:'none', fontFamily:'var(--font-body)', fontSize:'0.85rem', color:'var(--c-text-dim)' }}>
        <input type="checkbox" style={{ width:'auto' }} checked={showCustomOnly}
          onChange={e=>setShowCustomOnly(e.target.checked)} />
        Show only my custom spells
      </label>

      <div style={{ fontSize:'0.75rem', color:'var(--c-text-muted)' }}>
        {filtered.length} spell{filtered.length!==1?'s':''}
      </div>

      {/* Results */}
      <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
        {filtered.map(spell => (
          <button key={spell.isCustom ? `c-${spell.id}` : spell.name}
            onClick={() => setDetailSpell(spell)}
            style={{
              display:'flex', alignItems:'center', gap:8, padding:'8px 10px',
              background: spell.isCustom ? 'rgba(200,169,81,0.06)' : 'var(--c-surface-2)',
              border: `1px solid ${spell.isCustom ? 'var(--c-border-gold)' : 'var(--c-border)'}`,
              borderRadius:'var(--radius-sm)', cursor:'pointer', textAlign:'left',
            }}>
            <span style={{
              width:28, textAlign:'center', fontFamily:'var(--font-mono)', fontSize:'0.75rem',
              color:'var(--c-text-muted)', flexShrink:0,
            }}>{spell.level===0?'C':spell.level}</span>
            <span style={{
              width:8, height:8, borderRadius:'50%', flexShrink:0,
              background: SCHOOL_COLORS[spell.school] || 'var(--c-text-muted)',
            }} />
            <span style={{ flex:1, fontSize:'0.9rem', color:'var(--c-text)' }}>
              {spell.name}
              {spell.isCustom && (
                <span className="badge badge-gold" style={{ marginLeft:6, fontSize:'0.5rem' }}>
                  custom{spell.creator_name ? ` · ${spell.creator_name}` : ''}
                </span>
              )}
            </span>
            {spell.ritual && <span style={{ fontSize:'0.65rem', color:'var(--c-text-muted)' }}>ritual</span>}
            <span style={{ fontSize:'0.7rem', color:'var(--c-text-muted)' }}>{spell.school}</span>
          </button>
        ))}
        {filtered.length === 0 && (
          <p style={{ textAlign:'center', padding:24, color:'var(--c-text-muted)', fontStyle:'italic' }}>
            No spells match your filters.
          </p>
        )}
      </div>
    </div>
  );
}
