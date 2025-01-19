// import Thread from '../models/threadsSearchModel.js';
import { Thread } from "../models/threadModel.js";
import { User } from "../models/userModel.js";

export const searchThreads = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res
      .status(400)
      .json({ error: "Ein Suchbegriff (query) ist erforderlich." });
  }

  try {
    const threads = await Thread.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
      ],
    });
    const users = await User.find({
        $or: [
          { username: { $regex: query, $options: "i" } },
          { email: { $regex: query, $options: "i" } },
        ],
      });

      res.status(200).json({
        threads: threads,
        users: users
      });
  } catch (error) {
    console.error("Fehler bei der Thread-Suche:", error);
    res.status(500).json({ error: "Interner Serverfehler" });
  }
};

