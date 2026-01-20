import { formatRelativeDate, formatDisplayDate } from '../../utils/dateUtils';
import { FaHistory, FaCalendarAlt } from 'react-icons/fa';

const HistoryList = ({ records, loading }) => {
  if (loading) {
    return (
      <div className="space-y-4 px-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="glass-card rounded-3xl p-5 animate-pulse flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
            </div>
            <div className="w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="text-center py-20 px-6">
        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-[2.5rem] flex items-center justify-center text-4xl shadow-inner">
          📭
        </div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
          No Japa Recorded
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-[200px] mx-auto">
          Every count brings you closer. Start your session today!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 px-2">
      {records.map((record) => (
        <div
          key={record._id}
          className="group relative flex items-center gap-4 p-4 glass-card rounded-3xl hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300"
        >
          {/* Timeline Node */}
          <div className="relative z-10 w-12 h-12 rounded-2xl saffron-gradient flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
            <FaCalendarAlt className="text-lg opacity-80" />
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-black text-gray-800 dark:text-white uppercase tracking-tight truncate">
              {formatRelativeDate(record.date)}
            </h4>
            <p className="text-[10px] font-bold text-gray-400 tracking-wider flex items-center gap-1">
              <span className="w-1 h-1 bg-saffron-500 rounded-full" />
              {formatDisplayDate(record.date)}
            </p>
          </div>

          <div className="text-right">
            <div className="inline-flex items-center px-3 py-1 bg-saffron-50 dark:bg-saffron-900/20 text-saffron-600 dark:text-saffron-400 rounded-xl font-black text-lg">
              {record.count.toLocaleString()}
            </div>
            <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
              counts
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryList;
