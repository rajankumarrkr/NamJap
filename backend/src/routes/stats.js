import express from 'express';
import {
  getWeeklyStats,
  getMonthlyStats,
  getHighestCount,
  getStreak,
  getChartData,
  getStatsSummary,
} from '../controllers/statsController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/weekly', protect, getWeeklyStats);
router.get('/monthly', protect, getMonthlyStats);
router.get('/highest', protect, getHighestCount);
router.get('/streak', protect, getStreak);
router.get('/chart', protect, getChartData);
router.get('/summary', protect, getStatsSummary);

export default router;
