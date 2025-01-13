import express from "express";

import { searchCategories } from "../controllers/categorySearchController.js";

const router = express.Router();

userRouter
    .route("/")
    .get(searchCategories);
