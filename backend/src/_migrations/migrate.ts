// Auto-migration runner - runs all pending migrations on startup
import { pool } from '../db.ts';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create migrations tracking table if not exists
async function ensureMigrationsTable() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS schema_migrations (
            id SERIAL PRIMARY KEY,
            filename TEXT UNIQUE NOT NULL,
            executed_at TIMESTAMP DEFAULT NOW()
        );
    `);
}

// Get list of already executed migrations
async function getExecutedMigrations() {
    const { rows } = await pool.query('SELECT filename FROM schema_migrations ORDER BY id');
    return new Set(rows.map(r => r.filename));
}

// Run a specific migration file
async function runMigration(filename: string) {
    console.log(`📦 Running migration: ${filename}`);

    // Dynamic import of the migration module
    const migrationPath = path.join(__dirname, filename);
    const migrationModule = await import(migrationPath);

    // If the module has a default export that's a function, call it
    if (migrationModule.default && typeof migrationModule.default === 'function') {
        await migrationModule.default();
    } else if (typeof migrationModule.migrate === 'function') {
        await migrationModule.migrate();
    } else {
        // For scripts that run on import (like our existing migrations)
        console.log(`   (Executed on import)`);
    }

    // Record as executed
    await pool.query(
        'INSERT INTO schema_migrations (filename) VALUES ($1) ON CONFLICT DO NOTHING',
        [filename]
    );
    console.log(`✅ Completed: ${filename}`);
}

// Main migration runner - run all pending migrations
export async function runMigrations() {
    console.log('🔍 Checking for pending migrations...');

    await ensureMigrationsTable();
    const executed = await getExecutedMigrations();

    // Get all migration files
    const migrationFiles = fs.readdirSync(__dirname)
        .filter(f => f.endsWith('.ts') && f !== 'migrate.ts' && f !== 'patchWhatsAppCredentials.ts')
        .sort(); // Sort for consistent order

    const pending = migrationFiles.filter(f => !executed.has(f));

    if (pending.length === 0) {
        console.log('✅ No pending migrations');
        return;
    }

    console.log(`📋 Found ${pending.length} pending migration(s):`);
    pending.forEach(f => console.log(`   - ${f}`));

    for (const file of pending) {
        try {
            await runMigration(file);
        } catch (err) {
            console.error(`❌ Migration failed: ${file}`, err);
            throw err;
        }
    }

    console.log('🎉 All migrations completed successfully!');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    runMigrations()
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
}