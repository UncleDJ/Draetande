import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

// ── Shared: floating dropdown panel rendered via portal ──────────────────────
function DropdownPanel({ anchorRef, children, onClose }) {
  const panelRef = useRef(null);
  const [rect, setRect] = useState(null);

  useLayoutEffect(() => {
    const update = () => {
      if (anchorRef.current) {
        setRect(anchorRef.current.getBoundingClientRect());
      }
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [anchorRef]);

  useEffect(() => {
    const handler = (e) => {
      if (
        anchorRef.current && !anchorRef.current.contains(e.target) &&
        panelRef.current && !panelRef.current.contains(e.target)
      ) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [anchorRef, onClose]);

  if (!rect) return null;

  // Flip above the trigger if there's not enough room below
  const spaceBelow = window.innerHeight - rect.bottom;
  const maxHeight = 280;
  const openUpward = spaceBelow < maxHeight + 16 && rect.top > maxHeight;

  const style = {
    position: 'fixed',
    left: rect.left,
    width: rect.width,
    zIndex: 9999,
    background: 'var(--c-surface-2)',
    border: '1px solid var(--c-border-gold)',
    borderRadius: 'var(--radius-sm)',
    boxShadow: 'var(--shadow-md)',
    maxHeight,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    ...(openUpward
      ? { bottom: window.innerHeight - rect.top + 4 }
      : { top: rect.bottom + 4 }),
  };

  return createPortal(
    <div ref={panelRef} style={style}>{children}</div>,
    document.body
  );
}

// ── Searchable single-select ─────────────────────────────────────────────────
export function SearchSelect({ value, onChange, options, placeholder = 'Select...', allowCustom = false }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const anchorRef = useRef(null);

  const filtered = options.filter(o => o.toLowerCase().includes(query.toLowerCase()));

  return (
    <div ref={anchorRef} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', textAlign: 'left', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', cursor: 'pointer',
          background: 'var(--c-surface-3)', border: '1px solid var(--c-border)',
          color: value ? 'var(--c-text)' : 'var(--c-text-muted)',
          borderRadius: 'var(--radius-sm)', padding: '6px 10px', fontSize: '0.95rem',
          fontFamily: 'var(--font-body)',
        }}
      >
        <span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{value || placeholder}</span>
        <span style={{ color:'var(--c-gold)', fontSize:'0.7rem', marginLeft:6 }}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <DropdownPanel anchorRef={anchorRef} onClose={() => setOpen(false)}>
          <input
            autoFocus
            placeholder="Type to search..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{ borderRadius: 0, border: 'none', borderBottom: '1px solid var(--c-border)' }}
          />
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {value && (
              <button type="button" onClick={() => { onChange(''); setOpen(false); setQuery(''); }}
                style={{
                  display:'block', width:'100%', textAlign:'left', padding:'8px 10px',
                  background:'none', border:'none', borderBottom:'1px solid var(--c-border)',
                  color:'var(--c-red-bright)', cursor:'pointer', fontSize:'0.85rem',
                }}>✕ Clear selection</button>
            )}
            {filtered.length === 0 && (
              <div style={{ padding: '10px 12px', color: 'var(--c-text-muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>
                {allowCustom ? 'No matches — type and press Enter for custom' : 'No matches'}
              </div>
            )}
            {filtered.map(opt => (
              <button key={opt} type="button"
                onClick={() => { onChange(opt); setOpen(false); setQuery(''); }}
                style={{
                  display: 'block', width: '100%', textAlign: 'left', padding: '8px 10px',
                  background: opt === value ? 'rgba(200,169,81,0.1)' : 'none',
                  border: 'none', borderBottom: '1px solid var(--c-border)',
                  color: 'var(--c-text)', cursor: 'pointer', fontSize: '0.9rem',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--c-surface-3)'}
                onMouseLeave={e => e.currentTarget.style.background = opt === value ? 'rgba(200,169,81,0.1)' : 'none'}
              >{opt}</button>
            ))}
          </div>
          {allowCustom && query.trim() && !options.includes(query.trim()) && (
            <button type="button"
              onClick={() => { onChange(query.trim()); setOpen(false); setQuery(''); }}
              style={{
                display:'block', width:'100%', textAlign:'left', padding:'8px 10px',
                background:'rgba(200,169,81,0.08)', border:'none', borderTop:'1px solid var(--c-border-gold)',
                color:'var(--c-gold)', cursor:'pointer', fontSize:'0.85rem',
              }}
            >＋ Use "{query.trim()}"</button>
          )}
        </DropdownPanel>
      )}
    </div>
  );
}

// ── Searchable multi-select with chips ───────────────────────────────────────
export function MultiSelect({ values = [], onChange, options, placeholder = 'Add...', allowCustom = false }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const anchorRef = useRef(null);

  const filtered = options.filter(o => !values.includes(o) && o.toLowerCase().includes(query.toLowerCase()));

  const add = (val) => {
    if (!values.includes(val)) onChange([...values, val]);
    setQuery('');
  };
  const remove = (val) => onChange(values.filter(v => v !== val));

  return (
    <div ref={anchorRef} style={{ position: 'relative' }}>
      {/* Chips */}
      {values.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 6 }}>
          {values.map(v => (
            <span key={v} className="badge badge-gold" style={{ display:'inline-flex', alignItems:'center', gap:4, paddingRight: 4 }}>
              {v}
              <button type="button" onClick={() => remove(v)}
                style={{ background:'none', border:'none', color:'inherit', cursor:'pointer', fontSize:'0.7rem', padding:0, lineHeight:1 }}
              >✕</button>
            </span>
          ))}
        </div>
      )}

      <button type="button" onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', textAlign: 'left', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', cursor: 'pointer',
          background: 'var(--c-surface-3)', border: '1px solid var(--c-border)',
          color: 'var(--c-text-muted)', borderRadius: 'var(--radius-sm)',
          padding: '6px 10px', fontSize: '0.9rem', fontFamily: 'var(--font-body)',
        }}>
        <span>{placeholder}</span>
        <span style={{ color:'var(--c-gold)', fontSize:'0.7rem' }}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <DropdownPanel anchorRef={anchorRef} onClose={() => setOpen(false)}>
          <input
            autoFocus
            placeholder="Type to search..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && allowCustom && query.trim()) {
                add(query.trim());
              }
            }}
            style={{ borderRadius: 0, border: 'none', borderBottom: '1px solid var(--c-border)' }}
          />
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {filtered.length === 0 && (
              <div style={{ padding: '10px 12px', color: 'var(--c-text-muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>
                {allowCustom ? 'No matches — press Enter for custom' : 'No matches'}
              </div>
            )}
            {filtered.map(opt => (
              <button key={opt} type="button" onClick={() => add(opt)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left', padding: '8px 10px',
                  background: 'none', border: 'none', borderBottom: '1px solid var(--c-border)',
                  color: 'var(--c-text)', cursor: 'pointer', fontSize: '0.9rem',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--c-surface-3)'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}
              >＋ {opt}</button>
            ))}
          </div>
          {allowCustom && query.trim() && !options.includes(query.trim()) && !values.includes(query.trim()) && (
            <button type="button" onClick={() => add(query.trim())}
              style={{
                display:'block', width:'100%', textAlign:'left', padding:'8px 10px',
                background:'rgba(200,169,81,0.08)', border:'none', borderTop:'1px solid var(--c-border-gold)',
                color:'var(--c-gold)', cursor:'pointer', fontSize:'0.85rem',
              }}
            >＋ Add custom "{query.trim()}"</button>
          )}
        </DropdownPanel>
      )}
    </div>
  );
}
