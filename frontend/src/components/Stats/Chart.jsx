import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatRelativeDate } from '../../utils/dateUtils';

const Chart = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="glass-card rounded-[2.5rem] p-6 h-80 flex flex-col justify-center items-center">
        <div className="w-12 h-12 border-4 border-saffron-500/30 border-t-saffron-500 rounded-full animate-spin mb-4" />
        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Generating Chart...</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="glass-card rounded-[2.5rem] p-6 h-80 flex items-center justify-center border-dashed border-2 border-gray-200 dark:border-gray-800">
        <p className="text-gray-400 font-medium">No activity data available yet</p>
      </div>
    );
  }

  // Format data for chart
  const chartData = data.map((item) => ({
    date: formatRelativeDate(item.date).split(' ')[0], // Just the day/month
    count: item.count,
  }));

  return (
    <div className="glass-card rounded-[2.5rem] p-6 pb-2">
      <div className="flex items-center justify-between mb-8 px-2">
        <h3 className="text-sm font-black text-gray-800 dark:text-white uppercase tracking-wider">
          Daily Devotion
        </h3>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-saffron-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Last 7 Days</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" dark:stroke="#374151" opacity={0.5} />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 10, fontWeight: 700 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 10, fontWeight: 700 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              borderRadius: '16px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
            }}
            itemStyle={{ color: '#f97316', fontWeight: 900, textTransform: 'uppercase', fontSize: '10px' }}
            labelStyle={{ color: '#111827', fontWeight: 700, marginBottom: '4px' }}
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#f97316"
            strokeWidth={4}
            fillOpacity={1}
            fill="url(#colorCount)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
