import { useState, useMemo, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { WEAPONS, defaultCustomWeapon, DAMAGE_TYPES } from '../data/weaponsData';

const SUPER_ADMIN_ID = '2eb0738a-15c4-44f2-a879-4f0262ad9161';

// ── Custom weapon builder modal ──────────────────────────────────────────────
function CustomWeaponModal({ initial, onSave, onClose }) {
  const [w, setW] = useState(initial || defaultCustomWeapon());

  const toggleProp = (prop) => {
    setW(prev => ({
      ...prev,
      properties: (prev.properties||[]).includes(prop)
        ? prev.properties.filter(p => p !== prop)
        : [...(prev.properties||[]), prop],
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
          <h3>🛠 {initial?.id ? 'Edit' : 'New'} Custom Weapon</h3>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
        </div>

        <div>
          <label>Name</label>
          <input value={w.name} onChange={e=>setW({...w,name:e.target.value})} placeholder="e.g. Glowing Whip of Embers" />
        </div>

        <div className="grid-2">
          <div>
            <label>Damage Dice</label>
            <input value={w.damage} onChange={e=>setW({...w,damage:e.target.value})} placeholder="1d8" />
          </div>
          <div>
            <label>Damage Type</label>
            <select value={w.damage_type ?? w.damageType ?? 'slashing'} onChange={e=>setW({...w,damage_type:e.target.value})}>
              {DAMAGE_TYPES.map(t=><option key={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div className="grid-2">
          <div>
            <label>Weapon Category</label>
            <select value={w.category} onChange={e=>setW({...w,category:e.target.value})}>
              <option value="simple">Simple</option>
              <option value="martial">Martial</option>
            </select>
          </div>
          <div>
            <label>Kind</label>
            <select value={w.kind} onChange={e=>setW({...w,kind:e.target.value})}>
              <option value="melee">Melee</option>
              <option value="ranged">Ranged</option>
            </select>
          </div>
        </div>

        <div>
          <label>Properties</label>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
            {['finesse','light','heavy','reach','thrown','two-handed','versatile','ammunition'].map(prop => (
              <button key={prop} type="button" onClick={()=>toggleProp(prop)}
                className={`badge ${(w.properties||[]).includes(prop) ? 'badge-gold' : 'badge-dim'}`}
                style={{ cursor:'pointer', border:'none' }}
              >{prop}</button>
            ))}
          </div>
        </div>

        {(w.properties||[]).includes('versatile') && (
          <div>
            <label>Versatile Damage (two-handed)</label>
            <input value={w.versatile_damage ?? w.versatileDamage ?? ''} onChange={e=>setW({...w,versatile_damage:e.target.value})} placeholder="1d10" />
          </div>
        )}

        <div className="divider">Bonuses</div>

        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          <label style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer', textTransform:'none', fontFamily:'var(--font-body)', fontSize:'0.9rem', color:'var(--c-text)' }}>
            <input type="checkbox" style={{ width:'auto' }} checked={w.use_str_mod ?? w.useStrMod ?? false}
              onChange={e=>setW({...w, use_str_mod: e.target.checked, use_dex_mod: e.target.checked ? false : (w.use_dex_mod ?? w.useDexMod)})} />
            Add STR modifier to attack &amp; damage
          </label>
          <label style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer', textTransform:'none', fontFamily:'var(--font-body)', fontSize:'0.9rem', color:'var(--c-text)' }}>
            <input type="checkbox" style={{ width:'auto' }} checked={w.use_dex_mod ?? w.useDexMod ?? false}
              onChange={e=>setW({...w, use_dex_mod: e.target.checked, use_str_mod: e.target.checked ? false : (w.use_str_mod ?? w.useStrMod)})} />
            Add DEX modifier to attack &amp; damage
          </label>
          <label style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer', textTransform:'none', fontFamily:'var(--font-body)', fontSize:'0.9rem', color:'var(--c-text)' }}>
            <input type="checkbox" style={{ width:'auto' }} checked={w.add_prof_bonus ?? w.addProfBonus ?? true}
              onChange={e=>setW({...w, add_prof_bonus: e.target.checked})} />
            Add proficiency bonus to attack
          </label>
        </div>

        <div className="grid-2">
          <div>
            <label>Extra Attack Bonus (flat)</label>
            <input type="number" value={w.atk_mod ?? w.atkMod ?? 0} onChange={e=>setW({...w,atk_mod:parseInt(e.target.value)||0})} />
          </div>
          <div>
            <label>Extra Damage Bonus (flat)</label>
            <input type="number" value={w.dmg_mod ?? w.dmgMod ?? 0} onChange={e=>setW({...w,dmg_mod:parseInt(e.target.value)||0})} />
          </div>
        </div>

        <div className="grid-2">
          <div>
            <label>Extra Damage Dice (optional)</label>
            <input value={w.extra_damage ?? w.extraDamage ?? ''} onChange={e=>setW({...w,extra_damage:e.target.value})} placeholder="e.g. 2d6" />
          </div>
          <div>
            <label>Extra Damage Type</label>
            <select value={w.extra_damage_type ?? w.extraDamageType ?? ''} onChange={e=>setW({...w,extra_damage_type:e.target.value})}>
              <option value="">—</option>
              {DAMAGE_TYPES.map(t=><option key={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label>Notes</label>
          <input value={w.note} onChange={e=>setW({...w,note:e.target.value})} placeholder="e.g. Glows in darkness, can cast Light 1/day" />
        </div>

        <button className="btn btn-primary" style={{ marginTop:8 }}
          disabled={!w.name?.trim()}
          onClick={() => onSave(w)}>
          ✓ Save Weapon
        </button>
      </div>
    </div>
  );
}

// ── Weapon detail modal ──────────────────────────────────────────────────────
function WeaponDetailModal({ weapon, isCustom, onClose, onEdit, onClone, onDelete, currentUserId, isSuperAdmin }) {
  const isOwner = isCustom && weapon.user_id === currentUserId;
  const canDelete = isOwner || isSuperAdmin;
  const dmgType = weapon.damage_type ?? weapon.damageType ?? '';
  const props = weapon.properties || [];

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
            <h2 style={{ marginBottom:2 }}>{weapon.name}</h2>
            <div style={{ fontSize:'0.8rem', color:'var(--c-text-dim)', fontStyle:'italic' }}>
              {weapon.category} {weapon.kind} weapon
            </div>
            {isCustom && (
              <div style={{ marginTop:4 }}>
                <span className="badge badge-gold" style={{ fontSize:'0.55rem' }}>
                  custom{weapon.creator_name ? ` · by ${weapon.creator_name}` : ''}
                </span>
              </div>
            )}
          </div>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
        </div>

        <div className="grid-2" style={{ marginTop:4 }}>
          <div style={{ background:'rgba(200,169,81,0.08)', padding:'6px 10px', borderRadius:'var(--radius-sm)', border:'1px solid var(--c-gold-dim)' }}>
            <div style={{ fontSize:'0.55rem', fontFamily:'var(--font-display)', letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--c-gold-dim)' }}>Damage</div>
            <div style={{ fontFamily:'var(--font-mono)', color:'var(--c-gold)' }}>{weapon.damage} {dmgType}</div>
          </div>
          {weapon.range && (
            <div style={{ background:'var(--c-surface-2)', padding:'6px 10px', borderRadius:'var(--radius-sm)', border:'1px solid var(--c-border)' }}>
              <div style={{ fontSize:'0.55rem', fontFamily:'var(--font-display)', letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--c-text-muted)' }}>Range</div>
              <div style={{ fontSize:'0.85rem', color:'var(--c-text)' }}>{weapon.range} ft</div>
            </div>
          )}
        </div>

        {(weapon.extra_damage ?? weapon.extraDamage) && (
          <div style={{ background:'rgba(139,26,42,0.1)', padding:'6px 10px', borderRadius:'var(--radius-sm)', border:'1px solid var(--c-red)' }}>
            <div style={{ fontSize:'0.55rem', fontFamily:'var(--font-display)', letterSpacing:'0.08em', textTransform:'uppercase', color:'#e57373' }}>Extra Damage</div>
            <div style={{ fontFamily:'var(--font-mono)', color:'#e57373' }}>
              {weapon.extra_damage ?? weapon.extraDamage} {weapon.extra_damage_type ?? weapon.extraDamageType}
            </div>
          </div>
        )}

        {props.length > 0 && (
          <div>
            <label style={{ marginBottom:4 }}>Properties</label>
            <div style={{ display:'flex', flexWrap:'wrap', gap:4 }}>
              {props.map(p => <span key={p} className="badge badge-dim">{p}</span>)}
            </div>
          </div>
        )}

        {weapon.note && (
          <div>
            <label style={{ marginBottom:4 }}>Notes</label>
            <p style={{ fontSize:'0.9rem', color:'var(--c-text)', lineHeight:1.6, whiteSpace:'pre-wrap' }}>{weapon.note}</p>
          </div>
        )}

        {isCustom && (
          <div style={{ display:'flex', flexDirection:'column', gap:8, marginTop:4 }}>
            {isOwner && (
              <button className="btn btn-secondary" onClick={() => onEdit(weapon)}>
                ✎ Edit Custom Weapon
              </button>
            )}
            <button className="btn btn-ghost" onClick={() => onClone(weapon)}
              style={{ border:'1px solid var(--c-border-gold)' }}>
              ⧉ Clone &amp; Edit (make my own copy)
            </button>
            {canDelete && (
              <button className="btn btn-danger" onClick={() => onDelete(weapon.id)}>
                🗑 Delete{!isOwner ? ' (admin)' : ''}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Weapons Library tab ──────────────────────────────────────────────────
export default function WeaponLibraryTab() {
  const { user, customWeapons, loadCustomWeapons, saveCustomWeapon, removeCustomWeapon } = useStore();
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [kindFilter, setKindFilter] = useState('all');
  const [showCustomOnly, setShowCustomOnly] = useState(false);
  const [detailWeapon, setDetailWeapon] = useState(null);
  const [editWeapon, setEditWeapon] = useState(null);

  useEffect(() => {
    loadCustomWeapons();
  }, [user?.id]);

  const allWeapons = useMemo(() => {
    const standard = WEAPONS.map(w => ({ ...w, isCustom: false }));
    const custom = customWeapons.map(w => ({ ...w, isCustom: true }));
    return [...standard, ...custom];
  }, [customWeapons]);

  const filtered = useMemo(() => {
    return allWeapons.filter(w => {
      if (showCustomOnly && !w.isCustom) return false;
      if (query.trim() && !w.name.toLowerCase().includes(query.toLowerCase())) return false;
      if (categoryFilter !== 'all' && w.category !== categoryFilter) return false;
      if (kindFilter !== 'all' && w.kind !== kindFilter) return false;
      return true;
    }).sort((a,b) => a.name.localeCompare(b.name));
  }, [allWeapons, query, categoryFilter, kindFilter, showCustomOnly]);

  return (
    <div style={{ padding:'12px 12px 0', display:'flex', flexDirection:'column', gap:10 }}>

      {detailWeapon && (
        <WeaponDetailModal weapon={detailWeapon} isCustom={detailWeapon.isCustom}
          currentUserId={user?.id} isSuperAdmin={user?.id === SUPER_ADMIN_ID}
          onClose={() => setDetailWeapon(null)}
          onEdit={(w) => { setDetailWeapon(null); setEditWeapon(w); }}
          onClone={(w) => {
            setDetailWeapon(null);
            const { id, user_id, creator_name, isCustom, ...rest } = w;
            setEditWeapon({ ...rest, name: `${w.name} (copy)` });
          }}
          onDelete={async (id) => { await removeCustomWeapon(id); setDetailWeapon(null); }}
        />
      )}
      {editWeapon && (
        <CustomWeaponModal initial={editWeapon}
          onClose={() => setEditWeapon(null)}
          onSave={async (w) => { await saveCustomWeapon(w); setEditWeapon(null); }}
        />
      )}

      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <h2>⚔ Weapon Library</h2>
        <button className="btn btn-primary btn-sm" onClick={() => setEditWeapon(defaultCustomWeapon())}>
          ＋ Custom Weapon
        </button>
      </div>

      <input placeholder="Search weapons by name..." value={query} onChange={e=>setQuery(e.target.value)} />

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6 }}>
        <select value={categoryFilter} onChange={e=>setCategoryFilter(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="simple">Simple</option>
          <option value="martial">Martial</option>
        </select>
        <select value={kindFilter} onChange={e=>setKindFilter(e.target.value)}>
          <option value="all">Melee &amp; Ranged</option>
          <option value="melee">Melee</option>
          <option value="ranged">Ranged</option>
        </select>
      </div>

      <label style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer', textTransform:'none', fontFamily:'var(--font-body)', fontSize:'0.85rem', color:'var(--c-text-dim)' }}>
        <input type="checkbox" style={{ width:'auto' }} checked={showCustomOnly}
          onChange={e=>setShowCustomOnly(e.target.checked)} />
        Show only custom weapons
      </label>

      <div style={{ fontSize:'0.75rem', color:'var(--c-text-muted)' }}>
        {filtered.length} weapon{filtered.length!==1?'s':''}
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
        {filtered.map(weapon => (
          <button key={weapon.isCustom ? `c-${weapon.id}` : weapon.name}
            onClick={() => setDetailWeapon(weapon)}
            style={{
              display:'flex', alignItems:'center', gap:8, padding:'8px 10px',
              background: weapon.isCustom ? 'rgba(200,169,81,0.06)' : 'var(--c-surface-2)',
              border: `1px solid ${weapon.isCustom ? 'var(--c-border-gold)' : 'var(--c-border)'}`,
              borderRadius:'var(--radius-sm)', cursor:'pointer', textAlign:'left',
            }}>
            <span style={{ fontSize:'1rem', flexShrink:0 }}>{weapon.kind === 'ranged' ? '🏹' : '⚔'}</span>
            <span style={{ flex:1, fontSize:'0.9rem', color:'var(--c-text)' }}>
              {weapon.name}
              {weapon.isCustom && (
                <span className="badge badge-gold" style={{ marginLeft:6, fontSize:'0.5rem' }}>
                  custom{weapon.creator_name ? ` · ${weapon.creator_name}` : ''}
                </span>
              )}
            </span>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.75rem', color:'var(--c-gold)' }}>
              {weapon.damage}
            </span>
            <span style={{ fontSize:'0.65rem', color:'var(--c-text-muted)' }}>
              {weapon.damage_type ?? weapon.damageType ?? ''}
            </span>
          </button>
        ))}
        {filtered.length === 0 && (
          <p style={{ textAlign:'center', padding:24, color:'var(--c-text-muted)', fontStyle:'italic' }}>
            No weapons match your filters.
          </p>
        )}
      </div>
    </div>
  );
}
