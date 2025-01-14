import { Router } from "express";

import {
  getSingleThread,
  getAllThreads,
} from "../controllers/threadReadController.js";
import { createThread } from "../controllers/threadCreateController.js";
import { updateThread } from "../controllers/threadUpdateController.js";
import { deleteThread } from "../controllers/threadDeleteController.js";

import { authMiddleware } from "../middlewares/auth.js";

const threadRouter = Router();

threadRouter.route("/").get(getAllThreads);

threadRouter.route("/:threadsId").get(getSingleThread);

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
