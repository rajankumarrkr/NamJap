import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/Settings/ThemeToggle';
import ResetOptions from '../components/Settings/ResetOptions';
import { FaSignOutAlt, FaUser, FaInfoCircle } from 'react-icons/fa';

const Settings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Header */}
      <div className="mb-8 px-2 animate-float">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-1">
          App <span className="text-gradient">Settings</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
          Personalize your spiritual dashboard
        </p>
      </div>

      <div className="space-y-6">
        {/* User Profile Card */}
        <div className="px-2">
          <div className="saffron-gradient rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
            <div className="relative z-10 flex items-center gap-5">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-[1.5rem] flex items-center justify-center border border-white/30 shadow-xl group-hover:scale-110 transition-transform">
                <FaUser className="text-3xl text-white" />
              </div>
              <div>
                <p className="text-white/70 text-[10px] font-black uppercase tracking-widest">Active Practitioner</p>
                <p className="text-2xl font-black text-white tracking-tight">
                  {user?.mobile || 'Spiritual Soul'}
                </p>
              </div>
            </div>
            {/* Decorative Background Icon */}
            <FaUser className="absolute -bottom-4 -right-4 text-8xl text-white/5 opacity-20 transform rotate-12 group-hover:scale-125 transition-transform" />
          </div>
        </div>

        {/* Settings Group */}
        <div className="space-y-4 px-2">
          <ThemeToggle />

          <div className="glass-card rounded-3xl p-5 flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-saffron-500/10 text-saffron-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaInfoCircle className="text-xl" />
              </div>
              <div>
                <p className="text-gray-800 dark:text-white font-bold text-sm">App Version</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">v1.2.0 • Stable Release</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-saffron-50 dark:bg-saffron-900/20 text-saffron-600 dark:text-saffron-400 rounded-full text-[10px] font-black tracking-tighter">LATEST</span>
          </div>

          <ResetOptions />
        </div>

        {/* Logout Section */}
        <div className="px-6 pt-4">
          <button
            onClick={handleLogout}
            className="w-full py-4 rounded-[1.5rem] bg-rose-50 dark:bg-rose-900/10 text-rose-500 font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 border border-rose-200/50 dark:border-rose-900/20 hover:bg-rose-500 hover:text-white transition-all duration-300 shadow-sm"
          >
            <FaSignOutAlt className="text-lg" />
            <span>Sign Out Securely</span>
          </button>
        </div>

        {/* Footer Info */}
        <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] pb-10">
          Made with 🙏 for humanity
        </p>
      </div>
    </div>
  );
};

export default Settings;
