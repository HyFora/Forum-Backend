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

export const filterThreadsByUser = async (req, res) => {
    const { user } = req.query;

    if (!user) {
        return res.status(400).json({ error: 'Eine User-ID ist erforderlich' });
    }

    try {
        const threads = await Thread.find({ user });
        res.json(threads);
    } catch (error) {
        console.error('Fehler beim Filtern der Threads eines Nutzers:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
};