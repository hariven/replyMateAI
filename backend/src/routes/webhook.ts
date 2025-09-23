// import express, { Request, Response } from 'express'


// import { sendWhatsAppMessage } from '../services/whatsapp.ts'
// import { getAIReply } from '../services/openai.ts'
// import { pool } from '../db.ts'
// import { saveKnowledgeWithEmbedding } from '../services/embedding.ts'
// import { getRelevantKnowledge } from '../services/retrieval.ts'
// import { addMessageToMemory, getUserMemory } from '../memory.ts'
// import jwt from "jsonwebtoken";

// // const pool = new Pool()

// const router = express.Router()

// // ✅ Webhook Verification (Meta requirement)
// router.get('/webhook', (req: Request, res: Response) => {
//     const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN
//     const mode = req.query['hub.mode']
//     const token = req.query['hub.verify_token']
//     const challenge = req.query['hub.challenge']

//     if (mode === 'subscribe' && token === VERIFY_TOKEN) {
//         console.log('[Webhook Verified]')
//         return res.status(200).send(challenge)
//     }
//     return res.sendStatus(403)
// })

// // ✅ Incoming WhatsApp Messages
// router.post('/webhook', async (req: Request, res: Response) => {
//     try {
//         // Validate payload
//         const entry = req.body?.entry?.[0]
//         const changes = entry?.changes?.[0]
//         const message = changes?.value?.messages?.[0]
//         const to = changes?.value?.metadata?.display_phone_number
//         const from = message?.from
//         const userText = message?.text?.body
//         const value = changes?.value

//         if (!message || !from || !to || !userText) {
//             console.error('❌ Invalid webhook payload:', req.body)
//             return res.sendStatus(400)
//         }

//         console.log('Webhook received:', { from, to, userText })

//         // Ignore status updates (like message delivered/read receipts)
//         if (value?.statuses) {
//             console.log('Received status event:', value.statuses)
//             return res.sendStatus(200)
//         }

//         // Step 1: Find business by WhatsApp number
//         const { rows: businesses } = await pool.query(
//             'SELECT * FROM business WHERE whatsapp_number = $1AND user_id = $2',
//             [to, value?.metadata?.user_id || 0] // Use user_id from metadata if available
//         )
//         const business = businesses[0]
//         if (!business) {
//             await sendWhatsAppMessage(from, 'Business not found in the system.')
//             return res.sendStatus(200)
//         }

//         // Step 2: Check memory (to avoid repeating greetings)
//         const memory = getUserMemory(from)
//         const isFirstMessage = memory.length === 0

//         // Step 3: Get relevant knowledge base content
//         const knowledgeArray = await getRelevantKnowledge(business.id, userText, 'cosine')
//         const knowledge = knowledgeArray.map(k => k.content).join("\n\n")  // <-- Add this

//         console.log('knowledge', knowledge)
//         if (!knowledge) {
//             await sendWhatsAppMessage(from, 'No knowledge base found for this business.')
//             return res.sendStatus(200)
//         }

//         // Step 4: Generate AI response
//         const aiReply = await getAIReply(knowledge, userText, business, from)

//         // Step 5: Avoid duplicate greetings
//         if (!isFirstMessage && aiReply.includes('How can I help you today')) {
//             console.log('Skipping duplicate greeting for returning user.')
//         } else {
//             await sendWhatsAppMessage(from, aiReply)
//         }

//         // Step 6: Save chat to memory
//         addMessageToMemory(from, 'user', userText)
//         addMessageToMemory(from, 'assistant', aiReply)

//         return res.sendStatus(200)
//     } catch (err) {
//         console.error('❌ Error handling webhook:', err)
//         return res.sendStatus(500)
//     }
// })

// // ✅ Save Knowledge Base
// router.post('/save-knowledge', async (req: Request, res: Response) => {

//     try {
//         const token = req.headers?.authorization?.split(' ')[1]
//         console.log('Received token:', token)
//         if (!token) {
//             return res.status(401).send('Unauthorized')
//         }

//         console.log("Headers:", req.headers);

//         // Verify user_id from token
//         // In a real app, you would decode the token and verify it here
//         const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number }

//         const user_id = decoded.userId

//         const { name, whatsapp_number, content } = req.body
//         if (!whatsapp_number || !content) {
//             return res.status(400).send('Missing whatsapp_number or content')
//         }

//         if (decoded.userId !== user_id) {
//             return res.status(403).send('Forbidden')
//         }

//         const insertRes = await pool.query(
//             `
//             INSERT INTO business (user_id, name, whatsapp_number)
//             VALUES ($1, $2, $3)
//             RETURNING *
//             `,
//             // ON CONFLICT (whatsapp_number) 
//             // DO UPDATE SET name = EXCLUDED.name
//             [user_id, name, whatsapp_number]
//         )
//         const business = insertRes.rows[0]

//         await saveKnowledgeWithEmbedding(business.id, content)

//         return res.status(200).json(business);
//         // ✅ Get updated business list for the user (for dashboard)
//         // const { rows: userBusinesses } = await pool.query(
//         //     'SELECT name, whatsapp_number FROM business WHERE user_id = $1',
//         //     [user_id]
//         // );

//         // return res.status(200).json({
//         //     businesses: userBusinesses
//         // });
//         // return res.status(200).json({
//         //     id: business.id,
//         //     user_id: business.user_id,
//         //     name: business.name,
//         //     whatsapp_number: business.whatsapp_number
//         // })
//     } catch (err) {
//         console.error('❌ Error saving knowledge:', err)
//         return res.status(500).send('Internal server error')
//     }
// })

// export default router


import express, { Request, Response } from 'express'
import { sendWhatsAppImage, sendWhatsAppMessage } from '../services/whatsapp.ts'
import { getAIReply } from '../services/openai.ts'
import { pool } from '../db.ts'
import { saveImageWithEmbedding, saveKnowledgeWithEmbedding } from '../services/embedding.ts'
import { getRelevantImage, getRelevantKnowledge } from '../services/retrieval.ts'
import { addMessageToMemory, getUserMemory } from '../memory.ts'
import jwt from "jsonwebtoken"
import { authenticate, AuthRequest } from '../middleware/authenticate.ts'
import multer from 'multer'

const router = express.Router()

// ✅ Webhook Verification (Meta requirement)
router.get('/webhook', (req: Request, res: Response) => {
    console.log("Webhook verification attempt:", req.query);
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
        const entry = req.body?.entry?.[0]
        const changes = entry?.changes?.[0]
        const message = changes?.value?.messages?.[0]
        const to = changes?.value?.metadata?.display_phone_number
        const from = message?.from
        const userText = message?.text?.body
        const value = changes?.value

        // if (!message || !from || !to || !userText) {
        //     console.error('❌ Invalid webhook payload:', req.body)
        //     return res.sendStatus(400)
        // }

        // Handle status updates (delivery/read receipts)
        if (value?.statuses) {
            console.log('📩 Received status event:', value.statuses)
            return res.sendStatus(200)
        }

        // Ignore if no actual message
        if (!message || !from || !to || !userText) {
            console.log('ℹ️ Non-message webhook event received:', req.body)
            return res.sendStatus(200)
        }

        console.log('Webhook received:', { from, to, userText })

        if (value?.statuses) {
            console.log('Received status event:', value.statuses)
            return res.sendStatus(200)
        }

        // ✅ Step 1: Find business by WhatsApp number
        const { rows: businesses } = await pool.query(
            `SELECT * FROM business WHERE whatsapp_number = $1`,
            [to]
        )
        const business = businesses[0]

        if (!business) {
            await sendWhatsAppMessage(from, 'Business not found in the system.')
            return res.sendStatus(200)
        }

        // ✅ Step 2: Check memory (avoid repeating greetings)
        const memory = getUserMemory(from)
        const isFirstMessage = memory.length === 0

        // ✅ Step 3: Get relevant knowledge (restricted by user_id + business_id)
        const knowledgeArray = await getRelevantKnowledge(business.user_id, business.id, userText, 'cosine')
        const knowledge = knowledgeArray.map(k => k.content).join("\n\n")

        // ✅ Step 4: Retrieve relevant IMAGE knowledge
        const imageMatch = await getRelevantImage(business.id, userText)

        console.log('knowledge', knowledge)
        if (!knowledge && !imageMatch) {
            // ✅ Step 4: Retrieve relevant IMAGE knowledge
            // const imageMatch = await getRelevantImage(business.id, userText)
            await sendWhatsAppMessage(from, 'No knowledge base found for this business.')
            return res.sendStatus(200)
        }

        // ✅ Step 5: Generate AI response
        const aiReply = await getAIReply(knowledge, userText, business, from, imageMatch)

        // ✅ Step 6: Avoid duplicate greetings
        if (!isFirstMessage && aiReply.text.includes('How can I help you today')) {
            console.log('Skipping duplicate greeting for returning user.')
        } else {
            await sendWhatsAppMessage(from, aiReply?.text)
        }

        console.log('imageMatch -', imageMatch)

        // ✅ Step 7: If image found, send it after reply
        if (imageMatch) {
            console.log(`📷 Sending image: ${imageMatch?.description} -> ${imageMatch.url}`)
            await sendWhatsAppImage(from, imageMatch.url)
        }

        // ✅ Step 6: Save chat to memory
        addMessageToMemory(from, 'user', userText)
        addMessageToMemory(from, 'assistant', aiReply?.text || '')

        return res.sendStatus(200)
    } catch (err) {
        console.error('❌ Error handling webhook:', err)
        return res.sendStatus(500)
    }
})

// ✅ Save Knowledge Base
router.post(
    "/save-knowledge",
    authenticate,
    async (req: AuthRequest, res: Response) => {
        try {
            const user_id = req.user!.userId; // from middleware

            const { name, whatsapp_number, content } = req.body;
            if (!whatsapp_number || !content) {
                return res
                    .status(400)
                    .send("Missing whatsapp_number or content");
            }

            const insertRes = await pool.query(
                `
          INSERT INTO business (user_id, name, whatsapp_number)
          VALUES ($1, $2, $3)
          RETURNING *
          `,
                [user_id, name, whatsapp_number]
            );
            const business = insertRes.rows[0];

            await saveKnowledgeWithEmbedding(business.id, content);

            return res.status(200).json(business);
        } catch (err) {
            console.error("❌ Error saving knowledge:", err);
            return res.status(500).send("Internal server error");
        }
    }
);

const storage = multer.memoryStorage();
const upload = multer({ storage });
import cloudinary from "../services/cloudinary.ts";
import streamifier from "streamifier";


// ✅ Save image knowledge for a business
router.post("/save-image", authenticate, upload.single("image"),
    async (req: AuthRequest, res: Response) => {
        try {
            const user_id = req.user!.userId;
            const { businessId, description } = req.body;

            if (!businessId || !description) {
                return res.status(400).send("Missing params");
            }

            // Validate business belongs to user
            const { rows: businesses } = await pool.query(
                "SELECT * FROM business WHERE id = $1 AND user_id = $2",
                [businessId, user_id]
            );
            if (!businesses.length) {
                return res.status(403).send("Not authorized for this business");
            }

            // ✅ Upload image to Cloudinary
            const uploadResult: any = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: `business_${businessId}`,
                        use_filename: true,
                        unique_filename: true,
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });

            await saveImageWithEmbedding(businessId, description, uploadResult?.secure_url);
            return res.status(200).json({
                message: "✅ Image saved",
                url: uploadResult.secure_url,
                public_id: uploadResult.public_id
            });
        } catch (err) {
            console.error("❌ Error saving image:", err);
            return res.status(500).send("Internal server error");
        }
    });

export default router
