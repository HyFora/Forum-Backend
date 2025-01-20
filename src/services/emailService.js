import { createTransport } from "nodemailer";
import dotenv from "dotenv";
dotenv.config({path: '../.env'});
const transporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_ACCOUNT,
    pass: process.env.MAIL_NODEMAILER_PASSWORD, 
  },
});

export const sendEmail = (to, subject, html) => {

  const mailOptions = {
    from: `"My APP" <${process.env.MAIL_ACCOUNT}>`, 
    to,
    subject,
    html,
  };

  // E-Mail senden
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email not sent:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};
