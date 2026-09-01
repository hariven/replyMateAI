// Migration to add trial and plan fields to users table
import { pool } from '../db.ts';

const migrate = async () => {
    try {
        // Add trial start date
        await pool.query(`
            ALTER TABLE users
            ADD COLUMN IF NOT EXISTS trial_start_date TIMESTAMP;
        `);

        // Add trial end date
        await pool.query(`
            ALTER TABLE users
            ADD COLUMN IF NOT EXISTS trial_end_date TIMESTAMP;
        `);

        // Add is_trial flag
        await pool.query(`
            ALTER TABLE users
            ADD COLUMN IF NOT EXISTS is_trial BOOLEAN DEFAULT TRUE;
        `);

        // Add plan type (starter, professional, enterprise)
        await pool.query(`
            ALTER TABLE users
            ADD COLUMN IF NOT EXISTS plan_type VARCHAR(20);
        `);

        // Add actual plan (what they're subscribed to after trial)
        await pool.query(`
            ALTER TABLE users
            ADD COLUMN IF NOT EXISTS actual_plan VARCHAR(20);
        `);

        console.log('✅ Migration complete: Added trial and plan fields to users table');
    } catch (err) {
        console.error('❌ Migration failed', err instanceof Error ? err.message : err);
        process.exit(1);
    } finally {
        await pool.end();
    }
};

migrate();