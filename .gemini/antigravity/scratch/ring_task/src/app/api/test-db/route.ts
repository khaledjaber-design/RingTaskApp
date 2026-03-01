import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        // Test basic connection to Supabase via Prisma query
        const count = await prisma.user.count();
        return NextResponse.json({ success: true, count });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message, code: e.code, meta: e.meta }, { status: 500 });
    }
}
