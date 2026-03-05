import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import AppleProvider from "next-auth/providers/apple"
import FacebookProvider from "next-auth/providers/facebook"
import EmailProvider from "next-auth/providers/email"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    adapter: PrismaAdapter(prisma) as any,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ?? "",
            clientSecret: process.env.GOOGLE_SECRET ?? "",
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        AppleProvider({
            clientId: process.env.APPLE_ID ?? "",
            clientSecret: process.env.APPLE_SECRET ?? "",
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID ?? "",
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? "",
        }),
        EmailProvider({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                })
                // Cast to a specific type instead of 'any' to bypass Prisma not exposing 'password' and strict lint rules
                const pwUser = user as (typeof user & { password?: string | null });
                if (!pwUser || (!pwUser.password && credentials.password)) {
                    return null
                }
                // Ensure password exists before comparing to satisfy TS
                if (!pwUser.password) return null;
                const passwordMatch = await bcrypt.compare(credentials.password, pwUser.password)
                if (!passwordMatch) {
                    return null
                }
                return user
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/',
    },
    debug: true,
}
