import { Thread } from "../models/threadModel.js";

// export const sortThreadsByLikes = async (req, res) => {
//     const { sort } = req.query;
// };

export const sortThreadsByDate = async (req, res) => {
  const { sort } = req.query;

  try {
    // newest threads first
    const sortDirection = sort === "asc" ? 1 : -1;

    const threads = await Thread.find()
      .sort({ createdAt: sortDirection })
      .exec();

    res.status(200).json({
      message: "Threads sorted by date successfully",
      threads,
    });
  } catch (error) {
    console.error("Error sorting threads by date:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
