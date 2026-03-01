"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function DailyTasks() {
    const params = useParams();
    const dateStr = params.date as string || "2026-01-26";

    const [year, month, day] = dateStr.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    const formattedDate = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(dateObj);

    return (
        <div className="flex flex-col min-h-full bg-[#f8fafc] w-full relative px-5 pt-8 pb-10">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <Link href="/dashboard/calendar" className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </Link>
                <h1 className="text-[17px] font-extrabold text-[#0f172a] tracking-tight">{formattedDate}</h1>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 pointer-events-none"></div>
            </div>

            {/* Daily Progress Card */}
            <div className="bg-white rounded-[1.5rem] p-5 shadow-sm border border-gray-100 flex flex-col gap-3 mb-6">
                <div className="flex justify-between items-end">
                    <div>
                        <h3 className="font-bold text-[#0f172a] text-[16px]">Daily Progress</h3>
                        <p className="text-[#64748b] text-[13px] font-medium mt-1">Here&apos;s your schedule for {formattedDate}</p>
                    </div>
                    <div className="text-right">
                        <span className="font-extrabold text-[#20c997] text-[22px]">80%</span>
                    </div>
                </div>
                <div className="w-full h-3.5 bg-gray-100 rounded-full overflow-hidden mt-1">
                    <div className="h-full bg-[#20c997] rounded-full" style={{ width: '80%' }}></div>
                </div>
                <p className="text-[12px] font-bold text-[#0f172a] mt-1">8 <span className="text-[#94a3b8] font-medium">/ 10 tasks completed</span></p>
            </div>

            {/* Task List: To Do */}
            <h2 className="font-bold text-[#0f172a] text-[15px] mb-3 px-1">To Do (2)</h2>
            <div className="flex flex-col gap-3 mb-8">

                <div className="bg-white rounded-[1.2rem] p-4 shadow-sm border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex-shrink-0 cursor-pointer hover:border-[#3b82f6] transition-colors"></div>
                        <div className="flex flex-col">
                            <span className="font-semibold text-[#0f172a] text-[15px]">Review Q4 Presentation</span>
                            <span className="text-[#64748b] text-[12px] font-medium mt-0.5">2:00 PM</span>
                        </div>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-[#3b82f6]"></div>
                </div>

                <div className="bg-white rounded-[1.2rem] p-4 shadow-sm border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex-shrink-0 cursor-pointer hover:border-[#8b5cf6] transition-colors"></div>
                        <div className="flex flex-col">
                            <span className="font-semibold text-[#0f172a] text-[15px]">Call Mom</span>
                            <span className="text-[#64748b] text-[12px] font-medium mt-0.5">6:30 PM</span>
                        </div>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-[#8b5cf6]"></div>
                </div>

            </div>

            {/* Task List: Completed */}
            <h2 className="font-bold text-[#0f172a] text-[15px] mb-3 px-1">Completed (8)</h2>
            <div className="flex flex-col gap-3">

                <div className="bg-gray-50 rounded-[1.2rem] p-4 border border-gray-100 flex items-center justify-between opacity-75">
                    <div className="flex items-center gap-4">
                        <div className="w-6 h-6 rounded-full border-2 border-[#20c997] bg-[#20c997] flex items-center justify-center flex-shrink-0">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold text-[#94a3b8] text-[15px] line-through decoration-2">Morning Run</span>
                            <span className="text-[#94a3b8] text-[12px] font-medium mt-0.5">7:00 AM</span>
                        </div>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-[#20c997]"></div>
                </div>

                <div className="bg-gray-50 rounded-[1.2rem] p-4 border border-gray-100 flex items-center justify-between opacity-75">
                    <div className="flex items-center gap-4">
                        <div className="w-6 h-6 rounded-full border-2 border-[#20c997] bg-[#20c997] flex items-center justify-center flex-shrink-0">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold text-[#94a3b8] text-[15px] line-through decoration-2">Team Standup</span>
                            <span className="text-[#94a3b8] text-[12px] font-medium mt-0.5">10:00 AM</span>
                        </div>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-[#3b82f6]"></div>
                </div>

            </div>

        </div>
    );
}
