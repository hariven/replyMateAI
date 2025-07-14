// migrate.ts
import { pool } from './src/_migrations/db.ts';

const migrate = async () => {
    try {
        await pool.query(`
            CREATE EXTENSION IF NOT EXISTS "pgcrypto";

            CREATE TABLE IF NOT EXISTS business (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name TEXT NOT NULL,
                whatsapp_number TEXT UNIQUE NOT NULL
            );

            CREATE TABLE IF NOT EXISTS knowledge_base (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                business_id UUID REFERENCES business(id),
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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