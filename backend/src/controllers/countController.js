import Count from '../models/Count.js';
import { getTodayDate, getYesterdayDate } from '../utils/dateUtils.js';

// @desc    Increment today's count
// @route   POST /api/count/increment
// @access  Private
export const incrementCount = async (req, res) => {
  try {
    const userId = req.user._id;
    const today = getTodayDate();

    // Find or create today's count record
    let countRecord = await Count.findOne({ userId, date: today });

    if (countRecord) {
      countRecord.count += 1;
      await countRecord.save();
    } else {
      countRecord = await Count.create({
        userId,
        date: today,
        count: 1,
      });
    }

    res.json({
      date: countRecord.date,
      count: countRecord.count,
    });
  } catch (error) {
    console.error('Increment Error:', error);
    res.status(500).json({ message: 'Error incrementing count' });
  }
};

// @desc    Get today's count
// @route   GET /api/count/today
// @access  Private
export const getTodayCount = async (req, res) => {
  try {
    const userId = req.user._id;
    const today = getTodayDate();

    const countRecord = await Count.findOne({ userId, date: today });

    res.json({
      date: today,
      count: countRecord ? countRecord.count : 0,
    });
  } catch (error) {
    console.error('Get Today Count Error:', error);
    res.status(500).json({ message: 'Error fetching today count' });
  }
};

// @desc    Get yesterday's count
// @route   GET /api/count/yesterday
// @access  Private
export const getYesterdayCount = async (req, res) => {
  try {
    const userId = req.user._id;
    const yesterday = getYesterdayDate();

    const countRecord = await Count.findOne({ userId, date: yesterday });

    res.json({
      date: yesterday,
      count: countRecord ? countRecord.count : 0,
    });
  } catch (error) {
    console.error('Get Yesterday Count Error:', error);
    res.status(500).json({ message: 'Error fetching yesterday count' });
  }
};

// @desc    Get total lifetime count
// @route   GET /api/count/total
// @access  Private
export const getTotalCount = async (req, res) => {
  try {
    const userId = req.user._id;

    const result = await Count.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: '$count' } } },
    ]);

    const total = result.length > 0 ? result[0].total : 0;

    res.json({ total });
  } catch (error) {
    console.error('Get Total Count Error:', error);
    res.status(500).json({ message: 'Error fetching total count' });
  }
};

// @desc    Reset today's count
// @route   POST /api/count/reset-today
// @access  Private
export const resetTodayCount = async (req, res) => {
  try {
    const userId = req.user._id;
    const today = getTodayDate();

    const countRecord = await Count.findOne({ userId, date: today });

    if (countRecord) {
      countRecord.count = 0;
      await countRecord.save();
      res.json({ message: 'Today count reset successfully', count: 0 });
    } else {
      res.json({ message: 'No count to reset', count: 0 });
    }
  } catch (error) {
    console.error('Reset Today Error:', error);
    res.status(500).json({ message: 'Error resetting today count' });
  }
};

// @desc    Get all counts (today, yesterday, total) in one call
// @route   GET /api/count/summary
// @access  Private
export const getCountSummary = async (req, res) => {
  try {
    const userId = req.user._id;
    const today = getTodayDate();
    const yesterday = getYesterdayDate();

    // Get today's count
    const todayRecord = await Count.findOne({ userId, date: today });
    const todayCount = todayRecord ? todayRecord.count : 0;

    // Get yesterday's count
    const yesterdayRecord = await Count.findOne({ userId, date: yesterday });
    const yesterdayCount = yesterdayRecord ? yesterdayRecord.count : 0;

    // Get total count
    const result = await Count.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: '$count' } } },
    ]);
    const totalCount = result.length > 0 ? result[0].total : 0;

    res.json({
      today: { date: today, count: todayCount },
      yesterday: { date: yesterday, count: yesterdayCount },
      total: totalCount,
    });
  } catch (error) {
    console.error('Get Summary Error:', error);
    res.status(500).json({ message: 'Error fetching count summary' });
  }
};
