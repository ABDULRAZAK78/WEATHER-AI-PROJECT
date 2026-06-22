import React from 'react';
import { getWeatherMeta, fmt } from '../utils/weatherHelpers';

const WeatherCard = ({ weather }) => {
  const { emoji, color, gradient } = getWeatherMeta(weather.condition);
  const temp = Math.round(weather.temperature);
  const feels = Math.round(weather.feelsLike ?? weather.temperature);

  return (
    <div
      className="fade-up glass-card"
      style={{
        padding: '28px 32px',
        marginBottom: 16,
        background: gradient,
        position: 'relative',
        overflow: 'hidden',
        animationDelay: '.05s',
      }}
    >
      {/* Giant emoji watermark */}
      <div
        className="floating"
        style={{
          position: 'absolute', right: 28, top: '50%',
          transform: 'translateY(-50%)',
          fontSize: 110, opacity: 0.1,
          pointerEvents: 'none',
          userSelect: 'none',
          lineHeight: 1,
        }}
      >
        {emoji}
      </div>

      {/* Accent glow */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: '100%', height: 3,
        background: `linear-gradient(to right, ${color}, transparent)`,
        borderRadius: '20px 20px 0 0',
      }} />

      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>

        {/* Left — temp + city */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
            <span style={{ fontSize: 13 }}>📍</span>
            <span style={{
              fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 600,
              letterSpacing: '.1em', textTransform: 'uppercase',
              color: color,
            }}>
              {weather.city}
            </span>
          </div>

          <div style={{
            fontFamily: 'var(--font)',
            fontSize: 80, fontWeight: 900,
            letterSpacing: '-0.05em', lineHeight: 1,
            color: 'var(--t1)',
          }}>
            {temp}
            <span style={{ fontSize: 32, fontWeight: 400, color: 'var(--t2)', marginLeft: 4 }}>°C</span>
          </div>

          <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 22 }}>{emoji}</span>
            <span style={{ fontSize: 17, color: 'var(--t2)', fontWeight: 500 }}>
              {weather.condition}
            </span>
          </div>

          <div style={{ marginTop: 6, fontSize: 13, color: 'var(--t3)' }}>
            Feels like &nbsp;
            <span style={{ color: 'var(--t2)', fontWeight: 600 }}>{feels}°C</span>
          </div>
        </div>

        {/* Right — hi/lo + time */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
          {weather.high != null && weather.low != null && (
            <div style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10, padding: '10px 14px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 11, color: 'var(--t3)', fontFamily: 'var(--mono)', letterSpacing: '.08em', marginBottom: 6 }}>
                H / L
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 16, fontWeight: 700 }}>
                <span style={{ color: '#fb923c' }}>↑ {Math.round(weather.high)}°</span>
                <span style={{ color: 'var(--t3)' }}>|</span>
                <span style={{ color: '#38bdf8' }}>↓ {Math.round(weather.low)}°</span>
              </div>
            </div>
          )}

          <div style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 8, padding: '7px 12px',
            fontFamily: 'var(--mono)', fontSize: 12,
            color: 'var(--t3)',
          }}>
            🕐 {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>

      {/* Bottom mini stats */}
      <div style={{
        display: 'flex', gap: 20, flexWrap: 'wrap',
        marginTop: 20, paddingTop: 16,
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        {[
          { label: 'Humidity',   value: `${weather.humidity}%`,           icon: '💧' },
          { label: 'Wind',       value: `${weather.windSpeed} m/s`,        icon: '💨' },
          { label: 'Visibility', value: weather.visibility != null ? `${(weather.visibility / 1000).toFixed(1)} km` : '—', icon: '👁️' },
          { label: 'Pressure',   value: weather.pressure ? `${weather.pressure} hPa` : '—', icon: '🔵' },
        ].map(s => (
          <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 13 }}>{s.icon}</span>
            <div>
              <div style={{ fontSize: 11, color: 'var(--t3)', fontFamily: 'var(--mono)', letterSpacing: '.07em' }}>
                {s.label}
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--t1)' }}>
                {s.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherCard;
