import { Schema, model, Types } from 'mongoose';

const userSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
      index: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    profile: {
      firstName: { type: String, default: '' },
      lastName: { type: String, default: '' },
      avatar: { type: String, default: '' },
      bio: { type: String, default: '' }
    },
    threads: [
      {
        threadId: { type: Schema.Types.ObjectId, ref: 'Thread' },
        title: { type: String },
        date: { type: Date, default: Date.now }
      }],
    deleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export const User = model("User", userSchema);
