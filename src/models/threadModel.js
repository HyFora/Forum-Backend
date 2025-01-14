import { Schema, model, Types } from "mongoose";

const threadSchema = new Schema(
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
    // likes: [
    //   {
    //     user: { type: Schema.Types.ObjectId, ref: "User" },
    //     likeAt: { type: Date, default: Date.now },
    //   },
    // ],
    // likeCount: {
    //   type: Number,
    //   default: 0,
    // },
    // comments: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Comment",
    //     default: [],
    //   },
    //],
  },
  { timestamps: true }
);

// Optional: Virtuelle Felder
// Da Likes sonst mit Array zurückgibt und nicht LikeCount
// threadSchema.virtual("computedLikeCount").get(function () {
//     return this.likes.length;
//   });

export const Thread = model("Thread", threadSchema);
