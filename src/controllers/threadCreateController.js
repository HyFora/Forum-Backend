import { Thread } from "../models/threadModel.js";
import { User } from "../models/userModel.js";
// import { Category } from "../models/categoryModel.js";
// import { createCategory } from "./categoryController.js";

export const createThread = async (req, res, next) => {
  try {
    const author = req.params.userId;
    const { title, content, category } = req.body;
    if (!title || !content || !category) {
      return res
        .status(400)
        .json({ message: "Author, Title and Content fields are required" });
    }
    // Validate Author existence
    const user = await User.findById(author);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Authorize Author
    if (user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to create post" });
    }

    // Validate Title and Content
    const maxlength = 10000;
    if (content.length > maxlength) {
      return res
        .status(400)
        .json({ message: `Text must be less than ${maxlength} characters` });
    }

    // Create + Save a new Thread
    const newThread = new Thread({ title, content, category });
    await newThread.save();

    // Add Thread to User who just created it
    await User.findByIdAndUpdate(
      author,
      { $push: { threads: newThread._id } },
      { new: true } // Return the updated user document
    );

    res.status(201).json({ message: "Thread created successfully", newThread });
  } catch (err) {
    res.status(500).json({ message: err.message });
    next(err);
  }
};
