// Migration to add manual payment tracking fields to users table
import { pool } from '../db.ts';

const migrate = async () => {
    try {
        // Add paid until date (NULL means no paid access, otherwise access granted until this date)
        await pool.query(`
            ALTER TABLE users
            ADD COLUMN IF NOT EXISTS paid_until TIMESTAMP;
        `);

        // Add last manual payment date
        await pool.query(`
            ALTER TABLE users
            ADD COLUMN IF NOT EXISTS last_manual_payment_date TIMESTAMP;
        `);

        // Add last payment amount
        await pool.query(`
            ALTER TABLE users
            ADD COLUMN IF NOT EXISTS last_payment_amount DECIMAL(10,2);
        `);

        // Add payment notes for admin reference
        await pool.query(`
            ALTER TABLE users
            ADD COLUMN IF NOT EXISTS payment_notes TEXT;
        `);

        // Add total lifetime value (for reporting)
        await pool.query(`
            ALTER TABLE users
            ADD COLUMN IF NOT EXISTS lifetime_value DECIMAL(12,2) DEFAULT 0;
        `);

        console.log('✅ Migration complete: Added payment tracking fields to users table');
    } catch (err) {
        console.error('❌ Migration failed', err instanceof Error ? err.message : err);
        process.exit(1);
    } finally {
        await pool.end();
    }
};

migrate();