import dotenv from 'dotenv'
dotenv.config();

import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!
})

export const getAIReply = async (userMessage: string) => {
    const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
            { role: 'system', content: 'You are a helpful assistant for a business.' },
            { role: 'user', content: userMessage }
        ]
    })

    return completion.choices[0].message?.content ?? 'Sorry, I could not process that.'
}
