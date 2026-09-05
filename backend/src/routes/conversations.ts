import express, { Response } from 'express';
import { pool } from '../db';
import { authenticate, AuthRequest } from '../middleware/authenticate';
import { insertSystemEvent } from '../services/conversationState';
import OpenAI from 'openai';

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function verifyBusinessOwnership(businessId: string, userId: string) {
    const { rows } = await pool.query(
        'SELECT id, name FROM business WHERE id = $1 AND user_id = $2',
        [businessId, userId]
    );
    return rows[0] || null;
}

function mapStateRow(row: any, businessName: string) {
    return {
        id: row.phone_number,
        customer: {
            id: row.phone_number,
            name: row.customer_name || row.phone_number,
            phone: row.phone_number,
            source: 'WhatsApp',
            firstContacted: row.created_at,
            tags: row.tags || [],
        },
        mode: row.mode,
        lastMessagePreview: row.last_message_preview || '',
        lastMessageAt: row.last_message_at,
        unreadCount: row.unread_count,
        isLead: row.lead_status === 'hot' || row.lead_status === 'warm',
        isStarred: row.is_starred,
        isBlocked: row.is_blocked,
        lead: {
            status: row.lead_status,
            score: row.lead_score,
            intent: row.ai_intent_primary || '',
            potentialValue: row.lead_potential_value || 'Unknown',
        },
        aiSummary: row.ai_summary || '',
        aiIntent: {
            primary: row.ai_intent_primary || '',
            confidence: row.ai_intent_confidence || 0,
            alternatives: row.ai_intent_alternatives || [],
        },
        knowledgeBase: {
            name: businessName,
            usedSections: (row.kb_sources_used || []).map((s: any) => s.snippet),
        },
        insightSource: row.insight_source,
    };
}

function mapTimelineRow(row: any) {
    if (row.sender_type === 'system') {
        const meta = row.media_meta || {};
        return {
            type: 'system-event',
            id: row.id.toString(),
            data: {
                id: row.id.toString(),
                kind: row.event_kind,
                timestamp: row.created_at,
                title: row.message,
                detail: meta.detail,
                leadScore: meta.leadScore,
            },
        };
    }

    return {
        type: 'message',
        id: row.id.toString(),
        data: {
            id: row.id.toString(),
            sender: row.sender_type,
            kind: row.message_type,
            text: row.message,
            timestamp: row.created_at,
            status: 'sent',
            imageUrl: row.message_type === 'image' ? row.media_url : undefined,
            documentName: row.message_type === 'document' ? row.media_meta?.name : undefined,
            documentSize: row.message_type === 'document' ? row.media_meta?.size : undefined,
            locationLabel: row.message_type === 'location' ? row.media_meta?.label : undefined,
            voiceDuration: row.message_type === 'voice' ? row.media_meta?.duration : undefined,
        },
    };
}

// GET /api/conversations?businessId=&filter=&search=
router.get('/conversations', authenticate, async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user!.userId.toString();
        const { businessId, filter = 'all', search = '' } = req.query as Record<string, string>;

        if (!businessId) return res.status(400).json({ error: 'Missing businessId' });

        const business = await verifyBusinessOwnership(businessId, userId);
        if (!business) return res.status(403).json({ error: 'Business not found or not authorized' });

        const conditions = ['business_id = $1'];
        const params: any[] = [businessId];

        if (filter === 'unread') conditions.push('unread_count > 0');
        else if (filter === 'leads') conditions.push(`lead_status IN ('hot','warm')`);
        else if (filter === 'ai') conditions.push(`mode = 'ai'`);
        else if (filter === 'human') conditions.push(`mode = 'human'`);
        else if (filter === 'starred') conditions.push('is_starred = TRUE');

        if (search) {
            params.push(`%${search}%`);
            conditions.push(`(customer_name ILIKE $${params.length} OR phone_number ILIKE $${params.length})`);
        }

        const { rows } = await pool.query(
            `SELECT * FROM conversation_state WHERE ${conditions.join(' AND ')} ORDER BY last_message_at DESC NULLS LAST`,
            params
        );

        res.json(rows.map(r => mapStateRow(r, business.name)));
    } catch (err) {
        console.error('❌ Error listing conversations:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /api/conversations/:businessId/:phone?before=&limit=50
router.get('/conversations/:businessId/:phone', authenticate, async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user!.userId.toString();
        const { businessId, phone } = req.params;
        const limit = Math.min(parseInt((req.query.limit as string) || '50', 10), 200);
        const before = req.query.before as string | undefined;

        const business = await verifyBusinessOwnership(businessId, userId);
        if (!business) return res.status(403).json({ error: 'Business not found or not authorized' });

        const { rows: stateRows } = await pool.query(
            `SELECT * FROM conversation_state WHERE business_id = $1 AND phone_number = $2`,
            [businessId, phone]
        );
        if (stateRows.length === 0) return res.status(404).json({ error: 'Conversation not found' });

        const params: any[] = [businessId, phone];
        let query = `SELECT * FROM conversations WHERE business_id = $1 AND phone_number = $2`;
        if (before) {
            params.push(before);
            query += ` AND created_at < $${params.length}`;
        }
        params.push(limit);
        query += ` ORDER BY created_at DESC LIMIT $${params.length}`;

        const { rows: messageRows } = await pool.query(query, params);

        await pool.query(
            `UPDATE conversation_state SET unread_count = 0, updated_at = NOW() WHERE business_id = $1 AND phone_number = $2`,
            [businessId, phone]
        );

        const conversation = mapStateRow({ ...stateRows[0], unread_count: 0 }, business.name);
        (conversation as any).timeline = messageRows.reverse().map(mapTimelineRow);

        res.json(conversation);
    } catch (err) {
        console.error('❌ Error fetching conversation thread:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /api/conversations/:businessId/:phone/takeover
router.post('/conversations/:businessId/:phone/takeover', authenticate, async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user!.userId.toString();
        const { businessId, phone } = req.params;

        const business = await verifyBusinessOwnership(businessId, userId);
        if (!business) return res.status(403).json({ error: 'Business not found or not authorized' });

        await pool.query(
            `UPDATE conversation_state SET mode = 'human', updated_at = NOW() WHERE business_id = $1 AND phone_number = $2`,
            [businessId, phone]
        );
        await insertSystemEvent(businessId, userId, phone, 'handoff', 'You took over this conversation');

        res.json({ mode: 'human' });
    } catch (err) {
        console.error('❌ Error taking over conversation:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /api/conversations/:businessId/:phone/return-to-ai
router.post('/conversations/:businessId/:phone/return-to-ai', authenticate, async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user!.userId.toString();
        const { businessId, phone } = req.params;

        const business = await verifyBusinessOwnership(businessId, userId);
        if (!business) return res.status(403).json({ error: 'Business not found or not authorized' });

        await pool.query(
            `UPDATE conversation_state SET mode = 'ai', updated_at = NOW() WHERE business_id = $1 AND phone_number = $2`,
            [businessId, phone]
        );
        await insertSystemEvent(businessId, userId, phone, 'handoff', 'Conversation returned to ReplyMate AI');

        res.json({ mode: 'ai' });
    } catch (err) {
        console.error('❌ Error returning conversation to AI:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PATCH /api/conversations/:businessId/:phone
router.patch('/conversations/:businessId/:phone', authenticate, async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user!.userId.toString();
        const { businessId, phone } = req.params;
        const { isStarred, tags, isBlocked, mode, leadStatus } = req.body as {
            isStarred?: boolean; tags?: string[]; isBlocked?: boolean; mode?: 'closed';
            leadStatus?: 'hot' | 'warm' | 'cold' | 'none';
        };

        const business = await verifyBusinessOwnership(businessId, userId);
        if (!business) return res.status(403).json({ error: 'Business not found or not authorized' });

        const sets: string[] = [];
        const params: any[] = [businessId, phone];

        if (typeof isStarred === 'boolean') { params.push(isStarred); sets.push(`is_starred = $${params.length}`); }
        if (Array.isArray(tags)) { params.push(tags); sets.push(`tags = $${params.length}`); }
        if (typeof isBlocked === 'boolean') { params.push(isBlocked); sets.push(`is_blocked = $${params.length}`); }
        if (mode === 'closed') { sets.push(`mode = 'closed'`); }
        if (leadStatus && ['hot', 'warm', 'cold', 'none'].includes(leadStatus)) {
            params.push(leadStatus);
            sets.push(`lead_status = $${params.length}`);
        }

        if (sets.length === 0) return res.status(400).json({ error: 'No valid fields to update' });

        sets.push('updated_at = NOW()');

        const { rows } = await pool.query(
            `UPDATE conversation_state SET ${sets.join(', ')} WHERE business_id = $1 AND phone_number = $2 RETURNING *`,
            params
        );
        if (rows.length === 0) return res.status(404).json({ error: 'Conversation not found' });

        res.json(mapStateRow(rows[0], business.name));
    } catch (err) {
        console.error('❌ Error updating conversation:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /api/conversations/:businessId/:phone/summary — on-demand GPT regenerate
router.post('/conversations/:businessId/:phone/summary', authenticate, async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user!.userId.toString();
        const { businessId, phone } = req.params;

        const business = await verifyBusinessOwnership(businessId, userId);
        if (!business) return res.status(403).json({ error: 'Business not found or not authorized' });

        const { rows: messageRows } = await pool.query(
            `SELECT sender_type, message FROM conversations
             WHERE business_id = $1 AND phone_number = $2 AND sender_type != 'system'
             ORDER BY created_at DESC LIMIT 20`,
            [businessId, phone]
        );

        const transcript = messageRows
            .reverse()
            .map(r => `${r.sender_type === 'customer' ? 'Customer' : 'Assistant'}: ${r.message}`)
            .join('\n');

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            temperature: 0.2,
            response_format: { type: 'json_object' },
            messages: [
                {
                    role: 'system',
                    content:
                        'Summarize this customer support conversation for the business owner. Respond with ONLY a JSON object: ' +
                        '{"summary": "one or two sentence summary", "intent": {"primary": "short label", "confidence": number 0-100, "alternatives": ["..."]}, ' +
                        '"leadStatus": "hot"|"warm"|"cold"|"none", "leadScore": number 0-100, "potentialValue": "short string or Unknown"}',
                },
                { role: 'user', content: transcript || 'No conversation yet.' },
            ],
        });

        const parsed = JSON.parse(completion.choices[0]?.message?.content ?? '{}');

        await pool.query(
            `UPDATE conversation_state
             SET ai_summary = $3, ai_intent_primary = $4, ai_intent_confidence = $5, ai_intent_alternatives = $6,
                 lead_status = $7, lead_score = $8, lead_potential_value = $9,
                 insight_source = 'regenerate', insight_generated_at = NOW(), updated_at = NOW()
             WHERE business_id = $1 AND phone_number = $2`,
            [
                businessId,
                phone,
                parsed.summary || null,
                parsed.intent?.primary || 'General inquiry',
                parsed.intent?.confidence ?? 0,
                parsed.intent?.alternatives || [],
                parsed.leadStatus || 'none',
                parsed.leadScore ?? 0,
                parsed.potentialValue || 'Unknown',
            ]
        );

        res.json({
            aiSummary: parsed.summary || '',
            aiIntent: parsed.intent || { primary: 'General inquiry', confidence: 0, alternatives: [] },
            lead: { status: parsed.leadStatus || 'none', score: parsed.leadScore ?? 0, potentialValue: parsed.potentialValue || 'Unknown' },
        });
    } catch (err) {
        console.error('❌ Error regenerating summary:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
