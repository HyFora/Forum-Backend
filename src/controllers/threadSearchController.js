import { Thread } from "../models/threadModel.js";
import { Commentary } from "../models/commentModel.js";

export const searchThreadsAndComments = async (req, res) => {
  const { search } = req.query; // Suchbegriff aus den Query-Parametern

  if (!search || search.trim() === "") {
    return res.status(400).json({ error: "Ein Suchbegriff (search) ist erforderlich." });
  }

  const trimmedSearch = search.trim();

  try {
    // Suche in Threads (Titel, Inhalt und Kategorie)
    const threads = await Thread.find({
      $or: [
        { title: { $regex: `^${trimmedSearch}`, $options: "i" } },
        { content: { $regex: `^${trimmedSearch}`, $options: "i" } },
        { category: { $regex: `^${trimmedSearch}`, $options: "i" } },
      ],
    })
      .populate({
        path: "comments", // Kommentare laden
        select: "content author createdAt", // Nur bestimmte Felder der Kommentare
        populate: {
          path: "author", // Den Autor der Kommentare laden
          select: "username email", // Nur bestimmte Felder des Autors
        },
      })
      .limit(10) // Maximal 10 Threads zurückgeben
      .exec();

    // Suche direkt in Kommentaren (Inhalt durchsuchen)
    const comments = await Commentary.find({
      content: { $regex: `^${trimmedSearch}`, $options: "i" }, // Exakte oder Präfix-Suche
    })
      .populate("author", "username email") // Autor der Kommentare laden
      .populate("threadId", "title") // Den zugehörigen Thread-Titel laden
      .limit(10) // Maximal 10 Kommentare zurückgeben
      .exec();

    if (threads.length === 0 && comments.length === 0) {
      return res
        .status(404)
        .json({ message: `Keine Ergebnisse für den Suchbegriff "${search}" gefunden.` });
    }

    res.status(200).json({
      message: `Suchergebnisse für: ${search}`,
      threads,
      comments,
    });
  } catch (error) {
    console.error("Fehler bei der Suche nach Threads und Kommentaren:", error);
    res.status(500).json({ error: "Interner Serverfehler" });
  }
};
