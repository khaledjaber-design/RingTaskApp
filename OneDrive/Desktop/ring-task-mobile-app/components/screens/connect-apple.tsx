"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Check, Calendar, Bell, Loader2 } from "lucide-react"
import { useApp } from "@/lib/app-context"
import { VoiceMicButton } from "@/components/voice-mic-button"

type Phase = "permission" | "connecting" | "success"

export function ConnectApple() {
  const { setScreen, integrations, setIntegrationStatus } = useApp()
  const integration = integrations.find((i) => i.id === "apple")
  const isAlreadyConnected = integration?.status === "connected"
  const [phase, setPhase] = useState<Phase>(isAlreadyConnected ? "success" : "permission")
  const [showDisconnect, setShowDisconnect] = useState(false)

  useEffect(() => {
    if (phase === "connecting") {
      setIntegrationStatus("apple", "connecting")
      const t = setTimeout(() => {
        setIntegrationStatus("apple", "connected")
        setPhase("success")
      }, 2000)
      return () => clearTimeout(t)
    }
  }, [phase, setIntegrationStatus])

  const handleDisconnect = () => {
    setIntegrationStatus("apple", "disconnected")
    setShowDisconnect(false)
    setScreen("integrations")
  }

  return (
    <div className="h-full flex flex-col bg-background">
      <header className="flex items-center justify-between px-5 pt-4 pb-2">
        <button type="button" onClick={() => setScreen("integrations")} className="p-1" aria-label="Go back">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">Apple Calendar</h1>
        <VoiceMicButton />
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col items-center">
        {phase === "permission" && (
          <div className="flex flex-col items-center gap-6 w-full animate-fade-slide-in">
            {/* Icon */}
            <div className="w-20 h-20 rounded-2xl bg-[#FF3B30] flex items-center justify-center shadow-lg">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <text x="20" y="28" textAnchor="middle" fill="white" fontSize="22" fontWeight="bold" fontFamily="sans-serif">26</text>
              </svg>
            </div>

            <div className="text-center">
              <h2 className="text-xl font-bold text-foreground">Connect Apple Calendar</h2>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed px-4">
                RingTask will import your events and reminders from Apple Calendar and convert them into tasks.
              </p>
            </div>

            {/* Permissions list */}
            <div className="w-full bg-card rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex flex-col gap-4">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Permissions needed</h3>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#FF3B30]/10 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-[#FF3B30]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Calendar Events</p>
                  <p className="text-xs text-muted-foreground">Read your calendar events</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#FF3B30]/10 flex items-center justify-center">
                  <Bell className="w-4 h-4 text-[#FF3B30]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Reminders</p>
                  <p className="text-xs text-muted-foreground">Import reminders as tasks</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setPhase("connecting")}
              className="w-full py-4 rounded-full bg-[#111827] text-white text-base font-semibold active:scale-[0.98] transition-transform shadow-sm"
            >
              Allow Calendar Access
            </button>

            <p className="text-xs text-muted-foreground text-center px-6 leading-relaxed">
              You can disconnect at any time from Settings.
            </p>
          </div>
        )}

        {phase === "connecting" && (
          <div className="flex flex-col items-center justify-center flex-1 gap-5 animate-fade-slide-in">
            <div className="w-20 h-20 rounded-2xl bg-[#FF3B30] flex items-center justify-center shadow-lg">
              <Loader2 className="w-10 h-10 text-white animate-spin" />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground">Connecting...</p>
              <p className="text-sm text-muted-foreground mt-1">Importing your calendar events</p>
            </div>
          </div>
        )}

        {phase === "success" && (
          <div className="flex flex-col items-center justify-center flex-1 gap-5 animate-fade-slide-in">
            <div className="w-20 h-20 rounded-full bg-[#10B981]/10 flex items-center justify-center">
              <Check className="w-10 h-10 text-[#10B981]" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-foreground">Connected</h2>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed px-4">
                Apple Calendar is syncing. Your events and reminders will appear as tasks automatically.
              </p>
            </div>

            <div className="w-full flex flex-col gap-3 mt-4">
              <button
                type="button"
                onClick={() => setScreen("integrations")}
                className="w-full py-4 rounded-full bg-primary text-primary-foreground text-base font-semibold active:scale-[0.98] transition-transform"
              >
                Done
              </button>
              <button
                type="button"
                onClick={() => setShowDisconnect(true)}
                className="w-full py-3 rounded-full text-destructive text-sm font-medium active:opacity-70 transition-opacity"
              >
                Disconnect
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Disconnect confirmation */}
      {showDisconnect && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-foreground/40">
          <div className="bg-card rounded-2xl p-6 mx-8 shadow-xl w-full max-w-[300px] animate-fade-slide-in">
            <h3 className="text-lg font-bold text-foreground text-center mb-2">Disconnect?</h3>
            <p className="text-sm text-muted-foreground text-center mb-6">
              Are you sure you want to disconnect Apple Calendar? Future syncing will stop.
            </p>
            <div className="flex gap-3">
              <button type="button" onClick={() => setShowDisconnect(false)} className="flex-1 py-3 rounded-xl border-2 border-border text-foreground text-sm font-medium active:scale-95 transition-transform">
                Cancel
              </button>
              <button type="button" onClick={handleDisconnect} className="flex-1 py-3 rounded-xl bg-destructive text-destructive-foreground text-sm font-medium active:scale-95 transition-transform">
                Disconnect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
