import React from 'react';
import { getWeatherMeta, fmtDate } from '../utils/weatherHelpers';

const HistoryRow = ({ item, onSelect, delay }) => {
  const { emoji, color } = getWeatherMeta(item.condition);

  return (
    <div
      className="fade-up glass-card"
      style={{
        animationDelay: `${delay}s`,
        padding: '13px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        gap: 14,
        borderRadius: 'var(--r-sm)',
      }}
      onClick={() => onSelect(item.city)}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = color + '44';
        e.currentTarget.style.background  = 'var(--glass-hov)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--glass-bd)';
        e.currentTarget.style.background  = 'var(--glass)';
      }}
    >
      {/* Left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 26, flexShrink: 0 }}>{emoji}</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--t1)', marginBottom: 2 }}>
            {item.city}
          </div>
          <div style={{ fontSize: 12, color: 'var(--t2)' }}>
            {item.condition}
          </div>
        </div>
      </div>

      {/* Right */}
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{
          fontSize: 22, fontWeight: 800,
          letterSpacing: '-0.02em', color: color,
          marginBottom: 2,
        }}>
          {Math.round(item.temperature)}°C
        </div>
        <div style={{
          fontSize: 10, color: 'var(--t3)',
          fontFamily: 'var(--mono)',
        }}>
          {fmtDate(item.timestamp || item.recordedAt)}
        </div>
      </div>
    </div>
  );
};

const HistoryList = ({ history, histLoading, onSelect }) => {
  if (histLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[1,2,3,4,5].map(i => (
          <div key={i} className="skeleton" style={{ height: 68, borderRadius: 12 }} />
        ))}
      </div>
    );
  }

  if (!history || history.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }} className="fade-in">
        <div className="floating" style={{ fontSize: 52, marginBottom: 16 }}>🕐</div>
        <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>No History Yet</div>
        <div style={{ color: 'var(--t2)', fontSize: 14 }}>
          Search for cities on the Dashboard to see your history here.
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {history.map((item, i) => (
        <HistoryRow
          key={`${item.city}-${i}`}
          item={item}
          onSelect={onSelect}
          delay={i * 0.06}
        />
      ))}
    </div>
  );
};

export default HistoryList;
