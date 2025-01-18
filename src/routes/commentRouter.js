import express from 'express';
import { createComment, deleteComment, getComments, updateComment, getCommentById } from '../controllers/commentController.js';

export const commentRouter = express.Router();

// Kommentare abrufen
commentRouter.get('/', getComments);

// Kommentar erstellen
commentRouter.post('/', createComment);

// Kommentar nach ID abrufen
commentRouter.get('/:commentId', getCommentById);

// Kommentar aktualisieren
commentRouter.put('/:commentId', updateComment);

// Kommentar löschen
commentRouter.delete('/:commentId', deleteComment);


// Welchen Pfad soll ich verwenden, um Kommentare zu erstellen?
// Antwort: /comments oder auch /comments/create

// wie machen wir es mit der threads ID?

// Welche middleware benutzen wir? für die auth und validation usw.?