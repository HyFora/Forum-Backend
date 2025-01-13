import mongoose from 'mongoose';

const threadSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    likeCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    category: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  });

const Thread = mongoose.model('Thread', threadSchema);
export default Thread;
