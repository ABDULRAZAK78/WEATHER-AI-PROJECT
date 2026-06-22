import React from 'react';

const AIInsightBox = ({ insight, loading, typing }) => (
  <div style={{
    background: 'linear-gradient(135deg,rgba(139,92,246,0.12),rgba(59,130,246,0.08))',
    borderRadius: 16, padding: '16px 20px',
    border: '1px solid rgba(139,92,246,0.25)',
    position: 'relative', overflow: 'hidden',
  }}>
    <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(139,92,246,0.08)', filter: 'blur(30px)', pointerEvents: 'none' }} />
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
      <div style={{
        width: 28, height: 28, borderRadius: 8,
        background: 'linear-gradient(135deg,#8b5cf6,#3b82f6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
      }}>✨</div>
      <span style={{ fontWeight: 700, fontSize: 13, color: '#a78bfa', letterSpacing: '.04em' }}>AI Insight</span>
      {(loading || typing) && (
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#a78bfa', display: 'inline-block', animation: 'pulse 1s infinite' }} />
      )}
    </div>
    {loading ? (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {[90, 75, 60].map((w, i) => <div key={i} className="skeleton" style={{ height: 12, width: `${w}%` }} />)}
      </div>
    ) : (
      <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.7 }}>
        {insight || 'Search a city to get an AI-powered weather insight.'}
        {typing && <span style={{ animation: 'blink .6s infinite', color: '#a78bfa' }}> |</span>}
      </p>
    )}
  </div>
);

export default AIInsightBox;
