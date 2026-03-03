"use client";

import { useRouter } from "next/navigation";

export default function AlertDetail() {
    const router = useRouter();

    return (
        <div className="flex flex-col min-h-full bg-[#f8fafc] dark:bg-[#0f172a] w-full relative px-5 pt-8 pb-10 transition-colors duration-300">

            {/* Header */}
            <div className="flex items-center justify-between mb-10">
                <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-start text-[#0f172a] dark:text-white transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                </button>
                <h1 className="text-[20px] font-extrabold text-[#0f172a] dark:text-white tracking-tight transition-colors">Notification</h1>
                <button
                    onClick={() => window.dispatchEvent(new Event('open-voice-modal'))}
                    className="w-10 h-10 bg-[#8b5cf6] text-white rounded-full flex items-center justify-center shadow-sm hover:bg-purple-600 transition"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                        <line x1="12" y1="19" x2="12" y2="22"></line>
                    </svg>
                </button>
            </div>

            <div className="flex flex-col gap-6">

                {/* Header Icon & Title */}
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center shrink-0 transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#20c997" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                    </div>
                    <div>
                        <span className="text-[#20c997] text-[12px] font-extrabold uppercase tracking-wider block mb-0.5 transition-colors">Task Reminder</span>
                        <span className="text-[#64748b] dark:text-gray-400 text-[13px] font-medium leading-tight transition-colors">1:30 PM</span>
                    </div>
                </div>

                {/* Notification Main Card */}
                <div className="bg-white dark:bg-[#1e293b] rounded-[1.5rem] p-6 shadow-sm border border-gray-100 dark:border-transparent transition-colors">
                    <h2 className="font-extrabold text-[#0f172a] dark:text-white text-[18px] mb-3 transition-colors">Team Meeting in 30 minutes</h2>
                    <p className="text-[#475569] dark:text-gray-300 text-[15px] leading-relaxed font-medium transition-colors">Your team meeting starts at 2:00 PM. Tap to review agenda.</p>
                </div>

                {/* Related Task Link */}
                <div className="bg-white dark:bg-[#1e293b] rounded-[1.5rem] p-5 shadow-sm border border-gray-100 dark:border-transparent flex flex-col gap-3 transition-colors">
                    <span className="text-[#64748b] dark:text-gray-400 text-[11px] font-bold uppercase tracking-wider px-1 transition-colors">Related Task</span>
                    <div className="flex items-center gap-3 px-1">
                        <div className="w-3 h-3 rounded-full bg-[#20c997] shrink-0"></div>
                        <div className="flex flex-col">
                            <span className="font-semibold text-[#0f172a] dark:text-white text-[15px] transition-colors">Team Meeting</span>
                            <span className="text-[#64748b] dark:text-gray-400 text-[13px] font-medium mt-0.5 transition-colors">Scheduled - 1:30 PM</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Action Buttons Grid */}
            <div className="mt-auto pt-8 grid grid-cols-2 gap-3 pb-4">
                <button onClick={() => router.back()} className="h-12 bg-[#20c997] text-white rounded-xl font-bold text-[14px] flex justify-center items-center gap-2 hover:bg-[#1bb889] shadow-sm transition">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    Mark as Done
                </button>
                <button onClick={() => router.back()} className="h-12 bg-[#8b5cf6] text-white rounded-xl font-bold text-[14px] flex justify-center items-center gap-2 hover:bg-[#7c3aed] shadow-sm transition">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    Snooze
                </button>
                <button onClick={() => router.back()} className="h-12 bg-white dark:bg-[#1e293b] text-[#0f172a] dark:text-white rounded-xl font-bold text-[14px] flex justify-center items-center gap-2 border border-gray-200 dark:border-transparent hover:bg-gray-50 dark:hover:bg-[#283548] shadow-sm transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4"></path><path d="M12 16h.01"></path></svg>
                    View Task
                </button>
                <button onClick={() => router.back()} className="h-12 bg-white dark:bg-[#1e293b] text-[#64748b] dark:text-gray-400 rounded-xl font-bold text-[14px] flex justify-center items-center gap-2 border border-gray-200 dark:border-transparent hover:bg-gray-50 dark:hover:bg-[#283548] shadow-sm transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    Dismiss
                </button>
            </div>

        </div>
    );
}
