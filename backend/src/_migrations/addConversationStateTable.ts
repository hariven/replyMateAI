// Migration: create conversation_state table for the Inbox feature (mode, unread, AI insight snapshot)
import { pool } from '../db.ts';

export default async function migrate() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS conversation_state (
          id SERIAL PRIMARY KEY,
          business_id UUID NOT NULL REFERENCES business(id) ON DELETE CASCADE,
          phone_number TEXT NOT NULL,
          user_id UUID REFERENCES users(id) ON DELETE CASCADE,
          mode TEXT NOT NULL DEFAULT 'ai',
          unread_count INT NOT NULL DEFAULT 0,
          is_starred BOOLEAN NOT NULL DEFAULT FALSE,
          is_blocked BOOLEAN NOT NULL DEFAULT FALSE,
          tags TEXT[] NOT NULL DEFAULT '{}',
          customer_name TEXT,
          last_message_preview TEXT,
          last_message_at TIMESTAMP,
          ai_summary TEXT,
          ai_intent_primary TEXT,
          ai_intent_confidence INT,
          ai_intent_alternatives TEXT[] NOT NULL DEFAULT '{}',
          lead_status TEXT NOT NULL DEFAULT 'none',
          lead_score INT NOT NULL DEFAULT 0,
          lead_potential_value TEXT,
          kb_sources_used JSONB NOT NULL DEFAULT '[]'::jsonb,
          insight_source TEXT,
          insight_generated_at TIMESTAMP,
          created_at TIMESTAMP NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
          CONSTRAINT conversation_state_business_phone_unique UNIQUE (business_id, phone_number)
        );
    `);

    await pool.query(`
        ALTER TABLE conversation_state DROP CONSTRAINT IF EXISTS conversation_state_mode_check;
        ALTER TABLE conversation_state ADD CONSTRAINT conversation_state_mode_check
          CHECK (mode IN ('ai','human','waiting','closed'));

        ALTER TABLE conversation_state DROP CONSTRAINT IF EXISTS conversation_state_lead_status_check;
        ALTER TABLE conversation_state ADD CONSTRAINT conversation_state_lead_status_check
          CHECK (lead_status IN ('hot','warm','cold','none'));

        ALTER TABLE conversation_state DROP CONSTRAINT IF EXISTS conversation_state_lead_score_check;
        ALTER TABLE conversation_state ADD CONSTRAINT conversation_state_lead_score_check
          CHECK (lead_score BETWEEN 0 AND 100);

        ALTER TABLE conversation_state DROP CONSTRAINT IF EXISTS conversation_state_insight_source_check;
        ALTER TABLE conversation_state ADD CONSTRAINT conversation_state_insight_source_check
          CHECK (insight_source IN ('marker','regenerate') OR insight_source IS NULL);
    `);

    await pool.query(`
        CREATE INDEX IF NOT EXISTS idx_conversation_state_business_lastmsg
          ON conversation_state (business_id, last_message_at DESC);
    `);

    console.log('✅ Migration complete: created conversation_state table');
}
