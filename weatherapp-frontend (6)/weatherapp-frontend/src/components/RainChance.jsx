import React from 'react';
import { getMockRainChance } from '../utils/weatherHelpers';

const RainChance = ({ weather }) => {
  const data = getMockRainChance();

  return (
    <div style={{ background: '#13131f', borderRadius: 16, padding: '18px 20px', border: '1px solid #1e1e2e' }}>
      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 16, color: '#ddd' }}>Chances of Rain</div>
      {!weather ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[...Array(7)].map((_, i) => <div key={i} className="skeleton" style={{ height: 14, borderRadius: 4 }} />)}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {data.map(d => (
            <div key={d.day} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, fontSize: 11, color: '#888', flexShrink: 0 }}>{d.day}</div>
              <div style={{ flex: 1, height: 8, background: '#1e1e2e', borderRadius: 99, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: `${d.chance}%`,
                  background: 'linear-gradient(90deg,#3b82f6,#60a5fa)',
                  borderRadius: 99,
                  transition: 'width 1s ease',
                }} />
              </div>
              <div style={{ width: 32, fontSize: 11, color: '#888', textAlign: 'right', flexShrink: 0 }}>
                {d.chance}%
              </div>
            </div>
          ))}
          {/* Legend */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            {['0%','50%','100%'].map(l => (
              <span key={l} style={{ fontSize: 10, color: '#444' }}>{l}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RainChance;
