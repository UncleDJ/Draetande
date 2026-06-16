import { useState } from 'react';
import SpellLibraryTab from './SpellLibraryTab';
import WeaponLibraryTab from './WeaponLibraryTab';

export default function LibraryTab() {
  const [view, setView] = useState('spells');

  return (
    <div>
      {/* Toggle */}
      <div style={{ padding:'12px 12px 0', display:'flex', gap:6 }}>
        <button
          className={`btn ${view === 'spells' ? 'btn-primary' : 'btn-ghost'}`}
          style={{ flex:1, border: view==='spells' ? 'none' : '1px solid var(--c-border)' }}
          onClick={() => setView('spells')}>
          ✨ Spells
        </button>
        <button
          className={`btn ${view === 'weapons' ? 'btn-primary' : 'btn-ghost'}`}
          style={{ flex:1, border: view==='weapons' ? 'none' : '1px solid var(--c-border)' }}
          onClick={() => setView('weapons')}>
          ⚔ Weapons
        </button>
      </div>

      {view === 'spells' ? <SpellLibraryTab /> : <WeaponLibraryTab />}
    </div>
  );
}
