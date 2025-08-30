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
        const { rows } = await pool.query(
            "SELECT id, name, whatsapp_number FROM business WHERE user_id = $1 ORDER BY created_at DESC",
            [user.userId]
        );
        res.json(rows);
    } catch (error) {
        console.error("Error fetching businesses:", error);
        res.status(500).send("Internal server error");
    }
});

export default router;
