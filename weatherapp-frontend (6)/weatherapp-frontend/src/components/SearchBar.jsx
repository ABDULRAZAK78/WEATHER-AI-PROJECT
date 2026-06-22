import React, { useState } from 'react';

const QUICK = ['Hyderabad', 'Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'London', 'Tokyo', 'Dubai'];

const SearchBar = ({ onSearch, loading }) => {
  const [city, setCity] = useState('');

  const submit = (c) => { const q = c || city; if (q.trim()) { onSearch(q.trim()); if (!c) setCity(''); } };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '16px 20px', borderBottom: '1px solid #1e1e2e' }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 16 }}>🔍</span>
          <input
            type="text" value={city}
            onChange={e => setCity(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submit()}
            placeholder="Search city…"
            style={{
              width: '100%', padding: '10px 12px 10px 38px',
              background: '#1a1a2e', border: '1px solid #2a2a40',
              borderRadius: 10, color: '#fff', fontSize: 14,
              transition: 'border-color .2s',
            }}
            onFocus={e => e.target.style.borderColor = '#60a5fa'}
            onBlur={e => e.target.style.borderColor = '#2a2a40'}
          />
        </div>
        <button onClick={() => submit()} disabled={loading || !city.trim()} style={{
          padding: '10px 18px', borderRadius: 10, border: 'none',
          background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
          color: '#fff', fontWeight: 700, fontSize: 13,
          opacity: loading || !city.trim() ? 0.5 : 1,
          transition: 'opacity .2s',
        }}>
          {loading ? '...' : 'GO'}
        </button>
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {QUICK.map(c => (
          <button key={c} onClick={() => submit(c)} style={{
            padding: '4px 10px', borderRadius: 20, border: '1px solid #2a2a40',
            background: 'transparent', color: '#888', fontSize: 11,
            transition: 'all .15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#60a5fa'; e.currentTarget.style.color = '#60a5fa'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a40'; e.currentTarget.style.color = '#888'; }}
          >{c}</button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
