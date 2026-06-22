import React from 'react';

const Tile = ({ icon, label, value }) => (
  <div style={{
    background: '#13131f', borderRadius: 14, padding: '16px 18px',
    border: '1px solid #1e1e2e', display: 'flex', flexDirection: 'column', gap: 8,
    transition: 'border-color .2s',
  }}
    onMouseEnter={e => e.currentTarget.style.borderColor = '#2a3a5e'}
    onMouseLeave={e => e.currentTarget.style.borderColor = '#1e1e2e'}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontSize: 16 }}>{icon}</span>
      <span style={{ fontSize: 12, color: '#666', fontWeight: 500 }}>{label}</span>
    </div>
    <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.5px' }}>{value}</div>
  </div>
);

const StatsGrid = ({ weather }) => {
  const stats = weather ? [
    { icon: '💧', label: 'Humidity',      value: `${weather.humidity} %` },
    { icon: '💨', label: 'Wind Speed',    value: `${weather.windSpeed.toFixed(1)} Kph` },
    { icon: '👁️', label: 'Visibility',    value: weather.visibility != null ? `${weather.visibility} KM` : '— KM' },
    { icon: '🌡️', label: 'Pressure',      value: weather.pressure ? `${weather.pressure} mb` : '— mb' },
    { icon: '☀️', label: 'UV Index',      value: weather.uvIndex ?? '—' },
    { icon: '🌧️', label: 'Precipitation', value: weather.precipitation != null ? `${weather.precipitation} mm` : '0 mm' },
  ] : [];

  if (!weather) return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
      {[...Array(6)].map((_, i) => <div key={i} className="skeleton" style={{ height: 82, borderRadius: 14 }} />)}
    </div>
  );

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
      {stats.map(s => <Tile key={s.label} {...s} />)}
    </div>
  );
};

export default StatsGrid;