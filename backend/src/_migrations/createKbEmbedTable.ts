// migrate.ts
import { pool } from "../db.ts";

const migrate = async () => {
    try {
        await pool.query(`
            CREATE EXTENSION IF NOT EXISTS vector;

-- Store embeddings
CREATE TABLE IF NOT EXISTS knowledge_base_embeddings (
    id SERIAL PRIMARY KEY NOT NULL,
    business_id UUID REFERENCES business(id),
    content TEXT,
    embedding vector(1536)
);
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
