import { Router } from "express";

import {
  getSingleThread,
  getAllThreads,
} from "../controllers/threadReadController.js";
import { createThread } from "../controllers/threadCreateController.js";
import { updateThread } from "../controllers/threadUpdateController.js";
import { deleteThread } from "../controllers/threadDeleteController.js";
import { likeSystem } from "../controllers/likeSystemController.js";
import { authMiddleware } from "../middlewares/auth.js";
import { searchThreads } from '../controllers/threadSearchController.js';
// import { searchCategories } from '../controllers/categorySearchController.js';
// import { filterThreadsByUser } from '../controllers/userSearchController.js';
// import { sortThreadsByLikes, sortThreadsByDate } from '../controllers/sortSearchController.js';

const threadRouter = Router();

threadRouter
    .route('/search')
    .get(searchThreads);

// threadRouter
//     .route('/category/:category')
//     .get(searchCategories);

// router
//     .route('/threads')
//     .get(filterThreadsByUser);

// router
//     .route('/threads/sort')
//     .get(sortThreadsByLikes);

// router
//     .route('/threads/sort/date')
//     .get(sortThreadsByDate);
    
threadRouter.route("/").get(getAllThreads);

threadRouter.route("/:threadsId").get(getSingleThread);

// threadRouter.route("/:threadsId/like").put(likeSystem);

threadRouter.route("/:userId/createThread").post(authMiddleware, createThread);
// Bevor etwas gepostet wird,
// davor authentifizieren,
// sodass nur autorisierte Personen Inhalten posten dürfen
// threadRouter.use(auth)

threadRouter
  .route("/:userId/:threadId/updateThread")
  .patch(authMiddleware, updateThread)
  .put(authMiddleware, updateThread);

threadRouter
  .route("/:userId/:threadId/deleteThread")
  .delete(authMiddleware, deleteThread);

export default threadRouter;
