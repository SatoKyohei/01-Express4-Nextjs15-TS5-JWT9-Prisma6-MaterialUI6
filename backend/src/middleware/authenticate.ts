import { NextFunction, Request, Response } from "express";
import { tokenBlackList } from "..";
import jwt from "jsonwebtoken";



const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

export interface AuthenticatedRequest extends Request {
    user?: { userId: number };
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    // const token = req.cookies["authToken"]

    if (!token) {
        res.status(401).json({ error: "Access token required" });
        return;
    }

    if (tokenBlackList.has(token)) {
        res.status(403).json({ error: "Token is no longer valid" });
        return;
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            res.status(403).json({ error: "Invalid token" });
            return;
        }
        req.user = user as { userId: number };
        next();
    });
};
