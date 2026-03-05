import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

export default async function LoginLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);

    // If the user already has an active session, drop them straight into the dashboard
    if (session) {
        redirect("/dashboard");
    }

    // Otherwise, render the requested login/signup screen
    return <>{children}</>;
}
