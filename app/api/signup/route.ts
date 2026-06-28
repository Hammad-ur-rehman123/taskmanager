import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
        return NextResponse.json(
            { message: "All fields are required" },
            { status: 400 }
        );
    }
    const existingUser = await (prisma as any).user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return NextResponse.json(
            { message: "Email already exists" },
            { status: 400 }
        );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await (prisma as any).user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    });

    return NextResponse.json(
        { message: "User created successfully" },
        { status: 201 }
    );
}