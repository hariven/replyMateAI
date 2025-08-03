import express, { Request, Response } from 'express'
import { sendWhatsAppMessage } from './services/whatsapp'
import { getAIReply } from './services/openai'
import { pool } from './db.ts'
import { saveKnowledgeWithEmbedding } from './services/embedding'
import { getRelevantKnowledge } from './services/retrieval'
import { addMessageToMemory, getUserMemory } from './memory'

// const pool = new Pool()

const router = express.Router()

// ✅ Webhook Verification (Meta requirement)
router.get('/webhook', (req: Request, res: Response) => {
    const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN
    const mode = req.query['hub.mode']
    const token = req.query['hub.verify_token']
    const challenge = req.query['hub.challenge']

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log('[Webhook Verified]')
        return res.status(200).send(challenge)
    }
    return res.sendStatus(403)
})

// ✅ Incoming WhatsApp Messages
router.post('/webhook', async (req: Request, res: Response) => {
    try {
        // Validate payload
        const entry = req.body?.entry?.[0]
        const changes = entry?.changes?.[0]
        const message = changes?.value?.messages?.[0]
        const to = changes?.value?.metadata?.display_phone_number
        const from = message?.from
        const userText = message?.text?.body
        const value = changes?.value

        if (!message || !from || !to || !userText) {
            console.error('❌ Invalid webhook payload:', req.body)
            return res.sendStatus(400)
        }

        console.log('Webhook received:', { from, to, userText })

        // Ignore status updates (like message delivered/read receipts)
        if (value?.statuses) {
            console.log('Received status event:', value.statuses)
            return res.sendStatus(200)
        }

        // Step 1: Find business by WhatsApp number
        const { rows: businesses } = await pool.query(
            'SELECT * FROM business WHERE whatsapp_number = $1',
            [to]
        )
        const business = businesses[0]
        if (!business) {
            await sendWhatsAppMessage(from, 'Business not found in the system.')
            return res.sendStatus(200)
        }

        // Step 2: Check memory (to avoid repeating greetings)
        const memory = getUserMemory(from)
        const isFirstMessage = memory.length === 0

        // Step 3: Get relevant knowledge base content
        const knowledgeArray = await getRelevantKnowledge(business.id, userText, 'cosine')
        const knowledge = knowledgeArray.map(k => k.content).join("\n\n")  // <-- Add this

        console.log('knowledge', knowledge)
        if (!knowledge) {
            await sendWhatsAppMessage(from, 'No knowledge base found for this business.')
            return res.sendStatus(200)
        }

        // Step 4: Generate AI response
        const aiReply = await getAIReply(knowledge, userText, business, from)

        // Step 5: Avoid duplicate greetings
        if (!isFirstMessage && aiReply.includes('How can I help you today')) {
            console.log('Skipping duplicate greeting for returning user.')
        } else {
            await sendWhatsAppMessage(from, aiReply)
        }

        // Step 6: Save chat to memory
        addMessageToMemory(from, 'user', userText)
        addMessageToMemory(from, 'assistant', aiReply)

        return res.sendStatus(200)
    } catch (err) {
        console.error('❌ Error handling webhook:', err)
        return res.sendStatus(500)
    }
})

// ✅ Save Knowledge Base
router.post('/save-knowledge', async (req: Request, res: Response) => {
    const { name, whatsapp_number, content } = req.body
    if (!whatsapp_number || !content) {
        return res.status(400).send('Missing whatsapp_number or content')
    }

    try {
        const insertRes = await pool.query(
            `
            INSERT INTO business (name, whatsapp_number)
            VALUES ($1, $2)
            ON CONFLICT (whatsapp_number) 
            DO UPDATE SET name = EXCLUDED.name
            RETURNING *
            `,
            [name, whatsapp_number]
        )
        const business = insertRes.rows[0]

        await saveKnowledgeWithEmbedding(business.id, content)
        return res.status(200).send('Knowledge base saved with embeddings')
    } catch (err) {
        console.error('❌ Error saving knowledge:', err)
        return res.status(500).send('Internal server error')
    }
})

export default router