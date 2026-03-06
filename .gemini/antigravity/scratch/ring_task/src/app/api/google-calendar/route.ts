import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function refreshAccessToken(accountId: string, refreshToken: string): Promise<string | null> {
    try {
        const res = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                client_id: process.env.GOOGLE_ID ?? "",
                client_secret: process.env.GOOGLE_SECRET ?? "",
                grant_type: "refresh_token",
                refresh_token: refreshToken,
            }),
        });
        const data = await res.json() as { access_token?: string; expires_in?: number };
        if (!data.access_token) return null;

        // Update stored token
        await prisma.account.update({
            where: { id: accountId },
            data: {
                access_token: data.access_token,
                expires_at: data.expires_in
                    ? Math.floor(Date.now() / 1000) + data.expires_in
                    : undefined,
            },
        });
        return data.access_token;
    } catch {
        return null;
    }
}

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized", connected: false }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ error: "User not found", connected: false }, { status: 404 });

    const account = await prisma.account.findFirst({
        where: { userId: user.id, provider: "google" },
    });

    if (!account?.access_token) {
        return NextResponse.json({ events: [], connected: false });
    }

    // Date from query param, defaults to today
    const { searchParams } = new URL(request.url);
    const dateStr = searchParams.get("date") ?? new Date().toISOString().split("T")[0];
    const [y, m, d] = dateStr.split("-").map(Number);
    const timeMin = new Date(y, m - 1, d, 0, 0, 0).toISOString();
    const timeMax = new Date(y, m - 1, d, 23, 59, 59).toISOString();

    const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}&singleEvents=true&orderBy=startTime&maxResults=20`;

    let accessToken = account.access_token;
    let res = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });

    // If 401, try refreshing
    if (res.status === 401 && account.refresh_token) {
        const newToken = await refreshAccessToken(account.id, account.refresh_token);
        if (newToken) {
            accessToken = newToken;
            res = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
        }
    }

    if (!res.ok) {
        const err = await res.text();
        return NextResponse.json({ events: [], connected: true, error: err });
    }

    const data = await res.json() as { items?: GoogleCalendarEvent[] };
    return NextResponse.json({ events: data.items ?? [], connected: true });
}

interface GoogleCalendarEvent {
    id: string;
    summary?: string;
    description?: string;
    start?: { dateTime?: string; date?: string };
    end?: { dateTime?: string; date?: string };
    colorId?: string;
    htmlLink?: string;
}
