# Lead Notification System - Implementation Progress

## Overview
Building a system where the AI detects qualified leads from WhatsApp conversations and notifies the business owner via their personal WhatsApp number.

---

## Current Status: ✅ 100% Complete

### ✅ Completed Tasks

| Task | File | Status |
|------|------|--------|
| 1. Migration: Add `owner_whatsapp_number` to `business` table | `backend/src/_migrations/addOwnerWhatsAppNumber.ts` | ✅ Done |
| 2. Migration: Create `leads` table (tracking + dedup) | `backend/src/_migrations/addLeadsTable.ts` | ✅ Done |
| 3. Frontend: Add Owner WhatsApp field in KB Editor | `frontend/src/_components/kb.tsx` | ✅ Done |
| 4. Backend: Accept `owner_whatsapp_number` in `/save-knowledge` | `backend/src/routes/webhook.ts` | ✅ Done |
| 5. Service: `sendLeadNotification()` in `whatsapp.ts` | `backend/src/services/whatsapp.ts` | ✅ Done |
| 6. Service: `detectLead()` with precise rules | `backend/src/services/leadDetection.ts` | ✅ Done |
| 7. Integrate lead qualification into webhook flow | `backend/src/routes/webhook.ts` | ✅ Done |
| 8. Update business fetch to include `owner_whatsapp_number` | `backend/src/routes/business.ts` | ✅ Done |
| 9. Enhanced AI with lead qualification protocol | `backend/src/services/openai.ts` | ✅ Done |
| 10. **Fixed marker name mismatch** (was `LEAD_QUALIFIED`, should be `LEAD_READY_TO_NOTIFY`) | `backend/src/routes/webhook.ts:325,337` | ✅ Fixed |

### 🔄 In Progress / Remaining

| Task | File | Status |
|------|------|--------|
| 10. Test end-to-end flow | - | ⏳ Ready for testing |

---

## Lead Detection Logic (Precise Rules)

### ✅ TRIGGER NOTIFICATION (isLead = true)
| Trigger Type | Example Phrases |
|--------------|-----------------|
| **buying_intent** | "I want to buy", "how to purchase", "sign me up", "I'm ready to proceed", "I'll take it" |
| **proposal_or_registration_request** | "send me proposal", "how do I register", "contract details", "registration process" |
| **registration_command** | **"register and send"**, "register me", "enroll me", "send registration" |

### ❌ DO NOT TRIGGER (isLead = false) — AI must qualify first
| Trigger Type | Example Phrases |
|--------------|-----------------|
| **pricing_only** | "How much?", "What's the price?", "Cost?", "Any discount?" |
| **general_info** | Hours, location, services, availability, general curiosity |
| **vague_interest** | "Sounds good", "Interesting", "Maybe later", "I'll think about it" |

> **Key principle**: Price questions alone are NOT leads. The AI should engage, understand needs, and convince before treating as a lead.

---

## Database Schema Changes

```sql
-- 1. Business table: owner's personal WhatsApp for notifications
ALTER TABLE business ADD COLUMN IF NOT EXISTS owner_whatsapp_number TEXT;

-- 2. Leads table: track qualified leads + notification status
CREATE TABLE IF NOT EXISTS leads (
    id SERIAL PRIMARY KEY,
    business_id UUID NOT NULL REFERENCES business(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    phone_number TEXT NOT NULL,
    trigger_type TEXT,
    intent_summary TEXT,
    notified BOOLEAN DEFAULT FALSE,
    notified_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_business_phone
ON leads (business_id, phone_number, created_at DESC);
```

---

## Files Modified/Created

### New Files
- `backend/src/_migrations/addOwnerWhatsAppNumber.ts`
- `backend/src/_migrations/addLeadsTable.ts`
- `backend/src/services/leadDetection.ts`

### Modified Files
- `frontend/src/_components/kb.tsx` — Added Owner WhatsApp field + submit handler
- `backend/src/routes/webhook.ts` — Accept `owner_whatsapp_number` in save-knowledge (CREATE + UPDATE) + integrated lead detection & notification
- `backend/src/services/whatsapp.ts` — Added `sendLeadNotification()` export
- `backend/src/routes/business.ts` — SELECT query now includes `b.owner_whatsapp_number`

### All implementation complete — ready for testing

---

## Integration Logic (for Task 7)

```typescript
// In webhook.ts POST /webhook handler, after generating aiReply:

// 1. Check AI reply for lead qualification marker
let cleanReply = aiReply?.text || '';
let qualificationData: Record<string, string> = {};

const qualifiedMarker = cleanReply.match(/\[LEAD_READY_TO_NOTIFY:([^\]]+)\]/);
if (qualifiedMarker) {
    // Parse qualification data from marker
    const markerContent = qualifiedMarker[1];
    const pairs = markerContent.split(';');
    for (const pair of pairs) {
        const [key, ...valueParts] = pair.split('=');
        if (key && valueParts.length > 0) {
            qualificationData[key.trim()] = valueParts.join('=').trim();
        }
    }
    // Remove marker from customer-facing message
    cleanReply = cleanReply.replace(/\[LEAD_READY_TO_NOTIFY:[^\]]+\]/, '').trim();
    console.log('🎯 Lead qualified by AI:', qualificationData);
}

// Save AI reply to DB (clean version, no marker)
await saveMessage(business.user_id, business.id, from, cleanReply, false)

// 2. ONLY notify when AI has qualified the lead (placed the marker)
// This ensures we collect sufficient data before notifying the owner
if (Object.keys(qualificationData).length > 0 && business.owner_whatsapp_number) {
    // Check dedup: check if we already notified for this phone + business in last 24h
    const { rows: existingLead } = await pool.query(
        `SELECT 1 FROM leads
         WHERE business_id = $1 AND phone_number = $2
         AND notified = TRUE
         AND created_at > NOW() - INTERVAL '24 hours'`,
        [business.id, from]
    )

    if (existingLead.length === 0) {
        // Build detailed notification message from qualification data
        let notifyMsg =
            `🎯 NEW QUALIFIED LEAD\n\n` +
            `Business: ${business.name}\n` +
            `Customer: ${from}${qualificationData.name ? ` (${qualificationData.name})` : ''}\n`;

        if (qualificationData.interest) notifyMsg += `Interest: ${qualificationData.interest}\n`;
        if (qualificationData.timeline) notifyMsg += `Timeline: ${qualificationData.timeline}\n`;
        if (qualificationData.budget && qualificationData.budget !== 'NA') notifyMsg += `Budget: ${qualificationData.budget}\n`;
        if (qualificationData.decision_maker && qualificationData.decision_maker !== 'NA') notifyMsg += `Decision Maker: ${qualificationData.decision_maker}\n`;
        if (qualificationData.contact_preference && qualificationData.contact_preference !== 'NA') notifyMsg += `Contact Preference: ${qualificationData.contact_preference}\n`;
        if (qualificationData.notes) notifyMsg += `Notes: ${qualificationData.notes}\n`;

        notifyMsg += `Time: ${new Date().toLocaleString()}`;

        // Send notification to owner
        await sendLeadNotification(
            business.owner_whatsapp_number,
            notifyMsg,
            whatsappConfig
        )

        // Record lead
        await pool.query(
            `INSERT INTO leads (business_id, user_id, phone_number, trigger_type, intent_summary, notified, notified_at)
             VALUES ($1, $2, $3, $4, $5, TRUE, NOW())`,
            [business.id, business.user_id, from, 'ai_qualified', JSON.stringify(qualificationData)]
        )

        console.log(`🎯 Lead notification sent for ${from} (AI qualified)`)
    } else {
        console.log(`🔁 Lead already notified for ${from} within 24h, skipping`)
    }
}
```

---

## Testing Checklist

- [ ] Run migrations: `pnpm --filter backend fix-migration-state` (or start server to auto-run)
- [ ] Start backend: `cd backend && pnpm d`
- [ ] Start frontend: `cd frontend && pnpm dev`
- [ ] Create/edit business in KB Editor — verify Owner WhatsApp field appears and saves
- [ ] Send test WhatsApp message showing initial interest (e.g., "I want to buy")
- [ ] Verify AI engages in qualification conversation (asks for name, interests, etc.) — NO notification yet
- [ ] Continue conversation until sufficient details collected
- [ ] Verify AI places `[LEAD_READY_TO_NOTIFY: ...]` marker in its response
- [ ] Verify owner receives DETAILED notification with all qualification data
- [ ] Send same customer message again — verify NO duplicate notification (24h dedup)
- [ ] Test with different business types to verify qualification adapts to knowledge base
- [ ] Verify pricing questions DO trigger qualification conversation but NOT immediate notification

---

## Next Session: Start Here (Testing)

1. Run migrations: `cd backend && pnpm fix-migration-state` (or start server to auto-run via `pnpm d`)
2. Start backend: `cd backend && pnpm d`
3. Start frontend: `cd frontend && pnpm dev`
4. Create/edit business in KB Editor — verify Owner WhatsApp field appears and saves
5. Send test WhatsApp message showing initial interest (e.g., "I want to buy" or "register and send")
6. Verify AI engages in qualification conversation (asks for name, interests, etc.) — NO notification yet
7. Continue conversation until sufficient details collected (typically 2-3 exchanges)
8. Verify AI places `[LEAD_READY_TO_NOTIFY: ...]` marker in its response
9. Verify owner receives DETAILED notification with all qualification data on their WhatsApp
10. Send same customer message again — verify NO duplicate notification (24h dedup)
11. Test with different business types to verify qualification adapts to knowledge base
12. Verify pricing questions DO trigger qualification conversation but NOT immediate notification

---

## Notes

- **Model used for classification**: `gpt-4o-mini` (fast, cheap, deterministic with `temperature: 0`)
- **Lead Qualification Protocol**: AI now engages in natural conversation to collect required details BEFORE notifying owner
- **Notification Trigger**: ONLY when AI places `[LEAD_READY_TO_NOTIFY: name=...; interest=...; timeline=...; ...]` marker in its response
- **Essential Qualification Data**: Customer name, specific interest/need, timeline/urgency, budget (if applicable), decision-maker status, contact preference
- **Dedup window**: 24 hours per phone number per business (adjustable)
- **Owner number**: Must be in international format (e.g., `+60123456789`)
- **WhatsApp config used**: Business's own `whatsapp_phone_number_id` + `whatsapp_access_token`
  (the notification is sent FROM the business's WABA TO the owner's personal number)