import React from 'react';
import { getAQILevel } from '../utils/weatherHelpers';

const CircleGauge = ({ aqi, level }) => {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(aqi / 300, 1);
  const dash = circ * pct;

  return (
    <div style={{ position: 'relative', width: 140, height: 140, flexShrink: 0 }}>
      <svg width="140" height="140" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="70" cy="70" r={r} fill="none" stroke="#1e1e2e" strokeWidth="10" />
        <circle cx="70" cy="70" r={r} fill="none" stroke={level.color} strokeWidth="10"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1s ease', filter: `drop-shadow(0 0 6px ${level.color})` }}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ fontSize: 12, color: level.color, fontWeight: 600, marginBottom: 2 }}>{level.label}</div>
        <div style={{ fontSize: 28, fontWeight: 900, color: level.color }}>{aqi}</div>
      </div>
    </div>
  );
};

const PollutantRow = ({ dot, value, label }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 70 }}>
    <div style={{ width: 8, height: 8, borderRadius: '50%', background: dot, flexShrink: 0 }} />
    <div>
      <div style={{ fontSize: 18, fontWeight: 800 }}>{value}</div>
      <div style={{ fontSize: 10, color: '#666' }}>{label}</div>
    </div>
  </div>
);

const AirQuality = ({ weather }) => {
  // Mock AQI data (replace with real air quality API later)
  const aqi = weather ? Math.floor(Math.random() * 80 + 5) : 9;
  const level = getAQILevel(aqi);
  const pollutants = [
    { dot: '#22c55e', value: 9,   label: 'PM10' },
    { dot: '#eab308', value: 50,  label: 'O3'   },
    { dot: '#22c55e', value: 14,  label: 'SO2'  },
    { dot: '#eab308', value: 7,   label: 'PM2.5'},
    { dot: '#f97316', value: 577, label: 'CO'   },
    { dot: '#22c55e', value: 14,  label: 'NO2'  },
  ];

  return (
    <div style={{ background: '#13131f', borderRadius: 16, padding: '18px 20px', border: '1px solid #1e1e2e' }}>
      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 16, color: '#ddd' }}>Air Quality Overview</div>
      <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
        {/* Gauge */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          {weather ? <CircleGauge aqi={aqi} level={level} /> : <div className="skeleton" style={{ width: 140, height: 140, borderRadius: '50%' }} />}
          <div style={{ fontSize: 11, color: '#555' }}>Air is clean and healthy</div>
        </div>
        {/* Pollutants grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 24px', flex: 1 }}>
          {pollutants.map(p => <PollutantRow key={p.label} {...p} />)}
        </div>
      </div>
    </div>
  );
};

export default AirQuality;
