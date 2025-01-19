import { body, param } from "express-validator";

// Validator for creating or updating a thread
export const threadValidator = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Title must be between 1 and 100 characters long.")
    .notEmpty()
    .withMessage("Title is required."),

  body("content")
    .trim()
    .isLength({ min: 2, max: 1000 })
    .withMessage("Content must be between 2 and 1000 characters long.")
    .notEmpty()
    .withMessage("Content is required."),

  body("category")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Category must be chosed")
    .notEmpty(),

  param("threadId").isMongoId().withMessage("Invalid thread ID format."),
];
