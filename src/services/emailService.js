import { createTransport } from "nodemailer";
import 'dotenv/config';

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.DCI_MAIL_ACCOUNT,
    pass: process.env.DCI_MAIL_NODEMAILER_PASSWORD, 
  },
});

export const sendEmail = (to, subject, html) => {

  const mailOptions = {
    from: `"My APP" <${process.env.DCI_MAIL_ACCOUNT}>`, 
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
