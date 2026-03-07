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
import { authenticate, AuthRequest } from '../middleware/authenticate.ts'
import multer from 'multer'
import { getConversationContext, saveMessage } from '../services/conversation.ts'

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
        const value = changes?.value
        const message = value?.messages?.[0]
        const to = value?.metadata?.display_phone_number
        const from = message?.from
        const userText = message?.text?.body

        // Handle status updates (delivery/read receipts) early — no processing needed
        if (value?.statuses) {
            return res.sendStatus(200)
        }

        // Ignore non-message events
        if (!message || !from || !to || !userText) {
            return res.sendStatus(200)
        }

        console.log('Webhook received:', { from, to, userText })

        // Step 1: Find business by WhatsApp number
        const { rows: businesses } = await pool.query(
            `SELECT * FROM business WHERE whatsapp_number = $1`,
            [to]
        )
        const business = businesses[0]
        if (!business) {
            await sendWhatsAppMessage(from, 'Business not found in the system.')
            return res.sendStatus(200)
        }

        // Step 2: Save user message to DB
        await saveMessage(business.user_id, business.id, from, userText, true)

        // Step 3: Get persistent conversation history from DB
        const conversationHistory = await getConversationContext(business.user_id, business.id, from)

        // Step 4: Get relevant knowledge (RAG)
        const knowledgeArray = await getRelevantKnowledge(business.user_id, business.id, userText, 'cosine')
        const knowledge = knowledgeArray.map(k => k.content).join("\n\n")

        // Step 5: Get relevant image (RAG)
        const imageMatch = await getRelevantImage(business.id, userText)

        if (!knowledge && !imageMatch) {
            await sendWhatsAppMessage(from, "I don't have enough information to answer that right now.")
            return res.sendStatus(200)
        }

        // Step 6: Generate AI reply using KB context + persistent conversation history
        const aiReply = await getAIReply(knowledge, userText, business, from, imageMatch, conversationHistory)

        // Step 7: Send text reply
        await sendWhatsAppMessage(from, aiReply?.text)

        // Step 8: Send image if matched
        if (imageMatch) {
            console.log(`📷 Sending image: ${imageMatch.description} -> ${imageMatch.url}`)
            await sendWhatsAppImage(from, imageMatch.url)
        }

        // Step 9: Save AI reply to DB
        await saveMessage(business.user_id, business.id, from, aiReply?.text || '', false)

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

            const { id, name, whatsapp_number, kb_content } = req.body;
            if (!whatsapp_number || !kb_content) {
                return res
                    .status(400)
                    .send("Missing whatsapp_number or content");
            }

            let business;

            if (id) {
                // 🔹 EDIT (update existing)
                const updateRes = await pool.query(
                    `UPDATE business
           SET name = $1, whatsapp_number = $2
           WHERE id = $3 AND user_id = $4
           RETURNING *`,
                    [name, whatsapp_number, id, user_id]
                );

                if (updateRes.rows.length === 0) {
                    return res.status(404).send("Business not found or not yours");
                }

                business = updateRes.rows[0];

                // Clear old knowledge base and re-insert
                await pool.query(
                    `DELETE FROM knowledge_base_embeddings WHERE business_id = $1`,
                    [id]
                );
                await saveKnowledgeWithEmbedding(id, kb_content);
            } else {
                // 🔹 CREATE (insert new)
                const insertRes = await pool.query(
                    `INSERT INTO business (user_id, name, whatsapp_number)
           VALUES ($1, $2, $3)
           RETURNING *`,
                    [user_id, name, whatsapp_number]
                );
                business = insertRes.rows[0];

                await saveKnowledgeWithEmbedding(business.id, kb_content);
            }

            return res.status(200).json(business);
        } catch (err) {
            console.error("❌ Error saving knowledge:", err);
            return res.status(500).send("Internal server error");
        }
    }
);

const storage = multer.memoryStorage();
const upload = multer({
    storage, limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});
import cloudinary from "../services/cloudinary.ts";
import streamifier from "streamifier";


// ✅ Save image knowledge for a business
router.post("/save-image", authenticate, upload.single("image"),
    async (req: AuthRequest, res: Response) => {
        try {
            const user_id = req.user!.userId;
            const { id, businessId, name, description } = req.body;

            // console.log("Received image save request:", {
            //     id,
            //     businessId,
            //     name,
            //     description,
            //     hasFile: !!req.file,
            // });
            console.log("File info:", user_id)

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
            let uploadResult;

            // ✅ If editing, fetch old image (optional: to delete from Cloudinary)
            if (id) {
                const { rows: imgs } = await pool.query(
                    `SELECT * FROM business_images WHERE id = $1 AND business_id = $2`,
                    [id, businessId]
                );
                if (!imgs.length) {
                    return res.status(404).send("Image not found");
                }

                // // optional: remove old from cloudinary
                // if (imgs[0].public_id) {
                //     await cloudinary.uploader.destroy(imgs[0].public_id);
                // }
            }

            // ✅ Upload new image if provided
            if (req.file) {
                uploadResult = await new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        {
                            folder: `business_${name || businessId}`,
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
            }

            let image;
            if (id) {
                // 🔹 EDIT
                const updateRes = await pool.query(
                    `UPDATE business_images
                 SET description = $1,
                     image_url = $2,
                     updated_at = NOW()
                 WHERE id = $3 AND business_id = $4
                 RETURNING *`,
                    [
                        description,
                        uploadResult?.secure_url || null,
                        id,
                        businessId,
                    ]
                );
                image = updateRes.rows[0];
            } else {
                // CREATE
                if (!uploadResult?.secure_url) {
                    return res.status(400).send("Image file is required");
                }
                await saveImageWithEmbedding(
                    businessId,
                    description,
                    uploadResult.secure_url
                );

                return res.status(200).json({ message: "✅ Image saved" });
            }
        } catch (err) {
            console.error("❌ Error saving image:", err);
            return res.status(500).send("Internal server error");
        }
    }
);

// backend
router.delete("/delete-image/:id", authenticate, async (req: AuthRequest, res: Response) => {
    try {
        const user_id = req.user!.userId;
        const { id } = req.params;

        const { rows: imgs } = await pool.query(
            `SELECT * FROM business_images bi 
         JOIN business b ON bi.business_id = b.id
         WHERE bi.id = $1 AND b.user_id = $2`,
            [id, user_id]
        );
        if (!imgs.length) return res.status(404).send("Image not found");

        // Remove from Cloudinary
        if (imgs[0].public_id) {
            await cloudinary.uploader.destroy(imgs[0].public_id);
        }

        await pool.query(`DELETE FROM business_images WHERE id = $1`, [id]);

        res.json({ message: "✅ Image deleted" });
    } catch (err) {
        console.error("❌ Error deleting image:", err);
        res.status(500).send("Internal server error");
    }
});


export default router
