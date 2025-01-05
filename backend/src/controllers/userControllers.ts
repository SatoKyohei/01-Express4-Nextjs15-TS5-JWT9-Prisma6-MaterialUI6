import { prisma } from "../../lib/prisma/prismaClient";
import { Router, Request, Response } from "express";

const router = Router();

// ユーザー情報全取得
router.get("/", async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        return res.status(200).json({ users });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    } finally {
        await prisma.$disconnect();
    }
});

// 特定ユーザー情報取得
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params?.id);
        const user = await prisma.user.findUnique({
            where: { id },
        });
        return res.status(200).json({ message: "Success：UserInfo", user });
    } catch (error) {
        return res.status(400).json({ error: "Your Request is Error" });
    } finally {
        await prisma.$disconnect();
    }
});


export default router;
