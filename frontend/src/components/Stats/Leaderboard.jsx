import { IoTrophy, IoMedal, IoStar } from 'react-icons/io5';

const Leaderboard = ({ data, loading }) => {
    if (loading) {
        return (
            <div className="glass-card rounded-[2.5rem] p-6 animate-pulse">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6" />
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-4 mb-4">
                        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full" />
                        <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                        <div className="w-12 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                    </div>
                ))}
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="glass-card rounded-[2.5rem] p-8 text-center border-dashed border-2 border-gray-200 dark:border-gray-800">
                <p className="text-gray-400 font-medium">No leaderboard data available</p>
            </div>
        );
    }

    const getRankStyles = (index) => {
        switch (index) {
            case 0:
                return {
                    icon: IoTrophy,
                    color: 'text-yellow-500',
                    bg: 'bg-yellow-500/10',
                    border: 'border-yellow-500/20',
                    scale: 'scale-110 shadow-lg shadow-yellow-500/10',
                };
            case 1:
                return {
                    icon: IoMedal,
                    color: 'text-slate-400',
                    bg: 'bg-slate-400/10',
                    border: 'border-slate-400/20',
                    scale: 'scale-105',
                };
            case 2:
                return {
                    icon: IoMedal,
                    color: 'text-amber-700',
                    bg: 'bg-amber-700/10',
                    border: 'border-amber-700/20',
                };
            default:
                return {
                    icon: null,
                    color: 'text-gray-400',
                    bg: 'bg-gray-100 dark:bg-gray-800/50',
                    border: 'border-transparent',
                };
        }
    };

    return (
        <div className="glass-card rounded-[2.5rem] p-6">
            <div className="flex items-center justify-between mb-8 px-2">
                <h3 className="text-sm font-black text-gray-800 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <IoStar className="text-amber-500" /> Professional Leaderboard
                </h3>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100 dark:bg-gray-800/50 px-2 py-1 rounded-full">
                    Top 20 Devotees
                </span>
            </div>

            <div className="space-y-3">
                {data.map((entry, index) => {
                    const styles = getRankStyles(index);
                    const Icon = styles.icon;

                    return (
                        <div
                            key={entry._id}
                            className={`flex items-center gap-4 p-4 rounded-3xl border transition-all duration-300 hover:translate-x-1 ${styles.border} ${styles.scale || ''}`}
                        >
                            <div className={`w-10 h-10 rounded-2xl ${styles.bg} ${styles.color} flex items-center justify-center font-black text-lg`}>
                                {Icon ? <Icon className="text-xl" /> : index + 1}
                            </div>

                            <div className="flex-1">
                                <p className="text-sm font-black text-gray-900 dark:text-white tracking-tight">
                                    {entry.mobile}
                                </p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    Active Devotee
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="text-lg font-black text-saffron-500 tracking-tight">
                                    {entry.totalCount.toLocaleString()}
                                </p>
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                                    Total Japa
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Leaderboard;
