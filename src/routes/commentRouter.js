import express from 'express';
import { createComment, deleteComment, getComments, updateComment, getCommentById } from '../controllers/commentController.js';

import { signupValidator, updateUserValidator } from '../middlewares/userValidator.js';



export const commentRouter = express.Router();

commentRouter
    .route('/') // wie soll der Pfad aussehen?
    .get(getComments) // commentar arufen 
    .post(updateUserValidator, createComment); // kommentar erstellen



// Kommentar nach ID abrufen
commentRouter
    .route('/:commentId')
    .get(getCommentById)
    .put(updateUserValidator, updateComment)
    .delete(deleteComment);



// Welchen Pfad soll ich verwenden, um Kommentare zu erstellen?
// Antwort: /comments oder auch /comments/create

// wie machen wir es mit der threads ID?

// Welche middleware benutzen wir? für die auth und validation usw.?