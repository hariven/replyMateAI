// middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { pool } from "../db";

export interface AuthRequest extends Request {
    file?: any;
    user?: {
        userId: number;
        email: string;
        trialStartDate?: Date | null;
        trialEndDate?: Date | null;
        isTrial?: boolean;
        planType?: string;
        actualPlan?: string;
        // Payment tracking fields
        paidUntil?: Date | null;
        lastManualPaymentDate?: Date | null;
        lastPaymentAmount?: number | null;
        paymentNotes?: string | null;
        lifetimeValue?: number | null;
        // Access control
        hasActiveAccess?: boolean;
    };
}

export async function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({ message: "Invalid token format" });
    }

    let token = parts[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    // Trim any whitespace that might have been introduced
    token = token.trim();

    // Debug logs
    console.log("[AUTH] Token received (first 20 chars):", token.substring(0, 20) + (token.length > 20 ? "..." : ""));
    console.log("[AUTH] JWT_SECRET (first 10 chars):", (process.env.JWT_SECRET || "").substring(0, 10));

    try {
        // verify token + expiry
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtPayload & { id: number; email: string };

        console.log("[AUTH] Token decoded successfully, userId:", decoded.id);

        // Get user information including payment tracking fields
        const { rows } = await pool.query(
            `SELECT id, email, trial_start_date, trial_end_date, is_trial, plan_type, actual_plan,
                    paid_until, last_manual_payment_date, last_payment_amount, payment_notes, lifetime_value
             FROM users
             WHERE id = $1`,
            [decoded.id]
        );

        if (rows.length === 0) {
            return res.status(401).json({ message: "User not found" });
        }

        let user = rows[0];

        // Check if trial has expired and update database if needed
        if (user.is_trial) {
            const { rows: [result] } = await pool.query(
                `SELECT
                     CASE
                         WHEN trial_end_date IS NOT NULL AND trial_end_date >= NOW() THEN TRUE
                         ELSE FALSE
                     END as is_trial_valid
                 FROM users
                 WHERE id = $1`,
                [decoded.id]
            );

            // If trial is no longer valid, update the database
            if (result && !result.is_trial_valid) {
                await pool.query(
                    `UPDATE users
                     SET is_trial = FALSE
                     WHERE id = $1`,
                [decoded.id]
                );
                user.is_trial = false;
            }
        }

        // Determine if user has active access (either trial is valid or paid until future date)
        const now = new Date();
        const trialIsValid = user.is_trial && user.trial_end_date && user.trial_end_date >= now;
        const paidIsValid = user.paid_until && user.paid_until >= now;
        const hasActiveAccess = trialIsValid || paidIsValid;

        req.user = {
            userId: user.id,
            email: user.email,
            trialStartDate: user.trial_start_date,
            trialEndDate: user.trial_end_date,
            isTrial: user.is_trial,
            planType: user.plan_type,
            actualPlan: user.actual_plan,
            // Payment tracking fields
            paidUntil: user.paid_until,
            lastManualPaymentDate: user.last_manual_payment_date,
            lastPaymentAmount: user.last_payment_amount,
            paymentNotes: user.payment_notes,
            lifetimeValue: user.lifetime_value,
            // Access control
            hasActiveAccess: hasActiveAccess
        };
        next();
    } catch (err: any) {
        if (err.name === "TokenExpiredError") {
            console.error("JWT expired:", err);
            return res.status(401).json({ message: "Token expired" });
        }
        console.error("JWT verification failed:", err);
        return res.status(403).json({ message: "Invalid token" });
    }
}