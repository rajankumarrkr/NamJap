// Helper to get IST date string (YYYY-MM-DD)
export const getISTDate = (date = new Date()) => {
  const options = { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' };
  const formatter = new Intl.DateTimeFormat('en-CA', options);
  return formatter.format(date);
};

// Get today's date in YYYY-MM-DD format (IST)
export const getTodayDate = () => {
  return getISTDate(new Date());
};

// Get yesterday's date (IST)
export const getYesterdayDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return getISTDate(date);
};

// Format date for display
export const formatDate = (date) => {
  const d = new Date(date);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return d.toLocaleDateString('en-IN', options);
};
