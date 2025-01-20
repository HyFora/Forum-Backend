import { Thread } from "../models/threadModel.js";
import { User } from "../models/userModel.js"

export const filterThreadsbyUser = async (req, res, next) => {
  const { user } = req.query;

  if (!user) {
    return res.status(400).json({ error: "Eine User-ID ist erforderlich." });
  }
  try {
    const foundUser = await User.findOne({
      $or: [{ username: user }, { email: user }],
    });
    res.json(foundUser);

    if (!foundUser) {
      return res.status(404).json({ error: "Benutzer nicht gefunden." });
    }

    const threads = await Thread.find({ author: foundUser._id });

    res.status(200).json(threads);
  } catch (error) {
    console.error("Fehler beim Filtern der Threads eines Benutzers:", error);
    res.status(500).json({ error: "Interner Serverfehler" });
  }
};
