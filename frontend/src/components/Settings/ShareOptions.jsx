import { FaShareAlt, FaCopy } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ShareOptions = () => {
    const shareData = {
        title: 'Radhe Counter',
        text: 'Join me in my spiritual journey with Radhe Counter. Track your Japa and stay devoted!',
        url: window.location.origin,
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share(shareData);
                toast.success('Shared successfully!');
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Error sharing:', error);
                    toast.error('Could not share. Try copying the link.');
                }
            }
        } else {
            copyToClipboard();
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareData.url);
        toast.success('Link copied to clipboard!', {
            icon: '🔗',
            style: {
                borderRadius: '16px',
                background: '#333',
                color: '#fff',
            },
        });
    };

    return (
        <div className="glass-card rounded-3xl p-5 flex items-center justify-between group overflow-hidden relative">
            <div className="flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 rounded-2xl bg-saffron-500/10 text-saffron-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FaShareAlt className="text-sm" />
                </div>
                <div>
                    <p className="text-gray-800 dark:text-white font-bold text-sm">Spread the Light</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Invite friends to join</p>
                </div>
            </div>

            <div className="flex items-center gap-2 relative z-10">
                <button
                    onClick={handleShare}
                    className="w-10 h-10 rounded-2xl bg-saffron-500 text-white flex items-center justify-center hover:bg-saffron-600 transition-all shadow-lg shadow-saffron-500/20 active:scale-90"
                    title="Share App"
                >
                    <FaShareAlt className="text-xs" />
                </button>
                <button
                    onClick={copyToClipboard}
                    className="w-10 h-10 rounded-2xl bg-gray-100 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-all border border-gray-200/50 dark:border-gray-800/50 active:scale-90"
                    title="Copy Link"
                >
                    <FaCopy className="text-xs" />
                </button>
            </div>

            {/* Subtle Background Glow */}
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-saffron-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
        </div>
    );
};

export default ShareOptions;
