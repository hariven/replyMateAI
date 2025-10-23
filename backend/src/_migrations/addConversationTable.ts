// migrate.ts
import { pool } from '../db.ts';

const migrate = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS conversations (
            id SERIAL PRIMARY KEY,
            user_id VARCHAR NOT NULL,
            business_id VARCHAR NOT NULL,
            phone_number VARCHAR NOT NULL,
            message TEXT NOT NULL,
            is_user BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT NOW()
            );
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