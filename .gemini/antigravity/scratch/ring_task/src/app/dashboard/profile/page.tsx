"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";

export default function ProfileSettings() {
    const router = useRouter();

    // Toggles state
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [pushNotifs, setPushNotifs] = useState(true);
    const [emailNotifs, setEmailNotifs] = useState(false);
    const [sound, setSound] = useState(true);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => setMounted(true), []);

    return (
        <div className="flex flex-col min-h-full bg-white dark:bg-[#0f172a] w-full relative px-5 pt-8 pb-10 overflow-hidden transition-colors duration-200">

            {/* Header */}
            <div className="flex items-center justify-between mb-8 z-10 w-full bg-white dark:bg-[#0f172a] transition-colors duration-200">
                <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-start text-black dark:text-white">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                </button>
                <h1 className="text-[20px] font-extrabold text-black dark:text-white tracking-tight">Settings</h1>
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

            {/* Main Content scrollable area with hidden scrollbar but visible thumb mock */}
            <div className="flex-1 overflow-y-auto w-full pr-3 relative no-scrollbar pb-10">

                {/* Mock custom scrollbar thumb on right edge */}
                <div className="absolute right-0 top-0 w-1.5 h-40 bg-gray-500/30 rounded-full"></div>

                <div className="flex flex-col gap-6">

                    {/* User Profile Card */}
                    <div className="bg-gray-50 dark:bg-[#1e293b] rounded-[1.5rem] p-5 shadow-sm flex items-center justify-between border border-gray-100 dark:border-transparent transition-colors duration-200">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-[#20c997] text-white flex items-center justify-center font-extrabold text-[16px] shrink-0">
                                KJ
                            </div>
                            <div className="flex flex-col">
                                <span className="font-extrabold text-black dark:text-white text-[16px]">Khaled Jaber</span>
                                <span className="text-gray-400 text-[13px] font-medium leading-tight mt-0.5">khaled@example.com</span>
                            </div>
                        </div>
                        <button className="px-4 py-1.5 border border-[#20c997] text-[#20c997] font-bold text-[13px] rounded-lg hover:bg-[#20c997]/10 transition-colors">
                            Edit
                        </button>
                    </div>

                    {/* Connected Accounts Link */}
                    <Link href="/dashboard/profile/connected-accounts" className="bg-gray-50 dark:bg-[#1e293b] border border-gray-100 dark:border-transparent rounded-[1.2rem] p-5 shadow-sm flex items-center justify-between hover:bg-gray-100 dark:hover:bg-[#283548] transition-colors duration-200">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-teal-500/10 flex items-center justify-center shrink-0">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#20c997" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-black dark:text-white text-[15px]">Connected Accounts</span>
                                <span className="text-gray-400 text-[12px] font-medium mt-0.5">Sync calendars & email</span>
                            </div>
                        </div>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </Link>

                    {/* Appearance Section */}
                    <div className="flex flex-col gap-3 mt-2">
                        <span className="text-[#64748b] text-[12px] font-bold tracking-wider uppercase px-1">Appearance</span>
                        <div className="flex gap-3 h-14">
                            {mounted && (
                                <>
                                    <button
                                        onClick={() => setTheme("light")}
                                        className={`flex-1 rounded-xl flex items-center justify-center gap-2 font-bold text-[14px] transition-colors ${theme === "light" ? "border-2 border-[#20c997] text-[#20c997] bg-[#20c997]/5 dark:bg-[#20c997]/10" : "bg-gray-50 dark:bg-[#1e293b] text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-transparent"}`}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                                        Light
                                    </button>
                                    <button
                                        onClick={() => setTheme("dark")}
                                        className={`flex-1 rounded-xl flex items-center justify-center gap-2 font-bold text-[14px] transition-colors ${theme === "dark" ? "border-2 border-[#20c997] text-[#20c997] bg-[#20c997]/5 dark:bg-[#20c997]/10" : "bg-gray-50 dark:bg-[#1e293b] text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-transparent"}`}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                                        Dark {theme === "dark" && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Notifications Section */}
                    <div className="flex flex-col gap-3 mt-4">
                        <span className="text-[#64748b] text-[12px] font-bold tracking-wider uppercase px-1">Notifications</span>
                        <div className="bg-gray-50 dark:bg-[#1e293b] border border-gray-100 dark:border-transparent rounded-[1.5rem] flex flex-col p-2 transition-colors duration-200">

                            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700/50">
                                <span className="font-bold text-black dark:text-white text-[15px]">Push Notifications</span>
                                <button
                                    onClick={() => setPushNotifs(!pushNotifs)}
                                    className={`w-12 h-6 rounded-full flex items-center transition-colors px-1 ${pushNotifs ? "bg-[#20c997]" : "bg-gray-300 dark:bg-gray-600"}`}
                                >
                                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${pushNotifs ? "translate-x-6" : "translate-x-0"}`}></div>
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700/50">
                                <span className="font-bold text-black dark:text-white text-[15px]">Email Reminders</span>
                                <button
                                    onClick={() => setEmailNotifs(!emailNotifs)}
                                    className={`w-12 h-6 rounded-full flex items-center transition-colors px-1 ${emailNotifs ? "bg-[#20c997]" : "bg-gray-300 dark:bg-gray-600"}`}
                                >
                                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${emailNotifs ? "translate-x-6" : "translate-x-0"}`}></div>
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-4 transition-colors">
                                <span className="font-bold text-black dark:text-white text-[15px]">Sound & Vibration</span>
                                <button
                                    onClick={() => setSound(!sound)}
                                    className={`w-12 h-6 rounded-full flex items-center transition-colors px-1 ${sound ? "bg-[#20c997]" : "bg-gray-300 dark:bg-gray-600"}`}
                                >
                                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${sound ? "translate-x-6" : "translate-x-0"}`}></div>
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* Account Section */}
                    <div className="flex flex-col gap-3 mt-4">
                        <span className="text-[#64748b] text-[12px] font-bold tracking-wider uppercase px-1">Account</span>
                        <div className="bg-gray-50 dark:bg-[#1e293b] border border-gray-100 dark:border-transparent rounded-[1.2rem] flex flex-col p-2 transition-colors duration-200">

                            <Link href="#" className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700/50 transition-colors">
                                <span className="font-bold text-black dark:text-white text-[15px]">Change Password</span>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 dark:text-gray-500 transition-colors">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </Link>

                            <button onClick={() => setIsLogoutModalOpen(true)} className="flex items-center justify-between p-4 transition-colors hover:bg-gray-200 dark:hover:bg-[#283548] rounded-b-xl">
                                <span className="font-bold text-[#ef4444] dark:text-red-400 text-[15px]">Logout</span>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#ef4444] dark:text-red-400 transition-colors">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </button>

                        </div>
                    </div>

                </div>
            </div>

            {/* Logout Confirmation Modal */}
            {isLogoutModalOpen && (
                <div className="absolute inset-0 bg-black/50 z-[60] flex items-center justify-center p-6 animate-in fade-in duration-200 backdrop-blur-[1px]">
                    <div className="bg-white dark:bg-[#0f172a] rounded-[2rem] w-full max-w-[300px] p-6 flex flex-col items-center shadow-2xl border border-transparent dark:border-gray-800 animate-in zoom-in-95 duration-200 transition-colors">
                        <div className="w-14 h-14 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center mb-4 transition-colors">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className="stroke-[#ef4444] dark:stroke-red-400 transition-colors">
                                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                <line x1="12" y1="9" x2="12" y2="13"></line>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            </svg>
                        </div>
                        <h3 className="text-[20px] font-extrabold text-black dark:text-white mb-2 tracking-tight transition-colors">Log out?</h3>
                        <p className="text-[#64748b] dark:text-gray-400 text-[14px] text-center mb-7 font-medium leading-relaxed px-2 transition-colors">
                            Are you sure you want to log out of your account?
                        </p>
                        <div className="flex items-center justify-between w-full gap-3">
                            <button
                                onClick={() => setIsLogoutModalOpen(false)}
                                className="flex-1 py-3.5 border-2 border-gray-100 dark:border-gray-700/50 rounded-2xl text-[15px] font-extrabold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setIsLogoutModalOpen(false);
                                    signOut({ callbackUrl: "/" });
                                }}
                                className="flex-1 py-3.5 bg-[#ef4444] dark:bg-red-500/20 rounded-2xl text-[15px] font-extrabold text-white dark:text-red-400 hover:bg-red-600 dark:hover:bg-red-500/30 transition-colors shadow-sm border border-transparent"
                            >
                                Log out
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
