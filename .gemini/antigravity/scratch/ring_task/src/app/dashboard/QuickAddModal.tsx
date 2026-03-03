"use client";

import { useState, useTransition } from "react";
import { createTask } from "@/lib/actions";

export default function QuickAddModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [isPending, startTransition] = useTransition();
    const [title, setTitle] = useState("");

    if (!isOpen) return null;

    const handleSave = () => {
        if (!title.trim()) return;

        startTransition(async () => {
            await createTask({
                title,
                category: "Work",
                priority: "Medium",
                date: new Date(),
                time: "Anytime",
                reminder: false,
                repeat: "None"
            });
            setTitle("");
            onClose();
        });
    }

    return (
        <div className="absolute inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
            <div
                className="w-full bg-white dark:bg-[#0f172a] rounded-t-[2.5rem] p-6 pt-8 pb-10 shadow-2xl flex flex-col gap-4 animate-in slide-in-from-bottom border-t border-gray-100 dark:border-gray-800 transition-colors"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-2">
                    <h2 className="font-extrabold text-[18px] text-[#0f172a] dark:text-white transition-colors">Quick Add</h2>
                    <button onClick={onClose} className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                <input
                    type="text"
                    placeholder="Task name..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full text-[18px] font-bold text-[#0f172a] dark:text-white placeholder:text-[#94a3b8] dark:placeholder:text-gray-500 bg-gray-50 dark:bg-[#1e293b] dark:border dark:border-gray-800 rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-[#20c997] transition-all"
                    autoFocus
                />

                <div className="flex gap-2">
                    <button
                        disabled={isPending}
                        onClick={handleSave}
                        className="flex-1 py-4 bg-[#0f172a] dark:bg-[#20c997] text-white rounded-xl font-bold text-[15px] hover:bg-black dark:hover:bg-[#1bb889] shadow-sm transition-colors disabled:opacity-70"
                    >
                        {isPending ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
}
