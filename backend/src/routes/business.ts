// // routes/business.ts
// import express, { Request, Response } from 'express';
// import { pool } from '../db';

// const router = express.Router();

// router.get('/businesses', async (req: Request, res: Response) => {
//     try {
//         const { rows } = await pool.query(
//             'SELECT id, name, whatsapp_number FROM business ORDER BY created_at DESC'
//         );
//         res.json(rows);
//     } catch (error) {
//         console.error('Error fetching businesses:', error);
//         res.status(500).send('Internal server error');
//     }
// });

// export default router;


import express, { Request, Response } from "express";
import { pool } from "../db";
import { authenticate, AuthRequest } from "../middleware/authenticate";

const router = express.Router();

// Protected
router.get("/businesses", authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const user = (req as any).user; // from authenticate middleware
    console.log("Authenticated user:", user);
    // const { rows } = await pool.query(
    //     "SELECT id, name, whatsapp_number FROM business WHERE user_id = $1 ORDER BY created_at DESC",
    //     [user.userId]
    // );
    const { rows } = await pool.query(
      `
      SELECT
        b.id,
        b.name,
        b.whatsapp_number,
        b.owner_whatsapp_number,
        b.whatsapp_phone_number_id,
        b.waba_id,

        COALESCE(
          (
            SELECT json_agg(
              json_build_object(
                'id', k.id,
                'content', k.content
              )
              ORDER BY k.id
            )
            FROM knowledge_base_embeddings k
            WHERE k.business_id = b.id
          ),
          '[]'::json
        ) AS kb,
    
        COALESCE(
          (
            SELECT jsonb_agg(
              DISTINCT jsonb_build_object(
                'id', bi.id,
                'description', bi.description,
                'image_url', bi.image_url
              )
            )
            FROM business_images bi
            WHERE bi.business_id = b.id
          ),
          '[]'::jsonb
        ) AS images
    
      FROM business b
      WHERE b.user_id = $1
      ORDER BY b.created_at DESC
      `,
      [user.userId]
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching businesses:", error);
    res.status(500).send("Internal server error");
  }
});

export default router;
