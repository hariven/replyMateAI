// services/userService.ts
import { pool } from "../db";
import bcrypt from "bcrypt";

export async function getUserByEmail(email: string) {
    const result = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );
    return result.rows[0]; // returns undefined if no match
}

export async function createUser(user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    businessName: string;
    passwordHash: string;
}) {
    const { firstName, lastName, email, phone, businessName, passwordHash } = user;

    const result = await pool.query(
        `INSERT INTO users (first_name, last_name, email, phone, business_name, password_hash)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id, email`,
        [firstName, lastName, email, phone, businessName, passwordHash]
    );

    return result.rows[0];
}

export async function setPasswordResetToken(email: string, tokenHash: string, expires: Date) {
    const result = await pool.query(
        `UPDATE users
         SET reset_token = $1, reset_expires = $2
         WHERE email = $3
         RETURNING id, email`,
        [tokenHash, expires, email]
    );
    return result.rows[0];
}

export async function getUserByResetToken(tokenHash: string) {
    const result = await pool.query(
        "SELECT * FROM users WHERE reset_token = $1 AND reset_expires > NOW()",
        [tokenHash]
    );
    return result.rows[0];
}

export async function getUserByResetTokenPlain(token: string) {
    const result = await pool.query(
        "SELECT * FROM users WHERE reset_token IS NOT NULL AND reset_expires > NOW()"
    );
    for (const row of result.rows) {
        const match = await bcrypt.compare(token, row.reset_token);
        if (match) {
            return row;
        }
    }
    return null;
}

export async function updatePasswordAndClearResetToken(tokenHash: string, newPasswordHash: string) {
    const result = await pool.query(
        `UPDATE users
         SET password_hash = $1, reset_token = NULL, reset_expires = NULL
         WHERE reset_token = $2 AND reset_expires > NOW()
         RETURNING id, email`,
        [newPasswordHash, tokenHash]
    );
    return result.rows[0];
}

export async function updatePasswordAndClearResetTokenById(userId: number, newPasswordHash: string) {
    const result = await pool.query(
        `UPDATE users
         SET password_hash = $1, reset_token = NULL, reset_expires = NULL
         WHERE id = $2 AND reset_expires > NOW()
         RETURNING id, email`,
        [newPasswordHash, userId]
    );
    return result.rows[0];
}