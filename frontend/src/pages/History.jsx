import { useState, useEffect } from 'react';
import ToggleView from '../components/History/ToggleView';
import HistoryList from '../components/History/HistoryList';
import axiosInstance from '../api/axios';

const History = () => {
  const [selectedDays, setSelectedDays] = useState(7);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, [selectedDays]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/history?days=${selectedDays}`);
      setRecords(response.data.records);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Header */}
      <div className="mb-8 px-2 animate-float">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-1">
          Japa <span className="text-gradient">History</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
          Reflect on your spiritual consistency
        </p>
      </div>

      <div className="space-y-6">
        {/* Toggle View */}
        <ToggleView selectedDays={selectedDays} onToggle={setSelectedDays} />

        {/* History List */}
        <div className="relative">
          {/* Timeline Line Decorative */}
          <div className="absolute left-[31px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-saffron-500/20 via-saffron-500/10 to-transparent pointer-events-none" />
          <HistoryList records={records} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default History;
