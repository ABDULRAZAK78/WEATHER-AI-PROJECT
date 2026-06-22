import React from 'react';
import { getWeatherMeta } from '../utils/weatherHelpers';

const MainWeatherCard = ({ weather, history, onCityClick }) => {
  const { emoji, bg } = getWeatherMeta(weather?.condition);

  if (!weather) return (
    <div style={{
      background: '#13131f', borderRadius: 20, padding: 24,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: 12, minHeight: 280,
    }}>
      <div style={{ fontSize: 60 }}>🌍</div>
      <div style={{ color: '#555', fontSize: 14, textAlign: 'center' }}>Search a city<br/>to see weather</div>
    </div>
  );

  return (
    <div style={{
      background: `linear-gradient(145deg, #2d1f0e 0%, #1a1428 50%, #0f1020 100%)`,
      borderRadius: 20, padding: 24, position: 'relative', overflow: 'hidden',
    }}>
      {/* Glow blob */}
      <div style={{
        position: 'absolute', top: -40, right: -40,
        width: 160, height: 160, borderRadius: '50%',
        background: 'rgba(251,191,36,0.08)', filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />

      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 13 }}>📍</span>
          <span style={{ fontWeight: 700, fontSize: 16 }}>{weather.city}</span>
        </div>
        <div style={{ fontSize: 11, color: '#666' }}>
          Last Updated, {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
        </div>
      </div>

      {/* Weather icon + dots */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div style={{ fontSize: 64 }}>{emoji}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {['#f97316','#60a5fa','#8b5cf6','#374151'].map((c, i) => (
            <div key={i} style={{
              width: 10, height: 10, borderRadius: '50%',
              background: i === 3 ? 'transparent' : c,
              border: i === 3 ? '2px solid #555' : 'none',
            }} />
          ))}
        </div>
      </div>

      {/* Temp */}
      <div style={{ fontSize: 56, fontWeight: 800, letterSpacing: '-2px', lineHeight: 1, marginBottom: 6 }}>
        {Math.round(weather.temperature)} °C
      </div>
      <div style={{ fontSize: 16, color: '#aaa', marginBottom: 20 }}>{weather.condition}</div>

      {/* Recent cities row */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
        {/* Current city highlighted */}
        <div style={{
          background: 'rgba(255,255,255,0.12)', borderRadius: 12,
          padding: '10px 14px', flexShrink: 0, cursor: 'default',
          border: '1px solid rgba(255,255,255,0.2)',
        }}>
          <div style={{ fontSize: 11, color: '#aaa', marginBottom: 2 }}>{weather.city}</div>
          <div style={{ fontWeight: 700, fontSize: 14 }}>{Math.round(weather.temperature)} °C</div>
        </div>
        {/* History cities */}
        {history.slice(0, 3).filter(h => h.city !== weather.city).map((h, i) => (
          <div key={i} onClick={() => onCityClick(h.city)} style={{
            background: 'rgba(255,255,255,0.05)', borderRadius: 12,
            padding: '10px 14px', flexShrink: 0, cursor: 'pointer',
            border: '1px solid rgba(255,255,255,0.08)',
            transition: 'background .2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          >
            <div style={{ fontSize: 11, color: '#888', marginBottom: 2 }}>{h.city}</div>
            <div style={{ fontWeight: 600, fontSize: 13 }}>{Math.round(h.temperature)} °C</div>
          </div>
        ))}
        <div style={{
          background: 'rgba(255,255,255,0.04)', borderRadius: 12,
          padding: '10px 12px', display: 'flex', alignItems: 'center',
          color: '#555', fontSize: 18, flexShrink: 0,
        }}>›</div>
      </div>
    </div>
  );
};

export default MainWeatherCard;
