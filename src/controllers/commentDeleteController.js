import { Commentary } from "../models/commentModel.js";
import { User } from "../models/userModel.js";
import { Thread } from "../models/threadModel.js";

export const deleteComment = async (req, res, next) => {
  const { userId, threadId, commentId } = req.params; // ID des zu löschenden Kommentars
  // threadID und USer ID gegenchecken damit der benutzer nur seine eigenen Kommentare löschen kann
  const user = await User.findById(userId);

  const comment = Commentary();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Authorize Author
  if (comment.author === userId) {
    return res.status(403).json({ message: "Unauthorized to create post" });
  }

  try {
    // Kommentar löschen
    const deletedComment = await Commentary.findByIdAndDelete(commentId);

    // Prüfen, ob der Kommentar existiert
    if (!deletedComment) {
      return res.status(404).json({ message: "Kommentar nicht gefunden." });
    }

    // Erfolgsmeldung zurückgeben
    return res.status(200).json({
      message: "Kommentar erfolgreich gelöscht.",
      comment: deletedComment,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
