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
    COALESCE(
      json_agg(
        json_build_object(
          'id', k.id,
          'content', k.content
        )
      ) FILTER (WHERE k.id IS NOT NULL),
      '[]'
    ) AS kb,
    COALESCE(
      json_agg(
        DISTINCT jsonb_build_object(
          'id', bi.id,
          'description', bi.description,
          'image_url', bi.image_url
        )
      ) FILTER (WHERE bi.id IS NOT NULL),
      '[]'
    ) AS images
  FROM business b
  LEFT JOIN knowledge_base_embeddings k 
    ON k.business_id = b.id
    LEFT JOIN business_images bi
    ON bi.business_id = b.id
  WHERE b.user_id = $1
  GROUP BY b.id
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
