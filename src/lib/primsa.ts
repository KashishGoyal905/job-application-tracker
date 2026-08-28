import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const globalForPrisma = globalThis as {
    prisma?: PrismaClient;
};

const adapter = new PrismaMariaDb({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "Kg@972804",
    database: "job_tracker",
    allowPublicKeyRetrieval: true,
    ssl: false,
});

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        adapter,
    });

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}