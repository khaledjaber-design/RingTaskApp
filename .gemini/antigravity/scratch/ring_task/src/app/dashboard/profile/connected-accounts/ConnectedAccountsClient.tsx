"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

interface Props { googleConnected: boolean; }

export default function ConnectedAccountsClient({ googleConnected }: Props) {
    const router = useRouter();

    const connectGoogleCalendar = () => {
        signIn("google", { callbackUrl: "/dashboard/profile/connected-accounts" });
    };

    return (
        <div className="flex flex-col min-h-full bg-[#f8fafc] dark:bg-[#0f172a] w-full relative px-5 pt-8 pb-10 transition-colors duration-300">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-start text-[#0f172a] dark:text-white transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
                    </svg>
                </button>
                <h1 className="text-[20px] font-extrabold text-[#0f172a] dark:text-white tracking-tight transition-colors">Connected Accounts</h1>
                <div className="w-10 h-10" />
            </div>

            <div className="flex flex-col gap-4">

                {/* Banner */}
                <div className="bg-teal-50 dark:bg-[#14342b] rounded-[1.2rem] p-5 mb-2">
                    <h2 className="font-extrabold text-teal-900 dark:text-white text-[16px] mb-1">
                        {googleConnected ? "1 of 4 connected" : "Connect your calendars"}
                    </h2>
                    <p className="text-teal-700 dark:text-[#a0b8b1] text-[13px] font-medium">
                        {googleConnected ? "Google Calendar is synced to your daily view" : "Sync calendars and meetings into your daily view"}
                    </p>
                </div>

                {/* Google Calendar */}
                <div className={`bg-white dark:bg-[#1e293b] rounded-[1.2rem] p-5 shadow-sm border flex items-center justify-between transition-colors ${googleConnected ? 'border-green-200 dark:border-green-500/30' : 'border-gray-100 dark:border-transparent'}`}>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-[0.8rem] p-2 flex items-center justify-center border border-gray-200 dark:border-gray-700">
                            <div className="grid grid-cols-2 grid-rows-2 gap-0.5 w-full h-full">
                                <div className="bg-[#ea4335] rounded-tl-sm" /><div className="bg-[#34a853] rounded-tr-sm" />
                                <div className="bg-[#fbbc05] rounded-bl-sm" /><div className="bg-[#4285f4] rounded-br-sm" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-[#0f172a] dark:text-white text-[15px]">Google Calendar</span>
                            {googleConnected ? (
                                <span className="text-[#20c997] text-[12px] font-bold mt-0.5 flex items-center gap-1">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                    Connected
                                </span>
                            ) : (
                                <span className="text-[#64748b] dark:text-gray-400 text-[12px] font-medium mt-0.5">Not connected</span>
                            )}
                        </div>
                    </div>
                    {googleConnected ? (
                        <button onClick={connectGoogleCalendar} className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-[#64748b] dark:text-gray-300 font-bold text-[12px] rounded-full hover:bg-gray-200 transition-colors">
                            Refresh
                        </button>
                    ) : (
                        <button onClick={connectGoogleCalendar} className="px-5 py-2 bg-[#4285f4] text-white font-bold text-[13px] rounded-full hover:bg-[#2b6fd4] transition-colors shadow">
                            Connect
                        </button>
                    )}
                </div>

                {/* Apple Calendar */}
                <div className="bg-white dark:bg-[#1e293b] rounded-[1.2rem] p-5 shadow-sm border border-gray-100 dark:border-transparent flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#ea4335] rounded-[0.8rem] flex items-center justify-center text-white font-extrabold text-[15px]">26</div>
                        <div className="flex flex-col">
                            <span className="font-bold text-[#0f172a] dark:text-white text-[15px]">Apple Calendar</span>
                            <span className="text-[#64748b] dark:text-gray-400 text-[12px] font-medium mt-0.5">Coming soon</span>
                        </div>
                    </div>
                    <button disabled className="px-5 py-2 bg-gray-100 dark:bg-gray-800 text-gray-400 font-bold text-[13px] rounded-full cursor-not-allowed">Soon</button>
                </div>

                {/* Outlook & Teams */}
                <div className="bg-white dark:bg-[#1e293b] rounded-[1.2rem] p-5 shadow-sm border border-gray-100 dark:border-transparent flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-[0.8rem] p-2 flex items-center justify-center border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0f172a]">
                            <div className="grid grid-cols-2 grid-rows-2 gap-0.5 w-full h-full">
                                <div className="bg-[#f25022] rounded-tl-sm" /><div className="bg-[#7fba00] rounded-tr-sm" />
                                <div className="bg-[#00a4ef] rounded-bl-sm" /><div className="bg-[#ffb900] rounded-br-sm" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-[#0f172a] dark:text-white text-[15px]">Outlook & Teams</span>
                            <span className="text-[#64748b] dark:text-gray-400 text-[12px] font-medium mt-0.5">Coming soon</span>
                        </div>
                    </div>
                    <button disabled className="px-5 py-2 bg-gray-100 dark:bg-gray-800 text-gray-400 font-bold text-[13px] rounded-full cursor-not-allowed">Soon</button>
                </div>

                {/* Email Reminders */}
                <div className="bg-white dark:bg-[#1e293b] rounded-[1.2rem] p-5 shadow-sm border border-gray-100 dark:border-transparent flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#7c3aed] rounded-[0.8rem] flex items-center justify-center text-white">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 4l10 8 10-8" /></svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-[#0f172a] dark:text-white text-[15px]">Email Reminders</span>
                            <span className="text-[#64748b] dark:text-gray-400 text-[12px] font-medium mt-0.5">Coming soon</span>
                        </div>
                    </div>
                    <button disabled className="px-5 py-2 bg-gray-100 dark:bg-gray-800 text-gray-400 font-bold text-[13px] rounded-full cursor-not-allowed">Soon</button>
                </div>

            </div>

            <p className="text-center text-[#64748b] text-[12px] font-medium mt-8 leading-relaxed max-w-[280px] mx-auto">
                {googleConnected
                    ? "Your Google Calendar events appear in the daily task view."
                    : "Google Calendar syncs events into the daily view after connecting."}
            </p>
        </div>
    );
}
