// migrate.ts - Fix conversations table column types to match business table
import { pool } from '../db.ts';

const migrate = async () => {
    try {
        await pool.query(`
            -- Alter conversations table to use UUID for foreign keys
            ALTER TABLE conversations
            ALTER COLUMN user_id TYPE UUID USING user_id::uuid,
            ALTER COLUMN business_id TYPE UUID USING business_id::uuid;

            -- Add foreign key constraints (optional but recommended)
            ALTER TABLE conversations
            ADD CONSTRAINT conversations_user_id_fkey
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

            ALTER TABLE conversations
            ADD CONSTRAINT conversations_business_id_fkey
            FOREIGN KEY (business_id) REFERENCES business(id) ON DELETE CASCADE;
        `);

        console.log('✅ Migration complete: conversations columns converted to UUID');
    } catch (err) {
        console.error('❌ Migration failed', err instanceof Error ? err.message : err);
        process.exit(1);
    } finally {
        await pool.end();
    }
};

migrate();