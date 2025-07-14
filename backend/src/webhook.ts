import express, { Request, Response } from 'express'
import { sendWhatsAppMessage } from './services/whatsapp.ts'
import { getAIReply } from './services/openai.ts'

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
router.post('/', async (req: Request, res: Response) => {
    try {
        const entry = req.body.entry?.[0]
        const changes = entry?.changes?.[0]
        const message = changes?.value?.messages?.[0]

        if (message?.text?.body) {
            const phoneNumber = message.from
            const userMessage = message.text.body

            const aiResponse = await getAIReply(userMessage)
            await sendWhatsAppMessage(phoneNumber, aiResponse)
        }

        res.sendStatus(200)
    } catch (err) {
        console.error('Error in webhook handler:', err)
        res.sendStatus(500)
    }
})

export default router
