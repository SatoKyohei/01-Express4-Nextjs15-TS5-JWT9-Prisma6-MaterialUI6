import express, { json, urlencoded, Request, Response } from "express";
import userController from "./controllers/userControllers";
import todoController from "./controllers/todoControllers";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma/prismaClient";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest, authenticateToken } from "./middleware/authenticate";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 8080;

//  ----- MW ----- //
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(cookieParser());
export const tokenBlackList: Set<string> = new Set();
const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

// -----  Routing ----- //
app.post("/register", async (req: Request, res: Response) => {
    try {
        // 課題：email, password, nameが空のリクエストが来た場合
        const { email, password, name } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { email, password: hashedPassword, name },
        });
        return res.status(200).json({ message: "Success：UserCreate", user });
    } catch (error) {
        return res.status(400).json({ error: "Your Request is Error" });
    } finally {
        await prisma.$disconnect();
    }
});

app.post("/login", async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            res.status(404).json({ error: "User not Found" });
            return;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(401).json({ error: "Invalid password" });
            return;
        }

        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" });

        res.status(200).json({ message: "Login Successful", token, userId: user.id });
    } catch (error) {
        res.status(500).json({ message: "Login Failed" });
    }
});

app.get("/profile", authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
        res.status(403).json({ error: "Invalid Token" });
        return;
    }

    const userId = req.user.userId;

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                email: true,
                name: true,
            },
        });

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: "User Not Found" });
            return;
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve user profile" });
    }
});

app.post("/logout", authenticateToken, (req: AuthenticatedRequest, res: Response) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (token) {
        tokenBlackList.add(token);
        res.status(200).json({ message: "Logged out successfully" });
        return;
    }
    res.status(400).json({ error: "Token is required for logout" });
});

app.use("/users", userController);
app.use("/todos", todoController);

/* eslint-disable */
app.listen(port, () => console.log(`Express is running on port: ${port}`));
