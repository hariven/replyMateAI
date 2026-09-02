// Migration: create leads table to track qualified leads + owner notifications
import { pool } from '../db.ts';

const migrate = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS leads (
                id SERIAL PRIMARY KEY,
                business_id UUID NOT NULL REFERENCES business(id) ON DELETE CASCADE,
                user_id UUID REFERENCES users(id),
                phone_number TEXT NOT NULL,
                trigger_type TEXT,
                intent_summary TEXT,
                message TEXT,
                notified BOOLEAN DEFAULT FALSE,
                notified_at TIMESTAMP,
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);

        await pool.query(`
            CREATE INDEX IF NOT EXISTS idx_leads_business_phone
            ON leads (business_id, phone_number, created_at DESC);
        `);

        console.log('✅ Migration complete: created leads table + index');
    } catch (err) {
        console.error('❌ Migration failed', err instanceof Error ? err.message : err);
        process.exit(1);
    } finally {
        await pool.end();
    }
};

migrate();
