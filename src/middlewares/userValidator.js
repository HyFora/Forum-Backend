import { body } from "express-validator";

export const signupValidator = [
  body("username")
    .notEmpty()
    .withMessage("Username muss angegeben werden!")
    .trim()
    .isLength({ min: 3, max: 13 })
    .withMessage("Username muss mind. 3, max. 13 Zeichen beinhalten.")
    .escape(),
  body("email")
    .notEmpty()
    .withMessage("Email muss angegeben werden!")
    .trim()
    .isEmail()
    .withMessage("Bitte gültige Mail-Adresse angeben.")
    .normalizeEmail(),
  body("phone")
    .optional()
    .if(body("phone").notEmpty())
    .isMobilePhone()
    .withMessage("Ungültige Handynummer."),
  body("password")
    .notEmpty()
    .withMessage("Passwort muss angegeben werden!")
    .isStrongPassword()
    .withMessage("Passwort ist nicht sicher genug."),
];

export const updateUserValidator = [
  body("username")
    .optional()
    .trim()
    .isLength({ min: 3, max: 13 })
    .withMessage("Username muss mind. 3, max. 13 Zeichen beinhalten.")
    .escape(),
  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Bitte gültige Mail-Adresse angeben.")
    .normalizeEmail(),
  body("phone")
    .optional()
    .if(body("phone").notEmpty())
    .isMobilePhone()
    .withMessage("Ungültige Handynummer."),
  body("profile.firstName")
    .optional()
    .trim()
    .escape(),
  body("profile.lastName")
    .optional()
    .trim()
    .escape(),
  body("profile.bio")
    .optional()
    .trim()
    .escape(),
  body("profile.address.street1")
    .optional()
    .trim()
    .escape(),
  body("profile.address.street2")
    .optional()
    .trim()
    .escape(),
  body("profile.address.city")
    .optional()
    .trim()
    .escape(),
  body("profile.address.state")
    .optional()
    .trim()
    .escape(),
  body("profile.address.country")
    .optional()
    .trim()
    .escape(),
  body("profile.address.zip")
    .optional()
    .trim()
    .escape(),
];
