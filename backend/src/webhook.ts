import express, { Request, Response } from 'express'
import { sendWhatsAppMessage } from './services/whatsapp.ts'
import { getAIReply } from './services/openai.ts'
import { pool } from './_migrations/db.ts'

// const pool = new Pool()

const router = express.Router()

// ✅ For Meta Webhook Verification
router.get('/', (req: Request, res: Response) => {
    const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN
    const mode = req.query['hub.mode']
    const token = req.query['hub.verify_token']
    const challenge = req.query['hub.challenge']

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log('[Webhook Verified]')
        return res.status(200).send(challenge)
    } else {
        return res.sendStatus(403)
    }
})

// ✅ For Incoming WhatsApp Messages
router.post('/webhook', async (req: Request, res: Response) => {
    // try {
    const entry = req.body.entry?.[0]
    const changes = entry?.changes?.[0]
    const message = changes?.value?.messages?.[0]
    const to = changes?.value?.metadata?.display_phone_number
    const from = message?.from
    const userText = message?.text?.body
    const value = changes?.value;

    console.log("Webhook received:", {
        entry,
        changes,
        message,
        to,
        from,
        userText
    })

    // 1. If it's a status event, just log and ignore
    if (value?.statuses) {
        console.log("Received status event:", value.statuses);
        return res.sendStatus(200); // exit early
    }

    if (!from || !to || !userText) {
        return res.sendStatus(400)
    }

    try {
        // Step 1: Find Business
        const { rows: businesses } = await pool.query(
            'SELECT * FROM business WHERE whatsapp_number = $1',
            [to]
        )
        const business = businesses[0]

        console.log("Webhook received for business:", business)

        console.log("Webhook 'to' number:", to);
        console.log("Webhook 'from' number:", from);

        if (!business) {
            await sendWhatsAppMessage(from, 'Business not found in the system.')
            return res.sendStatus(200)
        }

        // Step 2: Get Knowledge Base
        const { rows: kbRows } = await pool.query(
            'SELECT content FROM knowledge_base WHERE business_id = $1 ORDER BY created_at DESC LIMIT 1',
            [business.id]
        )
        const knowledge = kbRows[0]?.content

        if (!knowledge) {
            await sendWhatsAppMessage(from, 'No knowledge base found for this business.')
            return res.sendStatus(200)
        }

        // Step 3: Ask OpenAI
        const aiReply = await getAIReply(knowledge, userText, business)

        // Step 4: Send reply back to WhatsApp
        await sendWhatsAppMessage(from, aiReply)

        res.sendStatus(200)
    } catch (err) {
        console.error('❌ Error handling webhook:', err)
        res.sendStatus(500)
    }
})

// ✅ New route to save knowledge base from the frontend
router.post('/save-knowledge', async (req: Request, res: Response) => {
    const { name, whatsapp_number, content } = req.body

    if (!whatsapp_number || !content) {
        return res.status(400).send('Missing whatsapp_number or content')
    }

    try {
        // const { rows: businesses } = await pool.query(
        //     'SELECT * FROM business WHERE whatsapp_number = $1',
        //     [whatsapp_number]
        // )
        // let business = businesses[0]

        // if (!business) {
        const insertRes = await pool.query(`
            INSERT INTO business (name, whatsapp_number)
  VALUES ($1, $2)
  ON CONFLICT (whatsapp_number) DO UPDATE SET name = EXCLUDED.name
  RETURNING *
            `,
            [name, whatsapp_number]
        )
        let business = insertRes.rows[0]
        // }

        await pool.query(
            'INSERT INTO knowledge_base (business_id, content) VALUES ($1, $2)',
            [business.id, content]
        )

        return res.status(200).send('Knowledge base saved')
    } catch (err) {
        console.error('❌ Error saving knowledge:', err)
        return res.status(500).send('Internal server error')
    }
})



//         if (message?.text?.body) {
//             const phoneNumber = message.from
//             const userMessage = message.text.body

//             const aiResponse = await getAIReply()
//             await sendWhatsAppMessage(phoneNumber, aiResponse)
//         }

//         res.sendStatus(200)
//     } catch (err) {
//         console.error('Error in webhook handler:', err)
//         res.sendStatus(500)
//     }
// })

export default router
