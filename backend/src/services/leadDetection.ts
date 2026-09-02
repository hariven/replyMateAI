// services/leadDetection.ts
// Decides whether a prospect has crossed from "just asking" into a QUALIFIED LEAD.
//
// LEAD (notify owner):
//   1. Explicit buying intent      -> "I want to buy", "how to purchase", "sign me up", "I'll take it"
//   2. Proposal / contract / registration request -> "send me a proposal", "how do I register", "contract details"
//   3. Explicit registration command -> "register and send", "register me", "enroll me"
//
// NOT a lead (AI keeps qualifying instead):
//   - Pricing-only questions ("how much?", "what's the price?") — the AI must first
//     understand their needs and convince them; price curiosity alone is not a lead.
//   - General info questions (hours, location, services, availability).

import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export type LeadTrigger =
    | 'buying_intent'
    | 'proposal_or_registration_request'
    | 'registration_command'
    | 'none';

export interface LeadDetectionResult {
    isLead: boolean;
    trigger: LeadTrigger;
    intentSummary: string;
}

// Unambiguous phrases we can trust without spending a model call.
const FAST_PATH_PATTERNS: { pattern: RegExp; trigger: LeadTrigger }[] = [
    // Explicit registration commands
    { pattern: /\bregister\s+(and|&)\s+send\b/i, trigger: 'registration_command' },
    { pattern: /\b(register|enroll|enrol)\s+me\b/i, trigger: 'registration_command' },
    { pattern: /\bsend\s+(me\s+)?(the\s+)?registration\b/i, trigger: 'registration_command' },
    { pattern: /\bi\s+want\s+to\s+(register|enroll|enrol|sign\s*up)\b/i, trigger: 'registration_command' },
    { pattern: /\bsign\s+me\s+up\b/i, trigger: 'registration_command' },

    // Explicit buying intent
    { pattern: /\bi\s+(want|wish|would\s+like)\s+to\s+(buy|purchase|order|subscribe)\b/i, trigger: 'buying_intent' },
    { pattern: /\bhow\s+(do\s+i|to|can\s+i)\s+(buy|purchase|order|subscribe|pay)\b/i, trigger: 'buying_intent' },
    { pattern: /\bi'?m\s+ready\s+to\s+(buy|purchase|proceed|start|join)\b/i, trigger: 'buying_intent' },
    { pattern: /\bi'?ll\s+take\s+it\b/i, trigger: 'buying_intent' },

    // Proposal / contract / registration process
    { pattern: /\b(send|share|email)\s+(me\s+)?(the\s+|a\s+)?(proposal|quotation|quote\s+document|contract|agreement)\b/i, trigger: 'proposal_or_registration_request' },
    { pattern: /\b(how\s+(do\s+i|to|can\s+i)\s+register|registration\s+(process|form|procedure|details))\b/i, trigger: 'proposal_or_registration_request' },
    { pattern: /\bcontract\s+(details|terms)\b/i, trigger: 'proposal_or_registration_request' },
];

function fastPathCheck(userText: string): LeadTrigger | null {
    for (const { pattern, trigger } of FAST_PATH_PATTERNS) {
        if (pattern.test(userText)) return trigger;
    }
    return null;
}

const CLASSIFIER_PROMPT = `
You classify a single customer WhatsApp message as a QUALIFIED LEAD or NOT.

Mark isLead = true ONLY when one of these is true:
1. "buying_intent" — the customer expresses explicit intent to buy/purchase/subscribe/join now
   (e.g. "I want to buy", "how do I purchase", "I'm ready to proceed", "sign me up").
2. "proposal_or_registration_request" — the customer asks for a proposal, quotation document,
   contract, agreement, or asks how the registration/enrollment process works.
3. "registration_command" — the customer gives a direct command to register them
   (e.g. "register and send", "register me", "enroll me", "send registration form").

Mark isLead = false for everything else, INCLUDING:
- Price / cost questions on their own ("how much is it?", "what's your pricing?", "is there a discount?").
  Price curiosity is NOT a lead. The assistant must qualify and convince them first.
- Questions about hours, location, services, availability, or general curiosity.
- Vague interest ("sounds good", "interesting", "maybe later", "I'll think about it").

The customer may write in English, Malay, Tamil, or transliterated/mixed language — judge the
underlying intent, not the language.

Respond with ONLY a JSON object:
{"isLead": boolean, "trigger": "buying_intent" | "proposal_or_registration_request" | "registration_command" | "none", "intentSummary": "one short sentence describing what the customer wants"}
`.trim();

export async function detectLead(
    userText: string,
    conversationHistory?: { message: string; is_user: boolean }[]
): Promise<LeadDetectionResult> {
    if (!userText?.trim()) {
        return { isLead: false, trigger: 'none', intentSummary: '' };
    }

    // 1) Cheap, deterministic check for unambiguous phrases.
    const fastTrigger = fastPathCheck(userText);
    if (fastTrigger) {
        console.log(`🎯 Lead fast-path matched (${fastTrigger}):`, userText);
        return {
            isLead: true,
            trigger: fastTrigger,
            intentSummary: userText.trim().slice(0, 200),
        };
    }

    // 2) Otherwise ask a small model, with recent context for pronoun-heavy replies
    //    like "yes, do that for me".
    try {
        const recent = (conversationHistory ?? [])
            .slice(-6)
            .map(m => `${m.is_user ? 'Customer' : 'Assistant'}: ${m.message}`)
            .join('\n');

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            temperature: 0,
            response_format: { type: 'json_object' },
            messages: [
                { role: 'system', content: CLASSIFIER_PROMPT },
                {
                    role: 'user',
                    content: recent
                        ? `Recent conversation:\n${recent}\n\nLatest customer message to classify:\n${userText}`
                        : `Latest customer message to classify:\n${userText}`,
                },
            ],
        });

        const raw = completion.choices[0]?.message?.content ?? '{}';
        const parsed = JSON.parse(raw) as Partial<LeadDetectionResult>;

        const trigger = (parsed.trigger ?? 'none') as LeadTrigger;
        const isLead = parsed.isLead === true && trigger !== 'none';

        if (isLead) {
            console.log(`🎯 Lead detected by classifier (${trigger}):`, userText);
        }

        return {
            isLead,
            trigger: isLead ? trigger : 'none',
            intentSummary: parsed.intentSummary?.slice(0, 300) ?? userText.trim().slice(0, 200),
        };
    } catch (err) {
        // Never let classification break the reply flow.
        console.error('❌ Lead detection failed, treating as non-lead:', err);
        return { isLead: false, trigger: 'none', intentSummary: '' };
    }
}
