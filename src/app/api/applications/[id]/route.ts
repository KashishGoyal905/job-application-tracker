import { NextResponse } from "next/server";
import { prisma } from "@/lib/primsa";
import { addApplicationSchema } from "@/lib/validations/applicationSchema";

type RouteContext = {
    params: Promise<{ id: string }>;
};

export async function PUT(
    request: Request,
    { params }: RouteContext
) {
    try {
        const { id } = await params;

        const applicationId = Number(id);

        if (Number.isNaN(applicationId)) {
            return NextResponse.json(
                {
                    message: "Invalid application ID",
                },
                {
                    status: 400,
                }
            );
        }

        const body = await request.json();

        const validation = addApplicationSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                {
                    message: "Validation Failed",
                    errors: validation.error.flatten().fieldErrors,
                },
                {
                    status: 400,
                }
            );
        }

        const application = await prisma.application.update({
            where: {
                id: applicationId,
            },
            data: {
                company: validation.data.company,
                role: validation.data.role,
                status: validation.data.status,
                appliedDate: new Date(validation.data.appliedDate),
            },
        });

        return NextResponse.json(
            {
                message: "Application updated successfully",
                application,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error("PUT /api/applications/[id] error:", error);

        return NextResponse.json(
            {
                message: "Internal Server Error",
            },
            {
                status: 500,
            }
        );
    }
}