import { IoToday, IoTime, IoInfinite } from 'react-icons/io5';

const CountCards = ({ todayCount, yesterdayCount, totalCount, loading }) => {
  const cards = [
    {
      title: "Today's Japa",
      count: todayCount,
      icon: IoToday,
      color: 'text-orange-500',
      bg: 'from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20',
    },
    {
      title: "Yesterday",
      count: yesterdayCount,
      icon: IoTime,
      color: 'text-amber-500',
      bg: 'from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20',
    },
    {
      title: 'Lifetime Total',
      count: totalCount,
      icon: IoInfinite,
      color: 'text-saffron-500',
      bg: 'from-saffron-50 to-saffron-100 dark:from-saffron-900/20 dark:to-saffron-800/20',
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 px-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`glass-card rounded-2xl p-4 animate-pulse ${i === 3 ? 'col-span-2' : ''}`}
          >
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 px-2 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`
            glass-card rounded-2xl p-4 relative overflow-hidden group
            ${index === 2 ? 'col-span-2' : ''}
          `}
        >
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-[10px] uppercase tracking-wider font-bold mb-1">
                {card.title}
              </p>
              <p className="text-2xl font-black text-gray-800 dark:text-gray-100 tracking-tight">
                {card.count.toLocaleString()}
              </p>
            </div>
            <div className={`p-2 rounded-xl bg-white dark:bg-gray-800 shadow-sm ${card.color}`}>
              <card.icon className="text-xl" />
            </div>
          </div>

          {/* Decorative Background Icon */}
          <card.icon className={`absolute -bottom-2 -right-2 text-6xl opacity-[0.03] dark:opacity-[0.05] group-hover:scale-110 transition-transform`} />
        </div>
      ))}
    </div>
  );
};

export default CountCards;
