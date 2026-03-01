"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function EmailLogin() {
    const [email, setEmail] = useState("");

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-slate-200 p-4 font-sans">
            <div className="w-full max-w-[380px] h-[812px] bg-[#f8fafc] rounded-[3.5rem] border-[16px] border-[#1e293b] shadow-2xl flex flex-col relative overflow-hidden ring-4 ring-gray-300 ring-opacity-50">

                {/* Back Button */}
                <Link href="/" className="absolute top-6 left-6 w-11 h-11 bg-white text-gray-700 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 border border-gray-200 transition">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                </Link>

                {/* Branding */}
                <div className="flex flex-col items-center mt-32 px-6">
                    <div className="w-[60px] h-[60px] bg-[#20c997] rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                    </div>
                    <h1 className="text-[28px] font-extrabold text-[#0f172a] tracking-tight leading-none mb-3 text-center">Sign in with Email</h1>
                    <p className="text-[#64748b] text-[15px] font-medium text-center">We&apos;ll send you a magic link</p>
                </div>

                {/* Input */}
                <div className="px-7 mt-12 w-full flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-0 focus:border-[#20c997] outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400 text-[15px]"
                    />
                    <button
                        onClick={() => signIn("email", { email, callbackUrl: "/dashboard" })}
                        className="flex items-center justify-center gap-3 w-full h-[54px] bg-[#20c997] text-white rounded-full hover:bg-[#1bb889] transition-colors font-semibold shadow-sm text-[15px]"
                    >
                        Send Magic Link
                    </button>
                </div>

                {/* Footer */}
                <div className="absolute bottom-12 left-0 w-full px-12 flex flex-col gap-4">
                    <p className="text-center text-[14px] font-semibold text-[#64748b]">
                        <Link href="/login/credentials" className="text-[#64748b] hover:text-[#0f172a] hover:underline transition-colors">
                            Use Password instead
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
