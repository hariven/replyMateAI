// services/userService.ts
import { pool } from "../db";

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