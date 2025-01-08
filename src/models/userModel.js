import { Schema, model } from 'mongoose';

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
      firstName: String,
      lastName: String,
      avatar: String,
      bio: String,
      address: {
        street1: String,
        street2: String,
        city: String,
        state: String,
        country: String,
        zip: String,
      }
    },
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
