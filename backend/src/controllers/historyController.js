import Count from '../models/Count.js';

// @desc    Get history records (last N days)
// @route   GET /api/history?days=7
// @access  Private
export const getHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const days = parseInt(req.query.days) || 7;

    // Validate days
    if (days !== 7 && days !== 30) {
      return res.status(400).json({ message: 'Days must be 7 or 30' });
    }

    // Get records sorted by date (latest first)
    const records = await Count.find({ userId })
      .sort({ date: -1 })
      .limit(days);

    res.json({
      records,
      count: records.length,
    });
  } catch (error) {
    console.error('Get History Error:', error);
    res.status(500).json({ message: 'Error fetching history' });
  }
};
