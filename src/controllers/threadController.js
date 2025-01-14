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


export const updateThread = async (req, res, next) => {
  try {
    const { threadId } = req.params;
    const { title, content } = req.body;

    // Validate Thread Existence
    const thread = await Thread.findById(threadId);
    if (!thread) {
      return res.status(404).json({ message: "Thread not found" });
    }

    // Authorize Author who wants to update this Thread
    if (thread.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to update this thread" });
    }

    // Validate Title and Content
    const maxlength = 10000;
    if (content && content.length > maxlength) {
      return res
        .status(400)
        .json({ message: `Content must be less than ${maxlength} characters` });
    }

    // Update the thread (only update the fields that are provided in the request body)
    const updatedThread = await Thread.findByIdAndUpdate(
      threadId,
      { $set: { title, content } }, // Update only title and content
      { new: true } // Return the updated thread
    );

    // If the thread was not updated, handle that case
    if (!updatedThread) {
      return res.status(404).json({ message: "Thread not found for updating" });
    }

    // Return the updated thread
    res.status(200).json({ message: "Thread updated successfully", updatedThread });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ message: err.message });
    next(err);
  }
};

// deleteThread
