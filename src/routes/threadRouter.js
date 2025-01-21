import { Router } from "express";

//* THREADS
import {
  getSingleThread,
  getAllThreads,
} from "../controllers/threadReadController.js";
import { createThread } from "../controllers/threadCreateController.js";
import { updateThread } from "../controllers/threadUpdateController.js";
import { deleteThread } from "../controllers/threadDeleteController.js";

import { likeSystem } from "../controllers/likeSystemController.js";
//* AUTH
import { authMiddleware } from "../middlewares/auth.js";

//* SEARCH & FILTER
import { searchThreadsAndComments } from "../controllers/threadSearchController.js";
import { searchCategories } from "../controllers/categorySearchController.js";
import { filterThreadsbyUser } from "../controllers/userSearchController.js";

import { editComment } from "../controllers/commentEditController.js";
import { getCommentById } from "../controllers/commentReadController.js";
import { deleteComment } from "../controllers/commentDeleteController.js";
import { createComment } from "../controllers/commentCreateController.js";
import {getComments} from "../controllers/commentReadController.js"
const threadRouter = Router();

threadRouter.route("/search").get(searchThreadsAndComments);

threadRouter.route("/category").get(searchCategories);

//! funktioniert zwar, aber Threads wird nicht angezeigt..
threadRouter.route("/user/:userId").get(filterThreadsbyUser);

// threadRouter
//     .route('/threads/sort')
//     .get(sortThreadsByLikes);

// threadRouter
//     .route('/threads/sort/date')
//     .get(sortThreadsByDate);

threadRouter.route("/").get(getAllThreads);

threadRouter.route("/:threadsId").get(getSingleThread);

// threadRouter.route("/:threadsId/like").put(likeSystem);

threadRouter.route("/:userId/createThread").post(authMiddleware, createThread);

threadRouter
  .route("/:userId/:threadId/updateThread")
  .patch(authMiddleware, updateThread)
  .put(authMiddleware, updateThread);

threadRouter
  .route("/:userId/:threadId/deleteThread")
  .delete(authMiddleware, deleteThread);

threadRouter
  .route("/:userId/:threadId/comments")
  .get(getComments) // commentar arufen
  .post(authMiddleware, createComment); // kommentar erstellen

// Kommentar nach ID abrufen
threadRouter
  .route("/:userId/:threadId/comments/:commentId")
  .get(getCommentById)
  .put(editComment)
  .delete(deleteComment);

export default threadRouter;
