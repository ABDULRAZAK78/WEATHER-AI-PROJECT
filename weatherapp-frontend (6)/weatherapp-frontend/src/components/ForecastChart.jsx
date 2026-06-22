import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceDot,
} from 'recharts';
import { getMockForecast } from '../utils/weatherHelpers';

const CustomDot = (props) => {
  const { cx, cy, value } = props;
  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill="#3b82f6" stroke="#1e3a6e" strokeWidth={2} />
    </g>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div style={{
        background: '#c2410c', borderRadius: 8, padding: '5px 10px',
        fontSize: 12, fontWeight: 700, color: '#fff',
      }}>
        {payload[0].value} °C
      </div>
    );
  }
  return null;
};

const ForecastChart = ({ weather }) => {
  const data = getMockForecast(weather).map(f => ({ day: f.day, temp: f.temp }));

  return (
    <div style={{ background: '#13131f', borderRadius: 16, padding: '18px 20px' }}>
      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 16, color: '#ddd' }}>Weather Forecast</div>
      {!weather ? (
        <div className="skeleton" style={{ height: 160 }} />
      ) : (
        <ResponsiveContainer width="100%" height={170}>
          <LineChart data={data} margin={{ top: 20, right: 10, bottom: 0, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" vertical={false} />
            <XAxis dataKey="day" tick={{ fill: '#555', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#555', fontSize: 11 }} axisLine={false} tickLine={false} domain={['auto','auto']} />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Line
              type="monotone" dataKey="temp"
              stroke="#3b82f6" strokeWidth={2.5}
              dot={<CustomDot />} activeDot={{ r: 7, fill: '#60a5fa' }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ForecastChart;
