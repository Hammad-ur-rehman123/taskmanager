"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export async function createTask(formData: FormData) {
    const title = formData.get("title") as string;
    const dueDate= formData.get("dueDate") as string;
    if (!title || title.trim() === "") return;

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return;

    const user = await (prisma as any).user.findUnique({
        where: { email: session.user.email },
    });

    if (!user) return;

    await (prisma as any).task.create({
        data: { 
            title,
            userId: user.id,
            dueDate: dueDate && dueDate.trim() !== "" ? new Date(dueDate) : null,
        },
    });

    revalidatePath("/");
}

export async function toggleTask(id: string, currentStatus: boolean) {
    await (prisma as any).task.update({
        where: { id },
        data: { done: !currentStatus },
    });

    revalidatePath("/");
}

export async function deleteTask(id: string) {
    await (prisma as any).task.delete({
        where: { id },
    });

    revalidatePath("/");
}