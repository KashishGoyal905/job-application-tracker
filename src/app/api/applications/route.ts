// import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// const prisma = new PrismaClient();

// POST
export async function POST(request: Request) {
    // we can access the body using .json()
    const body = await request.json();

    const message = {
        "message": "Hello from backend",
        "data": body
    }

    return NextResponse.json(message); // we have to use NextResponse because it builds a proper HTTP response containing data, status, content-type and all
}