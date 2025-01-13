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
    const newThread = new Thread({
      threadId: threadId,
      title: savedThread.title,
      content: savedThread.content,
      author: savedThread.author,
    });
    const thread = new Thread({
      title: req.body.title,
      content: req.body.content,
      author: req.userId,
    });
    const savedThread = await thread.save();
    const user = await User.findById(req.userId); //params?
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};

// changeThisThread,
// deleteThread
