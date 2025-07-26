import dotenv from 'dotenv'
dotenv.config();

import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!
})

export const getAIReply = async (kb: string, userMessage: string, business) => {
    const prompt = `
// You are a helpful AI customer service bot. Answer the user's question based only on the business's knowledge base.

// Knowledge Base:
// ${kb}

// User question:
// ${userMessage}

You are the business owner of "${business.name}". 
Your business information: ${kb}

Respond to the following customer message as if you are the business owner. 
Keep it friendly, professional, and in natural human tone (no AI disclaimers).

Customer message: "${userMessage}"
  `.trim()

    const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
            { role: 'system', content: prompt },
            { role: 'user', content: userMessage }
        ],
        temperature: 0.7
    })

    return completion.choices[0].message?.content ?? 'Sorry, I could not process that.'
}
