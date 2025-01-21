import { User } from '../models/userModel.js';
import { hashPassword, comparePasswords } from '../utils/passwordUtils.js';
import { sendEmail } from "../services/emailService.js";
import jwt from "jsonwebtoken"
import 'dotenv/config';

// ================ LOGIN ==================

export const login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
   
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found. Please look after mistyping or sign up first!" });
        }

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