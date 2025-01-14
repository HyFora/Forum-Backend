import { Router } from "express";

import {
  getSingleThread,
  getAllThreads,
  createThread,
  // udpateThread,
  // deleteThread
} from "../controllers/threadController.js"
import {authMiddleware} from "../middlewares/auth.js"

const threadRouter = Router();

threadRouter
    .route("/threads")
    .get(getAllThreads)

threadRouter
    .route("/threads/:userId/createThread")
    .post(authMiddleware, createThread)

    // Bevor etwas gepostet wird, 
// davor authentifizieren, 
// sodass nur autorisierte Personen Inhalten posten dürfen
// threadRouter.use(auth)

threadRouter
  .route("/threads/:threadsId")
  .get(getSingleThread)
  // .put(changeThisThread)
  // .delete(deleteThread);

  export default threadRouter;