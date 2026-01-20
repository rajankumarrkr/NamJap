import dayjs from 'dayjs';

// Get today's date in YYYY-MM-DD format
export const getTodayDate = () => {
  return dayjs().format('YYYY-MM-DD');
};

// Get yesterday's date
export const getYesterdayDate = () => {
  return dayjs().subtract(1, 'day').format('YYYY-MM-DD');
};

// Format date for display (e.g., "20 Jan 2026")
export const formatDisplayDate = (date) => {
  return dayjs(date).format('DD MMM YYYY');
};

// Format date for display with day name (e.g., "Today", "Yesterday", or "20 Jan")
export const formatRelativeDate = (date) => {
  const today = getTodayDate();
  const yesterday = getYesterdayDate();
  
  if (date === today) return 'Today';
  if (date === yesterday) return 'Yesterday';
  
  return dayjs(date).format('DD MMM');
};

// Check if date is today
export const isToday = (date) => {
  return date === getTodayDate();
};

// Get date range for history (last N days)
export const getDateRange = (days) => {
  const dates = [];
  for (let i = 0; i < days; i++) {
    dates.push(dayjs().subtract(i, 'day').format('YYYY-MM-DD'));
  }
  return dates;
};

// Get start of current week
export const getWeekStart = () => {
  return dayjs().startOf('week').format('YYYY-MM-DD');
};

// Get start of current month
export const getMonthStart = () => {
  return dayjs().startOf('month').format('YYYY-MM-DD');
};
