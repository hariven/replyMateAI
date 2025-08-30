// // routes/auth.ts
// import express from "express";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import dotenv from "dotenv";
// import { createUser, getUserByEmail } from "../services/userService";

// dotenv.config();

// const router = express.Router();

// // POST /api/login
// router.post("/login", async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Check if the user exists
//         const user = await getUserByEmail(email);
//         if (!user) {
//             return res.status(401).json({ message: "Invalid email or password" });
//         }

//         // Compare the password with the hashed password
//         const isPasswordValid = await bcrypt.compare(password, user.password_hash);
//         if (!isPasswordValid) {
//             return res.status(401).json({ message: "Invalid email or password" });
//         }

//         // Generate a JWT token
//         const token = jwt.sign(
//             { userId: user.id, email: user.email },
//             process.env.JWT_SECRET as string,
//             { expiresIn: "1h" }
//         );

//         res.status(200).json({ token });
//     } catch (err) {
//         console.error("Error in /login route:", err);
//         res.status(500).json({ message: "Server error" });
//     }
// });

// router.post("/signup", async (req, res) => {
//     const { firstName, lastName, email, phone, businessName, password } = req.body;

//     try {
//         // Validate input
//         if (!firstName || !lastName || !email || !phone || !businessName || !password) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         // Check if user already exists
//         const existingUser = await getUserByEmail(email);
//         if (existingUser) {
//             return res.status(409).json({ message: "Email is already in use" });
//         }

//         // Hash the password
//         const passwordHash = await bcrypt.hash(password, 10);

//         // Create the user
//         const newUser = await createUser({
// firstName,
// lastName,
//             email,
//             phone,
//             businessName,
//             passwordHash,
//         });

//         console.log("JWT_SECRET:", process.env.JWT_SECRET);
//         if (!process.env.JWT_SECRET) {
//             throw new Error("JWT_SECRET is not defined");
//         }
//         // Generate a JWT token
//         const token = jwt.sign(
//             { userId: newUser.id, email: newUser.email },
//             process.env.JWT_SECRET as string,
//             { expiresIn: "1h" }
//         );

//         res.status(201).json({
//             token, user: {
//                 id: newUser.id,
//                 email: newUser.email,
//                 firstName,
//                 lastName,
//                 phone,
//                 businessName
//             }
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error" });
//     }
// });


// export default router;


// routes/auth.ts
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { createUser, getUserByEmail } from "../services/userService";

dotenv.config();
const router = express.Router();

// POST /signup (Public)
router.post("/signup", async (req, res) => {
    const { firstName, lastName, email, phone, businessName, password } = req.body;

    try {
        // 1. Check if user already exists
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 2. Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // 3. Create user in DB
        const newUser = await createUser({
            firstName,
            lastName,
            email,
            phone,
            businessName,
            passwordHash,
        });

        // 4. Generate JWT
        const token = jwt.sign(
            { id: newUser.id, email: newUser.email },
            process.env.JWT_SECRET!,
            { expiresIn: "1h" }
        );

        res.json({ token, user: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// POST /login (Public)
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // compare password with stored hash
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // issue JWT
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: "1h" }
        );

        res.json({ token, user: { id: user.id, email: user.email } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
