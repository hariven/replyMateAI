// import multer from "multer";
// import cloudinary from "../services/cloudinary.ts";
// import express, { Request, Response } from "express";
// import { pool } from "../db";
// import { authenticate, AuthRequest } from "../middleware/authenticate";

// const upload = multer({ dest: "uploads/" }); // temp storage
// const router = express.Router();

// router.post(
//     "/save-image",
//     authenticate,
//     upload.single("image"), // expect image file field = "image"
//     async (req: AuthRequest, res: Response) => {
//         try {
//             const user_id = req.user!.userId;
//             const { businessId, label, description } = req.body;

//             if (!businessId || !req.file) {
//                 return res.status(400).send("Missing params or image");
//             }

//             // Validate business belongs to user
//             const { rows: businesses } = await pool.query(
//                 "SELECT * FROM business WHERE id = $1 AND user_id = $2",
//                 [businessId, user_id]
//             );
//             if (!businesses.length) {
//                 return res.status(403).send("Not authorized for this business");
//             }

//             // ✅ Upload image to Cloudinary
//             const uploadResult = await cloudinary.uploader.upload(req.file.path, {
//                 folder: `business_${businessId}`, // organize per business
//                 use_filename: true,
//                 unique_filename: true
//             });

//             // ✅ Save in DB with embedding
//             await saveImageWithEmbedding(
//                 businessId,
//                 label,
//                 description,
//                 uploadResult.secure_url
//             );

//             return res.status(200).json({
//                 message: "✅ Image saved",
//                 url: uploadResult.secure_url,
//                 public_id: uploadResult.public_id
//             });
//         } catch (err) {
//             console.error("❌ Error saving image:", err);
//             return res.status(500).send("Internal server error");
//         }
//     }
// );
