import { User } from '../models/userModel.js';
import { hashPassword, comparePasswords } from '../utils/passwordUtils.js';
import { sendEmail } from "../services/emailService.js";
import jwt from "jsonwebtoken"
import 'dotenv/config';


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