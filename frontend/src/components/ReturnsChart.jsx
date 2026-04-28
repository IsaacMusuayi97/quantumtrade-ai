import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

import './ReturnsChart.css';

function ReturnsChart({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="chart-box">
      <h2 className="chart-title">Cumulative Returns</h2>

      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorReturn" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#1f2d4d" />

          <XAxis
            dataKey="month"
            stroke="#94a3b8"
          />

          <YAxis
            stroke="#94a3b8"
            unit="%"
          />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="return"
            stroke="#00d4ff"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorReturn)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ReturnsChart;