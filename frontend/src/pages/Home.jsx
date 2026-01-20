import { useState, useEffect } from 'react';
import CounterButton from '../components/Home/CounterButton';
import CountCards from '../components/Home/CountCards';
import ResetButton from '../components/Home/ResetButton';
import axiosInstance from '../api/axios';

const Home = () => {
  const [counts, setCounts] = useState({
    today: 0,
    yesterday: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [incrementing, setIncrementing] = useState(false);

  // Fetch count summary on mount
  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const response = await axiosInstance.get('/count/summary');
      setCounts({
        today: response.data.today.count,
        yesterday: response.data.yesterday.count,
        total: response.data.total,
      });
    } catch (error) {
      console.error('Error fetching counts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleIncrement = async () => {
    setIncrementing(true);
    try {
      const response = await axiosInstance.post('/count/increment');

      // Update counts optimistically
      setCounts((prev) => ({
        ...prev,
        today: response.data.count,
        total: prev.total + 1,
      }));
    } catch (error) {
      console.error('Error incrementing count:', error);
      alert('Failed to update count. Please try again.');
    } finally {
      setIncrementing(false);
    }
  };

  const handleReset = async () => {
    try {
      await axiosInstance.post('/count/reset-today');

      // Update counts after reset
      setCounts((prev) => ({
        ...prev,
        today: 0,
      }));

      alert('Today\'s count has been reset successfully!');
    } catch (error) {
      console.error('Error resetting count:', error);
      alert('Failed to reset count. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto h-full flex flex-col">
      {/* Header */}
      <div className="text-center mt-4 mb-2 animate-float">
        <h1 className="text-4xl font-extrabold tracking-tight mb-1">
          <span className="text-gradient">Radhe Radhe</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
          Start your spiritual journey today
        </p>
      </div>

      {/* Counter Section */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <CounterButton onIncrement={handleIncrement} disabled={incrementing} />
      </div>

      {/* Summary Section */}
      <div className="space-y-6">
        <CountCards
          todayCount={counts.today}
          yesterdayCount={counts.yesterday}
          totalCount={counts.total}
          loading={loading}
        />

        <ResetButton onReset={handleReset} disabled={loading} />
      </div>
    </div>
  );
};

export default Home;
