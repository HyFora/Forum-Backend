
//! SPÄTER
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
  