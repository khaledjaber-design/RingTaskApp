"use client"

import { useEffect, useState } from "react"
import { Mic, X, Check, Loader2 } from "lucide-react"
import { useApp } from "@/lib/app-context"

type VoiceState = "listening" | "processing" | "creating" | "done"

export function VoiceModal() {
  const { voiceModalOpen, setVoiceModalOpen, addTask, setScreen } = useApp()
  const [state, setState] = useState<VoiceState>("listening")

  useEffect(() => {
    if (!voiceModalOpen) {
      setState("listening")
      return
    }

    const t1 = setTimeout(() => setState("processing"), 2500)
    const t2 = setTimeout(() => setState("creating"), 4500)
    const t3 = setTimeout(() => {
      setState("done")
      addTask({
        title: "Team Standup",
        category: "Work",
        priority: "Medium",
        date: "2026-01-27",
        time: "9:00 AM",
        reminder: true,
        repeat: "Daily",
        alarm: false,
      })
    }, 6000)
    const t4 = setTimeout(() => {
      setVoiceModalOpen(false)
      setScreen("home")
    }, 7000)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [voiceModalOpen, addTask, setVoiceModalOpen, setScreen])

  if (!voiceModalOpen) return null

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#8B5CF6]/95 animate-in fade-in duration-300">
      {/* Pulsing mic */}
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse-ring" />
        <div className="absolute -inset-4 rounded-full bg-white/10 animate-pulse-ring" style={{ animationDelay: "0.4s" }} />
        <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
          {state === "done" ? (
            <Check className="w-12 h-12 text-white" />
          ) : state === "processing" || state === "creating" ? (
            <Loader2 className="w-12 h-12 text-white animate-spin" />
          ) : (
            <Mic className="w-12 h-12 text-white" />
          )}
        </div>
      </div>

      {/* State text */}
      <p className="text-white text-2xl font-semibold mb-2">
        {state === "listening" && "Listening..."}
        {state === "processing" && "Processing..."}
        {state === "creating" && "Creating task..."}
        {state === "done" && "Task created!"}
      </p>

      {state === "listening" && (
        <p className="text-white/70 text-sm mb-8">
          {"\"Add team standup tomorrow at 9am\""}
        </p>
      )}

      {/* Waveform */}
      {(state === "listening" || state === "processing") && (
        <div className="flex items-center gap-1 mb-12 h-8">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="w-1 bg-white/60 rounded-full animate-waveform"
              style={{
                animationDelay: `${i * 0.08}s`,
                animationDuration: `${0.4 + Math.random() * 0.4}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Cancel button */}
      {state !== "done" && (
        <button
          type="button"
          onClick={() => setVoiceModalOpen(false)}
          className="mt-4 flex items-center gap-2 px-6 py-3 rounded-full border-2 border-white/50 text-white active:scale-95 transition-transform"
        >
          <X className="w-5 h-5" />
          <span>Cancel</span>
        </button>
      )}
    </div>
  )
}
