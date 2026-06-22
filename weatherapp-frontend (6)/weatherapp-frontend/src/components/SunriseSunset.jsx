import React from 'react';

const SunriseSunset = ({ weather }) => {
  // Mock sunrise/sunset times (replace with real API data later)
  const sunrise = weather ? '05:54 AM' : '--:-- --';
  const sunset  = weather ? '06:47 PM' : '--:-- --';

  return (
    <div style={{ background: '#13131f', borderRadius: 16, padding: '18px 20px', border: '1px solid #1e1e2e' }}>
      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 18, color: '#ddd' }}>Sunrise and Sunset</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Sunrise */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 46, height: 46, borderRadius: 12,
            background: 'rgba(251,191,36,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
          }}>🌅</div>
          <div>
            <div style={{ fontSize: 11, color: '#666', marginBottom: 3 }}>Sunrise</div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{sunrise}</div>
          </div>
        </div>
        {/* Divider */}
        <div style={{ height: 1, background: '#1e1e2e' }} />
        {/* Sunset */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 46, height: 46, borderRadius: 12,
            background: 'rgba(251,146,60,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
          }}>🌇</div>
          <div>
            <div style={{ fontSize: 11, color: '#666', marginBottom: 3 }}>Sunset</div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{sunset}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SunriseSunset;
