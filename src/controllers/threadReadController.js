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
    const allThreads = await Thread.find().populate("author");
    console.log(allThreads);
    res.send(allThreads);
  } catch (error) {
    next(error);
  }
};