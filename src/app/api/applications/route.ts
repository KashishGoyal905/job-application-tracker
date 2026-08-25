// import { PrismaClient } from "@prisma/client";
import { addApplicationSchema } from "@/lib/validations/applicationSchema";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/primsa";


// GET
export async function GET() {
    const applications = await prisma.application.findMany({
        where: {
            userId: 1
        },
        orderBy: {
            appliedDate: "desc"
        }
    });

    return NextResponse.json(
        {
            applications,
        },
        {
            status: 200,
        }
    )
}
