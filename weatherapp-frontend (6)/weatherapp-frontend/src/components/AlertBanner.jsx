import React from 'react';

const AlertBanner = ({ alerts }) => {
  if (!alerts?.length) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {alerts.map((a, i) => (
        <div key={i} style={{
          display: 'flex', gap: 10, alignItems: 'flex-start',
          padding: '10px 14px', borderRadius: 12,
          background: 'rgba(249,115,22,0.08)',
          border: '1px solid rgba(249,115,22,0.25)',
          borderLeft: '3px solid #f97316',
        }}>
          <span style={{ fontSize: 16, flexShrink: 0 }}>{a.icon}</span>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#f97316', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '.06em' }}>{a.title}</div>
            <div style={{ fontSize: 12, color: '#888', lineHeight: 1.5 }}>{a.msg}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertBanner;
