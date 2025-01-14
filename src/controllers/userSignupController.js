import { User } from '../models/userModel.js';
import { hashPassword, comparePasswords } from '../utils/passwordUtils.js';
import { sendEmail } from "../services/emailService.js";
import jwt from "jsonwebtoken"
import 'dotenv/config';

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