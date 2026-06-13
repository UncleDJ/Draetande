import { useState } from 'react';
import { SearchSelect } from './SearchSelect';
import { WEAPON_NAMES, getWeapon, suggestWeaponAbility, isWeaponProficient,
         defaultCustomWeapon, DAMAGE_TYPES } from '../data/weaponsData';
import { getMod, fmtMod } from '../data/gameData';

// ── Custom weapon builder modal ──────────────────────────────────────────────
function CustomWeaponModal({ initial, onSave, onClose }) {
  const [w, setW] = useState(initial || defaultCustomWeapon());

  const toggleProp = (prop) => {
    setW(prev => ({
      ...prev,
      properties: prev.properties.includes(prop)
        ? prev.properties.filter(p => p !== prop)
        : [...prev.properties, prop],
    }));
  };

  return (
    <div style={{
      position:'fixed', inset:0, background:'rgba(0,0,0,0.8)', zIndex:300,
      display:'flex', alignItems:'flex-end', justifyContent:'center',
    }} onClick={onClose}>
      <div style={{
        background:'var(--c-surface)', borderRadius:'16px 16px 0 0',
        width:'100%', maxWidth:480, maxHeight:'85vh', overflow:'auto',
        padding:16, display:'flex', flexDirection:'column', gap:12,
      }} onClick={e=>e.stopPropagation()}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <h3>🛠 Custom Weapon</h3>
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
            <select value={w.damageType} onChange={e=>setW({...w,damageType:e.target.value})}>
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

        {/* Properties */}
        <div>
          <label>Properties</label>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
            {['finesse','light','heavy','reach','thrown','two-handed','versatile','ammunition'].map(prop => (
              <button key={prop} type="button" onClick={()=>toggleProp(prop)}
                className={`badge ${w.properties.includes(prop) ? 'badge-gold' : 'badge-dim'}`}
                style={{ cursor:'pointer', border:'none' }}
              >{prop}</button>
            ))}
          </div>
        </div>

        {/* Modifier configuration */}
        <div className="divider">Bonuses</div>

        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          <label style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer', textTransform:'none', fontFamily:'var(--font-body)', fontSize:'0.9rem', color:'var(--c-text)' }}>
            <input type="checkbox" style={{ width:'auto' }} checked={w.useStrMod}
              onChange={e=>setW({...w, useStrMod: e.target.checked, useDexMod: e.target.checked ? false : w.useDexMod})} />
            Add STR modifier to attack & damage
          </label>
          <label style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer', textTransform:'none', fontFamily:'var(--font-body)', fontSize:'0.9rem', color:'var(--c-text)' }}>
            <input type="checkbox" style={{ width:'auto' }} checked={w.useDexMod}
              onChange={e=>setW({...w, useDexMod: e.target.checked, useStrMod: e.target.checked ? false : w.useStrMod})} />
            Add DEX modifier to attack & damage
          </label>
          <label style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer', textTransform:'none', fontFamily:'var(--font-body)', fontSize:'0.9rem', color:'var(--c-text)' }}>
            <input type="checkbox" style={{ width:'auto' }} checked={w.addProfBonus}
              onChange={e=>setW({...w, addProfBonus: e.target.checked})} />
            Add proficiency bonus to attack
          </label>
        </div>

        <div className="grid-2">
          <div>
            <label>Extra Attack Bonus (flat)</label>
            <input type="number" value={w.atkMod} onChange={e=>setW({...w,atkMod:parseInt(e.target.value)||0})} />
          </div>
          <div>
            <label>Extra Damage Bonus (flat)</label>
            <input type="number" value={w.dmgMod} onChange={e=>setW({...w,dmgMod:parseInt(e.target.value)||0})} />
          </div>
        </div>

        <div className="grid-2">
          <div>
            <label>Extra Damage Dice (optional)</label>
            <input value={w.extraDamage} onChange={e=>setW({...w,extraDamage:e.target.value})} placeholder="e.g. 2d6" />
          </div>
          <div>
            <label>Extra Damage Type</label>
            <select value={w.extraDamageType} onChange={e=>setW({...w,extraDamageType:e.target.value})}>
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
          disabled={!w.name.trim()}
          onClick={() => onSave(w)}>
          ✓ Save Custom Weapon
        </button>
      </div>
    </div>
  );
}

// ── Calculate attack bonus & damage string ──────────────────────────────────
export function calcAttack(weaponDef, ability, strMod, dexMod, profBonus, isProficient) {
  if (!weaponDef) return { atkBonus: null, damage: '', type: '' };

  const abilMod = ability === 'DEX' ? dexMod : ability === 'STR' ? strMod : 0;
  const profAdd = (weaponDef.addProfBonus !== false && isProficient) ? profBonus : 0;
  const flatAtk = weaponDef.atkMod || 0;

  const atkBonus = abilMod + profAdd + flatAtk;

  // Damage string
  let dmgParts = [weaponDef.damage || ''];
  const dmgModTotal = abilMod + (weaponDef.dmgMod || 0);
  if (dmgModTotal !== 0) dmgParts.push(fmtMod(dmgModTotal));
  let damage = dmgParts.filter(Boolean).join(' ').replace(/\s+\+/, '+').replace(/\s+-/, '-');
  if (weaponDef.damageType) damage += ` ${weaponDef.damageType}`;
  if (weaponDef.extraDamage) {
    damage += ` + ${weaponDef.extraDamage}${weaponDef.extraDamageType ? ' ' + weaponDef.extraDamageType : ''}`;
  }

  return { atkBonus, damage, type: weaponDef.damageType };
}

// ── Attack Row component ─────────────────────────────────────────────────────
export function AttackRow({ attack, onChange, strMod, dexMod, profBonus, weaponProfs }) {
  const [showCustomModal, setShowCustomModal] = useState(false);

  const isCustom = !!attack.customWeapon;
  const weaponDef = isCustom ? attack.customWeapon : getWeapon(attack.weapon);

  const suggestion = weaponDef ? suggestWeaponAbility(weaponDef, strMod, dexMod) : { ability: 'STR', canChoose: false };
  const ability = attack.ability || suggestion.ability;

  const isProficient = weaponDef
    ? (isCustom ? true : isWeaponProficient(weaponDef, weaponProfs))
    : false;

  const result = weaponDef ? calcAttack(
    isCustom ? weaponDef : weaponDef,
    ability,
    strMod, dexMod, profBonus, isProficient
  ) : null;

  const handleWeaponSelect = (name) => {
    if (name === '__custom__') {
      setShowCustomModal(true);
      return;
    }
    onChange({ ...attack, weapon: name, customWeapon: null, ability: null });
  };

  return (
    <div style={{
      padding: 10, background: 'var(--c-surface-2)', borderRadius: 'var(--radius-sm)',
      border: '1px solid var(--c-border)', display:'flex', flexDirection:'column', gap:8,
    }}>
      {showCustomModal && (
        <CustomWeaponModal
          initial={attack.customWeapon}
          onClose={() => setShowCustomModal(false)}
          onSave={(w) => {
            onChange({ ...attack, weapon: '', customWeapon: w, ability: null });
            setShowCustomModal(false);
          }}
        />
      )}

      {/* Weapon selector */}
      <div style={{ display:'flex', gap:6, alignItems:'flex-start' }}>
        <div style={{ flex:1 }}>
          {isCustom ? (
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
                          background:'var(--c-surface-3)', border:'1px solid var(--c-border-gold)',
                          borderRadius:'var(--radius-sm)', padding:'6px 10px' }}>
              <span style={{ fontSize:'0.95rem', color:'var(--c-gold)' }}>🛠 {weaponDef.name || 'Custom Weapon'}</span>
              <div style={{ display:'flex', gap:4 }}>
                <button className="btn btn-ghost btn-icon" style={{ fontSize:'0.7rem' }} onClick={()=>setShowCustomModal(true)}>✎</button>
                <button className="btn btn-ghost btn-icon" style={{ fontSize:'0.7rem', color:'var(--c-red-bright)' }}
                  onClick={()=>onChange({...attack, customWeapon:null, weapon:'', ability:null})}>✕</button>
              </div>
            </div>
          ) : (
            <SearchSelect
              value={attack.weapon}
              onChange={handleWeaponSelect}
              options={[...WEAPON_NAMES, '__custom__'].map(n => n === '__custom__' ? '🛠 Custom Weapon...' : n)}
              placeholder="Select weapon..."
            />
          )}
        </div>
      </div>

      {/* Calculated results */}
      {weaponDef && (
        <div style={{ display:'flex', gap:8, alignItems:'center', flexWrap:'wrap' }}>
          {/* Ability used */}
          {suggestion.canChoose && !isCustom && (
            <div style={{ display:'flex', gap:4 }}>
              {['STR','DEX'].map(a => (
                <button key={a} onClick={() => onChange({...attack, ability: a})}
                  className={`badge ${ability===a ? 'badge-gold' : 'badge-dim'}`}
                  style={{ cursor:'pointer', border:'none' }}>{a}</button>
              ))}
            </div>
          )}
          {!suggestion.canChoose && (
            <span className="badge badge-dim">{ability}</span>
          )}

          {/* Proficiency indicator */}
          {!isCustom && (
            <span className={`badge ${isProficient ? 'badge-green' : 'badge-red'}`}>
              {isProficient ? '✓ Proficient' : '✗ Not proficient'}
            </span>
          )}

          {/* Attack bonus */}
          <div style={{ textAlign:'center', padding:'4px 10px', background:'var(--c-surface-3)', borderRadius:'var(--radius-sm)', border:'1px solid var(--c-border-gold)' }}>
            <div style={{ fontSize:'0.5rem', fontFamily:'var(--font-display)', letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--c-text-muted)' }}>Atk</div>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:'1.1rem', color:'var(--c-gold)' }}>{fmtMod(result.atkBonus)}</div>
          </div>

          {/* Damage */}
          <div style={{ flex:1, minWidth:120, padding:'4px 10px', background:'var(--c-surface-3)', borderRadius:'var(--radius-sm)', border:'1px solid var(--c-border)' }}>
            <div style={{ fontSize:'0.5rem', fontFamily:'var(--font-display)', letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--c-text-muted)' }}>Damage</div>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.9rem', color:'var(--c-text)' }}>{result.damage}</div>
          </div>
        </div>
      )}

      {/* Weapon properties / range */}
      {weaponDef && (weaponDef.properties?.length > 0 || weaponDef.range || weaponDef.note) && (
        <div style={{ fontSize:'0.7rem', color:'var(--c-text-muted)', display:'flex', gap:8, flexWrap:'wrap' }}>
          {weaponDef.properties?.map(p => <span key={p}>• {p}{p==='versatile' && weaponDef.versatileDamage ? ` (${weaponDef.versatileDamage} 2-handed)` : ''}</span>)}
          {weaponDef.range && <span>• range {weaponDef.range}ft</span>}
          {weaponDef.note && <span style={{ color:'var(--c-gold-dim)', fontStyle:'italic' }}>• {weaponDef.note}</span>}
        </div>
      )}
    </div>
  );
}
