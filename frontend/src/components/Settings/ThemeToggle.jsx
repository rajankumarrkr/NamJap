import { useTheme } from '../../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="glass-card rounded-3xl p-5 flex items-center justify-between group">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 ${theme === 'light' ? 'bg-yellow-50 text-yellow-500' : 'bg-indigo-900/30 text-indigo-400'
          }`}>
          {theme === 'light' ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
        </div>
        <div>
          <p className="text-gray-800 dark:text-white font-bold text-sm">Visual Theme</p>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            {theme === 'light' ? 'Light Appearance' : 'Dark Appearance'}
          </p>
        </div>
      </div>

      <button
        onClick={toggleTheme}
        className={`
          relative w-14 h-8 rounded-full transition-all duration-500 ease-in-out border border-white/20 shadow-inner
          ${theme === 'light' ? 'bg-gray-100' : 'bg-indigo-600'}
        `}
      >
        <div
          className={`
            absolute top-1 w-6 h-6 rounded-full shadow-2xl transition-all duration-500 ease-in-out flex items-center justify-center
            ${theme === 'light' ? 'left-1 bg-white' : 'left-7 bg-white'}
          `}
        >
          <div className={`w-1 h-1 rounded-full ${theme === 'light' ? 'bg-yellow-500' : 'bg-indigo-500'}`} />
        </div>
      </button>
    </div>
  );
};

export default ThemeToggle;
