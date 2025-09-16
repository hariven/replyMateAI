// migrate.ts
import { pool } from '../db.ts';

const migrate = async () => {
    try {
        await pool.query(`
            ALTER TABLE business_images ADD COLUMN embedding vector(1536);
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