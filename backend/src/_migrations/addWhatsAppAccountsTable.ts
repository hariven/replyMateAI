// Migration to add WhatsApp Phone Number ID, Access Token, and WABA ID to business table
import { pool } from '../db.ts';

const migrate = async () => {
    try {
        // Add whatsapp_phone_number_id column
        await pool.query(`
            ALTER TABLE business
            ADD COLUMN IF NOT EXISTS whatsapp_phone_number_id TEXT;
        `);

        // Add whatsapp_access_token column
        await pool.query(`
            ALTER TABLE business
            ADD COLUMN IF NOT EXISTS whatsapp_access_token TEXT;
        `);

        // Add waba_id column (WhatsApp Business Account ID)
        await pool.query(`
            ALTER TABLE business
            ADD COLUMN IF NOT EXISTS waba_id TEXT;
        `);

        console.log('✅ Migration complete: Added whatsapp_phone_number_id, whatsapp_access_token, and waba_id to business table');
    } catch (err) {
        console.error('❌ Migration failed', err instanceof Error ? err.message : err);
        process.exit(1);
    } finally {
        await pool.end();
    }
};

migrate();