"use client";

import { signIn } from "next-auth/react";
import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function CredentialsContent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError(res.error);
                setIsLoading(false);
            } else {
                router.push("/dashboard");
            }
        } catch {
            setError("Something went wrong");
            setIsLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-[#f8fafc] p-4 font-sans relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#9ee6bb] rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#a8ccfa] rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

            <div className="w-full max-w-[380px] h-[812px] bg-white rounded-[3.5rem] border-[16px] border-[#1e293b] shadow-2xl flex flex-col relative overflow-hidden z-10 px-8 py-10">
                {/* Back Button & Header Row */}
                <div className="flex items-center justify-between mb-8 w-full mt-4">
                    <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center text-[#64748b] bg-gray-50 rounded-full hover:bg-gray-100 transition shadow-sm border border-gray-100">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                    </button>
                    <div className="w-10 h-10 flex items-center justify-center bg-[#20c997] rounded-xl shadow-sm">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                    </div>
                </div>

                {/* Headers */}
                <div className="mb-8 w-full">
                    <h1 className="text-[28px] font-extrabold text-[#0f172a] tracking-tight leading-tight">Welcome<br />back</h1>
                    <p className="text-[15px] font-medium text-[#64748b] mt-2">Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                    {error && <div className="p-3 mb-2 bg-red-50 border border-red-100 text-red-600 text-[13px] font-semibold rounded-xl text-center">{error}</div>}

                    <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-0 focus:border-[#0f172a] outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400 text-[15px]"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-0 focus:border-[#0f172a] outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400 text-[15px]"
                        required
                    />
                    <button
                        type="submit"
                        className="flex items-center justify-center gap-3 w-full h-[54px] mt-2 bg-[#0f172a] text-white rounded-full hover:bg-black transition-colors font-semibold shadow-sm text-[15px]"
                        disabled={isLoading}
                    >
                        {isLoading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                {/* Footer */}
                <div className="absolute bottom-12 left-0 w-full px-12 flex flex-col gap-4">
                    <p className="text-center text-[14px] font-semibold text-[#64748b]">
                        Don't have an account?{" "}
                        <Link href="/login/signup" className="text-[#0f172a] hover:underline transition-colors">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}

export default function CredentialsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#f8fafc] flex items-center justify-center font-bold text-[#0f172a]">Loading...</div>}>
            <CredentialsContent />
        </Suspense>
    );
}
