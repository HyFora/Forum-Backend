import { Commentary } from "../models/commentModel.js";
import { User } from "../models/userModel.js";
import { Thread } from "../models/threadModel.js";

export const editComment = async (req, res, next) => {
    const { userId ,threadId, commentId } = req.params; // ID des zu bearbeitenden Kommentars
    const { content } = req.body; // Neuer Kommentarinhalt
  
    try {
      // Validierung der Eingabe
      if (!content) {
        return res
          .status(400)
          .json({ message: "Kommentarinhalt ist erforderlich." });
      }
  
      if (content.length > 500) {
        return res
          .status(400)
          .json({ message: "Der Kommentar darf maximal 500 Zeichen lang sein." });
      }
  
      // Kommentar abrufen und prüfen
      const comment = await Commentary.findById(commentId);
      if (!comment) {
        return res.status(404).json({ message: "Kommentar nicht gefunden." });
      }
  
      // Prüfen, ob der Benutzer der Autor des Kommentars ist
      if (comment.author != userId) {
        return res.status(403).json({
          message: "Nicht autorisiert, um diesen Kommentar zu bearbeiten.",
        });
      }
  
      // Kommentar bearbeiten
      comment.content = content;
  
      // Änderungen speichern
      await comment.save();
  
      // Erfolgsmeldung zurückgeben
      return res
        .status(200)
        .json({ message: "Kommentar erfolgreich bearbeitet." });
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
  
  
  