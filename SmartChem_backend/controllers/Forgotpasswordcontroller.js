import crypto from "crypto";
import nodemailer from "nodemailer";
import pool from "../config/db.js";

// ─── In-memory OTP store: { email → { otp, expiresAt } } ──────────────────────
// For production, replace with Redis or a DB table.
const otpStore = new Map();

// ─── Email Transporter ─────────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// ─── Step 1: Send OTP ──────────────────────────────────────────────────────────
// POST /api/auth/forgot-password
// Body: { email }
export const sendOtp = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Please enter your email address." });
        }

        // Check if the email is registered
        const existing = await pool.query(
            "SELECT id FROM users WHERE email = $1",
            [email]
        );

        if (existing.rows.length === 0) {
            // Return success anyway to avoid email enumeration attacks
            return res.json({ message: `An OTP has been sent to ${email}` });
        }

        // Generate a 4-digit OTP
        const otp = crypto.randomInt(1000, 9999).toString();
        const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

        // Store OTP
        otpStore.set(email, { otp, expiresAt });

        // Send OTP via email
        await transporter.sendMail({
            from: `"SmartChem Lab" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Your SmartChem Password Reset Code",
            html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: auto;">
          <h2 style="color: #064e3b;">Password Reset</h2>
          <p>Use the code below to reset your password. It expires in <strong>10 minutes</strong>.</p>
          <div style="font-size: 2.5rem; font-weight: 800; color: #10b981; letter-spacing: 8px; text-align: center; padding: 1.5rem 0;">
            ${otp}
          </div>
          <p style="color: #6b7280; font-size: 0.9rem;">If you didn't request this, you can safely ignore this email.</p>
        </div>
      `,
        });

        res.json({ message: `An OTP has been sent to ${email}` });
    } catch (error) {
        next(error);
    }
};

// ─── Step 2: Verify OTP ────────────────────────────────────────────────────────
// POST /api/auth/verify-otp
// Body: { email, otp }
export const verifyOtp = async (req, res, next) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: "Email and OTP are required." });
        }

        const record = otpStore.get(email);

        if (!record) {
            return res.status(400).json({ message: "No OTP was requested for this email." });
        }

        if (Date.now() > record.expiresAt) {
            otpStore.delete(email);
            return res.status(400).json({ message: "OTP has expired. Please request a new one." });
        }

        if (record.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP. Please try again." });
        }

        // OTP is valid — clear it so it can't be reused
        otpStore.delete(email);

        res.json({ message: "Verification successful! Redirecting..." });
    } catch (error) {
        next(error);
    }
};