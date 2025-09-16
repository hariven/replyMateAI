import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config({ quiet: true });

const WABA_TOKEN = process.env.WHATSAPP_TOKEN
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_ID

export const sendWhatsAppMessage = async (to: string, text: string) => {
    try {
        await axios.post(
            `https://graph.facebook.com/v23.0/${PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: 'whatsapp',
                to,
                text: { body: text }
            },
            {
                headers: {
                    Authorization: `Bearer ${WABA_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        )
    } catch (err) {
        console.error('Error sending WhatsApp message:', err)
    }
}

export async function sendWhatsAppImage(to: string, imageUrl: string) {
    await fetch(
        `https://graph.facebook.com/v23.0/${PHONE_NUMBER_ID}/messages`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                messaging_product: "whatsapp",
                to,
                type: "image",
                image: { link: imageUrl },
            }),
        }
    );
}
