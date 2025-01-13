import { Router } from "express";

import {
  getSingleThread,
  getAllThreads,
  createThread,
  // changeThisThread,
  // deleteThread
} from "../controllers/threadController.js"

const threadRouter = Router();

threadRouter
    .route("/")
    .post(createThread)
    .get(getAllThreads)

// Bevor etwas gepostet wird, 
// davor authentifizieren, 
// sodass nur autorisierte Personen Inhalten posten dürfen
// threadRouter.use(auth)

threadRouter
  .route("/:threadsId")
  .get(getSingleThread)
  // .put(changeThisThread)
  // .delete(deleteThread);

  export default threadRouter;