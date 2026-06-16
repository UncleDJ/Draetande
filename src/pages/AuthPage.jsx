import { useState } from 'react';
import { signIn, signUp } from '../lib/supabase';

export default function AuthPage() {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess(''); setLoading(true);
    if (mode === 'login') {
      const { error } = await signIn(email, password);
      if (error) setError(error.message);
    } else {
      if (!playerName.trim()) { setError('Please enter your name.'); setLoading(false); return; }
      const { error } = await signUp(email, password, playerName);
      if (error) setError(error.message);
      else setSuccess('Account created! Check your email to confirm, then log in.');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '24px', background: 'var(--c-bg)',
    }}>
      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{
          fontSize: '3rem', marginBottom: '8px',
          filter: 'drop-shadow(0 0 12px rgba(200,169,81,0.4))',
        }}>⚔</div>
        <h1 style={{ fontSize: '1.8rem', letterSpacing: '0.15em' }}>DRAETANDE</h1>
        <p style={{ color: 'var(--c-text-dim)', fontStyle: 'italic', marginTop: '4px', fontSize: '0.9rem' }}>
          D&D 5e Campaign Manager
        </p>
      </div>

      {/* Card */}
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        {/* Tab toggle */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--c-border)' }}>
          {['login', 'signup'].map(m => (
            <button key={m} onClick={() => { setMode(m); setError(''); setSuccess(''); }}
              style={{
                flex: 1, padding: '12px', background: 'none', border: 'none',
                fontFamily: 'var(--font-display)', fontSize: '0.7rem', letterSpacing: '0.1em',
                textTransform: 'uppercase', cursor: 'pointer',
                color: mode === m ? 'var(--c-gold)' : 'var(--c-text-muted)',
                borderBottom: mode === m ? '2px solid var(--c-gold)' : '2px solid transparent',
                transition: 'all 0.2s',
              }}>
              {m === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          ))}
        </div>

        <div className="card-body" style={{ padding: '24px' }}>
          {error && (
            <div className="badge badge-red" style={{
              width: '100%', marginBottom: '16px', padding: '8px 12px',
              borderRadius: 'var(--radius-sm)', fontSize: '0.8rem',
            }}>{error}</div>
          )}
          {success && (
            <div className="badge badge-green" style={{
              width: '100%', marginBottom: '16px', padding: '8px 12px',
              borderRadius: 'var(--radius-sm)', fontSize: '0.8rem',
            }}>{success}</div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {mode === 'signup' && (
              <div>
                <label>Your Name (shown to DM)</label>
                <input type="text" value={playerName} onChange={e => setPlayerName(e.target.value)}
                  placeholder="e.g. Lucas" autoComplete="name" />
              </div>
            )}
            <div>
              <label>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com" autoComplete="email" />
            </div>
            <div>
              <label>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                minLength={6} />
            </div>
            <button type="submit" className="btn btn-primary w-full"
              style={{ marginTop: '4px', padding: '12px' }} disabled={loading}>
              {loading ? <span className="spin" style={{ fontSize: '1rem' }}>⟳</span>
                : mode === 'login' ? 'Enter the Realm' : 'Join the Campaign'}
            </button>
          </form>
        </div>
      </div>

      <p style={{ marginTop: '24px', color: 'var(--c-text-muted)', fontSize: '0.8rem', textAlign: 'center' }}>
        For Draetande campaign players only
      </p>
    </div>
  );
}
