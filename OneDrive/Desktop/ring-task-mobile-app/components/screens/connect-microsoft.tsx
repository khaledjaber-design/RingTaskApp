"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Check, Loader2, Calendar, Video, Users } from "lucide-react"
import { useApp } from "@/lib/app-context"
import { VoiceMicButton } from "@/components/voice-mic-button"

type Phase = "sign-in" | "permissions" | "connecting" | "success"

export function ConnectMicrosoft() {
  const { setScreen, integrations, setIntegrationStatus } = useApp()
  const integration = integrations.find((i) => i.id === "microsoft")
  const isAlreadyConnected = integration?.status === "connected"
  const [phase, setPhase] = useState<Phase>(isAlreadyConnected ? "success" : "sign-in")
  const [email, setEmail] = useState("")
  const [showDisconnect, setShowDisconnect] = useState(false)

  useEffect(() => {
    if (phase === "connecting") {
      setIntegrationStatus("microsoft", "connecting")
      const t = setTimeout(() => {
        setIntegrationStatus("microsoft", "connected")
        setPhase("success")
      }, 2500)
      return () => clearTimeout(t)
    }
  }, [phase, setIntegrationStatus])

  const handleDisconnect = () => {
    setIntegrationStatus("microsoft", "disconnected")
    setShowDisconnect(false)
    setScreen("integrations")
  }

  return (
    <div className="h-full flex flex-col bg-background">
      <header className="flex items-center justify-between px-5 pt-4 pb-2">
        <button type="button" onClick={() => setScreen("integrations")} className="p-1" aria-label="Go back">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">Outlook & Teams</h1>
        <VoiceMicButton />
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col items-center">
        {phase === "sign-in" && (
          <div className="flex flex-col items-center gap-6 w-full animate-fade-slide-in">
            <div className="w-20 h-20 rounded-2xl bg-white border border-border flex items-center justify-center shadow-lg">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <rect x="4" y="4" width="14" height="14" fill="#F25022" />
                <rect x="22" y="4" width="14" height="14" fill="#7FBA00" />
                <rect x="4" y="22" width="14" height="14" fill="#00A4EF" />
                <rect x="22" y="22" width="14" height="14" fill="#FFB900" />
              </svg>
            </div>

            <div className="text-center">
              <h2 className="text-xl font-bold text-foreground">Connect Outlook & Teams</h2>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed px-4">
                Sign in with your Microsoft account to sync calendar events and Teams meetings.
              </p>
            </div>

            <div className="w-full flex flex-col gap-3">
              <label className="text-sm font-medium text-foreground" htmlFor="ms-email">
                Microsoft account
              </label>
              <input
                id="ms-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="khaled@outlook.com"
                className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:border-[#00A4EF] focus:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setPhase("permissions")}
                className="w-full py-4 rounded-full bg-[#00A4EF] text-white text-base font-semibold active:scale-[0.98] transition-transform shadow-sm mt-2"
              >
                Sign in with Microsoft
              </button>
            </div>
          </div>
        )}

        {phase === "permissions" && (
          <div className="flex flex-col items-center gap-6 w-full animate-fade-slide-in">
            <div className="text-center">
              <h2 className="text-lg font-bold text-foreground">Permissions Required</h2>
              <p className="text-sm text-muted-foreground mt-1">RingTask needs access to:</p>
            </div>

            <div className="w-full bg-card rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#00A4EF]/10 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-[#00A4EF]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Outlook Calendar</p>
                  <p className="text-xs text-muted-foreground">Events and appointments</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#7B83EB]/10 flex items-center justify-center">
                  <Video className="w-4 h-4 text-[#7B83EB]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Teams Meetings</p>
                  <p className="text-xs text-muted-foreground">Scheduled calls and conferences</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#7FBA00]/10 flex items-center justify-center">
                  <Users className="w-4 h-4 text-[#7FBA00]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Teams Calls</p>
                  <p className="text-xs text-muted-foreground">Ad-hoc and scheduled calls</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setPhase("connecting")}
              className="w-full py-4 rounded-full bg-[#00A4EF] text-white text-base font-semibold active:scale-[0.98] transition-transform"
            >
              Allow Access
            </button>
          </div>
        )}

        {phase === "connecting" && (
          <div className="flex flex-col items-center justify-center flex-1 gap-5 animate-fade-slide-in">
            <div className="w-20 h-20 rounded-2xl bg-white border border-border flex items-center justify-center shadow-lg">
              <Loader2 className="w-10 h-10 text-[#00A4EF] animate-spin" />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground">Syncing Outlook & Teams...</p>
              <p className="text-sm text-muted-foreground mt-1">Importing meetings and events</p>
            </div>
          </div>
        )}

        {phase === "success" && (
          <div className="flex flex-col items-center justify-center flex-1 gap-5 animate-fade-slide-in">
            <div className="w-20 h-20 rounded-full bg-[#10B981]/10 flex items-center justify-center">
              <Check className="w-10 h-10 text-[#10B981]" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-foreground">Outlook & Teams Connected</h2>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed px-4">
                Your calendar events and Teams meetings now appear as tasks with the Teams icon.
              </p>
            </div>
            <div className="w-full flex flex-col gap-3 mt-4">
              <button type="button" onClick={() => setScreen("integrations")} className="w-full py-4 rounded-full bg-primary text-primary-foreground text-base font-semibold active:scale-[0.98] transition-transform">
                Done
              </button>
              <button type="button" onClick={() => setShowDisconnect(true)} className="w-full py-3 rounded-full text-destructive text-sm font-medium active:opacity-70 transition-opacity">
                Disconnect
              </button>
            </div>
          </div>
        )}
      </div>

      {showDisconnect && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-foreground/40">
          <div className="bg-card rounded-2xl p-6 mx-8 shadow-xl w-full max-w-[300px] animate-fade-slide-in">
            <h3 className="text-lg font-bold text-foreground text-center mb-2">Disconnect?</h3>
            <p className="text-sm text-muted-foreground text-center mb-6">Stop syncing Outlook & Teams?</p>
            <div className="flex gap-3">
              <button type="button" onClick={() => setShowDisconnect(false)} className="flex-1 py-3 rounded-xl border-2 border-border text-foreground text-sm font-medium active:scale-95 transition-transform">Cancel</button>
              <button type="button" onClick={handleDisconnect} className="flex-1 py-3 rounded-xl bg-destructive text-destructive-foreground text-sm font-medium active:scale-95 transition-transform">Disconnect</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
