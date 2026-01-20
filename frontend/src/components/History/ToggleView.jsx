const ToggleView = ({ selectedDays, onToggle }) => {
  const options = [
    { label: '7 Days', value: 7 },
    { label: '30 Days', value: 30 },
  ];

  return (
    <div className="px-2">
      <div className="glass-card rounded-2xl p-1.5 flex gap-1 bg-white/50 backdrop-blur-xl">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onToggle(opt.value)}
            className={`
              flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300
              ${selectedDays === opt.value
                ? 'saffron-gradient text-white shadow-lg'
                : 'text-gray-500 dark:text-gray-400 hover:text-saffron-500'
              }
            `}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToggleView;
