import Count from '../models/Count.js';
import { getTodayDate, getISTDate } from '../utils/dateUtils.js';

// @desc    Get weekly stats
// @route   GET /api/stats/weekly
// @access  Private
export const getWeeklyStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - 6); // Last 7 days

    const weekStartStr = getISTDate(weekStart);

    const result = await Count.aggregate([
      {
        $match: {
          userId,
          date: { $gte: weekStartStr },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$count' },
        },
      },
    ]);

    const total = result.length > 0 ? result[0].total : 0;

    res.json({ total });
  } catch (error) {
    console.error('Get Weekly Stats Error:', error);
    res.status(500).json({ message: 'Error fetching weekly stats' });
  }
};

// @desc    Get monthly stats
// @route   GET /api/stats/monthly
// @access  Private
export const getMonthlyStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const today = new Date();
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

    const monthStartStr = getISTDate(monthStart);

    const result = await Count.aggregate([
      {
        $match: {
          userId,
          date: { $gte: monthStartStr },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$count' },
        },
      },
    ]);

    const total = result.length > 0 ? result[0].total : 0;

    res.json({ total });
  } catch (error) {
    console.error('Get Monthly Stats Error:', error);
    res.status(500).json({ message: 'Error fetching monthly stats' });
  }
};

// @desc    Get highest single-day count
// @route   GET /api/stats/highest
// @access  Private
export const getHighestCount = async (req, res) => {
  try {
    const userId = req.user._id;

    const result = await Count.findOne({ userId }).sort({ count: -1 }).limit(1);

    const highest = result ? result.count : 0;
    const date = result ? result.date : null;

    res.json({ highest, date });
  } catch (error) {
    console.error('Get Highest Count Error:', error);
    res.status(500).json({ message: 'Error fetching highest count' });
  }
};

// @desc    Get current streak
// @route   GET /api/stats/streak
// @access  Private
export const getStreak = async (req, res) => {
  try {
    const userId = req.user._id;
    const today = new Date();
    let streak = 0;
    let checkDate = new Date(today);

    // Check backwards from today
    while (true) {
      const dateStr = getISTDate(checkDate);
      const record = await Count.findOne({ userId, date: dateStr });

      if (record && record.count > 0) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    res.json({ streak });
  } catch (error) {
    console.error('Get Streak Error:', error);
    res.status(500).json({ message: 'Error fetching streak' });
  }
};

// @desc    Get chart data (last 7 or 30 days)
// @route   GET /api/stats/chart?days=7
// @access  Private
export const getChartData = async (req, res) => {
  try {
    const userId = req.user._id;
    const days = parseInt(req.query.days) || 7;

    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - (days - 1));

    const records = await Count.find({
      userId,
      date: { $gte: getISTDate(startDate) },
    }).sort({ date: 1 });

    // Create array with all dates (fill missing dates with 0)
    const chartData = [];
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const dateStr = getISTDate(date);

      const record = records.find((r) => r.date === dateStr);
      chartData.push({
        date: dateStr,
        count: record ? record.count : 0,
      });
    }

    res.json({ data: chartData });
  } catch (error) {
    console.error('Get Chart Data Error:', error);
    res.status(500).json({ message: 'Error fetching chart data' });
  }
};

// @desc    Get all stats in one call
// @route   GET /api/stats/summary
// @access  Private
export const getStatsSummary = async (req, res) => {
  try {
    const userId = req.user._id;
    const today = new Date();

    // Weekly
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - 6);
    const weekStartStr = getISTDate(weekStart);

    const weekResult = await Count.aggregate([
      { $match: { userId, date: { $gte: weekStartStr } } },
      { $group: { _id: null, total: { $sum: '$count' } } },
    ]);
    const weeklyTotal = weekResult.length > 0 ? weekResult[0].total : 0;

    // Monthly
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthStartStr = getISTDate(monthStart);

    const monthResult = await Count.aggregate([
      { $match: { userId, date: { $gte: monthStartStr } } },
      { $group: { _id: null, total: { $sum: '$count' } } },
    ]);
    const monthlyTotal = monthResult.length > 0 ? monthResult[0].total : 0;

    // Highest
    const highestRecord = await Count.findOne({ userId }).sort({ count: -1 }).limit(1);
    const highest = highestRecord ? highestRecord.count : 0;
    const highestDate = highestRecord ? highestRecord.date : null;

    // Streak
    let streak = 0;
    let checkDate = new Date(today);
    while (true) {
      const dateStr = getISTDate(checkDate);
      const record = await Count.findOne({ userId, date: dateStr });
      if (record && record.count > 0) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    res.json({
      weekly: weeklyTotal,
      monthly: monthlyTotal,
      highest: { count: highest, date: highestDate },
      streak,
    });
  } catch (error) {
    console.error('Get Stats Summary Error:', error);
    res.status(500).json({ message: 'Error fetching stats summary' });
  }
};

// @desc    Get leaderboard
// @route   GET /api/stats/leaderboard
// @access  Private
export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Count.aggregate([
      {
        $group: {
          _id: '$userId',
          totalCount: { $sum: '$count' },
        },
      },
      { $sort: { totalCount: -1 } },
      { $limit: 20 },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      {
        $project: {
          _id: 1,
          totalCount: 1,
          mobile: '$user.mobile',
        },
      },
    ]);

    // Mask mobile numbers for privacy
    const maskedLeaderboard = leaderboard.map((entry) => ({
      ...entry,
      mobile: entry.mobile
        ? `${entry.mobile.substring(0, 2)}******${entry.mobile.substring(8)}`
        : 'Anonymous',
    }));

    res.json(maskedLeaderboard);
  } catch (error) {
    console.error('Get Leaderboard Error:', error);
    res.status(500).json({ message: 'Error fetching leaderboard' });
  }
};
