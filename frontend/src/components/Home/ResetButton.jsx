import { FaTrashAlt, FaUndoAlt, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
const ResetButton = ({ onReset, disabled }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirm = () => {
    onReset();
    setShowConfirm(false);
  };

  if (showConfirm) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <div className="glass-card w-full max-w-xs rounded-3xl p-6 animate-scale-in">
          <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4 mx-auto">
            <FaTrashAlt className="text-red-600 dark:text-red-400 text-xl" />
          </div>
          <h3 className="text-gray-900 dark:text-white font-bold text-lg text-center mb-2">
            Reset Today?
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center mb-6 px-2">
            This will permanently reset your today's japa count.
          </p>
          <div className="flex flex-col gap-2">
            <button
              onClick={handleConfirm}
              disabled={disabled}
              className="w-full bg-red-500 hover:bg-red-600 active:scale-95 text-white font-bold py-3 rounded-2xl shadow-lg transition-all"
            >
              Reset Now
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="w-full glass-btn py-3 rounded-2xl text-gray-700 dark:text-gray-300 font-semibold"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 pb-4">
      <button
        onClick={() => setShowConfirm(true)}
        disabled={disabled}
        className="w-full glass-card py-4 rounded-2xl text-gray-500 dark:text-gray-400 font-bold flex items-center justify-center gap-3 border border-gray-200/50 dark:border-gray-700/30 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/10 transition-all active:scale-95 shadow-sm"
      >
        <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
          <FaUndoAlt className="text-sm" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] font-black">Reset Today's Count</span>
      </button>
    </div>
  );
};

export default ResetButton;
