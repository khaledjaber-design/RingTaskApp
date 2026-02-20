"use client"

import { Mic } from "lucide-react"
import { useApp } from "@/lib/app-context"

export function VoiceMicButton() {
  const { setVoiceModalOpen } = useApp()

  return (
    <button
      type="button"
      onClick={() => setVoiceModalOpen(true)}
      className="w-10 h-10 rounded-full bg-[#8B5CF6] flex items-center justify-center shadow-lg active:scale-95 transition-transform"
      aria-label="Voice command"
    >
      <Mic className="w-5 h-5 text-white" />
    </button>
  )
}
