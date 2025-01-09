import mongoose from 'mongoose';

const threadSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    createdAt: { type: Date, default: Date.now },
});

const Thread = mongoose.model('Thread', threadSchema);
export default Thread;
