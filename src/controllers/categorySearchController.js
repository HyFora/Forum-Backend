import { Thread } from "../models/threadModel.js";

export const searchCategories = async (req, res) => {
  // Korrektur: Kategorie aus req.query statt req.params
  const { category } = req.query;

  // Prüfen, ob ein Suchbegriff angegeben wurde
  if (!category || category.trim() === "") {
    return res
      .status(400)
      .json({ error: "A search term (category) is required." });
  }

  try {
    // Threads basierend auf der Kategorie finden (Case-insensitive Suche)
    const threadsCategoried = await Thread.find({
      category: { $regex: category, $options: "i" }, // "i" für Case-Insensitive
    });

    // Erfolgsmeldung zurückgeben
    res.status(200).json({
      message: `Here are the threads you were looking for in category: ${category}`,
      categories: threadsCategoried,
    });
  } catch (error) {
    // Fehlerbehandlung
    console.error("Error while searching threads:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
