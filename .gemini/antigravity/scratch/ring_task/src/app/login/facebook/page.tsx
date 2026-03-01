"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";

export default function FacebookLogin() {
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
                    <div className="w-[60px] h-[60px] bg-[#2563eb] rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                        <svg height="28px" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                    </div>
                    <h1 className="text-[28px] font-extrabold text-[#0f172a] tracking-tight leading-none mb-3 text-center">Sign In</h1>
                    <p className="text-[#64748b] text-[15px] font-medium text-center">Continue with Facebook</p>
                </div>

                {/* Action Button */}
                <div className="px-7 mt-12 w-full flex flex-col gap-4">
                    <button
                        onClick={() => signIn("facebook", { callbackUrl: "/dashboard" })}
                        className="flex items-center justify-center gap-3 w-full h-[54px] bg-[#2563eb] text-white rounded-full hover:bg-blue-700 transition-colors font-bold shadow-sm text-[15px]"
                    >
                        <svg height="20px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        Sign In with Facebook
                    </button>
                </div>
            </div>
        </main>
    );
}
