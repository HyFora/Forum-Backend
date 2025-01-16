import Thread from '../models/threadsSearchModel.js';

export const sortThreads = async (req, res) => {
  const { sort } = req.query;

  const validFields = {
    likeCount: 'likeCount',
    '-likeCount': '-likeCount',
    createdAt: 'createdAt',
    '-createdAt': '-createdAt'
  };

  // Überprüfen, ob das Feld für die Sortierung gültig ist
  if (!sort || !validFields[sort]) {
    return res.status(400).json({ error: 'Ungültiges Sortierfeld. Zulässige Werte: likeCount, -likeCount, createdAt, -createdAt' });
  }

  try {
    // Sortieroptionen direkt basierend auf dem Parameter setzen
    const sortOptions = { [sort.replace('-', '')]: sort.startsWith('-') ? -1 : 1 };

    // Threads aus der Datenbank abrufen und sortieren
    const threads = await Thread.find().sort(sortOptions);

    // Erfolgreiche Antwort mit den sortierten Threads zurückgeben
    res.json(threads);
  } catch (error) {
    console.error('Fehler beim Sortieren der Threads:', error);

    // Fehlerhafte Antwort bei Serverfehler
    res.status(500).json({ error: 'Interner Serverfehler' });
  }
};

  