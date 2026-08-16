// migrate.ts
import { pool } from "../db.ts";

const migrate = async () => {
    try {
        await pool.query(`
            ALTER TABLE users
            ADD COLUMN IF NOT EXISTS reset_token TEXT,
            ADD COLUMN IF NOT EXISTS reset_expires TIMESTAMP;
        `);

        console.log("✅ Migration addResetTokenToUser complete");
    } catch (err) {
        console.error(
            "❌ Migration addResetTokenToUser failed",
            err instanceof Error ? err.message : err
        );
        process.exit(1);
    } finally {
        await pool.end();
    }
};

migrate();