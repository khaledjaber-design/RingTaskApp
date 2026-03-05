import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const userCount = await prisma.user.count();
        const taskCount = await prisma.task.count();
        const tasks = await prisma.task.findMany({
            take: 10,
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                title: true,
                userId: true,
                date: true,
                isCompleted: true,
                createdAt: true,
                user: {
                    select: { email: true }
                }
            }
        });

        return NextResponse.json({ userCount, taskCount, tasks });
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : String(e);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
