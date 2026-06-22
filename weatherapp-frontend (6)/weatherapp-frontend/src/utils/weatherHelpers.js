export const getWeatherMeta = (condition = '') => {
  const c = condition.toLowerCase();
  if (c.includes('thunder') || c.includes('storm'))
    return { emoji: '⛈️', color: '#a78bfa', bg: 'rgba(167,139,250,0.15)' };
  if (c.includes('drizzle') || c.includes('rain'))
    return { emoji: '🌧️', color: '#60a5fa', bg: 'rgba(96,165,250,0.15)' };
  if (c.includes('snow'))
    return { emoji: '❄️', color: '#bae6fd', bg: 'rgba(186,230,253,0.15)' };
  if (c.includes('mist') || c.includes('fog') || c.includes('haze'))
    return { emoji: '🌫️', color: '#94a3b8', bg: 'rgba(148,163,184,0.15)' };
  if (c.includes('clear') || c.includes('sunny'))
    return { emoji: '☀️', color: '#fbbf24', bg: 'rgba(251,191,36,0.15)' };
  if (c.includes('cloud'))
    return { emoji: '⛅', color: '#93c5fd', bg: 'rgba(147,197,253,0.15)' };
  return { emoji: '🌤️', color: '#60a5fa', bg: 'rgba(96,165,250,0.15)' };
};

export const buildAlerts = (w) => {
  if (!w) return [];
  const a = [];
  if (w.temperature > 38) a.push({ icon: '🌡️', title: 'Extreme Heat', msg: `${Math.round(w.temperature)}°C — Stay hydrated.` });
  if (w.temperature < 2)  a.push({ icon: '🥶', title: 'Freezing', msg: `${Math.round(w.temperature)}°C — Ice risk on roads.` });
  if (w.windSpeed > 15)   a.push({ icon: '💨', title: 'High Wind', msg: `${w.windSpeed} m/s — Secure loose items.` });
  if (w.humidity > 85)    a.push({ icon: '💧', title: 'High Humidity', msg: `${w.humidity}% — Feels hotter than shown.` });
  const c = (w.condition || '').toLowerCase();
  if (c.includes('thunder')) a.push({ icon: '⚡', title: 'Storm Warning', msg: 'Stay indoors away from windows.' });
  return a;
};

export const fmtDate = (ts) => {
  if (!ts) return '';
  return new Date(ts).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

// Generate mock 7-day forecast from current weather (until backend provides forecast)
export const getMockForecast = (weather) => {
  if (!weather) return [];
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const today = new Date().getDay();
  const conditions = ['Partly Cloudy','Sunny','Cloudy','Partly Cloudy','Clear','Sunny','Cloudy'];
  return Array.from({ length: 7 }, (_, i) => ({
    day: days[(today + i) % 7],
    temp: +(weather.temperature + (Math.random() * 4 - 2)).toFixed(1),
    condition: conditions[i % conditions.length],
  }));
};

// Mock rain chance data
export const getMockRainChance = () => {
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  return days.map(d => ({ day: d, chance: Math.floor(Math.random() * 80) + 10 }));
};

// AQI level label and color
export const getAQILevel = (aqi) => {
  if (aqi <= 50)  return { label: 'Good',      color: '#22c55e' };
  if (aqi <= 100) return { label: 'Moderate',  color: '#eab308' };
  if (aqi <= 150) return { label: 'Unhealthy', color: '#f97316' };
  return               { label: 'Hazardous',  color: '#ef4444' };
};
