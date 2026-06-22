import React from 'react';
import { getWeatherMeta, fmtDate } from '../utils/weatherHelpers';

const HistoryPanel = ({ history, onSelect }) => {
  if (!history?.length) return (
    <div style={{ textAlign: 'center', padding: '30px 0', color: '#444', fontSize: 13 }}>
      No search history yet.<br/>Search cities to see them here.
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {history.map((h, i) => {
        const { emoji, color } = getWeatherMeta(h.condition);
        return (
          <div key={i} onClick={() => onSelect(h.city)} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '10px 14px', borderRadius: 12,
            background: '#13131f', border: '1px solid #1e1e2e',
            cursor: 'pointer', transition: 'all .15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = color + '55'; e.currentTarget.style.background = '#1a1a2e'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e1e2e'; e.currentTarget.style.background = '#13131f'; }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 22 }}>{emoji}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{h.city}</div>
                <div style={{ fontSize: 11, color: '#555' }}>{h.condition}</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 800, fontSize: 18, color }}>{Math.round(h.temperature)}°C</div>
              <div style={{ fontSize: 10, color: '#444' }}>{fmtDate(h.timestamp || h.recordedAt)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HistoryPanel;
