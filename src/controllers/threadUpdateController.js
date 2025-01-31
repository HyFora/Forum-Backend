import { Thread } from "../models/threadModel.js";
import { User } from "../models/userModel.js";

export const updateThread = async (req, res, next) => {
    try {
      const { userId, threadId } = req.params;
      const { title, content, likes } = req.body;
  
      // Validate Thread Existence
      const updateThread = await Thread.findById(threadId);
  
      if (!updateThread) {
        return res.status(404).json({ message: "Thread not found" });
      } // Authorize Author who wants to update this Thread
      else if (updateThread.author == userId) {
        return res
          .status(403)
          .json({ message: "You are not authorized to update this thread." });
      }
  
      // Validate Title and Content
      const maxlength = 10000;
      if (content && content.length > maxlength) {
        return res
          .status(400)
          .json({ message: `Content must be less than ${maxlength} characters` });
      }
      // Update one, two or whatever + save
      if (title) updateThread.title = title;
      if (content) updateThread.content = content;
      // likes, likesCount
      await updateThread.save();
  
      //? If the thread was not updated, handle that case -> nötig?
      if (!updateThread) {
        return res.status(404).json({ message: "Thread not found for updating" });
      }
  
      // Return the updated thread
      res
        .status(200)
        .json({ message: "Thread updated successfully", updateThread });
    } catch (err) {
      console.error(err);
      next(err);
    }
  };
  