"use client";

import { useRouter } from "next/navigation";

export function AuthButtons() {
    const router = useRouter();

    return (
        <div className="flex flex-col gap-[18px] w-full">
            {/* Google (white) */}
            <button
                onClick={() => router.push("/login/google")}
                className="flex items-center justify-center gap-3 w-full h-[54px] bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors font-semibold text-[#334155] shadow-sm text-[15px]"
            >
                <svg height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google
            </button>

            {/* Facebook (blue) */}
            <button
                onClick={() => router.push("/login/facebook")}
                className="flex items-center justify-center gap-3 w-full h-[54px] bg-[#2563eb] text-white rounded-full hover:bg-blue-700 transition-colors font-semibold shadow-sm text-[15px]"
            >
                <svg height="20px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Continue with Facebook
            </button>

            {/* Apple (black) */}
            <button
                onClick={() => router.push("/login/apple")}
                className="flex items-center justify-center gap-3 w-full h-[54px] bg-[#0f172a] text-white rounded-full hover:bg-black transition-colors font-semibold shadow-sm text-[15px]"
            >
                <svg height="20px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.636 12.414c-.015-2.528 2.067-3.744 2.161-3.799-1.18-1.716-3.008-1.948-3.664-1.976-1.558-.155-3.04.912-3.834.912-.8 0-2.016-.888-3.308-.864-1.685.023-3.238.972-4.102 2.454-1.745 2.993-.448 7.425 1.258 9.851.83 1.18 1.815 2.493 3.099 2.443 1.237-.052 1.706-.798 3.193-.798 1.488 0 1.912.798 3.208.769 1.326-.023 2.164-1.18 2.99-2.373 1.042-1.503 1.47-2.96 1.488-3.036-.035-.015-2.835-1.077-2.889-3.583z" />
                    <path d="M14.786 4.197c.683-.82 1.142-1.956 1.018-3.088-1.002.04-2.228.66-2.929 1.474-.622.715-1.171 1.867-1.018 2.977 1.118.085 2.247-.542 2.929-1.363z" />
                </svg>
                Continue with Apple
            </button>

            {/* Email (green) */}
            <button
                onClick={() => router.push("/login/email")}
                className="flex items-center justify-center gap-3 w-full h-[54px] bg-[#20c997] text-white rounded-full hover:bg-[#1bb889] transition-colors font-semibold shadow-sm text-[15px]"
            >
                <svg height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                Continue with Email
            </button>
        </div>
    );
}
