import { useState, useCallback } from 'react';
import axios from 'axios';

const useWeather = () => {
  const [weather,     setWeather]     = useState(null);
  const [history,     setHistory]     = useState([]);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState('');

  const fetchWeather = useCallback(async (city) => {
    if (!city?.trim()) return null;
    setLoading(true); setError(''); setWeather(null);
    try {
      const res = await axios.get(`/api/weather/${encodeURIComponent(city.trim())}`);
      setWeather(res.data);
      return res.data;
    } catch (err) {
      const msg = err.response?.data?.message || `Could not find "${city}". Check city name.`;
      setError(typeof msg === 'string' ? msg : 'Error fetching weather.');
      return null;
    } finally { setLoading(false); }
  }, []);

  const fetchHistory = useCallback(async () => {
    try {
      const res = await axios.get('/api/weather/history');
      setHistory(res.data || []);
    } catch { setHistory([]); }
  }, []);

  const clearError = useCallback(() => setError(''), []);
  return { weather, history, loading, error, fetchWeather, fetchHistory, clearError };
};

export default useWeather;
