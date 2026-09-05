// services/conversationState.ts
// Maintains per-conversation state (mode, unread count, AI insight snapshot) for the Inbox.
import { pool } from '../db';

export type SenderType = 'customer' | 'ai' | 'human' | 'system';
export type EventKind = 'intent-detected' | 'ai-generated' | 'attention-requested' | 'handoff';

const QUALIFICATION_FIELDS = ['name', 'phone', 'interest', 'timeline', 'budget', 'decision_maker', 'contact_preference'] as const;

function isFilled(value: string | undefined): boolean {
    return !!value && value.trim() !== '' && value.trim().toUpperCase() !== 'NA';
}

/**
 * Ensure a conversation_state row exists for this business/phone.
 */
async function ensureRow(businessId: string, phone: string, userId?: string) {
    await pool.query(
        `INSERT INTO conversation_state (business_id, phone_number, user_id)
         VALUES ($1, $2, $3)
         ON CONFLICT (business_id, phone_number) DO NOTHING`,
        [businessId, phone, userId || null]
    );
}

/**
 * Called when a customer message comes in: bumps unread count, updates preview,
 * reopens closed conversations back to AI mode.
 */
export async function upsertOnInbound(businessId: string, phone: string, userId: string, previewText: string) {
    await ensureRow(businessId, phone, userId);
    await pool.query(
        `UPDATE conversation_state
         SET last_message_at = NOW(),
             last_message_preview = $3,
             unread_count = unread_count + 1,
             mode = CASE WHEN mode = 'closed' THEN 'ai' ELSE mode END,
             updated_at = NOW()
         WHERE business_id = $1 AND phone_number = $2`,
        [businessId, phone, previewText.slice(0, 300)]
    );
}

/**
 * Called when the AI or a human sends a message: updates preview; human sends flip mode to 'human'.
 */
export async function upsertOnOutbound(businessId: string, phone: string, senderType: SenderType, previewText: string, userId?: string) {
    await ensureRow(businessId, phone, userId);
    if (senderType === 'human') {
        await pool.query(
            `UPDATE conversation_state
             SET last_message_at = NOW(),
                 last_message_preview = $3,
                 mode = 'human',
                 updated_at = NOW()
             WHERE business_id = $1 AND phone_number = $2`,
            [businessId, phone, previewText.slice(0, 300)]
        );
    } else {
        await pool.query(
            `UPDATE conversation_state
             SET last_message_at = NOW(),
                 last_message_preview = $3,
                 updated_at = NOW()
             WHERE business_id = $1 AND phone_number = $2`,
            [businessId, phone, previewText.slice(0, 300)]
        );
    }
}

/**
 * Derive a lightweight lead score/status/summary from the [LEAD_READY_TO_NOTIFY] marker fields.
 * Heuristic, not a model confidence score — flagged via insight_source='marker'.
 */
export async function applyAiInsightFromMarker(
    businessId: string,
    phone: string,
    qualificationData: Record<string, string>,
    fallbackIntentSummary?: string
) {
    const filled = QUALIFICATION_FIELDS.filter(f => isFilled(qualificationData[f])).length;
    const score = Math.min(100, Math.round(40 + (60 * filled) / QUALIFICATION_FIELDS.length));
    const leadStatus = score >= 70 ? 'hot' : score >= 40 ? 'warm' : 'cold';

    const summary = isFilled(qualificationData.notes) ? qualificationData.notes : (fallbackIntentSummary || null);
    const intentPrimary = isFilled(qualificationData.interest) ? qualificationData.interest : 'General inquiry';
    const customerName = isFilled(qualificationData.name) ? qualificationData.name : null;
    const potentialValue = isFilled(qualificationData.budget) ? qualificationData.budget : 'Unknown';

    await ensureRow(businessId, phone);
    await pool.query(
        `UPDATE conversation_state
         SET ai_summary = COALESCE($3, ai_summary),
             ai_intent_primary = $4,
             ai_intent_confidence = $5,
             ai_intent_alternatives = '{}',
             lead_status = $6,
             lead_score = $5,
             lead_potential_value = $7,
             customer_name = COALESCE($8, customer_name),
             insight_source = 'marker',
             insight_generated_at = NOW(),
             updated_at = NOW()
         WHERE business_id = $1 AND phone_number = $2`,
        [businessId, phone, summary, intentPrimary, score, leadStatus, potentialValue, customerName]
    );
}

/**
 * Stash the top RAG knowledge-base matches used for the latest reply, so the owner can see why
 * the AI answered the way it did.
 */
export async function stashKbSources(businessId: string, phone: string, knowledgeArray: { content: string; similarity?: number }[]) {
    const sources = knowledgeArray.slice(0, 3).map(k => ({
        snippet: k.content.slice(0, 140),
        similarity: typeof k.similarity === 'number' ? Number(k.similarity.toFixed(3)) : undefined,
    }));

    await ensureRow(businessId, phone);
    await pool.query(
        `UPDATE conversation_state SET kb_sources_used = $3::jsonb, updated_at = NOW()
         WHERE business_id = $1 AND phone_number = $2`,
        [businessId, phone, JSON.stringify(sources)]
    );
}

// Fast, cheap regex check for "let me talk to a human" style requests — mirrors the style of
// leadDetection.ts's fastPathCheck rather than spending a model call on every message.
const HUMAN_REQUEST_PATTERNS: RegExp[] = [
    /\b(talk|speak)\s+to\s+(a\s+)?(human|person|agent|someone|real\s+person)\b/i,
    /\bcustomer\s+service\b/i,
    /\b(get|connect\s+me\s+with)\s+(a\s+)?(manager|agent|representative)\b/i,
    /\bnot\s+a\s+bot\b/i,
    /\breal\s+person\b/i,
];

export function detectHumanRequest(userText: string): boolean {
    if (!userText?.trim()) return false;
    return HUMAN_REQUEST_PATTERNS.some(p => p.test(userText));
}

export async function isConversationBlocked(businessId: string, phone: string): Promise<boolean> {
    const { rows } = await pool.query(
        `SELECT is_blocked FROM conversation_state WHERE business_id = $1 AND phone_number = $2`,
        [businessId, phone]
    );
    return rows[0]?.is_blocked === true;
}

export async function markWaitingForHuman(businessId: string, phone: string) {
    await ensureRow(businessId, phone);
    await pool.query(
        `UPDATE conversation_state SET mode = 'waiting', updated_at = NOW()
         WHERE business_id = $1 AND phone_number = $2 AND mode != 'human'`,
        [businessId, phone]
    );
}

/**
 * Insert an internal system-event row into the conversations timeline (not sent to the customer).
 */
export async function insertSystemEvent(
    businessId: string,
    userId: string,
    phone: string,
    eventKind: EventKind,
    title: string,
    detail?: string,
    leadScore?: number
) {
    await pool.query(
        `INSERT INTO conversations (user_id, business_id, phone_number, message, is_user, sender_type, message_type, event_kind, media_meta)
         VALUES ($1, $2, $3, $4, FALSE, 'system', 'text', $5, $6)`,
        [userId, businessId, phone, title, eventKind, JSON.stringify({ detail, leadScore })]
    );
}
