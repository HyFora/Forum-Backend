import Thread from '../models/Thread.js';

export const filterThreadsByCategory = async (req, res) => {
    const { category } = req.params;

    try {
        const threads = await Thread.find({ category });
        res.json(threads);
    } catch (error) {
        console.error('Fehler beim Filtern der Threads nach Kategorie:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
};