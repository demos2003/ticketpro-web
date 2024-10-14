import { PureComponent } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

// Example data for stadium attendance in Lagos
const data = [
  {
    stadium: 'Teslim Balogun',
    attendance: 1200,
    fullCapacity: 1500,
  },
  {
    stadium: 'Onikan Stadium',
    attendance: 980,
    fullCapacity: 1300,
  },
  {
    stadium: 'Agege Stadium',
    attendance: 860,
    fullCapacity: 1200,
  },
  {
    stadium: 'Surulere Stadium',
    attendance: 1050,
    fullCapacity: 1400,
  },
  {
    stadium: 'Eko Atlantic Arena',
    attendance: 920,
    fullCapacity: 1100,
  },
  {
    stadium: 'Tafawa Balewa Square',
    attendance: 870,
    fullCapacity: 1300,
  },
];

export default class StadiumAttendanceRadarChart extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          {/* Stadium names as the radar axis */}
          <PolarAngleAxis dataKey="stadium" tick={{ fontSize: 12 }} />
          {/* Reduce font size for the radius labels */}
          <PolarRadiusAxis tick={{ fontSize: 10 }} />
          {/* Radar plot for stadium attendance */}
          <Radar name="Attendance" dataKey="attendance" stroke="#111828" fill="#111828" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    );
  }
}
