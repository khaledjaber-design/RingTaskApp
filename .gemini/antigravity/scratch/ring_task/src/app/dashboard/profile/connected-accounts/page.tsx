"use client";

import { useRouter } from "next/navigation";

export default function ConnectedAccounts() {
    const router = useRouter();

    return (
        <div className="flex flex-col min-h-full bg-[#f8fafc] dark:bg-[#0f172a] w-full relative px-5 pt-8 pb-10 transition-colors duration-300">

            {/* Header */}
            <div className="flex items-center justify-between mb-8 z-10 w-full bg-[#f8fafc] dark:bg-[#0f172a] transition-colors duration-300">
                <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-start text-[#0f172a] dark:text-white transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                </button>
                <h1 className="text-[20px] font-extrabold text-[#0f172a] dark:text-white tracking-tight transition-colors">Connected Accounts</h1>
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

                {/* Connection Status Banner */}
                <div className="bg-teal-50 dark:bg-[#14342b] rounded-[1.2rem] p-5 mb-2 transition-colors">
                    <h2 className="font-extrabold text-teal-900 dark:text-white text-[16px] mb-1 transition-colors">0 of 4 connected</h2>
                    <p className="text-teal-700 dark:text-[#a0b8b1] text-[13px] font-medium transition-colors">Sync calendars and meetings</p>
                </div>

                {/* Integration Cards */}
                <div className="bg-white dark:bg-[#1e293b] rounded-[1.2rem] p-5 shadow-sm border border-gray-100 dark:border-transparent flex items-center justify-between transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#ea4335] rounded-[0.8rem] flex items-center justify-center text-white font-extrabold text-[15px]">
                            26
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-[#0f172a] dark:text-white text-[15px] transition-colors">Apple Calendar</span>
                            <span className="text-[#64748b] dark:text-gray-400 text-[12px] font-medium mt-0.5 transition-colors">Not connected</span>
                        </div>
                    </div>
                    <button className="px-5 py-2 bg-[#20c997] text-white font-bold text-[13px] rounded-full hover:bg-[#1bb889] transition-colors shadow">
                        Connect
                    </button>
                </div>

                <div className="bg-white dark:bg-[#1e293b] rounded-[1.2rem] p-5 shadow-sm border border-gray-100 dark:border-transparent flex items-center justify-between transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-[0.8rem] p-2 flex items-center justify-center border border-gray-200">
                            {/* Placeholder Google icon */}
                            <div className="grid grid-cols-2 grid-rows-2 gap-0.5 w-full h-full">
                                <div className="bg-[#ea4335] rounded-tl-sm"></div><div className="bg-[#34a853] rounded-tr-sm"></div>
                                <div className="bg-[#fbbc05] rounded-bl-sm"></div><div className="bg-[#4285f4] rounded-br-sm"></div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-[#0f172a] dark:text-white text-[15px] transition-colors">Google Calendar</span>
                            <span className="text-[#64748b] dark:text-gray-400 text-[12px] font-medium mt-0.5 transition-colors">Not connected</span>
                        </div>
                    </div>
                    <button className="px-5 py-2 bg-[#20c997] text-white font-bold text-[13px] rounded-full hover:bg-[#1bb889] transition-colors shadow">
                        Connect
                    </button>
                </div>

                <div className="bg-white dark:bg-[#1e293b] rounded-[1.2rem] p-5 shadow-sm border border-gray-100 dark:border-transparent flex items-center justify-between transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-[0.8rem] p-2 flex items-center justify-center border border-gray-200 bg-white">
                            {/* Placeholder Microsoft icon */}
                            <div className="grid grid-cols-2 grid-rows-2 gap-0.5 w-full h-full">
                                <div className="bg-[#f25022] rounded-tl-sm"></div><div className="bg-[#7fba00] rounded-tr-sm"></div>
                                <div className="bg-[#00a4ef] rounded-bl-sm"></div><div className="bg-[#ffb900] rounded-br-sm"></div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-[#0f172a] dark:text-white text-[15px] transition-colors">Outlook & Teams</span>
                            <span className="text-[#64748b] dark:text-gray-400 text-[12px] font-medium mt-0.5 transition-colors">Not connected</span>
                        </div>
                    </div>
                    <button className="px-5 py-2 bg-[#20c997] text-white font-bold text-[13px] rounded-full hover:bg-[#1bb889] transition-colors shadow">
                        Connect
                    </button>
                </div>

                <div className="bg-white dark:bg-[#1e293b] rounded-[1.2rem] p-5 shadow-sm border border-gray-100 dark:border-transparent flex items-center justify-between transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#7c3aed] rounded-[0.8rem] flex items-center justify-center text-white">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><path d="M2 4l10 8 10-8"></path></svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-[#0f172a] dark:text-white text-[15px] transition-colors">Email</span>
                            <span className="text-[#64748b] dark:text-gray-400 text-[12px] font-medium mt-0.5 transition-colors">Not connected</span>
                        </div>
                    </div>
                    <button className="px-5 py-2 bg-[#20c997] text-white font-bold text-[13px] rounded-full hover:bg-[#1bb889] transition-colors shadow">
                        Connect
                    </button>
                </div>

            </div>

            <p className="text-center text-[#64748b] text-[12px] font-medium mt-8 leading-relaxed max-w-[280px] mx-auto">
                Connected calendars sync meetings automatically. You can manage sync settings from the Sync Status screen.
            </p>

        </div>
    );
}
