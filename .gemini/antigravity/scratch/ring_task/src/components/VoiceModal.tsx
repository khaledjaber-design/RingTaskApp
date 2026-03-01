"use client";

import { useEffect, useState } from "react";

export default function VoiceModal() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleOpenVoice = () => setIsOpen(true);
        window.addEventListener("open-voice-modal", handleOpenVoice);
        return () => window.removeEventListener("open-voice-modal", handleOpenVoice);
    }, []);

    if (!isOpen) return null;

    return (
        <div className="absolute inset-0 bg-[#8b5cf6]/95 z-[100] flex flex-col items-center justify-center animate-in fade-in duration-200">
            {/* Header (Mock Header matching background) */}
            <div className="absolute top-8 w-full px-5 flex items-center justify-between opacity-50 pointer-events-none">
                <div className="w-10 h-10 flex text-white">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                </div>
                <h1 className="text-[20px] font-extrabold text-[#0f172a] tracking-tight text-transparent mix-blend-overlay">Settings</h1>
                <div className="w-10 h-10 bg-white/20 text-white rounded-full"></div>
            </div>

            {/* Mic Icon Bubble */}
            <div className="w-[100px] h-[100px] bg-white/20 rounded-full flex items-center justify-center mb-8 relative">
                {/* Ping animation rings */}
                <div className="absolute w-[140px] h-[140px] bg-white/10 rounded-full animate-ping"></div>
                <div className="absolute w-[180px] h-[180px] bg-white/5 rounded-full animate-pulse"></div>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center z-10 shadow-lg">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                        <line x1="12" y1="19" x2="12" y2="22"></line>
                    </svg>
                </div>
            </div>

            {/* Listening Text */}
            <h2 className="text-[26px] font-extrabold text-white mb-3">Listening...</h2>

            {/* Mock Subtitle */}
            <p className="text-white/80 font-medium text-[15px] max-w-[250px] text-center mb-12">
                &quot;Add team standup tomorrow at 9am&quot;
            </p>

            {/* Sound Wave Bars */}
            <div className="flex items-center gap-1.5 mb-24">
                {[1, 3, 2, 4, 5, 4, 2, 3, 1].map((bar, i) => (
                    <div
                        key={i}
                        className="w-1.5 bg-white/80 rounded-full animate-pulse"
                        style={{ height: `${bar * 8}px`, animationDelay: `${i * 0.1}s` }}
                    ></div>
                ))}
            </div>

            {/* Cancel Button */}
            <button
                onClick={() => setIsOpen(false)}
                className="absolute bottom-32 px-6 py-3 rounded-full border border-white/40 text-white flex items-center gap-2 font-bold hover:bg-white/10 transition"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                Cancel
            </button>
        </div>
    );
}
