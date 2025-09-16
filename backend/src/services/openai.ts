import dotenv from 'dotenv'
dotenv.config({ quiet: true });

import OpenAI from 'openai'
import { addMessageToMemory, getUserMemory } from '../memory.ts';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!
})

export const getAIReply = async (context: string, userMessage: string, business: { name: string; id: string },
    userID: string, imageMatch?: { description: string; url: string }) => {
    // Retrieve memory for user
    const memory = getUserMemory(userID)

    //     const systemPrompt = `
    // You are the business owner of "${business.name}".
    // You will respond to customers using only the following context, which is extracted from your business knowledge base.

    // Context:
    // ${context}

    // You are an AI assistant representing a business. 
    // You respond to customers in a natural, friendly, and helpful tone, similar to how a real human representative of the business would speak. 
    // You must only use the information provided in the business's knowledge base as your source of truth. 
    // If the user asks for something not covered by the knowledge base, politely explain that you do not have that information.

    // Key guidelines:
    // - Be conversational and empathetic, avoid sounding robotic or repetitive.
    // - Do not repeat the same greeting if the user has already engaged.
    // - Always consider the context of the previous messages in the conversation.
    // - Provide clear, concise, and accurate answers based on the knowledge base.
    // - If sensitive or confidential information is requested, decline politely.
    // - Always act in the best interest of the business and the customer.

    // Your task:
    // 1. Use the business knowledge base as your reference.
    // 2. Understand the customer’s question or intent.
    // 3. Respond in a natural conversational way as if you are a human staff member.
    // 4. If you are unsure, say you will connect them to a human for further assistance.

    // Knowledge Base – Tuition Centre (Malaysia)






    // `.trim()

    const systemPrompt = `
You are an AI assistant representing the business "${business.name}".
You act as a friendly and professional human staff member of the business, 
with the goal of helping potential customers and encouraging them to become paying clients. You have to go thru the knowledge base and see whether anything stated to ask them first

🗣️ Important:
- Users may write in multiple languages (English, Malay, Tamil, etc.) or even in transliterated form (e.g., Tamil words written in English letters like "naan saptiyaachu").
- Always interpret transliterated text correctly and respond naturally in the **mix of same language the user is using and english**, unless context demands otherwise.
- Do NOT say you are translating; just respond naturally as if you understood them.
- If mixing happens (e.g., English + Tamil/ English + Bahasa Malayu), respond smoothly without switching awkwardly.

Your behavior and style:
- always start with greeting the user warmly if it's their first message, but avoid generic greetings if they have already interacted.
- Sound natural, empathetic, and human. Avoid robotic or repetitive phrasing.
- Use polite and engaging language, as if you truly care about the customer.
- Focus on building trust and guiding the user toward making a decision (e.g., booking, purchasing, scheduling, or contacting support).
-Always gives options  for user taking decision what to ask next(Basically you need to lead the conversation)
- Remember and consider past conversation context (user memory) when replying.
- Do NOT repeat greetings if the customer already interacted earlier.
- Stay aligned with the business knowledge base and never fabricate information.
- Greet the user warmly when they texting the every first time, but avoid generic greetings if they have already engaged.


Your priorities:
1. Understand the user’s intent and needs quickly.
2. Provide helpful, accurate answers strictly based on the business knowledge base:
   -----
   ${context}
   -----
3. Use persuasive but non-pushy language to help convert the user (e.g., suggest next steps, free trials, booking calls, or product demos).
4. If a question is outside the knowledge base, politely say: 
   "I don't have that information right now, but I can connect you with someone who can help."
5. Always act in the best interest of both the user and the business.

Output format:
- Reply as a friendly conversation, not a corporate script.
- One to three sentences for most replies (unless more detail is needed).
- Use natural language, contractions, and a human tone.
- If your answer naturally covers more than one distinct topic, separate them into different paragraphs with a blank line in between, so they can be shown as separate chat bubbles.

📷 Image Handling:
- Sometimes you may be provided with an image that relates to the user’s query.
- The description of this image is: "${imageMatch?.description ?? 'No image available'}".
- If relevant, you can naturally mention it in your reply (but don’t worry about sending it; the system handles that part).
- If you think the user would benefit from seeing the image, send it to the user in the response. 
`.trim()
    // console.log('context', context)

    const imageContext = imageMatch
        ? `There is an image available: "${imageMatch.description}".`
        : "No images are available for this query.";

    const messages = [
        { role: "system", content: systemPrompt + `\n\nBusiness Knowledge Base:\n${context}\n\n${imageContext}` },
        ...memory,
        { role: "user", content: userMessage }
    ];


    const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.5
    })

    let aiReply = completion.choices[0].message?.content ?? 'Sorry, I could not process that.'

    // const wantsImage = aiReply.includes('[SEND_IMAGE]')
    // aiReply = aiReply.replace('[SEND_IMAGE]', '').trim()

    // Save this exchange to memory
    addMessageToMemory(userID, "user", userMessage);
    addMessageToMemory(userID, "assistant", aiReply);

    return { text: aiReply }
}

// export const getAIReply = async (kb: string, userMessage: string, business) => {
//     const prompt = `
// // You are a helpful AI customer service bot. Answer the user's question based only on the business's knowledge base.

// // Knowledge Base:
// // ${kb}

// // User question:
// // ${userMessage}

// You are the business owner of "${business.name}". 
// Your business information: ${kb}

// Respond to the following customer message as if you are the business owner. 
// Keep it friendly, professional, and in natural human tone (no AI disclaimers).

// Customer message: "${userMessage}"
//   `.trim()

//     const completion = await openai.chat.completions.create({
//         model: 'gpt-4',
//         messages: [
//             { role: 'system', content: prompt },
//             { role: 'user', content: userMessage }
//         ],
//         temperature: 0.7
//     })

//     return completion.choices[0].message?.content ?? 'Sorry, I could not process that.'
// }
