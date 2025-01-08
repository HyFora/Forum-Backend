import { validationResult } from "express-validator";

export const validateInputs = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array(), // Alle Fehler als Array
    });
  }
  next(); 
};
