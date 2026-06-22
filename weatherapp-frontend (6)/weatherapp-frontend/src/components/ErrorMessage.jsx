import React from 'react';

const ErrorMessage = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <div
      className="fade-in"
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px', marginBottom: 20,
        background: 'rgba(248,113,113,0.09)',
        border: '1px solid rgba(248,113,113,0.3)',
        borderRadius: 'var(--r-sm)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 16 }}>❌</span>
        <span style={{ fontSize: 13, color: '#fca5a5', lineHeight: 1.5 }}>{message}</span>
      </div>
      <button
        onClick={onDismiss}
        style={{
          background: 'none', border: 'none',
          color: 'var(--t3)', fontSize: 18,
          lineHeight: 1, flexShrink: 0, marginLeft: 12,
          transition: 'color .2s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--red)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--t3)'}
      >
        ×
      </button>
    </div>
  );
};

export default ErrorMessage;
