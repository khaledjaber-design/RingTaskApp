"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CredentialsLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (res?.error) {
            setError("Invalid email or password");
        } else {
            router.push("/dashboard");
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-slate-200 p-4 font-sans">
            <div className="w-full max-w-[380px] h-[812px] bg-[#f8fafc] rounded-[3.5rem] border-[16px] border-[#1e293b] shadow-2xl flex flex-col relative overflow-hidden ring-4 ring-gray-300 ring-opacity-50">

                {/* Back Button */}
                <Link href="/login/email" className="absolute top-6 left-6 w-11 h-11 bg-white text-gray-700 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 border border-gray-200 transition">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                </Link>

                {/* Branding */}
                <div className="flex flex-col items-center mt-32 px-6">
                    <div className="w-[60px] h-[60px] bg-[#0f172a] rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                    </div>
                    <h1 className="text-[28px] font-extrabold text-[#0f172a] tracking-tight leading-none mb-3 text-center">Sign In</h1>
                    <p className="text-[#64748b] text-[15px] font-medium text-center">Enter your credentials</p>
                </div>

                {/* Input */}
                <form onSubmit={handleSubmit} className="px-7 mt-8 w-full flex flex-col gap-4">
                    {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}
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
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </main>
    );
}
