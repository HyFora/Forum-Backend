
import Commentary from "../models/commentModel.js";
import {User} from "../models/userModel.js";




//* Kommentare erstellen

export const createComment = async (req, res, next) => {
  const { threadId, content } = req.body; // Daten aus der Anfrage extrahieren

  try {
    // Validierung der Eingabe
    if (!threadId || !content) {
      return res
        .status(400)
        .json({ message: "Thread-ID und Kommentarinhalt sind erforderlich." });
      // Warum wird hier nicht auch geprüft, ob threadId und content leer sind?

      //* Wie sinnvoll ist das hier?
    }

    if (content.length > 500) {
      return res
        .status(400)
        .json({ message: "Der Kommentar darf maximal 500 Zeichen lang sein." });
    }

    // Neuen Kommentar erstellen
    const newComment = new Commentary({
      threadId, // Kurzschreibweise für threadId: threadId
      content,
      author: req.user.id, // User-ID aus Auth-Middleware hinzufügen
    });

    // Kommentar speichern
    const savedComment = await newComment.save();

    // Erfolgsmeldung zurückgeben
    return res.status(201).json({
      message: "Kommentar erfolgreich erstellt.",
      comment: savedComment,
    });
  } catch (error) {
    console.error(error);
    // Fehler an den Fehler-Handler weiterleiten (falls vorhanden)
    next(error); // Für zentrale Fehlerbehandlung, falls eingerichtet
    // Alternativ direkt eine Fehlermeldung senden:
    // res.status(500).json({ message: 'Ein Fehler ist aufgetreten.', error: error.message });
  }
};

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

//* Kommentare löschen

export const deleteComment = async (req, res, next) => {
  const { commentId } = req.params; // ID des zu löschenden Kommentars
  // threadID und USer ID gegenchecken damit der benutzer nur seine eigenen Kommentare löschen kann
  const author = req.params.userId;
  

const user = await User.findById(author);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Authorize Author
      if (user._id.toString() !== req.user._id.toString()) {
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

//* Kommentare nach ID abrufen

export const getCommentById = async (req, res, next) => {
  const { commentId } = req.params; // ID des gesuchten Kommentars

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

//* Kommentar liken

export const likeComment = async (req, res, next) => {
  const { commentId } = req.params; // ID des zu likenden Kommentars

  try {
    // Kommentar abrufen und prüfen
    const comment = await Commentary.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Kommentar nicht gefunden." });
    }

    // Prüfen, ob der Benutzer den Kommentar bereits geliked hat
    const alreadyLiked = comment.likes.some(
      (like) => like.user.toString() === req.user.id
    );
    if (alreadyLiked) {
      return res
        .status(400)
        .json({ message: "Kommentar wurde bereits geliked." });
    }

    // Kommentar liken
    comment.likes.push({ user: req.user.id });
    comment.likeCount += 1;

    // Änderungen speichern
    await comment.save();

    // Erfolgsmeldung zurückgeben
    return res.status(200).json({ message: "Kommentar geliked." });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

//* Kommentar unliken

export const unlikeComment = async (req, res, next) => {
  const { commentId } = req.params; // ID des zu unlikenden Kommentars

  try {
    // Kommentar abrufen und prüfen
    const comment = await Commentary.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Kommentar nicht gefunden." });
    }

    // Prüfen, ob der Benutzer den Kommentar bereits geliked hat
    const alreadyLiked = comment.likes.some(
      (like) => like.user.toString() === req.user.id
    );
    if (!alreadyLiked) {
      return res
        .status(400)
        .json({ message: "Kommentar wurde noch nicht geliked." });
    }

    // Kommentar unliken
    comment.likes = comment.likes.filter(
      (like) => like.user.toString() !== req.user.id
    );
    comment.likeCount -= 1;

    // Änderungen speichern
    await comment.save();

    // Erfolgsmeldung zurückgeben
    return res.status(200).json({ message: "Kommentar unliked." });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

//* Kommentar bearbeiten

export const editComment = async (req, res, next) => {
  const { commentId } = req.params; // ID des zu bearbeitenden Kommentars
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
    if (comment.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({
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
