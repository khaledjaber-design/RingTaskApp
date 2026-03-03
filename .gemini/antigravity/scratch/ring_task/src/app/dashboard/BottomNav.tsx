"use client";

import Link from "next/link";
import { useState } from "react";
import QuickAddModal from "./QuickAddModal";

export default function BottomNav() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="absolute bottom-0 left-0 w-full h-[85px] bg-white dark:bg-[#0f172a] border-t border-gray-100 dark:border-gray-800 flex items-center justify-around px-2 rounded-b-[2.5rem] shadow-[0_-4px_20px_rgba(0,0,0,0.03)] z-50 transition-colors duration-300">

                <Link href="/dashboard" className="flex flex-col items-center gap-1 min-w-[60px]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#20c997" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    <span className="text-[10px] font-semibold text-[#20c997]">Home</span>
                </Link>

                <Link href="/dashboard/calendar" className="flex flex-col items-center gap-1 min-w-[60px]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-[#94a3b8] dark:stroke-gray-300 transition-colors">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span className="text-[10px] font-semibold text-[#94a3b8] dark:text-gray-400 transition-colors">Calendar</span>
                </Link>

                {/* Floating FAB for Add Task */}
                <div className="relative -top-6 flex justify-center w-[70px]">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-[60px] h-[60px] bg-[#20c997] rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(32,201,151,0.4)] text-white hover:bg-[#1bb889] transition-transform hover:scale-105 active:scale-95"
                    >
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </button>
                </div>

                <Link href="/dashboard/alerts" className="flex flex-col items-center gap-1 min-w-[60px]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-[#94a3b8] dark:stroke-gray-300 transition-colors">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                    <span className="text-[10px] font-semibold text-[#94a3b8] dark:text-gray-400 transition-colors">Alerts</span>
                </Link>

                <Link href="/dashboard/profile" className="flex flex-col items-center gap-1 min-w-[60px]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-[#94a3b8] dark:stroke-gray-300 transition-colors">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span className="text-[10px] font-semibold text-[#94a3b8] dark:text-gray-400 transition-colors">Profile</span>
                </Link>

            </div>

            <QuickAddModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
