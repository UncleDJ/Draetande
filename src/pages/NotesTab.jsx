import { useStore } from '../store/useStore';

export default function NotesTab() {
  const { character: char, setField } = useStore();

  if (!char) return null;

  return (
    <div style={{ padding:'12px 12px 0', display:'flex', flexDirection:'column', gap:12 }}>
      <div className="card">
        <div className="section-header">🗒 Game Notes
          <span style={{ marginLeft:'auto', fontSize:'0.6rem', color:'var(--c-text-dim)', fontFamily:'var(--font-body)', textTransform:'none', letterSpacing:0 }}>
            for your eyes only — auto-saved
          </span>
        </div>
        <div className="card-body">
          <textarea value={char.game_notes||''} onChange={e=>setField('game_notes',e.target.value)}
            placeholder="Quest details, NPC names, plans, reminders, loot to track, anything..."
            rows={22} style={{ lineHeight:1.6 }} />
        </div>
      </div>
    </div>
  );
}
