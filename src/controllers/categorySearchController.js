import Category from '../models/categorySearch.js';

export const searchCategories = async (req, res) => {
    const { query } = req.query;

    if (!query) {
    return res.status(400).json({ error: 'Ein Suchbegriff (query) ist erforderlich.' });
    }

    try {
    const categories = await Category.find({
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
