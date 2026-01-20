import { useState, useEffect } from 'react';
import { FaDownload, FaTimes } from 'react-icons/fa';

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 max-w-md mx-auto">
      <div className="bg-saffron-600 text-white rounded-xl shadow-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FaDownload className="text-2xl" />
          <div>
            <p className="font-semibold">Install Radhe Counter</p>
            <p className="text-sm opacity-90">Add to your home screen</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleInstall}
            className="bg-white text-saffron-600 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-all"
          >
            Install
          </button>
          <button
            onClick={handleDismiss}
            className="text-white p-2 hover:bg-saffron-700 rounded-lg transition-all"
          >
            <FaTimes />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;
