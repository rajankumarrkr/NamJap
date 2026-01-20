import { useState, useEffect } from 'react';
import StatsCards from '../components/Stats/StatsCards';
import Chart from '../components/Stats/Chart';
import axiosInstance from '../api/axios';

const Stats = () => {
  const [stats, setStats] = useState({
    weekly: 0,
    monthly: 0,
    highest: { count: 0, date: null },
    streak: 0,
  });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchChartData();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axiosInstance.get('/stats/summary');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchChartData = async () => {
    try {
      const response = await axiosInstance.get('/stats/chart?days=7');
      setChartData(response.data.data);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    } finally {
      setChartLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Header */}
      <div className="mb-8 px-2 animate-float">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-1">
          Insight <span className="text-gradient">Stats</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
          Detailed metrics of your devotion
        </p>
      </div>

      <div className="space-y-8">
        {/* Stats Cards */}
        <StatsCards stats={stats} loading={loading} />

        {/* Chart Section */}
        <div className="px-2">
          <Chart data={chartData} loading={chartLoading} />
        </div>
      </div>
    </div>
  );
};

export default Stats;
