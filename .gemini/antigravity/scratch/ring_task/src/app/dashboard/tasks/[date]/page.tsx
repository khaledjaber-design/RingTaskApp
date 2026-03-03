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
        <div className="flex flex-col min-h-full bg-[#f8fafc] dark:bg-[#0f172a] w-full relative px-5 pt-8 pb-10 transition-colors duration-300">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <Link href="/dashboard/calendar" className="w-10 h-10 bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-transparent rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-[#64748b] dark:stroke-gray-400 transition-colors">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </Link>
                <h1 className="text-[17px] font-extrabold text-[#0f172a] dark:text-white tracking-tight transition-colors">{formattedDate}</h1>
                <div className="w-10 h-10 bg-white dark:bg-[#1e293b] rounded-full flex items-center justify-center opacity-0 pointer-events-none transition-colors"></div>
            </div>

            {/* Daily Progress Card */}
            <div className="bg-white dark:bg-[#1e293b] rounded-[1.5rem] p-5 shadow-sm border border-gray-100 dark:border-transparent flex flex-col gap-3 mb-6 transition-colors">
                <div className="flex justify-between items-end">
                    <div>
                        <h3 className="font-bold text-[#0f172a] dark:text-white text-[16px] transition-colors">Daily Progress</h3>
                        <p className="text-[#64748b] dark:text-gray-400 text-[13px] font-medium mt-1 transition-colors">Here&apos;s your schedule for {formattedDate}</p>
                    </div>
                    <div className="text-right">
                        <span className="font-extrabold text-[#20c997] text-[22px] transition-colors">80%</span>
                    </div>
                </div>
                <div className="w-full h-3.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mt-1 transition-colors">
                    <div className="h-full bg-[#20c997] rounded-full transition-all duration-1000 ease-out" style={{ width: '80%' }}></div>
                </div>
                <p className="text-[12px] font-bold text-[#0f172a] dark:text-white mt-1 transition-colors">8 <span className="text-[#94a3b8] font-medium transition-colors">/ 10 tasks completed</span></p>
            </div>

            {/* Task List: To Do */}
            <h2 className="font-bold text-[#0f172a] dark:text-white text-[15px] mb-3 px-1 transition-colors">To Do (2)</h2>
            <div className="flex flex-col gap-3 mb-8">

                <div className="bg-white dark:bg-[#1e293b] rounded-[1.2rem] p-4 shadow-sm border border-gray-100 dark:border-transparent flex items-center justify-between transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 flex-shrink-0 cursor-pointer hover:border-[#3b82f6] dark:hover:border-[#3b82f6] transition-colors"></div>
                        <div className="flex flex-col">
                            <span className="font-semibold text-[#0f172a] dark:text-white text-[15px] transition-colors">Review Q4 Presentation</span>
                            <span className="text-[#64748b] dark:text-gray-400 text-[12px] font-medium mt-0.5 transition-colors">2:00 PM</span>
                        </div>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-[#3b82f6]"></div>
                </div>

                <div className="bg-white dark:bg-[#1e293b] rounded-[1.2rem] p-4 shadow-sm border border-gray-100 dark:border-transparent flex items-center justify-between transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 flex-shrink-0 cursor-pointer hover:border-[#8b5cf6] dark:hover:border-[#8b5cf6] transition-colors"></div>
                        <div className="flex flex-col">
                            <span className="font-semibold text-[#0f172a] dark:text-white text-[15px] transition-colors">Call Mom</span>
                            <span className="text-[#64748b] dark:text-gray-400 text-[12px] font-medium mt-0.5 transition-colors">6:30 PM</span>
                        </div>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-[#8b5cf6]"></div>
                </div>

            </div>

            {/* Task List: Completed */}
            <h2 className="font-bold text-[#0f172a] dark:text-white text-[15px] mb-3 px-1 transition-colors">Completed (8)</h2>
            <div className="flex flex-col gap-3">

                <div className="bg-gray-50 dark:bg-[#1e293b]/50 rounded-[1.2rem] p-4 border border-gray-100 dark:border-transparent flex items-center justify-between opacity-75 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-6 h-6 rounded-full border-2 border-[#20c997] bg-[#20c997] flex items-center justify-center flex-shrink-0">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold text-[#94a3b8] dark:text-gray-500 text-[15px] line-through decoration-2 transition-colors">Morning Run</span>
                            <span className="text-[#94a3b8] dark:text-gray-600 text-[12px] font-medium mt-0.5 transition-colors">7:00 AM</span>
                        </div>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-[#20c997] opacity-60"></div>
                </div>

                <div className="bg-gray-50 dark:bg-[#1e293b]/50 rounded-[1.2rem] p-4 border border-gray-100 dark:border-transparent flex items-center justify-between opacity-75 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-6 h-6 rounded-full border-2 border-[#20c997] bg-[#20c997] flex items-center justify-center flex-shrink-0">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold text-[#94a3b8] dark:text-gray-500 text-[15px] line-through decoration-2 transition-colors">Team Standup</span>
                            <span className="text-[#94a3b8] dark:text-gray-600 text-[12px] font-medium mt-0.5 transition-colors">10:00 AM</span>
                        </div>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-[#3b82f6] opacity-60"></div>
                </div>

            </div>

        </div>
    );
}
