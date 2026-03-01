"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AlertsPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col min-h-full bg-[#f8fafc] w-full relative px-5 pt-8 pb-10">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-start text-[#0f172a]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                </button>
                <h1 className="text-[20px] font-extrabold text-[#0f172a] tracking-tight">Notifications</h1>
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

            <div className="flex flex-col gap-4">

                {/* Notification 1: Task Reminder */}
                <Link href="/dashboard/alerts/1" className="bg-white rounded-[1.2rem] p-5 shadow-sm border border-gray-100 flex gap-4 items-start hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#20c997" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                            <h3 className="font-bold text-[#0f172a] text-[15px]">Team Meeting in 30 minutes</h3>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </div>
                        <p className="text-[#64748b] text-[13px] leading-snug font-medium mb-3">Your team meeting starts at 2:00 PM. Tap to review agenda.</p>
                        <span className="text-[#94a3b8] text-[11px] font-bold uppercase tracking-wider">1:30 PM</span>
                    </div>
                </Link>

                {/* Notification 2: AI Suggestion */}
                <Link href="/dashboard/alerts/2" className="bg-white rounded-[1.2rem] p-5 shadow-sm border border-gray-100 flex gap-4 items-start hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2L16 6l4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5 1.5-4z"></path><path d="M5 10l.5 2 2 .5-2 .5-.5 2-.5-2-2-.5 2-.5.5-2z"></path></svg>
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                            <h3 className="font-bold text-[#0f172a] text-[15px]">AI Suggestion: Block focus time</h3>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </div>
                        <p className="text-[#64748b] text-[13px] leading-snug font-medium mb-3">You have 3 urgent tasks this week. Want me to block 2 hours for deep...</p>
                        <span className="text-[#94a3b8] text-[11px] font-bold uppercase tracking-wider">9:00 AM</span>
                    </div>
                </Link>

                {/* Notification 3: Task Reminder */}
                <Link href="/dashboard/alerts/3" className="bg-white rounded-[1.2rem] p-5 shadow-sm border border-gray-100 flex gap-4 items-start hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#20c997" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                            <h3 className="font-bold text-[#0f172a] text-[15px]">Gym Workout today at 6 PM</h3>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </div>
                        <p className="text-[#64748b] text-[13px] leading-snug font-medium mb-3">Don&apos;t forget your gym session. Pack your gear!</p>
                        <span className="text-[#94a3b8] text-[11px] font-bold uppercase tracking-wider">12:00 PM</span>
                    </div>
                </Link>

                {/* Notification 4: AI Suggestion */}
                <Link href="/dashboard/alerts/4" className="bg-white rounded-[1.2rem] p-5 shadow-sm border border-gray-100 flex gap-4 items-start hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2L16 6l4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5 1.5-4z"></path><path d="M5 10l.5 2 2 .5-2 .5-.5 2-.5-2-2-.5 2-.5.5-2z"></path></svg>
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                            <h3 className="font-bold text-[#0f172a] text-[15px]">AI Suggestion: Reschedule task</h3>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </div>
                        <p className="text-[#64748b] text-[13px] leading-snug font-medium mb-3">&quot;Buy Groceries&quot; conflicts with &quot;Project Review&quot;. Move to...</p>
                        <span className="text-[#94a3b8] text-[11px] font-bold uppercase tracking-wider">Yesterday</span>
                    </div>
                </Link>

            </div>
        </div>
    );
}
