// Migration to add owner_whatsapp_number to business table for lead notifications
import { pool } from '../db.ts';

const migrate = async () => {
    try {
        // Add owner_whatsapp_number column
        await pool.query(`
            ALTER TABLE business
            ADD COLUMN IF NOT EXISTS owner_whatsapp_number TEXT;
        `);

        console.log('✅ Migration complete: Added owner_whatsapp_number to business table');
    } catch (err) {
        console.error('❌ Migration failed', err instanceof Error ? err.message : err);
        process.exit(1);
    } finally {
        await pool.end();
    }
};

migrate();