import { Commentary } from "../models/commentModel.js";
import { User } from "../models/userModel.js";
import { Thread } from "../models/threadModel.js";


export const createComment = async (req, res, next) => {
  const { content } = req.body;
  const { threadId, userId } = req.params;

  try {
    // Validate the input
    if (!content) {
      return res.status(400).json({ message: "Comment content are required." });
    }

    if (content.length > 500) {
      return res
        .status(400)
        .json({ message: "Comment must be less than 500 characters long." });
    }
    // Ensure the thread exists
    const thread = await Thread.findById(threadId);
    if (!thread) {
      return res.status(404).json({ message: "Thread not found." });
    }

    // Create a new comment
    const newComment = new Commentary({
      threadId: threadId, // Use threadId from route params
      content: content,
      author: userId, // Add user ID from authentication middleware
    });

    // Save the comment
    const savedComment = await newComment.save();

    // Return success message
    return res.status(201).json({
      message: "Comment successfully created.",
      comment: savedComment,
    });
  } catch (error) {
    console.error(error);
    // Pass the error to a global error handler (if set up)
    next(error);
    // Alternatively, you can directly return the error message:
    // res.status(500).json({ message: 'An error occurred.', error: error.message });
  }
};