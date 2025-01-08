import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  threadID: { type: mongoose.Schema.Types.ObjectId, ref: 'Thread', required: true },
  content: { type: String, required: true, maxlength: 500 },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', CommentSchema);
