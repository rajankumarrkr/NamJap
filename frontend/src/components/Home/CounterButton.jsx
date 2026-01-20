import { useState } from 'react';

const CounterButton = ({ onIncrement, disabled }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (disabled) return;

    setIsAnimating(true);
    onIncrement();

    // Reset animation after 200ms
    setTimeout(() => {
      setIsAnimating(false);
    }, 200);
  };

  return (
    <div className="flex items-center justify-center my-12">
      <div className="relative group">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-saffron-500/20 blur-3xl rounded-full scale-150 animate-pulse" />

        <button
          onClick={handleClick}
          disabled={disabled}
          className={`
            relative w-60 h-60 rounded-full 
            bg-white dark:bg-gray-800 
            border-8 border-saffron-100 dark:border-gray-700
            shadow-[0_20px_50px_rgba(249,115,22,0.3)]
            dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]
            flex flex-col items-center justify-center
            transition-all duration-300
            active:scale-90 active:shadow-inner
            disabled:opacity-50 disabled:cursor-not-allowed
            ${isAnimating ? 'border-saffron-500 bg-saffron-50' : ''}
          `}
        >
          {/* Inner Circle with Gradient */}
          <div className={`
            absolute inset-2 rounded-full 
            bg-gradient-to-br from-saffron-500 to-amber-600
            flex flex-col items-center justify-center
            transition-transform duration-200
            ${isAnimating ? 'scale-95' : 'scale-100'}
          `}>
            <span className="text-5xl mb-3 filter drop-shadow-md">🙏</span>
            <span className="text-white font-extrabold text-2xl tracking-wider uppercase">
              Radhe
            </span>
            <span className="text-white/90 font-medium text-lg">
              Radhe
            </span>
          </div>

          {/* Ripple Effect */}
          {isAnimating && (
            <span className="absolute inset-0 rounded-full border-4 border-saffron-500 animate-ping opacity-50"></span>
          )}
        </button>
      </div>
    </div>
  );
};

export default CounterButton;
