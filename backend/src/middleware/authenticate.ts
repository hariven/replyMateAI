// middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    user?: { userId: number; email: string };
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Invalid token format" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
            id: number;
            email: string;
        };

        req.user = { userId: decoded.id, email: decoded.email }; // attach user info
        next();
    } catch (err) {
        console.error("JWT verification failed:", err);
        return res.status(403).json({ message: "Forbidden" });
    }
}
