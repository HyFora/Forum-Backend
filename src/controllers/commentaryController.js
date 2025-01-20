import { Commentary } from "../models/commentModel.js";
import { User } from "../models/userModel.js";
import { Thread } from "../models/threadModel.js";
//* Kommentare erstellen

export const createComment = async (req, res, next) => {
  const { content } = req.body;
  const { threadId, userId } = req.params;

  try {
    // Validate the input
    if (!content) {
      return res.status(400).json({ message: "Comment content are required." });
    }

    if (content.length > 500) {
      return res
        .status(400)
        .json({ message: "Comment must be less than 500 characters long." });
    }
    // Ensure the thread exists
    const thread = await Thread.findById(threadId);
    if (!thread) {
      return res.status(404).json({ message: "Thread not found." });
    }

    // Create a new comment
    const newComment = new Commentary({
      threadId: threadId, // Use threadId from route params
      content: content,
      author: userId, // Add user ID from authentication middleware
    });

    // Save the comment
    const savedComment = await newComment.save();

    // Return success message
    return res.status(201).json({
      message: "Comment successfully created.",
      comment: savedComment,
    });
  } catch (error) {
    console.error(error);
    // Pass the error to a global error handler (if set up)
    next(error);
    // Alternatively, you can directly return the error message:
    // res.status(500).json({ message: 'An error occurred.', error: error.message });
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
