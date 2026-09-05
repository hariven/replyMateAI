// Migration: backfill conversation_state for conversations that existed before the Inbox feature.
import { pool } from '../db.ts';

export default async function migrate() {
    await pool.query(`
        INSERT INTO conversation_state (business_id, phone_number, user_id, last_message_at, last_message_preview, created_at)
        SELECT
            c.business_id,
            c.phone_number,
            (ARRAY_AGG(c.user_id))[1] AS user_id,
            MAX(c.created_at) AS last_message_at,
            (ARRAY_AGG(c.message ORDER BY c.created_at DESC))[1] AS last_message_preview,
            MIN(c.created_at) AS created_at
        FROM conversations c
        WHERE c.sender_type != 'system'
        GROUP BY c.business_id, c.phone_number
        ON CONFLICT (business_id, phone_number) DO NOTHING;
    `);

    console.log('✅ Migration complete: backfilled conversation_state from existing conversations');
}
