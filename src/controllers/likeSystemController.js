import { Thread } from "../models/threadModel.js";
import { User } from "../models/userModel.js";

export const likeSystem = async (req, res, next) => {
  try {
    const threadId = req.params.threadId;
    const userId = req.params.userId;

    if (!userId) return res.json({ message: "Unauthenticated User" });

    // Validate UserId
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(404).send("No post with that id");

    const thread = await Thread.findById(threadId);

    // Check if user already liked
    const userLiked = thread.likes.user.findIndex((id) => id === String(userId));
   
    if (userLiked === -1) {
      thread.likes.push(userId);
    } else {
      thread.likes = thread.likes.filter((id) => id !== String(userId));
    }

    const updatedThread = await Thread.findByIdAndUpdate(threadId, thread, {
      new: true,
    });

    return res.json(updatedThread);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
