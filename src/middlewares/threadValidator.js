import { body, param } from "express-validator";

// Validator for creating or updating a thread
export const threadValidator = [
  // Validate 'title' field (1 to 100 characters, required)
  body('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters long.')
    .notEmpty()
    .withMessage('Title is required.'),

  // Validate 'content' field (2 to 1000 characters, required)
  body('content')
    .trim()
    .isLength({ min: 2, max: 1000 })
    .withMessage('Content must be between 2 and 1000 characters long.')
    .notEmpty()
    .withMessage('Content is required.'),

  // Validate the 'threadId' parameter (check if it's a valid ObjectId format)
  param('threadId')
    .custom((value) => {
      if (!/^[0-9a-fA-F]{24}$/.test(value)) {
        throw new Error('Invalid thread ID');
      }
      return true;
    })
    .withMessage('Invalid thread ID format.'),
];

