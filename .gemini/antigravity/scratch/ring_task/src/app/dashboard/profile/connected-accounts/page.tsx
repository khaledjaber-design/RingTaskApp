import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import ConnectedAccountsClient from "./ConnectedAccountsClient";

export const dynamic = "force-dynamic";

export default async function ConnectedAccounts() {
    const session = await getServerSession(authOptions);
    let googleConnected = false;

    if (session?.user?.email) {
        const user = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (user) {
            const googleAccount = await prisma.account.findFirst({
                where: { userId: user.id, provider: "google" }
            });
            googleConnected = !!(googleAccount?.access_token);
        }
    }

    return <ConnectedAccountsClient googleConnected={googleConnected} />;
}
