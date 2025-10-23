// services/conversation.ts
import { pool } from '../db';

/**
 * Save a message to the conversations table.
 * Validates all required fields before attempting insertion.
 */
export async function saveMessage(
    userId: string,
    businessId: string,
    phone: string | null | undefined,
    message: string,
    isUser = true
) {
    // ✅ Validate input
    if (!userId || !businessId || !phone) {
        console.error('❌ Missing required fields in saveMessage:', {
            userId,
            businessId,
            phone,
            message,
        });
        return null; // stop before inserting invalid data
    }

    try {
        const { rows } = await pool.query(
            `INSERT INTO conversations (user_id, business_id, phone_number, message, is_user)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`, // ✅ return inserted row if needed
            [userId, businessId, phone, message, isUser]
        );

        return rows[0];
    } catch (error) {
        console.error('❌ Error saving message:', error);
        throw error;
    }
}

/**
 * Get recent conversation context for a user/business/phone.
 */
export async function getConversationContext(
    userId: string,
    businessId: string,
    phone: string | null | undefined,
    limit = 10
) {
    if (!userId || !businessId || !phone) {
        console.error('❌ Missing required fields in getConversationContext:', {
            userId,
            businessId,
            phone,
        });
        return [];
    }

    try {
        const { rows } = await pool.query(
            `SELECT message, is_user
       FROM conversations
       WHERE user_id = $1 AND business_id = $2 AND phone_number = $3
       ORDER BY created_at DESC
       LIMIT $4`,
            [userId, businessId, phone, limit]
        );

        return rows.reverse(); // chronological order
    } catch (error) {
        console.error('❌ Error fetching conversation context:', error);
        throw error;
    }
}
