// migrate.ts
import { pool } from "../db.ts";

const migrate = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                first_name TEXT NOT NULL,
                last_name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                phone TEXT NOT NULL,
                business_name TEXT NOT NULL,
                password_hash TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

    ALTER TABLE business
    ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES users(id);
        `);

        console.log("✅ Migration complete");
    } catch (err) {
        console.error(
            "❌ Migration failed",
            err instanceof Error ? err.message : err
        );
        process.exit(1);
    } finally {
        await pool.end();
    }
};

migrate();
