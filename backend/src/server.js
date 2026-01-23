import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import countRoutes from './routes/count.js';
import historyRoutes from './routes/history.js';
import statsRoutes from './routes/stats.js';




// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/count', countRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/stats', statsRoutes);

// Static files and SPA routing
const __dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.json({ message: '🙏 Radhe Counter API is running...' });
  });
}






// Error Handling
app.use(notFound);
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
