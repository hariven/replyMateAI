# Fixing Migration State in Production

## Problem
After deploying changes that include a migration runner, the production deployment is trying to run ALL migrations instead of just the new one (`addWhatsAppAccountsTable.ts`). This happens because:

1. The migration runner uses a `schema_migrations` table to track which migrations have been executed
2. In production, this table either doesn't exist or is empty
3. So the runner thinks NO migrations have been run and tries to execute them all
4. Some older migrations fail when re-run because they don't have "IF NOT EXISTS" clauses

## Solution
You need to run a one-time script to mark the existing migrations as already executed in production.

## Steps to Fix

### 1. Deploy the Fix Script
First, deploy the current code (which includes the fix script) to Render:
- Git push to main
- Or trigger a manual deploy
- This makes the `fix_migration_state.ts` script available in production

### 2. Run the Fix Script
Once deployed, you need to execute the fix script ONCE:

**Option A: Using Render Shell (Recommended)**
1. Go to your Render service dashboard
2. Click the **"Shell"** tab
3. Click "Connect to Shell"
4. In the terminal, run:
   ```bash
   cd /opt/render/project/src/backend
   pnpm run fix-migration-state
   ```
5. You should see output showing it marking migrations as executed
6. Type `exit` or close the shell when done

**Option B: As a One-Time Deploy Script**
1. Temporarily add to your `package.json` scripts:
   ```json
   "deploy-fix": "node --loader ts-node/esm fix_migration_state.ts"
   ```
2. Deploy once with this script as the start command (or run it manually via shell as above)
3. Remove the script after it runs successfully

### 3. Verify the Fix
After running the fix script, check that:
- The `schema_migrations` table exists and has records
- Only `addWhatsAppAccountsTable.ts` is listed as pending
- All other migrations are marked as executed

### 4. Resume Normal Deployments
After the fix is applied:
- Future deployments will only run pending migrations (just the WhatsApp one initially)
- You can use the `SKIP_MIGRATIONS` environment variable to test with/without migrations
- Normal operation: unset `SKIP_MIGRATIONS` or set to `false` to run migrations
- To test without migrations: set `SKIP_MIGRATIONS=true`

## What the Fix Script Does
The `fix_migration_state.ts` script:
1. Creates the `schema_migrations` table if it doesn't exist
2. Marks these migrations as already executed:
   - `addBusinessImage.ts`
   - `addColumnInBImage.ts`
   - `addConversationTable.ts`
   - `addCreatedTsColumn.ts`
   - `addResetTokenToUser.ts`
   - `createKbEmbedTable.ts`
   - `createUserTable.ts`
   - `fixConversationColumnTypes.ts`
   - `makeUserIdUnique.ts`
3. Leaves `addWhatsAppAccountsTable.ts` unmarked (so it will run)

## Expected Behavior After Fix
**First deploy after fix:**
```
🔍 Checking for pending migrations...
📋 Found 1 pending migration(s):
   - addWhatsAppAccountsTable.ts
📦 Running migration: addWhatsAppAccountsTable.ts
   (Executed on import)
✅ Completed: addWhatsAppAccountsTable.ts
🎉 All migrations completed successfully!
```

**Subsequent deploys:**
```
🔍 Checking for pending migrations...
✅ No pending migrations
```

## Troubleshooting
If you see errors like "relation already exists" or "column already exists":
1. This means a migration is trying to run that has already been applied
2. Check the `schema_migrations` table to see what's marked as executed
3. Re-run the fix script if needed to correct the state
4. The migration runner is safe to run multiple times - it will only execute pending migrations

## Note on SKIP_MIGRATIONS
You can use the `SKIP_MIGRATIONS` environment variable to control migration execution:
- `SKIP_MIGRATIONS=true` : Skip migrations (useful for initial testing)
- `SKIP_MIGRATIONS=false` or unset : Run migrations (normal operation)