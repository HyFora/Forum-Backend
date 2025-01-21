import { Thread } from "../models/threadModel.js";
import { User } from "../models/userModel.js";

export const searchThreads = async (req, res) => {
  const { search } = req.params;

  if (!search) {
    return res
      .status(400)
      .json({ error: "Ein Suchbegriff (search) ist erforderlich." });
  }

  try {
    const threads = await Thread.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        {
          "comments.content": { $regex: search, $options: "i" }, // Suche auch in Kommentaren
        },
      ],
    })
      .populate("comments")
      .exec();

      res.status(200).json({
        message: threads.length > 1 
          ? `Here are the threads you were looking for: ${search}` 
          : `There is only one thread you were looking for: ${search}`,
        threads: threads,
      });
      
  } catch (error) {
    console.error("Fehler bei der Thread-Suche:", error);
    res.status(500).json({ error: "Interner Serverfehler" });
  }
};