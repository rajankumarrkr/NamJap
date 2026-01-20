import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';

const Layout = () => {
  return (
    <div className="min-h-screen bg-orange-50 dark:bg-gray-900 relative overflow-hidden font-['Outfit']">
      {/* Background Decorative Elements */}
      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-saffron-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Content Area */}
      <main className="relative z-10 max-w-lg mx-auto min-h-screen flex flex-col">
        <div className="flex-1 px-4 pt-4 pb-32">
          <Outlet />
        </div>
      </main>

      {/* Fixed Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Layout;
