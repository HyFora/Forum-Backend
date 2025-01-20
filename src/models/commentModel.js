import { Schema, model, Types } from "mongoose";

// Schema für die Kommentare

const CommentSchema = new Schema(
  {
    threadId: { type: Types.ObjectId, ref: "Thread", required: true },
    author: { type: Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    likes: [
      {
        user: { type: Types.ObjectId, ref: "User" },
        likeAt: { type: Date, default: Date.now },
      },
    ],
    likeCount: { type: Number, default: 0 },
  },
  { timestamps: true } // Automatische Verwaltung von `createdAt` und `updatedAt`
);

// Leichter und lesbarer Export
export const Commentary = model("Commentary", CommentSchema);
