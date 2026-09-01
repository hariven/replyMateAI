// routes/auth.ts
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { createUser, getUserByEmail, setPasswordResetToken, getUserByResetToken, getUserByResetTokenPlain, updatePasswordAndClearResetToken, updatePasswordAndClearResetTokenById } from "../services/userService";
import { pool } from "../db";

dotenv.config();
const router = express.Router();

// Create email transporter
let transporter;
if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_HOST && process.env.EMAIL_FROM) {
    transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    // Verify connection
    transporter.verify((error, success) => {
        if (error) {
            console.error("Error connecting to email server:", error);
        } else {
            console.log("Email server is ready to send messages");
        }
    });
} else if (process.env.NODE_ENV !== 'production') {
    // Development fallback: create a mock transporter that logs details
    transporter = {
        sendMail: async (mailOptions) => {
            console.log('[DEV] Email simulated:', {
                from: mailOptions.from,
                to: mailOptions.to,
                subject: mailOptions.subject,
                // preview only first 100 chars of html
                preview: mailOptions.html?.substring(0, 100)
            });
            return { messageId: 'preview-' + Date.now() };
        }
    };
    console.log('[DEV] Email credentials not configured, using mock transporter');
} else {
    // Production without email config - still create a transporter to avoid errors, but will fail
    transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.example.com',
        port: Number(process.env.EMAIL_PORT) || 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER || '',
            pass: process.env.EMAIL_PASS || '',
        },
    });
    console.log('[WARN] Email credentials missing in production; emails will fail to send');
}

// POST /signup (Public)
router.post("/signup", async (req, res) => {
    const { firstName, lastName, email, phone, businessName, password, plan } = req.body;

    try {
        // 1. Check if user already exists
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 2. Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // 3. Create user in DB
        const newUser = await createUser({
            firstName,
            lastName,
            email,
            phone,
            businessName,
            passwordHash,
        });

        // 4. Set trial and plan information (using UTC times)
        const trialStart = new Date();
        const trialEnd = new Date(trialStart.getTime() + (14 * 24 * 60 * 60 * 1000)); // 14 days in milliseconds

        await pool.query(
            `UPDATE users
             SET trial_start_date = $1,
                 trial_end_date = $2,
                 is_trial = TRUE,
                 plan_type = $3
             WHERE id = $4`,
            [trialStart, trialEnd, plan, newUser.id]
        );

        // 5. Generate JWT
        const token = jwt.sign(
            { id: newUser.id, email: newUser.email },
            process.env.JWT_SECRET!,
            { expiresIn: "1h" }
        );

        // Fetch updated user to return
        const updatedUser = await getUserByEmail(email);
        res.json({ token, user: updatedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// POST /login (Public)
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // compare password with stored hash
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // issue JWT
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: "1h" }
        );

        res.json({ token, user: { id: user.id, email: user.email } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// POST /forgot-password (Public)
router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;

    try {
        // Check if user exists
        const user = await getUserByEmail(email);
        if (!user) {
            // Don't reveal that the email doesn't exist for security
            return res.status(200).json({ message: "If an account exists with that email, you will receive a reset link." });
        }

        // Generate a random token
        const token = crypto.randomBytes(32).toString("hex");

        // Hash the token for storage
        const hashedToken = await bcrypt.hash(token, 10);

        // Set token expiration (1 hour from now)
        const expires = new Date();
        expires.setHours(expires.getHours() + 1);

        // Save the hashed token and expiration to the user
        await setPasswordResetToken(email, hashedToken, expires);

        // Determine frontend URL: in development, use the request origin; in production, use FRONTEND_URL env var
        const isDev = process.env.NODE_ENV !== 'production';
        const frontendUrl = isDev
            ? (req.headers.origin || req.headers.referer || 'http://localhost:5173').replace(/\/$/, '')
            : process.env.FRONTEND_URL;

        // Construct the reset URL
        const resetUrl = `${frontendUrl}/reset-password/${token}`;

        // Log reset URL in development
        if (isDev) {
            console.log('[DEV] Reset token:', token);
            console.log('[DEV] Reset URL:', resetUrl);
            console.log('[DEV] Frontend URL used:', frontendUrl);
        }

        // Send email if email configured
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_FROM) {
            await transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to: email,
                subject: "Password Reset Request",
                html: `
                    <p>You requested a password reset for your ReplyMate AI account.</p>
                    <p>Click the link below to reset your password (this link will expire in 1 hour):</p>
                    <a href="${resetUrl}">${resetUrl}</a>
                    <p>If you did not request this, please ignore this email.</p>
                `,
            });
        } else {
            // Log email details in development
            console.log('[DEV] Email would be sent to:', email);
            console.log('[DEV] Reset URL:', resetUrl);
        }

        res.status(200).json({ message: "If an account exists with that email, you will receive a reset link." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// GET /reset-password/:token (Public)
router.get("/reset-password/:token", async (req, res) => {
    const { token } = req.params;

    try {
        // Find user by token and check expiration
        const user = await getUserByResetTokenPlain(token);
        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // If we get here, token is valid
        res.status(200).json({ message: "Token is valid", userId: user.id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// POST /reset-password/:token (Public)
router.post("/reset-password/:token", async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }

    try {
        // Find user by token and check expiration
        const user = await getUserByResetTokenPlain(token);
        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Hash the new password
        const passwordHash = await bcrypt.hash(password, 10);

        // Update password and clear reset token fields
        await updatePasswordAndClearResetTokenById(user.id, passwordHash);

        res.status(200).json({ message: "Password has been reset successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;