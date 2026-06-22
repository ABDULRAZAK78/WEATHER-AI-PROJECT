import React, { useState, useRef, useEffect } from 'react';

const AIChatBox = ({ weather, open, onClose }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: '👋 Hi! Ask me anything about the weather!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('/api/weather/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          city: weather?.city || 'unknown',
          temperature: weather?.temperature || 0,
          humidity: weather?.humidity || 0,
          condition: weather?.condition || 'unknown',
          windSpeed: weather?.windSpeed || 0,
        }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', text: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Sorry, I could not connect. Try again!' }]);
    }
    setLoading(false);
  };

  if (!open) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 90, right: 24, zIndex: 1000,
      width: 340, height: 460,
      background: '#0d0d18', border: '1px solid #1e1e2e',
      borderRadius: 16, display: 'flex', flexDirection: 'column',
      boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 16px', borderBottom: '1px solid #1e1e2e',
        background: 'linear-gradient(135deg,rgba(59,130,246,0.15),rgba(139,92,246,0.15))',
        borderRadius: '16px 16px 0 0',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
          }}>🤖</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13 }}>Weather Assistant</div>
            <div style={{ fontSize: 10, color: '#22c55e' }}>● Powered by Grok AI</div>
          </div>
        </div>
        <button onClick={onClose} style={{
          background: 'none', border: 'none', color: '#555',
          fontSize: 18, cursor: 'pointer', padding: '0 4px',
        }}>✕</button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
          }}>
            <div style={{
              maxWidth: '80%', padding: '8px 12px', borderRadius: 12,
              fontSize: 13, lineHeight: 1.5,
              background: m.role === 'user'
                ? 'linear-gradient(135deg,#3b82f6,#8b5cf6)'
                : 'rgba(255,255,255,0.06)',
              color: '#fff',
              borderBottomRightRadius: m.role === 'user' ? 4 : 12,
              borderBottomLeftRadius: m.role === 'assistant' ? 4 : 12,
            }}>{m.text}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{
              padding: '8px 14px', borderRadius: 12, borderBottomLeftRadius: 4,
              background: 'rgba(255,255,255,0.06)', fontSize: 18, letterSpacing: 2,
            }}>•••</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: 12, borderTop: '1px solid #1e1e2e',
        display: 'flex', gap: 8,
      }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Ask about weather..."
          style={{
            flex: 1, padding: '9px 12px',
            background: '#13131f', border: '1px solid #2a2a40',
            borderRadius: 10, color: '#fff', fontSize: 13,
          }}
          onFocus={e => e.target.style.borderColor = '#3b82f6'}
          onBlur={e => e.target.style.borderColor = '#2a2a40'}
        />
        <button onClick={send} disabled={loading || !input.trim()} style={{
          padding: '9px 14px', borderRadius: 10, border: 'none',
          background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
          color: '#fff', fontSize: 16, fontWeight: 700,
          opacity: loading || !input.trim() ? 0.5 : 1,
        }}>➤</button>
      </div>
    </div>
  );
};

export default AIChatBox;