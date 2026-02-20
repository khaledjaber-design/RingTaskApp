"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Check, Loader2 } from "lucide-react"
import { useApp } from "@/lib/app-context"
import { VoiceMicButton } from "@/components/voice-mic-button"

type Phase = "sign-in" | "account-select" | "connecting" | "success"

export function ConnectGoogleCal() {
  const { setScreen, integrations, setIntegrationStatus } = useApp()
  const integration = integrations.find((i) => i.id === "google")
  const isAlreadyConnected = integration?.status === "connected"
  const [phase, setPhase] = useState<Phase>(isAlreadyConnected ? "success" : "sign-in")
  const [showDisconnect, setShowDisconnect] = useState(false)

  useEffect(() => {
    if (phase === "connecting") {
      setIntegrationStatus("google", "connecting")
      const t = setTimeout(() => {
        setIntegrationStatus("google", "connected")
        setPhase("success")
      }, 2000)
      return () => clearTimeout(t)
    }
  }, [phase, setIntegrationStatus])

  const handleDisconnect = () => {
    setIntegrationStatus("google", "disconnected")
    setShowDisconnect(false)
    setScreen("integrations")
  }

  return (
    <div className="h-full flex flex-col bg-background">
      <header className="flex items-center justify-between px-5 pt-4 pb-2">
        <button type="button" onClick={() => setScreen("integrations")} className="p-1" aria-label="Go back">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">Google Calendar</h1>
        <VoiceMicButton />
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col items-center">
        {phase === "sign-in" && (
          <div className="flex flex-col items-center gap-6 w-full animate-fade-slide-in">
            <div className="w-20 h-20 rounded-2xl bg-white border border-border flex items-center justify-center shadow-lg">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <rect x="4" y="4" width="14" height="14" rx="2" fill="#4285F4" />
                <rect x="22" y="4" width="14" height="14" rx="2" fill="#34A853" />
                <rect x="4" y="22" width="14" height="14" rx="2" fill="#FBBC04" />
                <rect x="22" y="22" width="14" height="14" rx="2" fill="#EA4335" />
              </svg>
            </div>

            <div className="text-center">
              <h2 className="text-xl font-bold text-foreground">Connect Google Calendar</h2>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed px-4">
                Sign in with Google to sync your calendar events and meetings to RingTask.
              </p>
            </div>

            <div className="w-full bg-card rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex flex-col gap-3">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">RingTask will access</h3>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                <span>View and edit calendar events</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Read meeting details and links</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Sync new events automatically</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setPhase("account-select")}
              className="w-full py-4 rounded-full bg-white border-2 border-border text-foreground text-base font-semibold flex items-center justify-center gap-3 active:scale-[0.98] transition-transform shadow-sm"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M18.17 8.37H17.5V8.33H10V11.67H14.71C14.02 13.61 12.18 15 10 15C7.24 15 5 12.76 5 10C5 7.24 7.24 5 10 5C11.27 5 12.42 5.48 13.3 6.26L15.66 3.9C14.15 2.5 12.18 1.67 10 1.67C5.4 1.67 1.67 5.4 1.67 10C1.67 14.6 5.4 18.33 10 18.33C14.6 18.33 18.33 14.6 18.33 10C18.33 9.44 18.28 8.9 18.17 8.37Z" fill="#FFC107"/>
                <path d="M2.63 6.12L5.37 8.13C6.11 6.29 7.9 5 10 5C11.27 5 12.42 5.48 13.3 6.26L15.66 3.9C14.15 2.5 12.18 1.67 10 1.67C6.95 1.67 4.31 3.47 2.63 6.12Z" fill="#FF3D00"/>
                <path d="M10 18.33C12.13 18.33 14.05 17.54 15.54 16.2L12.96 14.01C12.12 14.65 11.09 15 10 15C7.83 15 6 13.62 5.3 11.7L2.58 13.79C4.24 16.51 6.92 18.33 10 18.33Z" fill="#4CAF50"/>
                <path d="M18.17 8.37H17.5V8.33H10V11.67H14.71C14.38 12.59 13.79 13.38 12.96 13.95L15.54 16.14C15.36 16.3 18.33 14.17 18.33 10C18.33 9.44 18.28 8.9 18.17 8.37Z" fill="#1976D2"/>
              </svg>
              Sign in with Google
            </button>
          </div>
        )}

        {phase === "account-select" && (
          <div className="flex flex-col items-center gap-5 w-full animate-fade-slide-in">
            <div className="text-center">
              <h2 className="text-lg font-bold text-foreground">Choose an account</h2>
              <p className="text-sm text-muted-foreground mt-1">to continue to RingTask</p>
            </div>
            <div className="w-full flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setPhase("connecting")}
                className="w-full bg-card rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex items-center gap-4 active:scale-[0.98] transition-transform"
              >
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground text-sm font-bold">KJ</span>
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-foreground">Khaled Jaber</p>
                  <p className="text-xs text-muted-foreground">khaled@gmail.com</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setPhase("connecting")}
                className="w-full bg-card rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex items-center gap-4 active:scale-[0.98] transition-transform"
              >
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground text-sm font-bold">KJ</span>
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-foreground">Khaled Jaber</p>
                  <p className="text-xs text-muted-foreground">khaled.work@gmail.com</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {phase === "connecting" && (
          <div className="flex flex-col items-center justify-center flex-1 gap-5 animate-fade-slide-in">
            <div className="w-20 h-20 rounded-2xl bg-white border border-border flex items-center justify-center shadow-lg">
              <Loader2 className="w-10 h-10 text-[#4285F4] animate-spin" />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground">Syncing Calendar...</p>
              <p className="text-sm text-muted-foreground mt-1">Importing your events and meetings</p>
            </div>
          </div>
        )}

        {phase === "success" && (
          <div className="flex flex-col items-center justify-center flex-1 gap-5 animate-fade-slide-in">
            <div className="w-20 h-20 rounded-full bg-[#10B981]/10 flex items-center justify-center">
              <Check className="w-10 h-10 text-[#10B981]" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-foreground">Google Calendar Connected</h2>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed px-4">
                Meetings are being imported automatically. They will appear in your Calendar and Day View.
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
            <p className="text-sm text-muted-foreground text-center mb-6">Stop syncing Google Calendar events?</p>
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
