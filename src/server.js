import express from "express";
import dotenv from "dotenv";
dotenv.config({path: '../.env'});

import mongoose from "mongoose";
import cors from "cors";

import userRouter from "./routes/userRouter.js";

// import {categoryRouter} from "./routes/categoryRouter.js";

import threadRouter from "./routes/threadRouter.js";
// import { router } from "./routes/threadSearchRouter.js";

import { middleware } from "./middlewares/middleware.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_DB_URI = process.env.MONGO_DB_URI || "mongodb://localhost:27017";

console.log(process.env.MONGO_DB_URI);
console.log(PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(middleware.log);

app.use("/user", userRouter);
app.use("/threads", threadRouter);

// app.use("/category", categoryRouter);


app.use("*", middleware.invalid);

app.use(errorHandler);

mongoose
  .connect(MONGO_DB_URI)
  .then(() => {
    console.log(`Connection with mongoDB: SUCCESS ✅`);
    app.listen(PORT, () => {
      console.log(`Listening at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Connection with mongoDB: FAILED ⛔`, error);
    process.exit(1);
  });
mongoose.connection.on(`error`, () => {
  console.error(`Connection with mongoDB: FAILED ⛔:`, error);
});
