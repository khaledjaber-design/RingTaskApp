"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";

export default function AppleLogin() {
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
                    <div className="w-[60px] h-[60px] bg-[#0f172a] rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                        <svg height="28px" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.636 12.414c-.015-2.528 2.067-3.744 2.161-3.799-1.18-1.716-3.008-1.948-3.664-1.976-1.558-.155-3.04.912-3.834.912-.8 0-2.016-.888-3.308-.864-1.685.023-3.238.972-4.102 2.454-1.745 2.993-.448 7.425 1.258 9.851.83 1.18 1.815 2.493 3.099 2.443 1.237-.052 1.706-.798 3.193-.798 1.488 0 1.912.798 3.208.769 1.326-.023 2.164-1.18 2.99-2.373 1.042-1.503 1.47-2.96 1.488-3.036-.035-.015-2.835-1.077-2.889-3.583z" />
                            <path d="M14.786 4.197c.683-.82 1.142-1.956 1.018-3.088-1.002.04-2.228.66-2.929 1.474-.622.715-1.171 1.867-1.018 2.977 1.118.085 2.247-.542 2.929-1.363z" />
                        </svg>
                    </div>
                    <h1 className="text-[28px] font-extrabold text-[#0f172a] tracking-tight leading-none mb-3 text-center">Sign In</h1>
                    <p className="text-[#64748b] text-[15px] font-medium text-center">Continue with Apple</p>
                </div>

                {/* Action Button */}
                <div className="px-7 mt-12 w-full flex flex-col gap-4">
                    <button
                        onClick={() => signIn("apple", { callbackUrl: "/dashboard" })}
                        className="flex items-center justify-center gap-3 w-full h-[54px] bg-[#0f172a] text-white rounded-full hover:bg-black transition-colors font-bold shadow-sm text-[15px]"
                    >
                        <svg height="20px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.636 12.414c-.015-2.528 2.067-3.744 2.161-3.799-1.18-1.716-3.008-1.948-3.664-1.976-1.558-.155-3.04.912-3.834.912-.8 0-2.016-.888-3.308-.864-1.685.023-3.238.972-4.102 2.454-1.745 2.993-.448 7.425 1.258 9.851.83 1.18 1.815 2.493 3.099 2.443 1.237-.052 1.706-.798 3.193-.798 1.488 0 1.912.798 3.208.769 1.326-.023 2.164-1.18 2.99-2.373 1.042-1.503 1.47-2.96 1.488-3.036-.035-.015-2.835-1.077-2.889-3.583z" />
                            <path d="M14.786 4.197c.683-.82 1.142-1.956 1.018-3.088-1.002.04-2.228.66-2.929 1.474-.622.715-1.171 1.867-1.018 2.977 1.118.085 2.247-.542 2.929-1.363z" />
                        </svg>
                        Sign In with Apple
                    </button>
                </div>
            </div>
        </main>
    );
}
