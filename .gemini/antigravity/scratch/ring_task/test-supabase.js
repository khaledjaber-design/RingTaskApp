const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL
        }
    }
});

async function main() {
    try {
        const user = await prisma.user.findFirst();
        console.log('Successfully connected and queried user:', user);
    } catch (e) {
        console.error('Database connection or query failed:', e.message);
    }

    try {
        const account = await prisma.account.findFirst();
        console.log('Successfully queried accounts:', account);
    } catch (e) {
        console.error('Account query failed:', e.message);
    }
}

main().finally(() => prisma.$disconnect());
