import Thread from '../models/threadsSearchModel.js';

export const filterThreadsbyUser = async (req, res, next) => {
    const { user } = req.query;

    if (!user) {
        return res.status(400).json({ error: 'Eine User-ID ist erforderlich.' });
    }
    try {
        const threads = await Thread.find({ author: user });
        res.json(threads);
    } catch (error) {
        console.error('Fehler beim Filtern der Threads eines Benutzers:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
};   