import { useState } from 'react';
import { FaTrash, FaDatabase, FaExclamationTriangle } from 'react-icons/fa';
import axiosInstance from '../../api/axios';

const ResetOptions = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [resetType, setResetType] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetClick = (type) => {
    setResetType(type);
    setShowConfirm(true);
  };

  const confirmReset = async () => {
    setLoading(true);
    try {
      if (resetType === 'today') {
        await axiosInstance.post('/count/reset-today');
      } else {
        alert('Reset feature to be completed in finalize phase.');
      }
      setShowConfirm(false);
      setResetType('');
    } catch (error) {
      console.error('Reset Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (showConfirm) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
        <div className="glass-card w-full max-w-xs rounded-[2.5rem] p-8 animate-scale-in border border-white/20">
          <div className="w-16 h-16 rounded-[1.5rem] bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mb-6 mx-auto">
            <FaExclamationTriangle className="text-rose-500 text-2xl" />
          </div>
          <h3 className="text-gray-900 dark:text-white font-black text-xl text-center mb-2 tracking-tight">
            Reset Data?
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-xs font-bold text-center mb-8 px-2 leading-relaxed uppercase tracking-tighter">
            {resetType === 'today'
              ? "This will clear today's count only."
              : "This will permanently delete all history."}
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={confirmReset}
              disabled={loading}
              className="w-full bg-rose-500 hover:bg-rose-600 text-white font-black py-4 rounded-2xl shadow-xl transition-all active:scale-95 text-sm uppercase tracking-widest"
            >
              Confirm Reset
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="w-full glass-btn py-4 rounded-2xl text-gray-700 dark:text-gray-300 font-black text-sm uppercase tracking-widest"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div
        onClick={() => handleResetClick('today')}
        className="glass-card rounded-3xl p-5 flex items-center justify-between group cursor-pointer hover:bg-orange-50/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            <FaTrash className="text-sm" />
          </div>
          <div>
            <p className="text-gray-800 dark:text-white font-bold text-sm">Reset Today</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Clear daily records</p>
          </div>
        </div>
      </div>

      <div
        onClick={() => handleResetClick('all')}
        className="glass-card rounded-3xl p-5 flex items-center justify-between group cursor-pointer hover:bg-rose-50/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            <FaDatabase className="text-sm" />
          </div>
          <div>
            <p className="text-gray-800 dark:text-white font-bold text-sm">Wipe History</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-rose-400">Clear all records</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetOptions;
