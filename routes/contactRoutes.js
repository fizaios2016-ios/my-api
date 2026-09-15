const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

router.post("/", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                message: "Name, email and message are required"
            });
        }

        await transporter.sendMail({
            from: process.env.EMAIL_USER,

            to: process.env.CONTACT_EMAIL,

            replyTo: email,

            subject: `Portfolio message from ${name}`,

            text: `
Name: ${name}
Email: ${email}

Message:
${message}
            `
        });

        res.status(200).json({
            message: "Message sent successfully"
        });

    } catch (error) {
        console.error("Contact email error:", error);

        res.status(500).json({
            message: "Unable to send message"
        });
    }
});

module.exports = router;