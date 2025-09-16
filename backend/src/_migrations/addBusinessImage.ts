// migrate.ts
import { pool } from '../db.ts';

const migrate = async () => {
    try {
        await pool.query(`
            CREATE TABLE business_images (
            id SERIAL PRIMARY KEY,
            business_id UUID NOT NULL REFERENCES business(id) ON DELETE CASCADE,
            image_url TEXT NOT NULL,
            description TEXT, -- optional (e.g., "product photo", "logo")
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
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