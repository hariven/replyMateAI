// Migration: add sender_type/message_type/media metadata to conversations for the Inbox feature
import { pool } from '../db.ts';

export default async function migrate() {
    await pool.query(`
        ALTER TABLE conversations
          ADD COLUMN IF NOT EXISTS message_id TEXT,
          ADD COLUMN IF NOT EXISTS sender_type TEXT NOT NULL DEFAULT 'customer',
          ADD COLUMN IF NOT EXISTS event_kind TEXT,
          ADD COLUMN IF NOT EXISTS message_type TEXT NOT NULL DEFAULT 'text',
          ADD COLUMN IF NOT EXISTS media_url TEXT,
          ADD COLUMN IF NOT EXISTS media_meta JSONB;
    `);

    await pool.query(`
        ALTER TABLE conversations DROP CONSTRAINT IF EXISTS conversations_sender_type_check;
        ALTER TABLE conversations ADD CONSTRAINT conversations_sender_type_check
          CHECK (sender_type IN ('customer','ai','human','system'));

        ALTER TABLE conversations DROP CONSTRAINT IF EXISTS conversations_event_kind_check;
        ALTER TABLE conversations ADD CONSTRAINT conversations_event_kind_check
          CHECK (event_kind IN ('intent-detected','ai-generated','attention-requested','handoff') OR event_kind IS NULL);

        ALTER TABLE conversations DROP CONSTRAINT IF EXISTS conversations_message_type_check;
        ALTER TABLE conversations ADD CONSTRAINT conversations_message_type_check
          CHECK (message_type IN ('text','image','document','location','voice','link'));
    `);

    // Best-effort backfill; historical false rows can't be distinguished between AI and human.
    await pool.query(`UPDATE conversations SET sender_type = 'customer' WHERE is_user = TRUE AND sender_type = 'customer'`);
    await pool.query(`UPDATE conversations SET sender_type = 'ai' WHERE is_user = FALSE AND sender_type = 'customer'`);

    await pool.query(`
        CREATE INDEX IF NOT EXISTS idx_conversations_business_phone_created
          ON conversations (business_id, phone_number, created_at);
    `);

    console.log('✅ Migration complete: conversations sender_type/message_type/media columns added');
}
