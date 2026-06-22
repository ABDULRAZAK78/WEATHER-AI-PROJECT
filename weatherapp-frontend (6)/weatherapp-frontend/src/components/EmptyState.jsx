import React from 'react';

const SUGGESTIONS = ['London', 'Tokyo', 'New York', 'Mumbai', 'Dubai', 'Paris', 'Sydney'];

const EmptyState = ({ onSearch }) => (
  <div className="fade-in" style={{ textAlign: 'center', padding: '60px 20px' }}>
    <div className="floating" style={{ fontSize: 90, marginBottom: 24 }}>🌍</div>

    <h2 style={{
      fontWeight: 900, fontSize: 26,
      letterSpacing: '-0.02em', marginBottom: 10,
    }}>
      Explore Global Weather
    </h2>

    <p style={{
      color: 'var(--t2)', fontSize: 15, lineHeight: 1.7,
      maxWidth: 420, margin: '0 auto 30px',
    }}>
      Search any city in the world to get real-time conditions,
      AI-powered insights, and smart weather alerts.
    </p>

    {/* Suggestion pills */}
    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
      {SUGGESTIONS.map(city => (
        <button
          key={city}
          onClick={() => onSearch(city)}
          style={{
            padding: '8px 18px', borderRadius: 99,
            border: '1px solid var(--glass-bd)',
            background: 'var(--glass)',
            color: 'var(--t2)', fontSize: 13, fontWeight: 500,
            transition: 'all .2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(59,158,255,0.5)';
            e.currentTarget.style.color       = 'var(--blue)';
            e.currentTarget.style.background  = 'rgba(59,158,255,0.08)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--glass-bd)';
            e.currentTarget.style.color       = 'var(--t2)';
            e.currentTarget.style.background  = 'var(--glass)';
          }}
        >
          {city}
        </button>
      ))}
    </div>

    {/* Features preview */}
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
      gap: 12, marginTop: 40, maxWidth: 560, marginLeft: 'auto', marginRight: 'auto',
    }}>
      {[
        { icon: '🌡️', title: 'Real-time Data',    desc: 'Live conditions from OpenWeather' },
        { icon: '✨', title: 'AI Insights',       desc: 'Claude-powered daily tips' },
        { icon: '⚠️', title: 'Smart Alerts',      desc: 'Auto storm & heat warnings' },
        { icon: '🕐', title: 'Search History',    desc: 'Track your past searches' },
      ].map(f => (
        <div key={f.title} style={{
          padding: '16px', borderRadius: 'var(--r-sm)',
          background: 'var(--glass)', border: '1px solid var(--glass-bd)',
          textAlign: 'left',
        }}>
          <div style={{ fontSize: 22, marginBottom: 8 }}>{f.icon}</div>
          <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{f.title}</div>
          <div style={{ fontSize: 12, color: 'var(--t2)', lineHeight: 1.5 }}>{f.desc}</div>
        </div>
      ))}
    </div>
  </div>
);

export default EmptyState;
