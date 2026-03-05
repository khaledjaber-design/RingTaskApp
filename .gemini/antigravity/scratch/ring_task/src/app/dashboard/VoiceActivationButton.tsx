"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useRef, useCallback } from "react";
import { createTask } from "@/lib/actions";

type RecordingState = "idle" | "recording" | "processing" | "success" | "error";

export default function VoiceActivationButton() {
    const [state, setState] = useState<RecordingState>("idle");
    const [transcript, setTranscript] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const recognitionRef = useRef<any>(null);

    const startRecording = useCallback(() => {
        const SpeechRecognition =
            (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            setErrorMsg("Voice input is not supported in this browser. Try Chrome or Edge.");
            setState("error");
            setShowModal(true);
            return;
        }

        setTranscript("");
        setErrorMsg("");
        setState("recording");
        setShowModal(true);

        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;
        recognitionRef.current = recognition;

        recognition.onresult = (event: any) => {
            let interim = "";
            let final = "";
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    final += event.results[i][0].transcript;
                } else {
                    interim += event.results[i][0].transcript;
                }
            }
            setTranscript(final || interim);
        };

        recognition.onend = () => {
            setState(prev => prev === "recording" ? "processing" : prev);
        };

        recognition.onerror = (event: any) => {
            if (event.error === "no-speech") {
                setErrorMsg("No speech detected. Please try again.");
            } else if (event.error === "not-allowed") {
                setErrorMsg("Microphone access denied. Please allow microphone access and try again.");
            } else {
                setErrorMsg(`Error: ${event.error}`);
            }
            setState("error");
        };

        recognition.start();
    }, []);

    const stopRecording = useCallback(() => {
        recognitionRef.current?.stop();
        setState("processing");
    }, []);

    const handleSaveTask = useCallback(async () => {
        if (!transcript.trim()) {
            setErrorMsg("No text recorded. Please try again.");
            setState("error");
            return;
        }
        setState("processing");
        try {
            await createTask({
                title: transcript.trim(),
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
            }, 1500);
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : "Failed to save. Please try again.";
            setErrorMsg(msg);
            setState("error");
        }
    }, [transcript]);

    const handleDismiss = useCallback(() => {
        recognitionRef.current?.stop();
        setShowModal(false);
        setState("idle");
        setTranscript("");
        setErrorMsg("");
    }, []);

    return (
        <>
            {/* Mic Button */}
            <button
                onClick={() => {
                    if (state === "recording") {
                        stopRecording();
                    } else {
                        startRecording();
                    }
                }}
                aria-label="Voice task input"
                className={`w-11 h-11 text-white rounded-full flex items-center justify-center shadow-md transition-all shrink-0 ${state === "recording"
                        ? "bg-red-500 hover:bg-red-600 animate-pulse"
                        : "bg-[#8b5cf6] hover:bg-purple-600"
                    }`}
            >
                {state === "recording" ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="none">
                        <rect x="4" y="4" width="16" height="16" rx="2" />
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
                            <h2 className="font-extrabold text-[18px] text-[#0f172a] dark:text-white transition-colors">
                                {state === "recording" && "Listening..."}
                                {state === "processing" && "Got it!"}
                                {state === "success" && "✅ Task Created!"}
                                {state === "error" && "Something went wrong"}
                            </h2>
                            <button onClick={handleDismiss} className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>

                        {/* Waveform animation while recording */}
                        {state === "recording" && (
                            <div className="flex items-center justify-center gap-1.5 h-12">
                                {[0.6, 1, 0.8, 1.2, 0.7, 1.1, 0.9, 0.6, 1, 0.8].map((h, i) => (
                                    <div
                                        key={i}
                                        className="w-1.5 bg-[#8b5cf6] rounded-full"
                                        style={{
                                            height: `${h * 30}px`,
                                            animation: `wave 0.8s ease-in-out ${i * 0.08}s infinite alternate`
                                        }}
                                    />
                                ))}
                            </div>
                        )}

                        <style>{`@keyframes wave { from { transform: scaleY(0.4); } to { transform: scaleY(1); } }`}</style>

                        {/* Live transcript */}
                        {state === "recording" && transcript && (
                            <div className="bg-purple-50 dark:bg-purple-900/10 rounded-2xl p-4 border border-purple-100 dark:border-purple-500/20 transition-colors">
                                <p className="text-[#0f172a] dark:text-white font-semibold text-[15px] italic">&ldquo;{transcript}&rdquo;</p>
                            </div>
                        )}

                        {/* Final transcript for review */}
                        {state === "processing" && transcript && (
                            <div className="bg-gray-50 dark:bg-[#0f172a] rounded-2xl p-4 border border-gray-100 dark:border-gray-700 transition-colors">
                                <p className="text-[11px] font-bold text-[#64748b] dark:text-gray-400 uppercase tracking-widest mb-1">Task title</p>
                                <p className="text-[#0f172a] dark:text-white font-bold text-[17px]">&ldquo;{transcript}&rdquo;</p>
                            </div>
                        )}

                        {/* Error */}
                        {state === "error" && (
                            <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-4 border border-red-100 dark:border-red-500/30">
                                <p className="text-red-600 dark:text-red-400 font-medium text-[14px]">{errorMsg}</p>
                            </div>
                        )}

                        {/* Action buttons */}
                        {state === "recording" && (
                            <button
                                onClick={stopRecording}
                                className="w-full py-3.5 bg-red-500 text-white rounded-2xl font-extrabold text-[15px] hover:bg-red-600 transition-colors shadow-sm"
                            >
                                ⏹ Stop Recording
                            </button>
                        )}

                        {state === "processing" && transcript && (
                            <div className="flex gap-3">
                                <button
                                    onClick={handleDismiss}
                                    className="flex-1 py-3.5 bg-gray-100 dark:bg-gray-800 text-[#0f172a] dark:text-white rounded-2xl font-bold text-[15px] hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveTask}
                                    className="flex-1 py-3.5 bg-[#8b5cf6] text-white rounded-2xl font-bold text-[15px] hover:bg-purple-600 transition-colors shadow-sm"
                                >
                                    Create Task ✓
                                </button>
                            </div>
                        )}

                        {state === "processing" && !transcript && (
                            <div className="flex gap-3">
                                <button onClick={handleDismiss} className="flex-1 py-3.5 bg-gray-100 dark:bg-gray-800 text-[#0f172a] dark:text-white rounded-2xl font-bold text-[15px] transition-colors">
                                    Cancel
                                </button>
                                <button
                                    onClick={startRecording}
                                    className="flex-1 py-3.5 bg-[#8b5cf6] text-white rounded-2xl font-bold text-[15px] hover:bg-purple-600 transition-colors"
                                >
                                    Try Again
                                </button>
                            </div>
                        )}

                        {state === "error" && (
                            <div className="flex gap-3">
                                <button onClick={handleDismiss} className="flex-1 py-3.5 bg-gray-100 dark:bg-gray-800 text-[#0f172a] dark:text-white rounded-2xl font-bold text-[15px] transition-colors">
                                    Dismiss
                                </button>
                                <button
                                    onClick={() => { setState("idle"); startRecording(); }}
                                    className="flex-1 py-3.5 bg-[#8b5cf6] text-white rounded-2xl font-bold text-[15px] hover:bg-purple-600 transition-colors"
                                >
                                    Try Again
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
