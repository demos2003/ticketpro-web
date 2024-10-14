import  { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Use the dailySales data
const dailySales = [
  { date: '1st', ticketsSold: 50 },
  { date: '2nd', ticketsSold: 70 },
  { date: '3rd', ticketsSold: 30 },
  { date: '4th', ticketsSold: 90 },
  { date: '5th', ticketsSold: 120 },
  { date: '6th', ticketsSold: 40 },
  { date: '7th', ticketsSold: 75 },
  
  // Add more data as needed...
];

export default class DailySalesChart extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height={385}>
        <LineChart
          data={dailySales}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date"   tick={{ fontSize: 10 }}  /> {/* Display the date on the X-axis */}
          <YAxis   tick={{ fontSize: 10 }}  /> {/* Y-axis will show the number of tickets sold */}
          <Tooltip />
          <Line type="monotone" dataKey="ticketsSold" stroke="#111828" activeDot={{ r: 8 }} /> {/* Line showing tickets sold */}
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
