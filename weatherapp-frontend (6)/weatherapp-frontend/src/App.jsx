import React, { useState, useEffect, useCallback } from 'react';
import useWeather    from './hooks/useWeather';
import useAIInsight  from './hooks/useAIInsight';
import { buildAlerts } from './utils/weatherHelpers';

import SearchBar      from './components/SearchBar';
import MainWeatherCard from './components/MainWeatherCard';
import WeekForecast   from './components/WeekForecast';
import ForecastChart  from './components/ForecastChart';
import StatsGrid      from './components/StatsGrid';
import SunriseSunset  from './components/SunriseSunset';
import AirQuality     from './components/AirQuality';
import RainChance     from './components/RainChance';
import AIInsightBox   from './components/AIInsightBox';
import AlertBanner    from './components/AlertBanner';
import HistoryPanel   from './components/HistoryPanel';
import AIChatBox      from './components/AIChatBox';

export default function App() {
  const [tab,      setTab]      = useState('dashboard');
  const [alerts,   setAlerts]   = useState([]);
  const [chatOpen, setChatOpen] = useState(false);

  const { weather, history, loading, error, fetchWeather, fetchHistory, clearError } = useWeather();
  const { insight, loading: aiLoading, typing, generate, reset } = useAIInsight();

  useEffect(() => { fetchHistory(); }, [fetchHistory]);

  useEffect(() => {
    if (weather) { setAlerts(buildAlerts(weather)); generate(weather); }
    else { setAlerts([]); reset(); }
  }, [weather]);

  const handleSearch = useCallback(async (city) => {
    const data = await fetchWeather(city);
    if (data) fetchHistory();
  }, [fetchWeather, fetchHistory]);

  return (
    <div style={{
      width: '100vw', height: '100vh',
      background: '#0a0a10',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>

      {/* ── TOP NAVBAR ─────────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', height: 56, flexShrink: 0,
        background: '#0d0d18', borderBottom: '1px solid #1a1a2e',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 9,
            background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
            boxShadow: '0 0 16px rgba(59,130,246,0.4)',
          }}>🌤️</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, letterSpacing: '-0.02em', background: 'linear-gradient(90deg,#fff,#60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>WeatherAI</div>
            <div style={{ fontSize: 8, color: '#333', letterSpacing: '.14em', textTransform: 'uppercase' }}>Smart Forecast</div>
          </div>
        </div>

        {/* Live status */}
        {weather && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#13131f', border: '1px solid #1e1e2e', borderRadius: 10, padding: '7px 18px' }}>
            <span style={{ fontWeight: 700 }}>📍 {weather.city}</span>
            <div style={{ width: 1, height: 16, background: '#2a2a40' }} />
            <span style={{ fontWeight: 800, color: '#60a5fa', fontSize: 18 }}>{Math.round(weather.temperature)}°C</span>
            <div style={{ width: 1, height: 16, background: '#2a2a40' }} />
            <span style={{ color: '#666', fontSize: 13 }}>{weather.condition}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 6px #22c55e', animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: 9, color: '#22c55e', letterSpacing: '.1em' }}>LIVE</span>
            </div>
          </div>
        )}

        {/* Tabs + time */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', background: '#13131f', border: '1px solid #1e1e2e', borderRadius: 8, padding: 3, gap: 3 }}>
            {[{ id: 'dashboard', label: '⚡ Dashboard' }, { id: 'history', label: '🕐 History' }].map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                padding: '6px 14px', borderRadius: 6, border: 'none',
                fontSize: 12, fontWeight: 600, transition: 'all .2s',
                background: tab === t.id ? 'rgba(59,130,246,0.2)' : 'transparent',
                color: tab === t.id ? '#60a5fa' : '#555',
                outline: tab === t.id ? '1px solid rgba(59,130,246,0.35)' : '1px solid transparent',
              }}>{t.label}</button>
            ))}
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: 13, color: '#444', background: '#13131f', border: '1px solid #1e1e2e', borderRadius: 8, padding: '6px 12px' }}>
            {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>

      {/* ── BODY ───────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* ── LEFT SIDEBAR ── */}
        <div style={{
          width: 260, flexShrink: 0,
          background: '#0d0d1a', borderRight: '1px solid #1a1a2e',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}>
          <SearchBar onSearch={handleSearch} loading={loading} />

          <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
            {/* Error */}
            {error && (
              <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: '10px 12px', marginBottom: 12, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <span>❌</span>
                <div>
                  <div style={{ fontSize: 12, color: '#fca5a5', lineHeight: 1.5 }}>{error}</div>
                  <button onClick={clearError} style={{ marginTop: 4, fontSize: 11, color: '#666', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>Dismiss</button>
                </div>
              </div>
            )}

            {/* Alerts */}
            {alerts.length > 0 && <div style={{ marginBottom: 14 }}><AlertBanner alerts={alerts} /></div>}

            {/* AI Insight */}
            <div style={{ marginBottom: 14 }}>
              <AIInsightBox insight={insight} loading={aiLoading} typing={typing} />
            </div>

            {/* Main weather card */}
            <MainWeatherCard weather={weather} history={history} onCityClick={handleSearch} />
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 14 }}>

          {tab === 'dashboard' && (
            <>
              <WeekForecast weather={weather} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: 14 }}>
                <ForecastChart weather={weather} />
                <SunriseSunset weather={weather} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 240px 240px', gap: 14 }}>
                <AirQuality weather={weather} />
                <StatsGrid weather={weather} />
                <RainChance weather={weather} />
              </div>
            </>
          )}

          {tab === 'history' && (
            <div style={{ maxWidth: 700 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 20 }}>Search History</div>
                  <div style={{ color: '#555', fontSize: 13, marginTop: 2 }}>{history.length} cities searched</div>
                </div>
                <button onClick={fetchHistory} style={{
                  padding: '8px 14px', borderRadius: 10,
                  background: '#13131f', border: '1px solid #1e1e2e',
                  color: '#888', fontSize: 12, fontWeight: 600,
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#3b82f6'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#1e1e2e'}
                >🔄 Refresh</button>
              </div>
              <HistoryPanel history={history} onSelect={(c) => { setTab('dashboard'); handleSearch(c); }} />
            </div>
          )}
        </div>
      </div>

      {/* ── AI CHAT BUTTON ── */}
      <button onClick={() => setChatOpen(o => !o)} style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 999,
        width: 56, height: 56, borderRadius: '50%', border: 'none',
        background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
        fontSize: 24, cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(59,130,246,0.5)',
        transition: 'transform .2s',
      }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >🤖</button>

      {/* ── AI CHAT BOX ── */}
      <AIChatBox weather={weather} open={chatOpen} onClose={() => setChatOpen(false)} />

    </div>
  );
}