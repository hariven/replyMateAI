import axios from 'axios'

export interface BusinessWhatsAppConfig {
    whatsapp_phone_number_id: string;
    whatsapp_access_token: string;
    waba_id?: string;
}

export const sendWhatsAppMessage = async (
    to: string,
    text: string,
    config: BusinessWhatsAppConfig
) => {
    try {
        await axios.post(
            `https://graph.facebook.com/v23.0/${config.whatsapp_phone_number_id}/messages`,
            {
                messaging_product: 'whatsapp',
                to,
                text: { body: text }
            },
            {
                headers: {
                    Authorization: `Bearer ${config.whatsapp_access_token}`,
                    'Content-Type': 'application/json'
                }
            }
        )
    } catch (err) {
        console.error('Error sending WhatsApp message:', err)
    }
}

export async function sendWhatsAppImage(
    to: string,
    imageUrl: string,
    config: BusinessWhatsAppConfig
) {
    await fetch(
        `https://graph.facebook.com/v23.0/${config.whatsapp_phone_number_id}/messages`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${config.whatsapp_access_token}`,
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
