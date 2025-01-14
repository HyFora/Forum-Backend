import { User } from '../models/userModel.js';
import { hashPassword, comparePasswords } from '../utils/passwordUtils.js';
import { sendEmail } from "../services/emailService.js";
import jwt from "jsonwebtoken"
import 'dotenv/config';

// ================ READ ==================
// Alle Benutzer abrufen
export const getAllUsers = async (req, res, next) => {
    try {
        res.json(await User.find());
    } catch (err) {
        next(err);
    }
};

// ================ READ BY ID ==================
// Benutzer nach ID abrufen
export const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            const error = new Error("User not found.");
            error.status = 404;
            next(error);
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
};

// ================ SIGNUP ==================
// Benutzer registrieren
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        // Prüfen, ob der Benutzername oder die E-Mail bereits existieren
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "Username or email already exists." });
        }

        // Passwort hashen
        const hashedPassword = await hashPassword(password);

        // Neuen Benutzer erstellen
        const newUser = new User({ username, email, password: hashedPassword, verified: false });
        await newUser.save();

        // Verifizierungs-E-Mail senden
        const subject = "Email Verification";
        const html = `
          <h1>Welcome, ${username}!</h1>
          <p>Please verify your email by clicking the link below:</p>
          <a href="http://localhost:3000/verify/${newUser._id}">Verify Email</a>
        `;
        sendEmail(email, subject, html);

        res.status(201).json({ message: "Signup successful. Please verify your email." });
    } catch (error) {
        next(error);
    }
};

// ================= VERIFY EMAIL ==================
// E-Mail-Verifizierung
export const verifyEmail = async (req, res, next) => {
    try {
      const { userId } = req.params;
  
      // Benutzer suchen und als verifiziert markieren
      const user = await User.findByIdAndUpdate(userId, { verified: true }, { new: true });
      if (!user) {
        return res.status(404).json({ message: "User not found or already verified." });
      }
      res.status(200).json({ message: "Email successfully verified." });
    } catch (error) {
      next(error);
    }
  };
  

// ================ LOGIN ==================
// Benutzer einloggen
export const login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        // Benutzer in der Datenbank suchen
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found. Please look after mistyping or sign up first!" });
        }

        // Passwort vergleichen
        const passwordMatches = await comparePasswords(password, user.password);
        if (!passwordMatches) {
            return res.status(401).json({ message: "Wrong password." });
        }

        const token = jwt.sign({ username: user.username, id: user._id }, process.env.JWT_SECRET, { expiresIn: "12h" });

        res.status(200).json({ message: "Login successful.", token: token });
    } catch (error) {
        next(error);
    }
};

// ================ UPDATE ==================
// Benutzer aktualisieren
export const updateUserInfo = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            const error = new Error("User not found.");
            error.status = 404;
            next(error);
        }
        res.json({ message: "Userinfo updated." });
    } catch (error) {
        next(error);
    }
};

// ================ ADD REVIEW ==================
// Rezension zum Benutzer hinzufügen
// export const addReviewToUser = async (req, res, next) => {
//     try {
//         const updatedUser = await User.findByIdAndUpdate(
//             req.params.userId,
//             { $push: { reviews: req.body.review } },
//             { new: true, runValidators: true }
//         );
//         if (!updatedUser) {
//             const error = new Error("User not found.");
//             error.status = 404;
//             next(error);
//         }
//         res.json({ message: "Userinfo updated." });
//     } catch (error) {
//         next(error);
//     }
// };

// ================ (SOFT-) DELETE ==================
// Benutzer löschen
export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            const error = new Error("User not found.");
            error.status = 404;
            next(error);
        }
        user.deleted = true; // Als soft deleted markieren
        await user.save();
        res.json({ message: "User soft deleted" });
    } catch (error) {
        next(error);
    }
};
