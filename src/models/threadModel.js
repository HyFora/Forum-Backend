import { Schema, model, Types } from "mongoose";

const threadsSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    title: {
      type: String,
      trim: true,
      required: true,
      minlength: 1,
      maxlength: 100,
    },
    content: {
      type: String,
      trim: true,
      required: true,
      minlength: 2,
      maxlength: 1000,
    },
    likes: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        likeAt: { type: Date, default: Date.now },
      },
    ],
    likesCount: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Commentary",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

// Optional: Virtuelle Felder
// Da Likes sonst mit Array zurückgibt und nicht LikeCount
// threadSchema.virtual("computedLikeCount").get(function () {
//     return this.likes.length;
//   });

export const Thread = model("Thread", threadsSchema);

//! von threadSearchModel.js
// import mongoose from 'mongoose';

// const threadSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     content: { type: String, required: true },
//     likeCount: { type: Number, default: 0 },
//     createdAt: { type: Date, default: Date.now },
//     category: { type: String, required: true },
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   });

// const Thread = mongoose.model('Thread', threadSchema);
// export default Thread;
