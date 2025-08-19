// server/routes/contact.js
import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/contact", async (req, res) => {
  try {
    const { firstName, lastName, company, email, phone, message } = req.body;

    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ error: "Required fields are missing" });
    }

    // Example: send email using Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail
        pass: process.env.EMAIL_PASS, // app password (not your main Gmail pass)
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER, // your email to receive messages
      subject: `New Contact from ${firstName} ${lastName}`,
      text: `
        Name: ${firstName} ${lastName}
        Company: ${company}
        Email: ${email}
        Phone: ${phone}
        Message: ${message}
      `,
    });

    res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
