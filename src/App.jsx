import { useEffect, useState } from 'react';
import './App.css';
import { supabase } from './lib/supabase';
import { useStore } from './store/useStore';
import AuthPage from './pages/AuthPage';
import HomeScreen from './pages/HomeScreen';
import CharacterLibrary from './pages/CharacterLibrary';
import SessionsScreen from './pages/SessionsScreen';
import MainTab from './pages/MainTab';
import SpellsTab from './pages/SpellsTab';
import LibraryTab from './pages/LibraryTab';
import LevelUpTab from './pages/LevelUpTab';
import PartyTab from './pages/PartyTab';
import NotesTab from './pages/NotesTab';

const SHEET_TABS = [
  { id:'main',    label:'Sheet',   icon:'📋' },
  { id:'spells',  label:'Spells',  icon:'✨' },
  { id:'library', label:'Library', icon:'📖' },
  { id:'notes',   label:'Notes',   icon:'🗒'  },
  { id:'levelup', label:'Level Up',icon:'⬆'  },
  { id:'party',   label:'Party',   icon:'🐉'  },
];

function SaveIndicator() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => setVisible(v => !v), 3000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className={`save-indicator ${visible ? 'visible' : ''}`}>
      ✦ auto-saving
    </div>
  );
}

export default function App() {
  const {
    session, setSession, loadProfile, screen, setScreen,
    activeTab, setActiveTab, character, closeCharacter,
    profile,
  } = useStore();
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session?.user) loadProfile(session.user.id);
  }, [session?.user?.id]);

  if (authLoading) {
    return (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', flexDirection:'column', gap:16 }}>
        <div style={{ fontSize:'3rem', animation:'roll 1s linear infinite' }}>⚔</div>
        <p style={{ color:'var(--c-text-dim)', fontFamily:'var(--font-display)', letterSpacing:'0.1em', fontSize:'0.8rem', textTransform:'uppercase' }}>
          Entering the Realm...
        </p>
      </div>
    );
  }

  if (!session) return <AuthPage />;

  // ── Top-level screens (no bottom nav) ─────────────────────────────────────
  if (screen === 'home') return <div className="app"><div className="page-content fade-in"><HomeScreen /></div></div>;
  if (screen === 'characters') return <div className="app"><div className="page-content fade-in"><CharacterLibrary /></div></div>;
  if (screen === 'sessions') return <div className="app"><div className="page-content fade-in"><SessionsScreen /></div></div>;

  // ── Character sheet screen (with bottom nav) ──────────────────────────────
  if (screen === 'sheet' && character) {
    const renderTab = () => {
      switch (activeTab) {
        case 'main':    return <MainTab />;
        case 'spells':  return <SpellsTab />;
        case 'library': return <LibraryTab />;
        case 'notes':   return <NotesTab />;
        case 'levelup': return <LevelUpTab />;
        case 'party':   return <PartyTab />;
        default:        return <MainTab />;
      }
    };

    return (
      <div className="app">
        <SaveIndicator />

        {/* Header */}
        <div style={{
          padding:'10px 14px 8px',
          background:'var(--c-surface)',
          borderBottom:'1px solid var(--c-border-gold)',
          display:'flex', alignItems:'center', justifyContent:'space-between',
          position:'sticky', top:0, zIndex:50,
          boxShadow:'0 2px 12px rgba(0,0,0,0.4)',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, minWidth:0 }}>
            <button onClick={closeCharacter} className="btn btn-ghost btn-icon" style={{ fontSize:'1rem' }}>←</button>
            <div style={{ minWidth:0 }}>
              <div style={{ fontFamily:'var(--font-display)', fontSize:'0.85rem', color:'var(--c-gold)', letterSpacing:'0.08em', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                {character?.character_name || 'Unnamed'}
              </div>
              {character?.class_name && (
                <div style={{ fontSize:'0.65rem', color:'var(--c-text-dim)' }}>
                  {character.class_name} {character.level} · {character.race}
                </div>
              )}
            </div>
          </div>
          <button onClick={() => setScreen('home')}
            className="btn btn-ghost" style={{ fontSize:'0.6rem', padding:'4px 8px' }}>
            Home
          </button>
        </div>

        {/* Content */}
        <div className="page-content fade-in">
          {renderTab()}
          <div style={{ height:24 }} />
        </div>

        {/* Bottom nav */}
        <nav className="bottom-nav">
          {SHEET_TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}>
              <span className="icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    );
  }

  // ── DM Party-only screen (when DM opens a session, no character) ──────────
  if (screen === 'party') {
    return (
      <div className="app">
        <div style={{
          padding:'10px 14px 8px',
          background:'var(--c-surface)',
          borderBottom:'1px solid var(--c-border-gold)',
          display:'flex', alignItems:'center', justifyContent:'space-between',
          position:'sticky', top:0, zIndex:50,
        }}>
          <button onClick={() => setScreen('sessions')} className="btn btn-ghost btn-icon" style={{ fontSize:'1rem' }}>←</button>
          <span style={{ fontFamily:'var(--font-display)', fontSize:'0.85rem', color:'var(--c-gold)' }}>Party View</span>
          <button onClick={() => setScreen('home')}
            className="btn btn-ghost" style={{ fontSize:'0.6rem', padding:'4px 8px' }}>
            Home
          </button>
        </div>
        <div className="page-content fade-in">
          <PartyTab />
          <div style={{ height:24 }} />
        </div>
      </div>
    );
  }

  // Fallback
  return <div className="app"><div className="page-content fade-in"><HomeScreen /></div></div>;
}
