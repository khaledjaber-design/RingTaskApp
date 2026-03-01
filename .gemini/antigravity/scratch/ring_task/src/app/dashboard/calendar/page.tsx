"use client";

import { useRouter } from "next/navigation";

export default function CalendarPage() {
    const router = useRouter();

    const handleDateClick = (day: number) => {
        router.push(`/dashboard/tasks/2026-01-${day.toString().padStart(2, '0')}`);
    }

    return (
        <div className="flex flex-col min-h-full bg-[#f8fafc] w-full relative px-5 pt-8 pb-10">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#20c997] rounded-[0.8rem] flex items-center justify-center shadow-sm">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                        </svg>
                    </div>
                    <h1 className="text-[20px] font-extrabold text-[#0f172a] tracking-tight">RingTask</h1>
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
            <div className="flex items-center justify-between px-2 mb-6 text-[#0f172a]">
                <button className="text-[#64748b] hover:text-[#0f172a]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <h2 className="text-[18px] font-bold">January 2026</h2>
                <button className="text-[#64748b] hover:text-[#0f172a]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>

            {/* Days Of Week */}
            <div className="grid grid-cols-7 mb-4 px-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                    <div key={i} className="text-center text-[12px] font-bold text-[#64748b]">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid (Hardcoded for Visual Parity) */}
            <div className="grid grid-cols-7 gap-y-6 px-2 mb-8">
                <div className="text-center flex flex-col items-center gap-1 text-[#cbd5e1] font-semibold text-[15px]">28</div>
                <div className="text-center flex flex-col items-center gap-1 text-[#cbd5e1] font-semibold text-[15px]">29</div>
                <div className="text-center flex flex-col items-center gap-1 text-[#cbd5e1] font-semibold text-[15px]">30</div>
                <div className="text-center flex flex-col items-center gap-1 text-[#cbd5e1] font-semibold text-[15px]">31</div>
                <div className="text-center flex flex-col items-center gap-1 text-[#0f172a] font-semibold text-[15px] cursor-pointer hover:bg-gray-100 rounded-full w-8 h-8 justify-center mx-auto transition-colors" onClick={() => handleDateClick(1)}>1</div>
                <div className="text-center flex flex-col items-center gap-1 text-[#0f172a] font-semibold text-[15px] cursor-pointer hover:bg-gray-100 rounded-full w-8 h-8 justify-center mx-auto transition-colors" onClick={() => handleDateClick(2)}>2</div>
                <div className="text-center flex flex-col items-center gap-1 text-[#0f172a] font-semibold text-[15px] cursor-pointer hover:bg-gray-100 rounded-full w-8 h-8 justify-center mx-auto transition-colors" onClick={() => handleDateClick(3)}>3</div>

                <div className="text-center flex flex-col items-center gap-1 text-[#0f172a] font-semibold text-[15px] cursor-pointer hover:bg-gray-100 rounded-full w-8 h-8 justify-center mx-auto transition-colors" onClick={() => handleDateClick(4)}>4</div>
                <div className="text-center flex flex-col items-center gap-1 text-[#0f172a] font-semibold text-[15px] cursor-pointer hover:bg-gray-100 rounded-full w-8 h-8 justify-center mx-auto transition-colors" onClick={() => handleDateClick(5)}>5</div>
                <div className="text-center flex flex-col items-center gap-1 text-[#0f172a] font-semibold text-[15px] cursor-pointer hover:bg-gray-100 rounded-full w-8 h-8 justify-center mx-auto transition-colors" onClick={() => handleDateClick(6)}>6</div>
                <div className="text-center flex flex-col items-center gap-1 text-[#0f172a] font-semibold text-[15px] cursor-pointer hover:bg-gray-100 rounded-full w-8 h-8 justify-center mx-auto transition-colors" onClick={() => handleDateClick(7)}>7</div>
                <div className="text-center flex flex-col items-center gap-1 text-[#0f172a] font-semibold text-[15px] cursor-pointer hover:bg-gray-100 rounded-full w-8 h-8 justify-center mx-auto transition-colors" onClick={() => handleDateClick(8)}>8</div>
                <div className="text-center flex flex-col items-center gap-1 text-[#0f172a] font-semibold text-[15px] cursor-pointer hover:bg-gray-100 rounded-full w-8 h-8 justify-center mx-auto transition-colors" onClick={() => handleDateClick(9)}>9</div>
                <div className="text-center flex flex-col items-center gap-1 text-[#0f172a] font-semibold text-[15px] cursor-pointer hover:bg-gray-100 rounded-full w-8 h-8 justify-center mx-auto transition-colors" onClick={() => handleDateClick(10)}>10</div>

                <div className="text-center flex flex-col items-center gap-1 text-[#0f172a] font-semibold text-[15px] cursor-pointer hover:bg-gray-100 rounded-full w-8 h-8 justify-center mx-auto transition-colors" onClick={() => handleDateClick(11)}>11</div>
                <div className="text-center flex flex-col items-center gap-1 text-[#0f172a] font-semibold text-[15px] cursor-pointer hover:bg-gray-100 rounded-full w-8 h-8 justify-center mx-auto transition-colors" onClick={() => handleDateClick(12)}>12</div>
                <div className="text-center flex flex-col items-center gap-1 text-[#0f172a] font-semibold text-[15px] cursor-pointer hover:bg-gray-100 rounded-full w-8 h-8 justify-center mx-auto transition-colors" onClick={() => handleDateClick(13)}>13</div>
                <div className="text-center flex flex-col items-center gap-1 text-[#0f172a] font-semibold text-[15px] cursor-pointer hover:bg-gray-100 rounded-full w-8 h-8 justify-center mx-auto transition-colors" onClick={() => handleDateClick(14)}>14</div>
                <div className="text-center flex flex-col items-center gap-1 text-[#0f172a] font-semibold text-[15px] cursor-pointer hover:bg-gray-100 rounded-full w-8 h-8 justify-center mx-auto transition-colors" onClick={() => handleDateClick(15)}>15</div>
                <div className="text-center flex flex-col items-center gap-1 text-[#0f172a] font-semibold text-[15px] cursor-pointer hover:bg-gray-100 rounded-full w-8 h-8 justify-center mx-auto transition-colors" onClick={() => handleDateClick(16)}>16</div>
                <div className="text-center flex flex-col items-center gap-1 text-[#0f172a] font-semibold text-[15px] cursor-pointer hover:bg-gray-100 rounded-full w-8 h-8 justify-center mx-auto transition-colors" onClick={() => handleDateClick(17)}>17</div>

                <div className="text-center flex flex-col items-center gap-1 cursor-pointer group" onClick={() => handleDateClick(18)}>
                    <span className="text-[#0f172a] font-semibold text-[15px] group-hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors">18</span>
                </div>
                <div className="text-center flex flex-col items-center gap-1 cursor-pointer group" onClick={() => handleDateClick(19)}>
                    <span className="text-[#0f172a] font-semibold text-[15px] group-hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors">19</span>
                </div>
                <div className="text-center flex flex-col items-center gap-1 cursor-pointer group" onClick={() => handleDateClick(20)}>
                    <span className="text-[#0f172a] font-semibold text-[15px] group-hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors">20</span>
                </div>
                <div className="text-center flex flex-col items-center gap-1 cursor-pointer group" onClick={() => handleDateClick(21)}>
                    <span className="text-[#0f172a] font-semibold text-[15px] group-hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors">21</span>
                    <div className="flex gap-0.5"><div className="w-[5px] h-[5px] rounded-full bg-[#3b82f6]"></div></div>
                </div>
                <div className="text-center flex flex-col items-center gap-1 cursor-pointer group" onClick={() => handleDateClick(22)}>
                    <span className="text-[#0f172a] font-semibold text-[15px] group-hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors">22</span>
                </div>
                <div className="text-center flex flex-col items-center gap-1 cursor-pointer group" onClick={() => handleDateClick(23)}>
                    <span className="text-[#0f172a] font-semibold text-[15px] group-hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors">23</span>
                </div>
                <div className="text-center flex flex-col items-center gap-1 cursor-pointer group" onClick={() => handleDateClick(24)}>
                    <span className="text-[#0f172a] font-semibold text-[15px] group-hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors">24</span>
                </div>

                <div className="text-center flex flex-col items-center gap-1 cursor-pointer group" onClick={() => handleDateClick(25)}>
                    <span className="text-[#0f172a] font-semibold text-[15px] group-hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors">25</span>
                    <div className="flex gap-[3px]"><div className="w-[5px] h-[5px] rounded-full bg-[#3b82f6]"></div><div className="w-[5px] h-[5px] rounded-full bg-[#3b82f6]"></div><div className="w-[5px] h-[5px] rounded-full bg-[#3b82f6]"></div></div>
                </div>
                <div className="text-center flex flex-col items-center gap-1 cursor-pointer" onClick={() => handleDateClick(26)}>
                    <span className="bg-[#20c997] text-white font-semibold text-[15px] rounded-full w-8 h-8 flex items-center justify-center shadow-md">26</span>
                    <div className="flex gap-[3px]"><div className="w-[5px] h-[5px] rounded-full bg-[#8b5cf6]"></div><div className="w-[5px] h-[5px] rounded-full bg-[#20c997]"></div></div>
                </div>
                <div className="text-center flex flex-col items-center gap-1 cursor-pointer group" onClick={() => handleDateClick(27)}>
                    <span className="text-[#0f172a] font-semibold text-[15px] group-hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors">27</span>
                    <div className="flex gap-[3px]"><div className="w-[5px] h-[5px] rounded-full bg-[#8b5cf6]"></div><div className="w-[5px] h-[5px] rounded-full bg-[#8b5cf6]"></div></div>
                </div>
                <div className="text-center flex flex-col items-center gap-1 cursor-pointer group" onClick={() => handleDateClick(28)}>
                    <span className="text-[#0f172a] font-semibold text-[15px] group-hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors">28</span>
                    <div className="flex gap-[3px]"><div className="w-[5px] h-[5px] rounded-full bg-[#20c997]"></div></div>
                </div>
                <div className="text-center flex flex-col items-center gap-1 cursor-pointer group" onClick={() => handleDateClick(29)}>
                    <span className="text-[#0f172a] font-semibold text-[15px] group-hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors">29</span>
                    <div className="flex gap-[3px]"><div className="w-[5px] h-[5px] rounded-full bg-[#8b5cf6]"></div></div>
                </div>
                <div className="text-center flex flex-col items-center gap-1 cursor-pointer group" onClick={() => handleDateClick(30)}>
                    <span className="text-[#0f172a] font-semibold text-[15px] group-hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors">30</span>
                </div>
                <div className="text-center flex flex-col items-center gap-1 cursor-pointer group" onClick={() => handleDateClick(31)}>
                    <span className="text-[#0f172a] font-semibold text-[15px] group-hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors">31</span>
                </div>

                <div className="text-center flex flex-col items-center gap-1 text-[#cbd5e1] font-semibold text-[15px]">1</div>
                <div className="text-center flex flex-col items-center gap-1 text-[#cbd5e1] font-semibold text-[15px]">2</div>
                <div className="text-center flex flex-col items-center gap-1 text-[#cbd5e1] font-semibold text-[15px]">3</div>
                <div className="text-center flex flex-col items-center gap-1 text-[#cbd5e1] font-semibold text-[15px]">4</div>
                <div className="text-center flex flex-col items-center gap-1 text-[#cbd5e1] font-semibold text-[15px]">5</div>
                <div className="text-center flex flex-col items-center gap-1 text-[#cbd5e1] font-semibold text-[15px]">6</div>
                <div className="text-center flex flex-col items-center gap-1 text-[#cbd5e1] font-semibold text-[15px]">7</div>

            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 px-2 mb-6">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#3b82f6]"></div><span className="text-[12px] font-semibold text-[#64748b]">Work</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#8b5cf6]"></div><span className="text-[12px] font-semibold text-[#64748b]">Personal</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#20c997]"></div><span className="text-[12px] font-semibold text-[#64748b]">Health</span></div>
            </div>

            {/* Month Overview */}
            <div className="bg-white rounded-[1.2rem] p-5 shadow-sm border border-gray-100 flex flex-col gap-2">
                <h3 className="font-bold text-[#0f172a] text-[15px] mb-2">Month Overview</h3>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col items-center justify-center flex-1 border-r border-gray-100">
                        <span className="font-extrabold text-[22px] text-[#20c997]">12</span>
                        <span className="font-medium text-[#64748b] text-[11px]">Total Tasks</span>
                    </div>
                    <div className="flex flex-col items-center justify-center flex-1 border-r border-gray-100">
                        <span className="font-extrabold text-[22px] text-[#0f172a]">7</span>
                        <span className="font-medium text-[#64748b] text-[11px]">Completed</span>
                    </div>
                    <div className="flex flex-col items-center justify-center flex-1">
                        <span className="font-extrabold text-[22px] text-[#8b5cf6]">6</span>
                        <span className="font-medium text-[#64748b] text-[11px]">Active Days</span>
                    </div>
                </div>
            </div>

            <p className="text-center text-[12px] font-medium text-[#94a3b8] mt-4 mb-2">Tap any date to view and manage tasks for that day</p>

        </div>
    );
}
