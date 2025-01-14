import express from "express";

import {
  signupValidator,
  updateUserValidator,
} from "../middlewares/userValidator.js";
import { validateInputs } from "../middlewares/validator.js";
import { verifyToken } from "../utils/verifyToken.js";
import { verifyEmail } from "../services/verifyEmail.js";
import {
  getAllUsers,
  getUserById,
  updateUserInfo,
  // addReviewToUser,
  deleteUser,
  signup,
  login,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.route("/").get(getAllUsers);

userRouter.route("/signup").post(signup, signupValidator, validateInputs);

userRouter.route("/verify/:userId").post(verifyEmail);

userRouter.route("/login").post(login);

userRouter
  .route("/:userId")
  .get(getUserById)
  .patch(verifyToken, updateUserInfo, updateUserValidator, validateInputs)
  .delete(verifyToken, deleteUser);

// userRouter
//     .route("/review/:id")
//     .patch(addReviewToUser);

export default userRouter;
