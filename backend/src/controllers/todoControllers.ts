import { prisma } from "../../lib/prisma/prismaClient";
import { Router, Request, Response } from "express";

const router = Router();

// ToDo情報全取得
router.get("/", async (req: Request, res: Response) => {
    try {
        const todos = await prisma.todo.findMany();
        return res.status(200).json({ todos });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    } finally {
        await prisma.$disconnect();
    }
});

// 特定ToDo情報取得
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params?.id);
        const todo = await prisma.todo.findUnique({
            where: { id },
        });
        return res.status(200).json(todo);
    } catch (error) {
        return res.status(400).json({ error: "Your Request is Error" });
    } finally {
        await prisma.$disconnect();
    }
});

// ToDo作成
router.post("/create", async (req: Request, res: Response) => {
    try {
        const { title, content, userId } = req.body;
        const todo = await prisma.todo.create({
            data: { title, content, userId },
        });
        return res.status(200).json({ message: "Success：TodoCreate", todo });
    } catch (error) {
        return res.status(400).json({ error: "Your Request is Error" });
    } finally {
        await prisma.$disconnect();
    }
});

// ToDo更新
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params?.id);
        const { title, content } = req.body;
        const todo = await prisma.todo.update({
            where: { id },
            data: { title, content },
        });
        return res.status(200).json(todo);
    } catch (error) {
        return res.status(400).json({ error: "Your Request is Error" });
    } finally {
        await prisma.$disconnect();
    }
});

// ToDo削除
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params?.id);
        const todo = await prisma.todo.delete({
            where: { id },
        });
        return res.status(200).json(todo);
    } catch (error) {
        return res.status(400).json({ error: "Your Request is Error" });
    } finally {
        await prisma.$disconnect();
    }
});

export default router;
