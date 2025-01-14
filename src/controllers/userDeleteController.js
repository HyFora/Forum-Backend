import { User } from '../models/userModel.js';
import { hashPassword, comparePasswords } from '../utils/passwordUtils.js';
import { sendEmail } from "../services/emailService.js";
import jwt from "jsonwebtoken"
import 'dotenv/config';

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
