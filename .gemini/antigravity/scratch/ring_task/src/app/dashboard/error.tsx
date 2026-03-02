"use client";

import { useEffect } from "react";

export default function DashboardError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error natively so it's available in browser tools
        console.error("DASHBOARD CRASH CAUGHT:", error);
    }, [error]);

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-red-50 p-6 text-center font-sans">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border-4 border-red-200">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                    <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h2 className="mb-2 text-xl font-bold text-gray-900">Dashboard Rendering Error</h2>
                <p className="mb-6 text-sm text-gray-600">
                    An unexpected exception occurred while loading your profile data.
                </p>

                <div className="mb-6 rounded-lg bg-gray-900 p-4 text-left overflow-auto max-h-[300px]">
                    <p className="font-mono text-sm text-red-400 break-words mb-2 border-b border-gray-700 pb-2">
                        <strong className="text-white">Message:</strong> {error.message}
                    </p>
                    <p className="font-mono text-[11px] text-gray-300 break-words whitespace-pre-wrap">
                        {error.stack || "No stack trace available."}
                    </p>
                    {error.digest && (
                        <p className="font-mono text-[11px] text-gray-400 mt-2">Digest: {error.digest}</p>
                    )}
                </div>

                <div className="flex gap-3 justify-center">
                    <button
                        onClick={() => window.location.href = '/'}
                        className="rounded-full bg-gray-100 px-6 py-2.5 text-sm font-semibold text-gray-800 transition hover:bg-gray-200"
                    >
                        Go Home
                    </button>
                    <button
                        onClick={() => reset()}
                        className="rounded-full bg-red-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    );
}
