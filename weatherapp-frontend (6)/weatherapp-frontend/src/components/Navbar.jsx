import React from 'react';

const Navbar = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '⚡' },
    { id: 'history',   label: 'History',   icon: '🕐' },
  ];

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      padding: '0 24px',
      backdropFilter: 'blur(20px)',
      background: 'rgba(4,13,26,0.85)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{
        maxWidth: 920, margin: '0 auto',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        height: 64,
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: 'linear-gradient(135deg, #3b9eff, #a78bfa)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20,
            boxShadow: '0 0 24px rgba(59,158,255,0.35)',
          }}>
            🌤️
          </div>
          <div>
            <div style={{
              fontWeight: 800, fontSize: 17,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(90deg,#e4f0ff,#7dd3fc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              WeatherAI
            </div>
            <div style={{
              fontSize: 9, color: 'var(--t3)',
              fontFamily: 'var(--mono)',
              letterSpacing: '.12em', textTransform: 'uppercase',
            }}>
              Smart Forecast
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex', gap: 4,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 12, padding: 4,
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              style={{
                padding: '7px 18px',
                borderRadius: 9,
                border: 'none',
                fontWeight: 600, fontSize: 12,
                letterSpacing: '.05em',
                transition: 'all .2s',
                background: activeTab === tab.id
                  ? 'rgba(59,158,255,0.18)'
                  : 'transparent',
                color: activeTab === tab.id
                  ? 'var(--blue)'
                  : 'var(--t2)',
                outline: activeTab === tab.id
                  ? '1px solid rgba(59,158,255,0.35)'
                  : '1px solid transparent',
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
