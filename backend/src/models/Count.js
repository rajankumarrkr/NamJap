import mongoose from 'mongoose';

const countSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: String, // Format: YYYY-MM-DD
      required: true,
    },
    count: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index: One record per user per date
countSchema.index({ userId: 1, date: 1 }, { unique: true });

const Count = mongoose.model('Count', countSchema);

export default Count;
