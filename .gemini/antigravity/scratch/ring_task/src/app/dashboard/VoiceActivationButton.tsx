"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useRef, useCallback, useEffect } from "react";
import { createTask } from "@/lib/actions";

type RecordingState = "idle" | "starting" | "recording" | "processing" | "saving" | "success" | "error";

export default function VoiceActivationButton() {
    const [state, setState] = useState<RecordingState>("idle");
    const [transcript, setTranscript] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const recognitionRef = useRef<any>(null);
    const transcriptRef = useRef<string>("");

    // Keep transcriptRef in sync with state
    useEffect(() => {
        transcriptRef.current = transcript;
    }, [transcript]);

    const stopAndProcess = useCallback(() => {
        recognitionRef.current?.stop();
        recognitionRef.current = null;
        setState("processing");
    }, []);

    const startRecording = useCallback(() => {
        const SpeechRecognition =
            (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            setErrorMsg("Voice input is not supported in this browser. Please use Chrome or Edge.");
            setState("error");
            setShowModal(true);
            return;
        }

        // Reset state
        setTranscript("");
        transcriptRef.current = "";
        setErrorMsg("");
        setState("starting");
        setShowModal(true);

        try {
            const recognition = new SpeechRecognition();
            recognition.lang = "en-US";
            recognition.continuous = true;      // Keep listening until user taps stop
            recognition.interimResults = true;   // Show text as they speak
            recognition.maxAlternatives = 1;
            recognitionRef.current = recognition;

            recognition.onstart = () => {
                setState("recording");
            };

            recognition.onresult = (event: any) => {
                let full = "";
                for (let i = 0; i < event.results.length; i++) {
                    full += event.results[i][0].transcript;
                }
                setTranscript(full);
                transcriptRef.current = full;
            };

            recognition.onerror = (event: any) => {
                recognitionRef.current = null;
                if (event.error === "no-speech") {
                    // just restart silently — user hasn't spoken yet
                    return;
                } else if (event.error === "not-allowed" || event.error === "permission-denied") {
                    setErrorMsg("Microphone access was denied. Please allow mic access in your browser settings and try again.");
                } else if (event.error === "network") {
                    setErrorMsg("Network error with speech service. Try again.");
                } else {
                    setErrorMsg(`Microphone error: ${event.error}. Please try again.`);
                }
                setState("error");
            };

            recognition.onend = () => {
                // If we ended while still in recording state, move to processing
                setState(prev => {
                    if (prev === "recording" || prev === "starting") {
                        return "processing";
                    }
                    return prev;
                });
                recognitionRef.current = null;
            };

            recognition.start();
        } catch (err: any) {
            setErrorMsg(`Could not start microphone: ${err?.message ?? "Unknown error"}`);
            setState("error");
        }
    }, []);

    const handleSaveTask = useCallback(async () => {
        const text = transcriptRef.current.trim();
        if (!text) {
            setErrorMsg("No speech was captured. Please try again.");
            setState("error");
            return;
        }
        setState("saving");
        try {
            await createTask({
                title: text,
                category: "Work",
                priority: "Medium",
                date: new Date(),
                time: "Anytime",
                reminder: false,
                repeat: "None"
            });
            setState("success");
            setTimeout(() => {
                setShowModal(false);
                setState("idle");
                setTranscript("");
                transcriptRef.current = "";
            }, 1500);
        } catch (e: unknown) {
            const raw = e instanceof Error ? e.message : "Failed to save. Please try again.";
            // If session expired after NEXTAUTH_SECRET change, guide user to re-login
            const msg = raw.includes("Unauthorized")
                ? "Session expired — please log out and log back in, then try again."
                : raw;
            setErrorMsg(msg);
            setState("error");
        }
    }, []);

    const handleDismiss = useCallback(() => {
        recognitionRef.current?.stop();
        recognitionRef.current = null;
        setShowModal(false);
        setState("idle");
        setTranscript("");
        transcriptRef.current = "";
        setErrorMsg("");
    }, []);

    const isRecordingActive = state === "starting" || state === "recording";

    return (
        <>
            {/* Mic Button */}
            <button
                onClick={() => isRecordingActive ? stopAndProcess() : startRecording()}
                aria-label="Voice task input"
                className={`w-11 h-11 text-white rounded-full flex items-center justify-center shadow-md transition-all shrink-0 ${isRecordingActive
                    ? "bg-red-500 hover:bg-red-600 animate-pulse"
                    : "bg-[#8b5cf6] hover:bg-purple-600"
                    }`}
            >
                {isRecordingActive ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="none">
                        <rect x="5" y="5" width="14" height="14" rx="2" />
                    </svg>
                ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                        <line x1="12" y1="19" x2="12" y2="22"></line>
                    </svg>
                )}
            </button>

            {/* Voice Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[200] flex items-end justify-center bg-black/50 backdrop-blur-sm" onClick={handleDismiss}>
                    <div
                        className="w-full bg-white dark:bg-[#1e293b] rounded-t-[2.5rem] p-6 pb-10 shadow-2xl flex flex-col gap-5 transition-colors"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="font-extrabold text-[18px] text-[#0f172a] dark:text-white transition-colors">
                                    {state === "starting" && "Starting microphone..."}
                                    {state === "recording" && "🎙 Listening — speak now"}
                                    {state === "processing" && "Review your task"}
                                    {state === "saving" && "Saving..."}
                                    {state === "success" && "✅ Task Created!"}
                                    {state === "error" && "Something went wrong"}
                                </h2>
                                {state === "recording" && (
                                    <p className="text-[12px] text-[#64748b] dark:text-gray-400 mt-0.5">Tap the red button when done</p>
                                )}
                            </div>
                            <button onClick={handleDismiss} className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 transition-colors">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>

                        {/* Animated sound bars while recording */}
                        {(state === "starting" || state === "recording") && (
                            <div className="flex items-center justify-center gap-1.5 h-14 my-1">
                                {[0.4, 0.7, 1, 0.8, 0.5, 0.9, 0.6, 1.1, 0.7, 0.4].map((h, i) => (
                                    <div
                                        key={i}
                                        className={`w-2 rounded-full ${state === "recording" ? "bg-[#8b5cf6]" : "bg-gray-300 dark:bg-gray-600"}`}
                                        style={{
                                            height: `${h * 32}px`,
                                            animation: state === "recording"
                                                ? `wave 0.6s ease-in-out ${i * 0.07}s infinite alternate`
                                                : "none"
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                        <style>{`@keyframes wave { from { transform: scaleY(0.3); opacity:0.6; } to { transform: scaleY(1); opacity:1; } }`}</style>

                        {/* Live transcript shown while recording */}
                        {state === "recording" && transcript && (
                            <div className="bg-purple-50 dark:bg-purple-900/10 rounded-2xl p-4 border border-purple-100 dark:border-purple-500/20 min-h-[60px]">
                                <p className="text-[#0f172a] dark:text-white font-semibold text-[15px] italic">&ldquo;{transcript}&rdquo;</p>
                            </div>
                        )}

                        {/* Final transcript review */}
                        {state === "processing" && (
                            <div className="bg-gray-50 dark:bg-[#0f172a] rounded-2xl p-4 border border-gray-200 dark:border-gray-700 min-h-[70px]">
                                {transcript ? (
                                    <>
                                        <p className="text-[11px] font-bold text-[#64748b] dark:text-gray-400 uppercase tracking-widest mb-1.5">Task title</p>
                                        <p className="text-[#0f172a] dark:text-white font-bold text-[17px]">&ldquo;{transcript}&rdquo;</p>
                                    </>
                                ) : (
                                    <p className="text-[#94a3b8] text-[14px] font-medium">No speech detected. Please try again.</p>
                                )}
                            </div>
                        )}

                        {/* Error */}
                        {state === "error" && (
                            <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-4 border border-red-100 dark:border-red-500/30">
                                <p className="text-red-600 dark:text-red-400 font-medium text-[14px]">{errorMsg}</p>
                            </div>
                        )}

                        {/* Buttons */}
                        {(state === "starting" || state === "recording") && (
                            <button
                                onClick={stopAndProcess}
                                className="w-full py-4 bg-red-500 text-white rounded-2xl font-extrabold text-[15px] hover:bg-red-600 transition-colors shadow-sm flex items-center justify-center gap-2"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="none"><rect x="4" y="4" width="16" height="16" rx="2" /></svg>
                                Stop Recording
                            </button>
                        )}

                        {state === "processing" && transcript && (
                            <div className="flex gap-3">
                                <button onClick={handleDismiss} className="flex-1 py-3.5 bg-gray-100 dark:bg-gray-800 text-[#0f172a] dark:text-white rounded-2xl font-bold text-[15px] hover:bg-gray-200 transition-colors">
                                    Cancel
                                </button>
                                <button onClick={handleSaveTask} className="flex-1 py-3.5 bg-[#8b5cf6] text-white rounded-2xl font-bold text-[15px] hover:bg-purple-600 transition-colors shadow-sm">
                                    Create Task ✓
                                </button>
                            </div>
                        )}

                        {(state === "processing" && !transcript) || state === "error" ? (
                            <div className="flex gap-3">
                                <button onClick={handleDismiss} className="flex-1 py-3.5 bg-gray-100 dark:bg-gray-800 text-[#0f172a] dark:text-white rounded-2xl font-bold text-[15px] transition-colors">
                                    Dismiss
                                </button>
                                <button onClick={startRecording} className="flex-1 py-3.5 bg-[#8b5cf6] text-white rounded-2xl font-bold text-[15px] hover:bg-purple-600 transition-colors">
                                    Try Again
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>
            )}
        </>
    );
}
