import express from "express";

import { searchThreads } from "../controllers/threadSearchController.js";

const router = express.Router();

userRouter
    .route("/")
    .get(searchCategories);