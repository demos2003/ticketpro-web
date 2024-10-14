import { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Revenue trend data
const revenueTrend = [
  { date: '2023-09-01', revenue: 5000 },
  { date: '2023-09-02', revenue: 7000 },
  { date: '2023-09-03', revenue: 3000 },
  { date: '2023-09-04', revenue: 8000 },
  { date: '2023-09-05', revenue: 10000 },
  { date: '2023-09-06', revenue: 6000 },
  { date: '2023-09-07', revenue: 12000 },
  // More data points...
];

export default class RevenueTrendChart extends PureComponent {
  render() {
    return (
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <AreaChart
            data={revenueTrend}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            {/* X-axis to display the date */}
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            {/* Y-axis to display the revenue */}
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            {/* Area graph for revenue */}
            <Area type="monotone" dataKey="revenue" stroke="#111828" fill="#111828" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
