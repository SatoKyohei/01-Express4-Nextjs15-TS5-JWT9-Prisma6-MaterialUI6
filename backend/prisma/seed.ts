import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const main = async () => {
    // 既存データ全削除
    // await prisma.user.deleteMany();

    const satohashed = await bcrypt.hash("pass1", 10);
    const nakamurahashed = await bcrypt.hash("pass2", 10);
    const yamadahashed = await bcrypt.hash("pass3", 10);

    const sato = await prisma.user.upsert({
        where: { email: "sato@example.com" },
        update: { password: satohashed },
        create: {
            email: "sato@example.com",
            name: "sato",
            password: satohashed,
        },
    });

    const nakamura = await prisma.user.upsert({
        where: { email: "nakamura@example.com" },
        update: { password: nakamurahashed },
        create: {
            email: "nakamura@example.com",
            name: "nakamura",
            password: nakamurahashed,
        },
    });

    const yamada = await prisma.user.upsert({
        where: { email: "yamada@example.com" },
        update: { password: nakamurahashed },
        create: {
            email: "yamada@example.com",
            name: "yamada",
            password: yamadahashed,
        },
    });

    const breakfast = await prisma.todo.upsert({
        where: { id: 1 },
        update: {},
        create: {
            title: "breakfast",
            content: "Have breakfast",
            userId: 14,
        },
    });

    const newspaper = await prisma.todo.upsert({
        where: { id: 2 },
        update: {},
        create: {
            title: "newspaper",
            content: "Read the newspaper",
            userId: 15,
        },
    });

    const shopping = await prisma.todo.upsert({
        where: { id: 3 },
        update: {},
        create: {
            title: "shopping",
            content: "Buy groceries for dinner",
            userId: 15,
        },
    });

    console.log({ sato, nakamura, yamada, breakfast, newspaper, shopping });
};

main()
    .catch((error) => {
        console.error(error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
