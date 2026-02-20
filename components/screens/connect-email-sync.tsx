"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Check, Loader2, Mail, Search } from "lucide-react"
import { useApp } from "@/lib/app-context"
import { VoiceMicButton } from "@/components/voice-mic-button"

type Phase = "select-provider" | "connecting" | "success"

const providers = [
  {
    id: "gmail",
    name: "Gmail",
    color: "#EA4335",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M2 6L12 13L22 6" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="2" y="4" width="20" height="16" rx="3" stroke="#EA4335" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
  },
  {
    id: "outlook",
    name: "Outlook",
    color: "#00A4EF",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M2 6L12 13L22 6" stroke="#00A4EF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="2" y="4" width="20" height="16" rx="3" stroke="#00A4EF" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
  },
  {
    id: "imap",
    name: "Other (IMAP)",
    color: "#6366F1",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M2 6L12 13L22 6" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="2" y="4" width="20" height="16" rx="3" stroke="#6366F1" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
  },
]

export function ConnectEmailSync() {
  const { setScreen, integrations, setIntegrationStatus } = useApp()
  const integration = integrations.find((i) => i.id === "email")
  const isAlreadyConnected = integration?.status === "connected"
  const [phase, setPhase] = useState<Phase>(isAlreadyConnected ? "success" : "select-provider")
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null)
  const [showDisconnect, setShowDisconnect] = useState(false)

  useEffect(() => {
    if (phase === "connecting") {
      setIntegrationStatus("email", "connecting")
      const t = setTimeout(() => {
        setIntegrationStatus("email", "connected")
        setPhase("success")
      }, 2000)
      return () => clearTimeout(t)
    }
  }, [phase, setIntegrationStatus])

  const handleDisconnect = () => {
    setIntegrationStatus("email", "disconnected")
    setShowDisconnect(false)
    setScreen("integrations")
  }

  return (
    <div className="h-full flex flex-col bg-background">
      <header className="flex items-center justify-between px-5 pt-4 pb-2">
        <button type="button" onClick={() => setScreen("integrations")} className="p-1" aria-label="Go back">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">Connect Email</h1>
        <VoiceMicButton />
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col items-center">
        {phase === "select-provider" && (
          <div className="flex flex-col items-center gap-6 w-full animate-fade-slide-in">
            <div className="w-20 h-20 rounded-2xl bg-[#6366F1] flex items-center justify-center shadow-lg">
              <Mail className="w-10 h-10 text-white" />
            </div>

            <div className="text-center">
              <h2 className="text-xl font-bold text-foreground">Connect Email</h2>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed px-4">
                RingTask scans your emails for meeting invites and automatically converts them into tasks.
              </p>
            </div>

            <div className="w-full flex flex-col gap-3">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Choose your provider</h3>
              {providers.map((provider) => (
                <button
                  key={provider.id}
                  type="button"
                  onClick={() => setSelectedProvider(provider.id)}
                  className={`w-full bg-card rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex items-center gap-4 active:scale-[0.98] transition-all border-2 ${
                    selectedProvider === provider.id ? "border-primary" : "border-transparent"
                  }`}
                >
                  <div className="flex-shrink-0">{provider.icon}</div>
                  <span className="text-sm font-semibold text-foreground flex-1 text-left">{provider.name}</span>
                  {selectedProvider === provider.id && <Check className="w-5 h-5 text-primary" />}
                </button>
              ))}
            </div>

            <div className="w-full bg-card rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex items-start gap-3">
              <Search className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Smart Meeting Detection</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  We scan for calendar invites, Zoom/Meet links, and scheduling confirmations.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => selectedProvider && setPhase("connecting")}
              disabled={!selectedProvider}
              className={`w-full py-4 rounded-full text-base font-semibold active:scale-[0.98] transition-all shadow-sm ${
                selectedProvider
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              Connect Email
            </button>
          </div>
        )}

        {phase === "connecting" && (
          <div className="flex flex-col items-center justify-center flex-1 gap-5 animate-fade-slide-in">
            <div className="w-20 h-20 rounded-2xl bg-[#6366F1] flex items-center justify-center shadow-lg">
              <Loader2 className="w-10 h-10 text-white animate-spin" />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground">Scanning emails...</p>
              <p className="text-sm text-muted-foreground mt-1">Looking for meeting invites</p>
            </div>
          </div>
        )}

        {phase === "success" && (
          <div className="flex flex-col items-center justify-center flex-1 gap-5 animate-fade-slide-in">
            <div className="w-20 h-20 rounded-full bg-[#10B981]/10 flex items-center justify-center">
              <Check className="w-10 h-10 text-[#10B981]" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-foreground">Email Connected</h2>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed px-4">
                Meeting invites detected in your emails will be converted into tasks automatically.
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
            <p className="text-sm text-muted-foreground text-center mb-6">Stop scanning emails for meeting invites?</p>
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
