import express, { Request, Response } from 'express';
import { pool } from '../db';
import { authenticate, AuthRequest } from '../middleware/authenticate';
import { sendWhatsAppMessage } from '../services/whatsapp';
import { saveMessage } from '../services/conversation';
import { upsertOnOutbound } from '../services/conversationState';

const router = express.Router();

// Protected endpoint for manual reply from business owner
router.post('/reply', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId; // from authenticate middleware
    const { businessId, phoneNumber, message } = req.body;

    // Validate input
    if (!businessId || !phoneNumber || !message) {
      return res.status(400).json({ error: 'Missing required fields: businessId, phoneNumber, message' });
    }

    // Verify business belongs to the user
    const { rows: businesses } = await pool.query(
      'SELECT id, whatsapp_phone_number_id, whatsapp_access_token FROM business WHERE id = $1 AND user_id = $2',
      [businessId, userId]
    );

    if (businesses.length === 0) {
      return res.status(403).json({ error: 'Business not found or not authorized' });
    }

    const business = businesses[0];

    // Build WhatsApp config from business record
    const config = {
      whatsapp_phone_number_id: business.whatsapp_phone_number_id,
      whatsapp_access_token: business.whatsapp_access_token,
      waba_id: undefined, // optional
    };

    // Send the WhatsApp message
    await sendWhatsAppMessage(phoneNumber, message, config);

    // Save the outgoing message to conversations table, tagged as a human-sent reply
    await saveMessage(
      userId.toString(),
      businessId.toString(),
      phoneNumber,
      message,
      'human'
    );
    await upsertOnOutbound(businessId.toString(), phoneNumber, 'human', message, userId.toString());

    res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (err) {
    console.error('❌ Error sending manual reply:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;