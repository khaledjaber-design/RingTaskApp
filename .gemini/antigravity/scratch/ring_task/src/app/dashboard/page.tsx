import React from "react";
import Link from "next/link";
import { getDashboardData, applyAISuggestion } from "@/lib/actions";
import TaskCheckbox from "./TaskCheckbox";

export const dynamic = "force-dynamic";

export default async function DashboardHome() {
    try {
        const data = await getDashboardData();
        if (!data) {
            return <div className="p-8 text-center text-gray-500">Please log in to view your dashboard.</div>;
        }

        const { tasksToday, completedToday, totalToday, streak, focusScore, tasksDoneThisWeek, weeklyGoal } = data;
        const percent = totalToday === 0 ? 0 : Math.round((completedToday / totalToday) * 100);
        const strokeDashoffset = 251.2 - (251.2 * percent) / 100;
        const weeklyPercent = weeklyGoal === 0 ? 0 : Math.round((tasksDoneThisWeek / weeklyGoal) * 100);

        return (
            <div className="flex flex-col min-h-full bg-[#f8fafc] w-full relative">

                <style dangerouslySetInnerHTML={{
                    __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-8 pb-2">
                    <div>
                        <h1 className="text-[22px] font-extrabold text-[#0f172a] tracking-tight">Good afternoon</h1>
                        <p className="text-[#64748b] text-[13px] font-medium mt-1">Here&apos;s your productivity snapshot</p>
                    </div>

                    <button
                        onClick={() => window.dispatchEvent(new Event('open-voice-modal'))}
                        className="w-11 h-11 bg-[#8b5cf6] text-white rounded-full flex items-center justify-center shadow-md hover:bg-purple-600 transition shrink-0"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
                            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                            <line x1="12" y1="19" x2="12" y2="22"></line>
                        </svg>
                    </button>
                </div>

                <div className="px-5 pb-8 flex flex-col gap-4">

                    {/* Main Circular Progress Widget */}
                    <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center">
                        <div className="relative w-36 h-36 flex items-center justify-center my-2">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="40" stroke="#e2e8f0" strokeWidth="8" fill="transparent" strokeLinecap="round" />
                                <circle cx="50" cy="50" r="40" stroke="#20c997" strokeWidth="8" fill="transparent" strokeLinecap="round" strokeDasharray="251.2" strokeDashoffset={strokeDashoffset} className="transition-all duration-1000 ease-out" />
                            </svg>
                            <div className="absolute flex flex-col items-center">
                                <span className="text-3xl font-extrabold text-[#0f172a]">{completedToday}/{totalToday}</span>
                                <span className="text-[11px] font-medium text-[#64748b]">tasks done</span>
                            </div>
                        </div>
                        <div className="mt-4 text-center">
                            <p className="text-[20px] font-extrabold text-[#20c997]">{percent}% <span className="text-[#64748b] font-semibold text-[15px]">complete</span></p>
                            <p className="text-[#94a3b8] text-[12px] font-medium mt-1">You&apos;re on track today</p>
                        </div>
                    </div>

                    {/* 3 Quick Stats Row */}
                    <div className="flex gap-3 justify-between">
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex-1 flex flex-col items-center justify-center gap-1">
                            <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center mb-1">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#20c997" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <span className="font-extrabold text-[16px] text-[#0f172a]">{completedToday}</span>
                            <span className="text-[10px] text-center text-[#64748b] font-medium leading-tight">Completed<br />Today</span>
                        </div>

                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex-1 flex flex-col items-center justify-center gap-1">
                            <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center mb-1">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c-2.28 0-3-2.5-3-2.5s.53 1.05 1 1.5c1.1-1.2 2-2.5 2-4 .5 2 3.5 1 3.5 4.5A4.5 4.5 0 0 1 10 19a4 4 0 0 1-1.5-4.5z"></path></svg>
                            </div>
                            <span className="font-extrabold text-[16px] text-[#0f172a]">{streak} days</span>
                            <span className="text-[10px] text-center text-[#64748b] font-medium leading-tight">Current Streak</span>
                        </div>

                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex-1 flex flex-col items-center justify-center gap-1">
                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mb-1">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
                            </div>
                            <span className="font-extrabold text-[16px] text-[#0f172a]">{focusScore}%</span>
                            <span className="text-[10px] text-center text-[#64748b] font-medium leading-tight">Focus Score</span>
                        </div>
                    </div>

                    {/* AI Insight Card */}
                    <div className="bg-purple-50 rounded-[1.5rem] p-5 border border-purple-100 flex flex-col gap-3 mt-1">
                        <div className="flex gap-3">
                            <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center shrink-0">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2L16 6l4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5 1.5-4z"></path><path d="M5 10l.5 2 2 .5-2 .5-.5 2-.5-2-2-.5 2-.5.5-2z"></path></svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-[#0f172a] text-[15px]">AI Insight</h3>
                                <p className="text-[#475569] text-[13px] leading-snug mt-1 font-medium">You complete more tasks in the morning. Schedule focus work before noon.</p>
                            </div>
                        </div>
                        <form action={applyAISuggestion} className="flex justify-start mt-1">
                            <button type="submit" className="bg-[#8b5cf6] text-white px-5 py-2.5 rounded-full text-[13px] font-bold shadow hover:bg-purple-600 transition">Apply Suggestion</button>
                        </form>
                    </div>

                    {/* Upcoming Tasks Overview */}
                    <div className="bg-white rounded-[1.5rem] p-5 shadow-sm border border-gray-100 mt-1">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-bold text-[#0f172a] text-[16px]">Upcoming Tasks</h2>
                            <Link href="/dashboard/calendar" className="text-[#20c997] text-[12px] font-semibold flex items-center gap-1">View Full Calendar <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></Link>
                        </div>

                        <div className="flex flex-col gap-4">
                            {tasksToday.length === 0 ? (
                                <p className="text-sm text-gray-500 text-center py-2">No tasks scheduled for today.</p>
                            ) : (
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                tasksToday.map((task: any) => (
                                    <div key={task.id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <TaskCheckbox id={task.id} defaultChecked={task.isCompleted} />
                                            <span className={`font-semibold text-[14px] ${task.isCompleted ? 'text-gray-400 line-through' : 'text-[#0f172a]'}`}>{task.title}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#64748b]">
                                            <div className={`w-1.5 h-1.5 rounded-full ${task.category === 'Work' ? 'bg-[#3b82f6]' : task.category === 'Personal' ? 'bg-[#8b5cf6]' : 'bg-[#20c997]'}`}></div> {task.time || 'Anytime'}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Weekly Goal Progress */}
                    <div className="bg-white rounded-[1.5rem] p-5 shadow-sm border border-gray-100 mt-1 relative">
                        <button className="absolute top-5 right-5 text-gray-400 hover:text-gray-600">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                        </button>
                        <h2 className="font-bold text-[#0f172a] text-[16px]">Weekly Goal</h2>
                        <p className="text-[#64748b] text-[13px] font-medium mt-1 mb-3">Complete {weeklyGoal} tasks</p>

                        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-2">
                            <div className="h-full bg-[#20c997] rounded-full transition-all duration-1000 ease-out" style={{ width: `${weeklyPercent}%` }}></div>
                        </div>
                        <p className="text-[12px] font-bold text-[#0f172a]">{tasksDoneThisWeek} <span className="text-[#94a3b8] font-medium">/ {weeklyGoal}</span></p>
                    </div>

                    {/* Productivity Trend */}
                    <div className="bg-white rounded-[1.5rem] p-5 shadow-sm border border-gray-100 mt-1 mb-8">
                        <h2 className="font-bold text-[#0f172a] text-[16px] mb-4">Productivity Trend</h2>

                        <div className="flex justify-between items-end h-[100px] px-1 gap-2 border-b border-gray-100 pb-2">
                            <div className="w-[12%] bg-[#c6f0e3] rounded-t-md h-[50%]"></div>
                            <div className="w-[12%] bg-[#c6f0e3] rounded-t-md h-[30%]"></div>
                            <div className="w-[12%] bg-[#c6f0e3] rounded-t-md h-[60%]"></div>
                            <div className="w-[12%] bg-[#c6f0e3] rounded-t-md h-[40%]"></div>
                            <div className="w-[12%] bg-[#c6f0e3] rounded-t-md h-[70%]"></div>
                            <div className="w-[12%] bg-[#c6f0e3] rounded-t-md h-[25%]"></div>
                            <div className="w-[12%] bg-[#20c997] rounded-t-md h-[45%]"></div>
                        </div>

                        <div className="flex justify-between mt-2 px-1 text-[10px] font-bold text-[#94a3b8]">
                            <span>Mon</span>
                            <span>Tue</span>
                            <span>Wed</span>
                            <span>Thu</span>
                            <span>Fri</span>
                            <span>Sat</span>
                            <span className="text-[#20c997]">Sun</span>
                        </div>
                    </div>

                </div>

            </div >
        );
    } catch (e: any) {
        return (
            <div className="p-8 text-red-600 bg-red-50 flex flex-col gap-2 font-mono">
                <h1 className="font-bold">Raw Server Crash Extracted:</h1>
                <p>Message: {e.message}</p>
                <div className="whitespace-pre-wrap text-[11px]">{e.stack}</div>
            </div>
        );
    }
}
