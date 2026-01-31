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
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      syncOfflineCounts();
    };
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Fetch count summary on mount
  useEffect(() => {
    fetchCounts();
    if (!isOffline) {
      syncOfflineCounts();
    }
  }, []);

  const fetchCounts = async () => {
    try {
      const response = await axiosInstance.get('/count/summary');
      setCounts({
        today: response.data.today.count,
        yesterday: response.data.yesterday.count,
        total: response.data.total,
      });
      // Update local storage with latest synced data as fallback
      localStorage.setItem('radhe-counts-cached', JSON.stringify({
        today: response.data.today.count,
        yesterday: response.data.yesterday.count,
        total: response.data.total,
      }));
    } catch (error) {
      console.error('Error fetching counts:', error);
      // Try to load from cache if offline or error
      const cached = localStorage.getItem('radhe-counts-cached');
      if (cached) {
        setCounts(JSON.parse(cached));
      }
    } finally {
      setLoading(false);
    }
  };

  const syncOfflineCounts = async () => {
    const pending = parseInt(localStorage.getItem('radhe-pending-counts') || '0');
    if (pending > 0) {
      try {
        console.log(`Syncing ${pending} offline counts...`);
        // We'll need a bulk increment or call multiple times
        // For simplicity, we can loop or the backend might need an update
        // Here we'll just loop for now, but in a real app a bulk API is better
        for (let i = 0; i < pending; i++) {
          await axiosInstance.post('/count/increment');
        }
        localStorage.setItem('radhe-pending-counts', '0');
        fetchCounts(); // Refresh from server after sync
      } catch (error) {
        console.error('Failed to sync offline counts:', error);
      }
    }
  };

  const handleIncrement = async () => {
    setIncrementing(true);

    // Optimistic Update
    setCounts((prev) => ({
      ...prev,
      today: prev.today + 1,
      total: prev.total + 1,
    }));

    if (isOffline) {
      // Save for later sync
      const pending = parseInt(localStorage.getItem('radhe-pending-counts') || '0');
      localStorage.setItem('radhe-pending-counts', (pending + 1).toString());
      setIncrementing(false);
      return;
    }

    try {
      const response = await axiosInstance.post('/count/increment');
      // Sync with server response just in case
      setCounts((prev) => ({
        ...prev,
        today: response.data.count,
        total: prev.total, // keep optimistic total as response might not have it
      }));
    } catch (error) {
      console.error('Error incrementing count:', error);
      // If error was network related, treat as offline
      if (!error.response) {
        const pending = parseInt(localStorage.getItem('radhe-pending-counts') || '0');
        localStorage.setItem('radhe-pending-counts', (pending + 1).toString());
      } else {
        alert('Failed to update count. Please try again.');
        // Revert optimistic update
        setCounts((prev) => ({
          ...prev,
          today: prev.today - 1,
          total: prev.total - 1,
        }));
      }
    } finally {
      setIncrementing(false);
    }
  };

  const handleReset = async () => {
    if (isOffline) {
      alert('Cannot reset counts while offline.');
      return;
    }
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
        {isOffline && (
          <div className="bg-orange-100 text-orange-800 text-xs font-bold px-2 py-1 rounded-full mb-2 inline-block">
            Offline Mode - Counts will sync later
          </div>
        )}
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
