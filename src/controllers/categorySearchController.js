import Thread from '../models/threadsSearchModel.js';

export const searchCategories = async (req, res) => {
    const { query } = req.query;

    if (!query) {
    return res.status(400).json({ error: 'Ein Suchbegriff (query) ist erforderlich.' });
    }

    try {
    const categories = await Thread.find({
        $or: [
            { name: { $regex: query, $options: 'i' } }, // Suche nach Kategorienamen, die das Suchmuster enthalten
            { description: { $regex: query, $options: 'i' } }, // Suche nach Kategoriebeschreibungen, die das Suchmuster enthalten],
        ],
    });
    res.json(categories);
    } catch (error) {
    console.error('Fehler bei der Kategorie-Suche:', error);
    res.status(500).json({ error: 'Interner Serverfehler' });
    }
};

//Der $or Operator ist ein Logikoperator in MongoDB, der verwendet wird, um Dokumente zu finden, die mindestens eine der angegebenen Bedingungen erfüllen. Es ist vergleichbar mit einer "ODER"-Bedingung in einer SQL-Abfrage

//$regex: Dies ist ein MongoDB-Operator, der reguläre Ausdrücke verwendet, um nach Mustern in Zeichenfolgen zu suchen. In diesem Fall wird query als Suchmuster verwendet.

//$options: 'i': Dies ist eine Option für den regulären Ausdruck, die die Suche case-insensitive (Groß- und Kleinschreibung wird ignoriert) macht.