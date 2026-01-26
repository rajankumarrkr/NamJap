import { NavLink } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { FaHistory, FaChartBar, FaCog } from 'react-icons/fa';

const BottomNav = () => {
  const navItems = [
    { path: '/home', icon: AiFillHome, label: 'Home' },
    { path: '/history', icon: FaHistory, label: 'History' },
    { path: '/stats', icon: FaChartBar, label: 'Stats' },
    { path: '/settings', icon: FaCog, label: 'Settings' },
  ];

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 px-4">
      <nav className="max-w-[440px] mx-auto glass-card rounded-2xl overflow-hidden border border-white/40 dark:border-gray-700/50 shadow-2xl">
        <div className="flex justify-around items-center h-16 ">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center flex-1 py-3  transition-all duration-300 relative ${isActive
                  ? 'text-saffron-600 dark:text-saffron-500'
                  : 'text-gray-500 dark:text-gray-400 hover:text-saffron-400'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute inset-0 bg-saffron-500/10 dark:bg-saffron-500/20 rounded-xl m-1 scale-90 transition-transform duration-300" />
                  )}
                  <item.icon
                    className={`text-xl mb-1 transition-all duration-300 ${isActive ? 'scale-110 translate-y-[-2px]' : 'scale-100'
                      }`}
                  />
                  <span className={`text-[10px] font-semibold transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-70'
                    }`}>
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default BottomNav;
