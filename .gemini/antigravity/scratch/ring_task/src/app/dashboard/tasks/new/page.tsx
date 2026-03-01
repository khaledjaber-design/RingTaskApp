"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createTask } from "@/lib/actions";

export default function NewTask() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Work");
    const [priority, setPriority] = useState("Medium");
    const [reminder, setReminder] = useState(true);
    const [repeat, setRepeat] = useState(false);
    const [dateStr, setDateStr] = useState(new Date().toISOString().split('T')[0]);
    const [timeStr, setTimeStr] = useState("10:30 AM"); // Simple mocked string for now

    const handleSave = () => {
        if (!title.trim()) return;

        startTransition(async () => {
            const [year, month, day] = dateStr.split('-');
            const date = new Date(Number(year), Number(month) - 1, Number(day));

            await createTask({
                title,
                category,
                priority,
                date,
                time: timeStr,
                reminder,
                repeat: repeat ? "Daily" : "None"
            });
            router.push('/dashboard');
        });
    }

    return (
        <div className="flex flex-col min-h-full bg-[#f8fafc] w-full relative px-6 pt-8 pb-12">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <button onClick={() => router.back()} className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <h1 className="text-[17px] font-extrabold text-[#0f172a] shadow-none">New Task</h1>
                <div className="w-10 h-10 opacity-0 pointer-events-none"></div>
            </div>

            <div className="flex flex-col gap-7">

                {/* Task Title Input */}
                <div>
                    <input
                        type="text"
                        placeholder="What needs to be done?"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full text-[22px] font-extrabold text-[#0f172a] placeholder:text-[#94a3b8] bg-transparent border-none focus:ring-0 p-0 outline-none pb-2 border-b-2 border-transparent focus:border-gray-200 transition-colors"
                        autoFocus
                    />
                </div>

                {/* Category Selection */}
                <div className="flex flex-col gap-3">
                    <span className="text-[14px] font-bold text-[#64748b]">Category</span>
                    <div className="flex gap-2">
                        {["Work", "Personal", "Health"].map(cat => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`px-5 py-2.5 rounded-full text-[13px] font-bold transition-colors ${category === cat ? "bg-[#3b82f6] text-white shadow-sm" : "bg-white border border-gray-200 text-[#64748b] hover:bg-gray-50"}`}
                                style={category === cat && cat === "Personal" ? { backgroundColor: "#8b5cf6" } : category === cat && cat === "Health" ? { backgroundColor: "#20c997" } : undefined}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Priority Selection */}
                <div className="flex flex-col gap-3">
                    <span className="text-[14px] font-bold text-[#64748b]">Priority</span>
                    <div className="flex gap-2 w-full bg-white p-1 rounded-full border border-gray-200 shadow-sm">
                        <button
                            onClick={() => setPriority("Low")}
                            className={`flex-1 py-2 rounded-full text-[13px] font-bold transition-all ${priority === "Low" ? "bg-slate-100 text-[#0f172a] shadow-sm" : "text-[#94a3b8] hover:text-[#64748b]"}`}
                        >
                            Low
                        </button>
                        <button
                            onClick={() => setPriority("Medium")}
                            className={`flex-1 py-2 rounded-full text-[13px] font-bold transition-all ${priority === "Medium" ? "bg-[#f59e0b] text-white shadow-sm" : "text-[#94a3b8] hover:text-[#64748b]"}`}
                        >
                            Medium
                        </button>
                        <button
                            onClick={() => setPriority("Urgent")}
                            className={`flex-1 py-2 rounded-full text-[13px] font-bold transition-all ${priority === "Urgent" ? "bg-[#ef4444] text-white shadow-sm" : "text-[#94a3b8] hover:text-[#64748b]"}`}
                        >
                            Urgent
                        </button>
                    </div>
                </div>

                {/* Date & Time Picker Group */}
                <div className="bg-white rounded-[1.2rem] p-4 shadow-sm border border-gray-100 flex flex-col mt-2">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            </div>
                            <span className="font-semibold text-[#0f172a] text-[15px]">Date</span>
                        </div>
                        <input
                            type="date"
                            value={dateStr}
                            onChange={(e) => setDateStr(e.target.value)}
                            className="text-[14px] font-bold text-[#3b82f6] bg-transparent outline-none cursor-pointer"
                        />
                    </div>

                    <div className="flex items-center justify-between pt-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            </div>
                            <span className="font-semibold text-[#0f172a] text-[15px]">Time</span>
                        </div>
                        <input
                            type="text"
                            value={timeStr}
                            onChange={e => setTimeStr(e.target.value)}
                            className="text-[14px] font-bold text-[#3b82f6] bg-transparent outline-none w-20 text-right"
                        />
                    </div>
                </div>

                {/* Toggles Group */}
                <div className="bg-white rounded-[1.2rem] p-4 shadow-sm border border-gray-100 flex flex-col mt-2">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                            </div>
                            <span className="font-semibold text-[#0f172a] text-[15px]">Reminder</span>
                        </div>
                        <button
                            onClick={() => setReminder(!reminder)}
                            className={`w-12 h-6 rounded-full flex items-center transition-colors px-1 ${reminder ? "bg-[#20c997]" : "bg-gray-200"}`}
                        >
                            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${reminder ? "translate-x-6" : "translate-x-0"}`}></div>
                        </button>
                    </div>

                    <div className="flex items-center justify-between pt-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path></svg>
                            </div>
                            <span className="font-semibold text-[#0f172a] text-[15px]">Repeat</span>
                        </div>
                        <button
                            onClick={() => setRepeat(!repeat)}
                            className={`w-12 h-6 rounded-full flex items-center transition-colors px-1 ${repeat ? "bg-[#3b82f6]" : "bg-gray-200"}`}
                        >
                            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${repeat ? "translate-x-6" : "translate-x-0"}`}></div>
                        </button>
                    </div>
                </div>

            </div>

            {/* Save Button */}
            <div className="mt-8">
                <button
                    disabled={isPending}
                    onClick={handleSave}
                    className="w-full h-[56px] flex items-center justify-center text-white bg-[#0f172a] shadow-lg rounded-full font-bold text-[16px] hover:bg-black transition-colors disabled:opacity-70"
                >
                    {isPending ? "Saving..." : "Save Task"}
                </button>
            </div>

        </div>
    );
}
