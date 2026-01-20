import { formatDisplayDate } from '../../utils/dateUtils';
import { IoBarChart, IoStatsChart, IoRibbon, IoFlame } from 'react-icons/io5';

const StatsCards = ({ stats, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 px-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="glass-card rounded-3xl p-5 animate-pulse"
          >
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-3" />
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: 'Weekly Total',
      value: stats.weekly,
      icon: IoBarChart,
      color: 'text-orange-500',
      bg: 'bg-orange-500/10',
    },
    {
      title: 'Monthly Total',
      value: stats.monthly,
      icon: IoStatsChart,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
    },
    {
      title: 'Best Day',
      value: stats.highest.count,
      subtitle: stats.highest.date ? formatDisplayDate(stats.highest.date) : 'Get started!',
      icon: IoRibbon,
      color: 'text-saffron-500',
      bg: 'bg-saffron-500/10',
    },
    {
      title: 'Session Streak',
      value: `${stats.streak} DAYS`,
      icon: IoFlame,
      color: 'text-rose-500',
      bg: 'bg-rose-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 px-2">
      {cards.map((card, index) => (
        <div
          key={index}
          className="glass-card rounded-[2rem] p-5 relative overflow-hidden group"
        >
          <div className="flex flex-col h-full relative z-10">
            <div className={`w-10 h-10 rounded-2xl ${card.bg} ${card.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <card.icon className="text-xl" />
            </div>

            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
              {card.title}
            </p>

            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                {card.value.toLocaleString()}
              </span>
            </div>

            {card.subtitle && (
              <p className="text-[9px] font-bold text-gray-400 mt-2 truncate max-w-full">
                {card.subtitle}
              </p>
            )}
          </div>

          {/* Decorative Background Shape */}
          <div className={`absolute -bottom-6 -right-6 w-24 h-24 ${card.bg} rounded-full blur-2xl opacity-50 group-hover:scale-125 transition-transform`} />
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
