"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useRef, useCallback, useEffect } from "react";
import { createTask } from "@/lib/actions";

// ── Natural-Language Parser ───────────────────────────────────────────────────

function padZ(n: number) { return String(n).padStart(2, "0"); }
function toDateStr(d: Date) {
    return `${d.getFullYear()}-${padZ(d.getMonth() + 1)}-${padZ(d.getDate())}`;
}

function formatTime(raw: string): string {
    const s = raw.replace(/[\s.]/g, "").toUpperCase();
    const m = s.match(/^(\d{1,2})(?::(\d{2}))?(AM|PM)?$/);
    if (!m) return raw;
    const hrs = parseInt(m[1]);
    const mins = m[2] ?? "00";
    const mer = m[3] ?? (hrs < 12 ? "AM" : "PM");
    return `${hrs}:${mins} ${mer}`;
}

function inferCategory(title: string): string {
    const t = title.toLowerCase();
    if (/gym|workout|exercise|run|walk|yoga|swim|sport|health|doctor|dentist|medicine/.test(t)) return "Health";
    if (/meeting|work|email|call|presentation|interview|project|report|deadline|client|office/.test(t)) return "Work";
    return "Personal";
}

interface ParsedTask {
    title: string;
    dateStr: string;
    time: string;
    reminder: boolean;
    category: string;
}

function parseVoiceCommand(raw: string, now: Date): ParsedTask {
    let t = raw;

    // Strip common command prefixes
    t = t.replace(/^(create\s+(a\s+)?task(\s+for\s+me)?\s+(to\s+)?|add\s+(a\s+)?task\s+(to\s+)?|remind\s+me\s+to\s+|schedule\s+(a?\s+)?(task\s+)?(to\s+)?)/i, "");

    // ── Date extraction ──
    const base = new Date(now);
    base.setHours(0, 0, 0, 0);

    const WEEKDAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    if (/\btomorrow\b/i.test(t)) {
        base.setDate(base.getDate() + 1);
        t = t.replace(/\btomorrow\b/gi, "");
    } else if (/\btoday\b/i.test(t)) {
        t = t.replace(/\btoday\b/gi, "");
    } else {
        // "next monday", "this friday", "on wednesday"
        const nextM = t.match(/\bnext\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i);
        const dayM = t.match(/\b(?:this\s+|on\s+)?(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i);
        if (nextM) {
            const td = WEEKDAYS.indexOf(nextM[1].toLowerCase());
            let da = td - base.getDay(); if (da <= 0) da += 7; da += 7;
            base.setDate(base.getDate() + da);
            t = t.replace(nextM[0], "");
        } else if (dayM) {
            const td = WEEKDAYS.indexOf(dayM[1].toLowerCase());
            let da = td - base.getDay(); if (da <= 0) da += 7;
            base.setDate(base.getDate() + da);
            t = t.replace(dayM[0], "");
        }
    }

    // ── Time extraction ──
    let time = "Anytime";
    const timeRx = /\bat\s+(\d{1,2}(?::\d{2})?\s*(?:a\.?\s*m\.?|p\.?\s*m\.?))\b/i;
    const bareRx = /\b(\d{1,2}(?::\d{2})\s*(?:a\.?\s*m\.?|p\.?\s*m\.?)|\d{1,2}\s*(?:a\.?\s*m\.?|p\.?\s*m\.))\b/i;
    const tm = t.match(timeRx) ?? t.match(bareRx);
    if (tm) {
        time = formatTime((tm[1] ?? "").replace(/\s/g, ""));
        t = t.replace(tm[0], "");
    }

    // ── Reminder extraction ──
    let reminder = false;
    if (/\b(set\s+an?\s+alarm|set\s+a?\s+reminder|with\s+a\s+reminder|remind\s+me)\b/i.test(t)) {
        reminder = true;
        t = t.replace(/\b(set\s+an?\s+alarm|set\s+a?\s+reminder|with\s+a\s+reminder|remind\s+me)\b/gi, "");
    }

    // ── Clean title ──
    const title = t.replace(/\s{2,}/g, " ").replace(/\s*,\s*$/, "").replace(/[.!?]+$/, "").trim() || raw.trim();

    return { title, dateStr: toDateStr(base), time, reminder, category: inferCategory(title) };
}
// ─────────────────────────────────────────────────────────────────────────────

type RecordingState = "idle" | "starting" | "recording" | "reviewing" | "saving" | "success" | "error";

export default function VoiceActivationButton() {
    const [state, setState] = useState<RecordingState>("idle");
    const [rawTranscript, setRawTranscript] = useState("");
    const [parsed, setParsed] = useState<ParsedTask | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const recognitionRef = useRef<any>(null);
    const transcriptRef = useRef<string>("");

    useEffect(() => { transcriptRef.current = rawTranscript; }, [rawTranscript]);

    const stopAndReview = useCallback(() => {
        recognitionRef.current?.stop();
        recognitionRef.current = null;
        const text = transcriptRef.current.trim();
        if (text) {
            const result = parseVoiceCommand(text, new Date());
            setParsed(result);
        }
        setState("reviewing");
    }, []);

    const startRecording = useCallback(() => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setErrorMsg("Voice input is not supported in this browser. Please use Chrome or Edge.");
            setState("error"); setShowModal(true); return;
        }
        setRawTranscript(""); transcriptRef.current = "";
        setErrorMsg(""); setParsed(null);
        setState("starting"); setShowModal(true);

        try {
            const r = new SpeechRecognition();
            r.lang = "en-US"; r.continuous = true; r.interimResults = true; r.maxAlternatives = 1;
            recognitionRef.current = r;

            r.onstart = () => setState("recording");
            r.onresult = (e: any) => {
                let full = "";
                for (let i = 0; i < e.results.length; i++) full += e.results[i][0].transcript;
                setRawTranscript(full); transcriptRef.current = full;
            };
            r.onerror = (e: any) => {
                recognitionRef.current = null;
                if (e.error === "no-speech") return;
                setErrorMsg(e.error === "not-allowed"
                    ? "Microphone access denied. Please allow mic access and try again."
                    : `Microphone error: ${e.error}`);
                setState("error");
            };
            r.onend = () => {
                setState(prev => (prev === "recording" || prev === "starting") ? "reviewing" : prev);
                recognitionRef.current = null;
            };
            r.start();
        } catch (err: any) {
            setErrorMsg(`Could not start microphone: ${err?.message ?? "Unknown error"}`);
            setState("error");
        }
    }, []);

    const handleSave = useCallback(async () => {
        if (!parsed) return;
        setState("saving");
        try {
            const [y, mo, d] = parsed.dateStr.split("-").map(Number);
            const taskDate = new Date(y, mo - 1, d, 12, 0, 0);
            await createTask({
                title: parsed.title,
                category: parsed.category,
                priority: "Medium",
                date: taskDate,
                time: parsed.time,
                reminder: parsed.reminder,
                repeat: "None"
            });
            setState("success");
            setTimeout(() => { setShowModal(false); setState("idle"); setRawTranscript(""); setParsed(null); }, 1500);
        } catch (e: unknown) {
            const raw = e instanceof Error ? e.message : "Failed to save.";
            setErrorMsg(raw.includes("Unauthorized")
                ? "Session expired — please log out and back in, then try again."
                : raw);
            setState("error");
        }
    }, [parsed]);

    const dismiss = useCallback(() => {
        recognitionRef.current?.stop(); recognitionRef.current = null;
        setShowModal(false); setState("idle"); setRawTranscript(""); setParsed(null); setErrorMsg("");
    }, []);

    const isActive = state === "starting" || state === "recording";
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const tomorrowStr = toDateStr(new Date(today.getTime() + 86400000));

    return (
        <>
            <button
                onClick={() => isActive ? stopAndReview() : startRecording()}
                aria-label="Voice task input"
                className={`w-11 h-11 text-white rounded-full flex items-center justify-center shadow-md transition-all shrink-0 ${isActive ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-[#8b5cf6] hover:bg-purple-600"}`}
            >
                {isActive ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="none"><rect x="5" y="5" width="14" height="14" rx="2" /></svg>
                ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="22" />
                    </svg>
                )}
            </button>

            {showModal && (
                <div className="fixed inset-0 z-[200] flex items-end justify-center bg-black/50 backdrop-blur-sm" onClick={dismiss}>
                    <div className="w-full max-h-[80vh] overflow-y-auto bg-white dark:bg-[#1e293b] rounded-t-[2.5rem] p-6 pb-10 shadow-2xl flex flex-col gap-5 transition-colors" onClick={e => e.stopPropagation()}>

                        {/* Header */}
                        <div className="flex justify-between items-center">
                            <h2 className="font-extrabold text-[18px] text-[#0f172a] dark:text-white">
                                {isActive && "🎙 Listening — speak now"}
                                {state === "reviewing" && "Review Task"}
                                {state === "saving" && "Saving..."}
                                {state === "success" && "✅ Task Created!"}
                                {state === "error" && "Something went wrong"}
                            </h2>
                            <button onClick={dismiss} className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                            </button>
                        </div>

                        {/* Waveform */}
                        {isActive && (
                            <>
                                <div className="flex items-center justify-center gap-1.5 h-14">
                                    {[0.4, 0.7, 1, 0.8, 0.5, 0.9, 0.6, 1.1, 0.7, 0.4].map((h, i) => (
                                        <div key={i} className={`w-2 rounded-full ${state === "recording" ? "bg-[#8b5cf6]" : "bg-gray-300 dark:bg-gray-600"}`}
                                            style={{ height: `${h * 32}px`, animation: state === "recording" ? `wave 0.6s ease-in-out ${i * 0.07}s infinite alternate` : "none" }} />
                                    ))}
                                </div>
                                {rawTranscript && (
                                    <div className="bg-purple-50 dark:bg-purple-900/10 rounded-2xl p-4 border border-purple-100 dark:border-purple-500/20">
                                        <p className="text-[#0f172a] dark:text-white font-semibold text-[14px] italic">&ldquo;{rawTranscript}&rdquo;</p>
                                    </div>
                                )}
                                <p className="text-[12px] text-center text-[#64748b] dark:text-gray-400">Tap Stop when done speaking</p>
                                <button onClick={stopAndReview} className="w-full py-4 bg-red-500 text-white rounded-2xl font-extrabold text-[15px] hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="none"><rect x="4" y="4" width="16" height="16" rx="2" /></svg>
                                    Stop Recording
                                </button>
                            </>
                        )}

                        {/* Parsed Task Review */}
                        {state === "reviewing" && parsed && (
                            <>
                                <div className="bg-gray-50 dark:bg-[#0f172a] rounded-2xl p-1.5 border border-gray-200 dark:border-gray-700 flex flex-col divide-y divide-gray-100 dark:divide-gray-800">

                                    {/* Title */}
                                    <div className="flex items-start gap-3 p-3">
                                        <div className="w-8 h-8 bg-purple-50 dark:bg-purple-900/20 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[10px] font-bold text-[#64748b] dark:text-gray-400 uppercase tracking-widest mb-1">Task</p>
                                            <input
                                                value={parsed.title}
                                                onChange={e => setParsed(p => p ? { ...p, title: e.target.value } : p)}
                                                className="w-full font-bold text-[16px] text-[#0f172a] dark:text-white bg-transparent outline-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Date */}
                                    <div className="flex items-center gap-3 p-3">
                                        <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center shrink-0">
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[10px] font-bold text-[#64748b] dark:text-gray-400 uppercase tracking-widest mb-1">Date</p>
                                            <input
                                                type="date"
                                                value={parsed.dateStr}
                                                onChange={e => setParsed(p => p ? { ...p, dateStr: e.target.value } : p)}
                                                className="font-semibold text-[15px] text-[#3b82f6] bg-transparent outline-none"
                                            />
                                        </div>
                                        {parsed.dateStr === tomorrowStr && (
                                            <span className="text-[11px] font-bold bg-blue-50 dark:bg-blue-900/20 text-blue-500 dark:text-blue-400 px-2 py-0.5 rounded-full">Tomorrow</span>
                                        )}
                                        {parsed.dateStr === toDateStr(today) && (
                                            <span className="text-[11px] font-bold bg-green-50 dark:bg-green-900/20 text-green-500 dark:text-green-400 px-2 py-0.5 rounded-full">Today</span>
                                        )}
                                    </div>

                                    {/* Time */}
                                    <div className="flex items-center gap-3 p-3">
                                        <div className="w-8 h-8 bg-orange-50 dark:bg-orange-900/20 rounded-xl flex items-center justify-center shrink-0">
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[10px] font-bold text-[#64748b] dark:text-gray-400 uppercase tracking-widest mb-1">Time</p>
                                            <input
                                                value={parsed.time}
                                                onChange={e => setParsed(p => p ? { ...p, time: e.target.value } : p)}
                                                className="font-semibold text-[15px] text-[#0f172a] dark:text-white bg-transparent outline-none"
                                                placeholder="Anytime"
                                            />
                                        </div>
                                    </div>

                                    {/* Category */}
                                    <div className="flex items-center gap-3 p-3">
                                        <div className="w-8 h-8 bg-green-50 dark:bg-green-900/20 rounded-xl flex items-center justify-center shrink-0">
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#20c997" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" /></svg>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[10px] font-bold text-[#64748b] dark:text-gray-400 uppercase tracking-widest mb-1">Category</p>
                                            <select
                                                value={parsed.category}
                                                onChange={e => setParsed(p => p ? { ...p, category: e.target.value } : p)}
                                                className="font-semibold text-[15px] text-[#0f172a] dark:text-white bg-transparent outline-none"
                                            >
                                                <option>Work</option><option>Personal</option><option>Health</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Reminder */}
                                    <div className="flex items-center gap-3 p-3">
                                        <div className="w-8 h-8 bg-red-50 dark:bg-red-900/20 rounded-xl flex items-center justify-center shrink-0">
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[10px] font-bold text-[#64748b] dark:text-gray-400 uppercase tracking-widest mb-0.5">Alarm / Reminder</p>
                                            <p className="text-[13px] font-semibold text-[#0f172a] dark:text-white">{parsed.reminder ? "On" : "Off"}</p>
                                        </div>
                                        <button
                                            onClick={() => setParsed(p => p ? { ...p, reminder: !p.reminder } : p)}
                                            className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${parsed.reminder ? "bg-[#20c997]" : "bg-gray-200 dark:bg-gray-700"}`}
                                        >
                                            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${parsed.reminder ? "translate-x-6" : "translate-x-0"}`} />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button onClick={() => { setParsed(null); startRecording(); }} className="flex-1 py-3.5 bg-gray-100 dark:bg-gray-800 text-[#0f172a] dark:text-white rounded-2xl font-bold text-[15px] hover:bg-gray-200 transition-colors">
                                        Re-record
                                    </button>
                                    <button onClick={handleSave} className="flex-1 py-3.5 bg-[#8b5cf6] text-white rounded-2xl font-bold text-[15px] hover:bg-purple-600 transition-colors shadow-sm">
                                        Create Task ✓
                                    </button>
                                </div>
                            </>
                        )}

                        {/* Empty review state */}
                        {state === "reviewing" && !parsed && (
                            <div className="flex gap-3">
                                <button onClick={dismiss} className="flex-1 py-3.5 bg-gray-100 dark:bg-gray-800 text-[#0f172a] dark:text-white rounded-2xl font-bold text-[15px] transition-colors">Cancel</button>
                                <button onClick={startRecording} className="flex-1 py-3.5 bg-[#8b5cf6] text-white rounded-2xl font-bold text-[15px] hover:bg-purple-600 transition-colors">Try Again</button>
                            </div>
                        )}

                        {/* Error */}
                        {state === "error" && (
                            <>
                                <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-4 border border-red-100 dark:border-red-500/30">
                                    <p className="text-red-600 dark:text-red-400 font-medium text-[14px]">{errorMsg}</p>
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={dismiss} className="flex-1 py-3.5 bg-gray-100 dark:bg-gray-800 text-[#0f172a] dark:text-white rounded-2xl font-bold text-[15px] transition-colors">Dismiss</button>
                                    <button onClick={startRecording} className="flex-1 py-3.5 bg-[#8b5cf6] text-white rounded-2xl font-bold text-[15px] hover:bg-purple-600 transition-colors">Try Again</button>
                                </div>
                            </>
                        )}

                        <style>{`@keyframes wave { from { transform: scaleY(0.3); opacity: 0.6 } to { transform: scaleY(1); opacity: 1 } }`}</style>
                    </div>
                </div>
            )}
        </>
    );
}
