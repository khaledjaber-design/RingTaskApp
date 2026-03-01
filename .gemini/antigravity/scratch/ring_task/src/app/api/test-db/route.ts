import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        // Test basic connection to Supabase via Prisma query
        const count = await prisma.user.count();
        return NextResponse.json({ success: true, count });
    } catch (e: unknown) {
        const error = e as Error & { code?: string, meta?: Record<string, unknown> };
        return NextResponse.json({ success: false, error: error.message, code: error.code, meta: error.meta }, { status: 500 });
    }
}
