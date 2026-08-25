// One-time script to fix migration state in production
// This marks all existing migrations as executed except the new WhatsApp one
import { pool } from './src/db.ts';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fixMigrationState = async () => {
    try {
        console.log('🔧 Fixing migration state...');

        // Create migrations tracking table if not exists
        await pool.query(`
            CREATE TABLE IF NOT EXISTS schema_migrations (
                id SERIAL PRIMARY KEY,
                filename TEXT UNIQUE NOT NULL,
                executed_at TIMESTAMP DEFAULT NOW()
            );
        `);

        // List of migrations that have ALREADY been applied in production
        // Everything except addWhatsAppAccountsTable.ts (which needs to be run)
        const alreadyAppliedMigrations = [
            'addBusinessImage.ts',
            'addColumnInBImage.ts',
            'addConversationTable.ts',
            'addCreatedTsColumn.ts',
            'addResetTokenToUser.ts',
            'createKbEmbedTable.ts',
            'createUserTable.ts',
            'fixConversationColumnTypes.ts',
            'makeUserIdUnique.ts'
            // NOTE: addWhatsAppAccountsTable.ts is intentionally omitted
        ];

        console.log(`📝 Marking ${alreadyAppliedMigrations.length} migrations as already executed...`);

        // Insert each migration as already executed
        for (const filename of alreadyAppliedMigrations) {
            await pool.query(
                'INSERT INTO schema_migrations (filename) VALUES ($1) ON CONFLICT DO NOTHING',
                [filename]
            );
            console.log(`   ✓ ${filename}`);
        }

        // Verify what's now marked as executed
        const { rows: executed } = await pool.query(
            'SELECT filename FROM schema_migrations ORDER BY filename'
        );

        console.log(`\n📋 Currently executed migrations (${executed.length}):`);
        executed.forEach(row => console.log(`   - ${row.filename}`));

        // Check what's still pending
        const { rows: allMigrations } = await pool.query(`
            SELECT filename FROM (
                VALUES
                    ('addBusinessImage.ts'),
                    ('addColumnInBImage.ts'),
                    ('addConversationTable.ts'),
                    ('addCreatedTsColumn.ts'),
                    ('addResetTokenToUser.ts'),
                    ('addWhatsAppAccountsTable.ts'),
                    ('createKbEmbedTable.ts'),
                    ('createUserTable.ts'),
                    ('fixConversationColumnTypes.ts'),
                    ('makeUserIdUnique.ts')
            ) AS t(filename)
            WHERE filename NOT IN (SELECT filename FROM schema_migrations)
            ORDER BY filename
        `);

        console.log(`\n⏳ Still pending migrations (${allMigrations.length}):`);
        if (allMigrations.length === 0) {
            console.log('   (none - all caught up!)');
        } else {
            allMigrations.forEach(row => console.log(`   - ${row.filename}`));
        }

        console.log('\n✅ Migration state fixed!');

    } catch (err) {
        console.error('❌ Failed to fix migration state:', err);
        process.exit(1);
    } finally {
        await pool.end();
    }
};

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    fixMigrationState()
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
}