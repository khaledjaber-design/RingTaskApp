export { default } from "next-auth/middleware";

export const config = {
    // Only protect routes under /dashboard
    matcher: ["/dashboard/:path*"],
};
