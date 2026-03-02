"use client";

import React from "react";

export default function VoiceActivationButton() {
    return (
        <button
            onClick={() => typeof window !== "undefined" && window.dispatchEvent(new Event('open-voice-modal'))}
            className="w-11 h-11 bg-[#8b5cf6] text-white rounded-full flex items-center justify-center shadow-md hover:bg-purple-600 transition shrink-0"
        >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="22"></line>
            </svg>
        </button>
    );
}
