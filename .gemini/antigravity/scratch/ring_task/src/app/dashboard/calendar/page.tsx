"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CalendarPage() {
    const router = useRouter();
    const [currentDate, setCurrentDate] = useState(new Date());

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    const handleDateClick = (day: number) => {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        router.push(`/dashboard/tasks/${dateStr}`);
    }

    return (
        <div className="flex flex-col min-h-full bg-[#f8fafc] dark:bg-[#0f172a] w-full relative px-5 pt-8 pb-10 transition-colors duration-300">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#20c997] rounded-[0.8rem] flex items-center justify-center shadow-sm">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                        </svg>
                    </div>
                    <h1 className="text-[20px] font-extrabold text-[#0f172a] dark:text-white tracking-tight transition-colors">RingTask</h1>
                </div>
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

            {/* Month Navigation */}
            <div className="flex items-center justify-between px-2 mb-6 text-[#0f172a] dark:text-white transition-colors">
                <button onClick={handlePrevMonth} className="text-[#64748b] dark:text-gray-400 hover:text-[#0f172a] dark:hover:text-white transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <h2 className="text-[18px] font-bold">{monthNames[month]} {year}</h2>
                <button onClick={handleNextMonth} className="text-[#64748b] dark:text-gray-400 hover:text-[#0f172a] dark:hover:text-white transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>

            {/* Days Of Week */}
            <div className="grid grid-cols-7 mb-4 px-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                    <div key={i} className="text-center text-[12px] font-bold text-[#64748b] dark:text-gray-400 transition-colors">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-y-6 px-2 mb-8">
                {/* Previous Month Days */}
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                    <div key={`prev-${i}`} className="text-center flex flex-col items-center gap-1 text-[#cbd5e1] dark:text-gray-600 font-semibold text-[15px] transition-colors">
                        {daysInPrevMonth - firstDayOfMonth + i + 1}
                    </div>
                ))}

                {/* Current Month Days */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const today = new Date();
                    const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

                    return (
                        <div key={`curr-${i}`} className="text-center flex flex-col items-center gap-1 cursor-pointer group" onClick={() => handleDateClick(day)}>
                            <span className={`font-semibold text-[15px] flex items-center justify-center rounded-full w-8 h-8 transition-colors ${isToday ? 'bg-[#20c997] text-white shadow-md' : 'text-[#0f172a] dark:text-gray-200 group-hover:bg-gray-100 dark:group-hover:bg-gray-800'}`}>
                                {day}
                            </span>
                            {/* Visual decorative dots for tasks */}
                            {day % 4 === 0 && !isToday && (
                                <div className="flex gap-[3px]"><div className="w-[5px] h-[5px] rounded-full bg-[#3b82f6]"></div></div>
                            )}
                            {day % 7 === 0 && !isToday && (
                                <div className="flex gap-[3px]"><div className="w-[5px] h-[5px] rounded-full bg-[#8b5cf6]"></div><div className="w-[5px] h-[5px] rounded-full bg-[#20c997]"></div></div>
                            )}
                        </div>
                    );
                })}

                {/* Next Month Days */}
                {Array.from({ length: (7 - ((firstDayOfMonth + daysInMonth) % 7)) % 7 }).map((_, i) => (
                    <div key={`next-${i}`} className="text-center flex flex-col items-center gap-1 text-[#cbd5e1] dark:text-gray-600 font-semibold text-[15px] transition-colors">
                        {i + 1}
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 px-2 mb-6 transition-colors">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#3b82f6]"></div><span className="text-[12px] font-semibold text-[#64748b] dark:text-gray-400 transition-colors">Work</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#8b5cf6]"></div><span className="text-[12px] font-semibold text-[#64748b] dark:text-gray-400 transition-colors">Personal</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#20c997]"></div><span className="text-[12px] font-semibold text-[#64748b] dark:text-gray-400 transition-colors">Health</span></div>
            </div>

            {/* Month Overview */}
            <div className="bg-white dark:bg-[#1e293b] rounded-[1.2rem] p-5 shadow-sm border border-gray-100 dark:border-transparent flex flex-col gap-2 transition-colors">
                <h3 className="font-bold text-[#0f172a] dark:text-white text-[15px] mb-2 transition-colors">Month Overview</h3>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col items-center justify-center flex-1 border-r border-gray-100 dark:border-gray-700/50 transition-colors">
                        <span className="font-extrabold text-[22px] text-[#20c997]">12</span>
                        <span className="font-medium text-[#64748b] dark:text-gray-400 text-[11px] transition-colors">Total Tasks</span>
                    </div>
                    <div className="flex flex-col items-center justify-center flex-1 border-r border-gray-100 dark:border-gray-700/50 transition-colors">
                        <span className="font-extrabold text-[22px] text-[#0f172a] dark:text-white transition-colors">7</span>
                        <span className="font-medium text-[#64748b] dark:text-gray-400 text-[11px] transition-colors">Completed</span>
                    </div>
                    <div className="flex flex-col items-center justify-center flex-1">
                        <span className="font-extrabold text-[22px] text-[#8b5cf6]">6</span>
                        <span className="font-medium text-[#64748b] dark:text-gray-400 text-[11px] transition-colors">Active Days</span>
                    </div>
                </div>
            </div>

            <p className="text-center text-[12px] font-medium text-[#94a3b8] dark:text-gray-500 mt-4 mb-2 transition-colors">Tap any date to view and manage tasks for that day</p>

        </div>
    );
}
