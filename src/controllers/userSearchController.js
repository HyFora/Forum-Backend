import Thread from '../models/threadsSearchModel.js';

export const filterThreadsbyUser = async (req, res, next) => {
    const { user } = req.query;

    if (!user) {
        return res.status(400).json({ error: 'Eine User-ID ist erforderlich.' });
      }
    }    