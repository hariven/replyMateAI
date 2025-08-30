// migrate.ts
import { pool } from '../db.ts';

const migrate = async () => {
    try {
        await pool.query(`
            ALTER TABLE business
            DROP CONSTRAINT unique_user_whatsapp;

            ALTER TABLE business
            ADD CONSTRAINT unique_business_whatsapp_number
            UNIQUE (whatsapp_number);
        `);

        console.log('✅ Migration complete');
    } catch (err) {
        console.error('❌ Migration failed', err instanceof Error ? err.message : err);
        process.exit(1);
    } finally {
        await pool.end();
    }
};

migrate();