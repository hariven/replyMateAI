# Production Deployment Guide for WhatsApp Per-Business Credentials

## Overview
This guide explains how to deploy the new WhatsApp per-business credentials feature to production with zero risk and full control over migration execution.

## What Was Changed
1. **Database**: Added 3 new nullable columns to `business` table:
   - `whatsapp_phone_number_id` (TEXT)
   - `whatsapp_access_token` (TEXT) 
   - `waba_id` (TEXT)
2. **Backend**: 
   - Updated WhatsApp service to use business-specific credentials
   - Updated webhook to fetch and use business credentials
   - Added automatic migration runner
   - Maintained backward compatibility with environment variable fallback
3. **Frontend**: Added UI fields for WhatsApp configuration in Knowledge Editor
4. **Deployment**: 
   - Added `SKIP_MIGRATIONS` environment variable support
   - Created migration state fix script for production
   - Updated start script to conditionally run migrations

## 🚨 Critical: Production Migration State Fix
**Before deploying, you MUST fix the migration state in production** because the `schema_migrations` table is empty/new.

### Step-by-Step Production Fix

#### 1. Deploy Current Code First
Deploy the current codebase (including the fix scripts) to Render:
```bash
git push origin main   # or however you deploy to Render
```
This makes the fix scripts available but doesn't run migrations yet.

#### 2. Run the Migration State Fix Script
**Using Render Shell (Recommended):**
1. Go to Render Dashboard → Your Service → **Shell** tab
2. Click "Connect to Shell"
3. In the terminal, run:
   ```bash
   cd /opt/render/project/src/backend
   pnpm run fix-migration-state
   ```
4. You should see output like:
   ```
   🔧 Fixing migration state...
   📝 Marking 9 migrations as already executed...
      ✓ addBusinessImage.ts
      ✓ addColumnInBImage.ts
      ✓ addConversationTable.ts
      ✓ addCreatedTsColumn.ts
      ✓ addResetTokenToUser.ts
      ✓ createKbEmbedTable.ts
      ✓ createUserTable.ts
      ✓ fixConversationColumnTypes.ts
      ✓ makeUserIdUnique.ts
   
   📋 Currently executed migrations (9):
      - addBusinessImage.ts
      - addColumnInBImage.ts
      - addConversationTable.ts
      - addCreatedTsColumn.ts
      - addResetTokenToUser.ts
      - createKbEmbedTable.ts
      - createUserTable.ts
      - fixConversationColumnTypes.ts
      - makeUserIdUnique.ts
   
   ⏳ Still pending migrations (1):
      - addWhatsAppAccountsTable.ts
   
   ✅ Migration state fixed!
   ```
5. Type `exit` or close the shell

#### 3. Verify the Fix (Optional)
You can run the migration checker to confirm:
```bash
pnpm start  # This will show "No pending migrations" then start server
# Press Ctrl+C to stop after seeing the message
```

## 🔄 Deployment Workflow

### For Testing (Skip Migrations Initially)
1. In Render Dashboard → Environment → Add:
   - **Key**: `SKIP_MIGRATIONS`
   - **Value**: `true`
2. Deploy
3. Verify:
   - Logs show: `⏭️  Skipping migrations per SKIP_MIGRATIONS=true`
   - App starts and existing functionality works
   - No new WhatsApp fields visible in UI yet (because migration not run)

### For Production Use (Run Migrations)
1. In Render Dashboard → Environment:
   - **Either**: Delete `SKIP_MIGRATIONS` variable
   - **Or**: Set value to `false`
2. Deploy
3. Verify:
   - Logs show migration execution:
     ```
     🔄 Running database migrations...
     ✅ Connected to PostgreSQL
     📋 Found 1 pending migration(s):
        - addWhatsAppAccountsTable.ts
     📦 Running migration: addWhatsAppAccountsTable.ts
        (Executed on import)
     ✅ Completed: addWhatsAppAccountsTable.ts
     🎉 All migrations completed successfully!
     🚀 Starting backend server...
     ```
   - After deploy, edit a business in Knowledge Editor → see new WhatsApp fields
   - Existing functionality continues to work (falls back to env vars when DB fields empty)

## 🔧 How to Switch Between Modes
- **Skip migrations**: Set `SKIP_MIGRATIONS=true` + redeploy
- **Run migrations**: Unset or set `SKIP_MIGRATIONS=false` + redeploy
- No code changes needed - just environment variable and redeploy

## 🛡️ Safety Features
1. **Additive-only migration**: Only adds columns, never modifies/removes existing ones
2. **Automatic fallback**: If business credentials are empty/null, falls back to `WHATSAPP_PHONE_ID`/`WHATSAPP_TOKEN` env vars
3. **Idempotent migration runner**: Won't re-run already executed migrations
4. **Instant rollback**: If needed, revert code - new columns just sit unused (harmless)
5. **Zero-downtime capable**: Migration runs quickly before server starts

## 📋 Expected Render Logs

### With SKIP_MIGRATIONS=true (testing):
```
⬢ Starting web service...
⬢ Executing: node --loader ts-node/esm src/_migrations/migrate.ts && tsx ./src/index.ts
⏭️  Skipping migrations per SKIP_MIGRATIONS=true
🚀 Starting backend server...
⬢ [tsx] INFO  Server running on port 3000
```

### With migrations enabled (production use):
```
⬢ Starting web service...
⬢ Executing: node --loader ts-node/esm src/_migrations/migrate.ts && tsx ./src/index.ts
🔄 Running database migrations...
✅ Connected to PostgreSQL
📋 Found 1 pending migration(s):
   - addWhatsAppAccountsTable.ts
📦 Running migration: addWhatsAppAccountsTable.ts
   (Executed on import)
✅ Completed: addWhatsAppAccountsTable.ts
🎉 All migrations completed successfully!
🚀 Starting backend server...
⬢ [tsx] INFO  Server running on port 3000
```

## 🔍 Troubleshooting
If you see migration errors:
1. **Check schema_migrations table**: Ensure it exists and has correct entries
2. **Re-run fix script**: `pnpm run fix-migration-state` via Render Shell
3. **Verify environment**: Make sure `SKIP_MIGRATIONS` is set correctly
4. **Check logs**: Look for specific error messages in deploy output

## 📝 Note on Environment Variables
Keep your existing WhatsApp environment variables:
- `WHATSAPP_VERIFY_TOKEN` (for webhook verification)
- `WHATSAPP_PHONE_ID` (fallback for phone number ID)
- `WHATSAPP_TOKEN` (fallback for access token)
These are used when business-specific credentials are not set in the database.

---
**You're now ready to safely deploy and test the WhatsApp per-business credentials feature in production!**