import { Router } from "express";

import {
  getSingleThread,
  getAllThreads,
  postNewThread,
  changeThisThread,
  deleteThread
} from "../controllers/threadController.js"

const threadRouter = Router();

threadRouter
    .route("/threads")
    .get(getAllThreads)
    .post(postNewThread);

// Bevor etwas gepostet wird, 
// davor authentifizieren, 
// sodass nur autorisierte Personen Inhalten posten dürfen
// threadRouter.use(auth)

threadRouter
  .route("/threads/:id")
  .get(getSingleThread)
  .put(changeThisThread)
  .delete(deleteThread);

  export default threadRouter;