import { Thread } from "../models/threadModel.js";
import { User } from "../models/userModel.js";

export const getSingleThread = async (req, res, next) => {
  try {
    const thread = await Thread.findById(req.params.threadsId);
    if (!thread) {
      const error = new Error("Thread not found.");
      error.status = 404;
      next(error);
    }
    res.json(thread);
  } catch (error) {
    next(error);
  }
};

export const getAllThreads = async (req, res, next) => {
  try {
    const allThreads = await Thread.find().populate("author", "title", "content");
    res.send(allThreads);
  } catch (error) {
    next(error);
  }
};

export const createThread = async (req, res, next) => {
  try {
    const author = req.params.userId;
    const { title, content } = req.body;
    if (!author || !title || !content) {
      return res
        .status(400)
        .json({ message: "Author, Title and Content fields are required" });
    }
    // Validate Author existence
    const user = await User.findById(author);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Authorizate Author
    if (user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to create post" });
    }

    //Validate Title and Content
    const maxlength = 10000;
    if (content.length > maxlength) {
      return res
        .status(400)
        .json({ message: `Text must be less than ${maxlength} characters` });
    }

    const newThread = new Thread({ author, title, content });
    await newThread.save();
    await User.findByIdAndUpdate(
      author,
      { $push: { threads: newThread._id } },  // Add the thread's ID to the threads array
      { new: true }  // Return the updated user document
    );

    res.status(201).json({ message: "Thread created successfully", newThread });
  } catch (err) {
    res.status(500).json({ message: err.message });
    next(err)
  }
};

// updateThread,
// deleteThread
