// import { PrismaClient } from "@prisma/client";
import { addApplicationSchema } from "@/lib/validations/applicationSchema";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/primsa";

// POST
export async function POST(request: Request) {
    try {
        // we can access the body using .json()
        const body = await request.json();

        // Validating data
        const validation = addApplicationSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json( // we have to use NextResponse because it builds a proper HTTP response containing data, status, content-type and all
                {
                    message: "Validation Failed",
                    errors: validation.error.flatten().fieldErrors,
                },
                {
                    status: 400

                },
            );
        }

        // after validation, talk to MySQL through prisma
        const application = await prisma.application.create({
            data: {
                company: validation.data.company,
                role: validation.data.role,
                status: validation.data.status,
                appliedDate: new Date(validation.data.appliedDate),

                // Temporary until authentication
                userId: 1,
            },
        });

        return NextResponse.json(
            {
                message: "Application added successfully",
                application,
            },
            {
                status: 201
            }
        );
    } catch {
        return NextResponse.json(
            {
                message: "Internal Server Error"
            },
            {
                status: 500
            }
        );
    }

}

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