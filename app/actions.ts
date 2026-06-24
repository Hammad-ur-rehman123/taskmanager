"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTask(formData: FormData) {
    const title = formData.get("title") as string;
    if (!title || title.trim() === "") return;

    await prisma.task.create({
        data: { title },
    });

    revalidatePath("/");
}

export async function toggleTask(id: string, currentStatus: boolean) {
    await prisma.task.update({
        where: { id },
        data: { done: !currentStatus },
    });

    revalidatePath("/");
}

export async function deleteTask(id: string) {
    await prisma.task.delete({
        where: { id },
    });

    revalidatePath("/");
}
    