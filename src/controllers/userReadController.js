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