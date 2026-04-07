import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const smtpPort = parseInt(process.env.SMTP_PORT, 10) || 587;

export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const sendEmail = async ({ to, subject, html }) => {
    return await transporter.sendMail({
        from: `"ITI_MERN" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html,
    });
};

export default sendEmail;
