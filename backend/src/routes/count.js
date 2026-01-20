import express from 'express';
import {
  incrementCount,
  getTodayCount,
  getYesterdayCount,
  getTotalCount,
  resetTodayCount,
  getCountSummary,
} from '../controllers/countController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.post('/increment', protect, incrementCount);
router.get('/today', protect, getTodayCount);
router.get('/yesterday', protect, getYesterdayCount);
router.get('/total', protect, getTotalCount);
router.get('/summary', protect, getCountSummary);
router.post('/reset-today', protect, resetTodayCount);

export default router;
