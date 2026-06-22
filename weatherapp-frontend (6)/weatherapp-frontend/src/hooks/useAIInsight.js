import { useState, useCallback, useRef } from 'react';

const API_BASE = process.env.REACT_APP_API_URL || '';

const useAIInsight = () => {
  const [insight, setInsight] = useState('');
  const [loading, setLoading] = useState(false);
  const [typing,  setTyping]  = useState(false);
  const timer = useRef(null);

  const generate = useCallback(async (w) => {
    if (!w) return;
    clearInterval(timer.current);
    setInsight(''); setTyping(false); setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/weather/ai-insight`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          city: w.city,
          temperature: w.temperature,
          humidity: w.humidity,
          condition: w.condition,
          windSpeed: w.windSpeed
        }),
      });
      const data = await res.json();
      const full = data.insight || fallback(w);
      setLoading(false);
      typewrite(full);
    } catch {
      setLoading(false);
      typewrite(fallback(w));
    }
  }, []);

  const typewrite = (text) => {
    let i = 0; setTyping(true);
    timer.current = setInterval(() => {
      i++; setInsight(text.slice(0, i));
      if (i >= text.length) { clearInterval(timer.current); setTyping(false); }
    }, 15);
  };

  const fallback = (w) => {
    const t = Math.round(w.temperature);
    const base = t > 32 ? `It's a hot ${t}°C in ${w.city} — light clothes and water are a must.`
               : t > 22 ? `A comfortable ${t}°C in ${w.city} — great weather to be outside.`
               : t > 12 ? `A cool ${t}°C in ${w.city} — bring a light jacket.`
               : `It's cold at ${t}°C in ${w.city} — bundle up with warm layers.`;
    const wind = w.windSpeed > 10 ? ` Gusty winds at ${w.windSpeed} m/s, hold onto your hat!` : '';
    return base + wind;
  };

  const reset = useCallback(() => {
    clearInterval(timer.current);
    setInsight(''); setLoading(false); setTyping(false);
  }, []);

  return { insight, loading, typing, generate, reset };
};

export default useAIInsight;