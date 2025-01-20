import { Thread } from "../models/threadModel.js";

export const searchCategories = async (req, res) => {
  const { category } = req.params;

  if (!category) {
    return res
      .status(400)
      .json({ error: "A search term (category) is required." });
  }

  try {
    const threadsCategoried = await Thread.find({
      category: { $regex: category, $options: "i" },
    });

    res.status(200).json({
      message: `Here are the categories you were looking for: ${category}`, // Use 'category' instead of 'search'
      categories: threadsCategoried,
    });
  } catch (error) {
    console.error("Error while searching threads:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Der $or Operator ist ein Logikoperator in MongoDB, der verwendet wird, um Dokumente zu finden, die mindestens eine der angegebenen Bedingungen erfüllen. Es ist vergleichbar mit einer "ODER"-Bedingung in einer SQL-Abfrage

//$regex: Dies ist ein MongoDB-Operator, der reguläre Ausdrücke verwendet, um nach Mustern in Zeichenfolgen zu suchen. In diesem Fall wird query als Suchmuster verwendet.

//$options: 'i': Dies ist eine Option für den regulären Ausdruck, die die Suche case-insensitive (Groß- und Kleinschreibung wird ignoriert) macht.
