import { Commentary } from "../models/commentModel.js";
import { User } from "../models/userModel.js";
import { Thread } from "../models/threadModel.js";

//* Kommentare abrufen
export const getComments = async (req, res, next) => {
    try {
      // Kommentare abrufen
      const comments = await Commentary.find();
  
      // Erfolgsmeldung zurückgeben
      return res.status(200).json({
        message: "Kommentare erfolgreich abgerufen.",
        comments,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  };


//* Kommentare nach ID abrufen
export const getCommentById = async (req, res, next) => {
  const { userId, threadsId, commentId } = req.params; // ID des gesuchten Kommentars
  try {
    // Kommentar abrufen
    const comment = await Commentary.findById(commentId);

    // Prüfen, ob der Kommentar existiert
    if (!comment) {
      return res.status(404).json({ message: "Kommentar nicht gefunden." });
    }

    // Erfolgsmeldung zurückgeben
    return res.status(200).json({
      message: "Kommentar erfolgreich abgerufen.",
      comment,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};