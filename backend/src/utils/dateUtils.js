// Get today's date in YYYY-MM-DD format
export const getTodayDate = () => {
  const date = new Date();
  return date.toISOString().split('T')[0];
};

// Get yesterday's date
export const getYesterdayDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().split('T')[0];
};

// Format date for display
export const formatDate = (date) => {
  const d = new Date(date);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return d.toLocaleDateString('en-IN', options);
};
