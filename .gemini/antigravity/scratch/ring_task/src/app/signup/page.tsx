"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to sign up");
            }

            router.push("/api/auth/signin");
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

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
                <div className="flex flex-col items-center mt-28 px-6">
                    <div className="w-[60px] h-[60px] bg-[#20c997] rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M19 8v6" /><path d="M22 11h-6" />
                        </svg>
                    </div>
                    <h1 className="text-[28px] font-extrabold text-[#0f172a] tracking-tight leading-none mb-3 text-center">Create an Account</h1>
                    <p className="text-[#64748b] text-[15px] font-medium text-center">Join Ring Task to manage your work.</p>
                </div>

                {/* Input Form */}
                <form onSubmit={handleSubmit} className="px-7 mt-8 w-full flex flex-col gap-4">
                    {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}

                    <input
                        required
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Full Name"
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-0 focus:border-[#20c997] outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400 text-[15px]"
                    />
                    <input
                        required
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email address"
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-0 focus:border-[#20c997] outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400 text-[15px]"
                    />
                    <input
                        required
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-0 focus:border-[#20c997] outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400 text-[15px]"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center justify-center gap-3 w-full h-[54px] mt-2 bg-[#20c997] text-white rounded-full hover:bg-[#1bb889] transition-colors font-bold shadow-sm text-[15px] disabled:opacity-70"
                    >
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>
                </form>
            </div>
        </main>
    );
}
