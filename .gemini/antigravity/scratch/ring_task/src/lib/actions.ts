"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { revalidatePath } from "next/cache";

export async function getDashboardData() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        throw new Error("Unauthorized");
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email }
    });

    if (!user) throw new Error("User not found");

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const tasksToday = await prisma.task.findMany({
        where: {
            userId: user.id,
            date: {
                gte: today,
                lt: tomorrow
            }
        },
        orderBy: {
            time: 'asc'
        }
    });

    const completedToday = tasksToday.filter(t => t.isCompleted).length;
    const totalToday = tasksToday.length;

    // Dummy values for focus score and streak since we don't have historical data logic yet
    return {
        tasksToday,
        completedToday,
        totalToday,
        streak: 6,
        focusScore: 82,
        tasksDoneThisWeek: 12, // Mocked for weekly goal
        weeklyGoal: 20
    };
}

export async function createTask(data: { title: string, category: string, priority: string, date: Date, time?: string, reminder: boolean, repeat: string }) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) throw new Error("Unauthorized");

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("User not found");

    await prisma.task.create({
        data: {
            ...data,
            userId: user.id,
        }
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/calendar");
}

export async function toggleTaskCompletion(taskId: string, isCompleted: boolean) {
    await prisma.task.update({
        where: { id: taskId },
        data: { isCompleted }
    });
    revalidatePath("/dashboard");
    revalidatePath(`/dashboard/tasks`);
}

export async function applyAISuggestion() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) throw new Error("Unauthorized");

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("User not found");

    const today = new Date();

    await prisma.task.create({
        data: {
            title: "Focus Block: Deep Work",
            category: "Work",
            priority: "Urgent",
            date: today,
            time: "10:00 AM",
            reminder: true,
            repeat: "None",
            userId: user.id
        }
    });

    revalidatePath("/dashboard");
}

export async function getTasksForDate(dateStr: string) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) throw new Error("Unauthorized");

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("User not found");

    const [year, month, day] = dateStr.split('-').map(Number);
    const startOfDay = new Date(year, month - 1, day, 0, 0, 0, 0);
    const endOfDay = new Date(year, month - 1, day, 23, 59, 59, 999);

    const tasks = await prisma.task.findMany({
        where: {
            userId: user.id,
            date: { gte: startOfDay, lte: endOfDay }
        },
        orderBy: { createdAt: 'asc' }
    });

    return tasks;
}

export async function deleteTask(taskId: string) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) throw new Error("Unauthorized");
    await prisma.task.delete({ where: { id: taskId } });
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/tasks");
}
