import React from 'react';
import { getWeatherMeta, getMockForecast } from '../utils/weatherHelpers';

const WeekForecast = ({ weather }) => {
  const forecast = getMockForecast(weather);

  if (!weather) return (
    <div style={{ display: 'flex', gap: 8 }}>
      {[...Array(7)].map((_, i) => (
        <div key={i} className="skeleton" style={{ flex: 1, height: 90, borderRadius: 14 }} />
      ))}
    </div>
  );

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {forecast.map((f, i) => {
        const { emoji } = getWeatherMeta(f.condition);
        const isToday = i === 0;
        return (
          <div key={i} style={{
            flex: 1, background: isToday ? 'rgba(96,165,250,0.15)' : '#13131f',
            borderRadius: 14, padding: '12px 8px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            border: isToday ? '1px solid rgba(96,165,250,0.3)' : '1px solid #1e1e2e',
            transition: 'background .2s', cursor: 'default',
          }}>
            <div style={{ fontSize: 24 }}>{emoji}</div>
            <div style={{ fontSize: 11, color: '#888', fontWeight: 500 }}>{f.day}</div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>{f.temp} °C</div>
          </div>
        );
      })}
    </div>
  );
};

export default WeekForecast;
