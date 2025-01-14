import express from "express";

import {
  signupValidator,
  updateUserValidator,
} from "../middlewares/userValidator.js";
// import { addReviewToUser} from "../controllers/userController.js";
import { validateInputs } from "../middlewares/validator.js";
import { verifyToken } from "../utils/verifyToken.js";
import { verifyEmail } from "../services/verifyEmail.js";
import { signup } from "../controllers/userSignupController.js";
import { login } from "../controllers/userLoginController.js";
import { getUserById, getAllUsers } from "../controllers/userReadController.js";
import { updateUser } from "../controllers/userUpdateController.js";
import { deleteUser } from "../controllers/userDeleteController.js";

const userRouter = express.Router();

userRouter.route("/").get(getAllUsers);

userRouter.route("/signup").post(signup, signupValidator, validateInputs);

userRouter.route("/verify/:userId").post(verifyEmail);

userRouter.route("/login").post(login);

userRouter
  .route("/:userId")
  .get(getUserById)
  .patch(verifyToken, updateUser, updateUserValidator, validateInputs)
  .delete(verifyToken, deleteUser);

// userRouter
//     .route("/review/:id")
//     .patch(addReviewToUser);

export default userRouter;
