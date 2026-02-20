"use client"

import { useState } from "react"
import { ArrowLeft, RefreshCw, Check, Clock, AlertCircle, ChevronDown } from "lucide-react"
import { useApp, type IntegrationStatus } from "@/lib/app-context"
import { VoiceMicButton } from "@/components/voice-mic-button"

const frequencyOptions = ["Real-time", "Hourly", "Daily"]

function StatusDot({ status }: { status: IntegrationStatus }) {
  if (status === "connected") return <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
  if (status === "connecting") return <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
  if (status === "error") return <span className="w-2.5 h-2.5 rounded-full bg-destructive" />
  return <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
}

export function SyncStatusScreen() {
  const { setScreen, integrations, syncFrequency, setSyncFrequency } = useApp()
  const connectedIntegrations = integrations.filter((i) => i.status === "connected")
  const [syncing, setSyncing] = useState(false)
  const [showFreqPicker, setShowFreqPicker] = useState(false)
  const [lastManualSync, setLastManualSync] = useState<string | null>(null)

  const handleManualSync = () => {
    setSyncing(true)
    setTimeout(() => {
      setSyncing(false)
      setLastManualSync(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
    }, 1500)
  }

  return (
    <div className="h-full flex flex-col bg-background">
      <header className="flex items-center justify-between px-5 pt-4 pb-2">
        <button type="button" onClick={() => setScreen("integrations")} className="p-1" aria-label="Go back">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">Sync Status</h1>
        <VoiceMicButton />
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-5">
        {/* Last Sync */}
        <div className="bg-card rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-5 h-5 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Last Sync</h3>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {lastManualSync || "2:35 PM"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {lastManualSync ? "Manual sync completed" : "Auto-synced today"}
          </p>
        </div>

        {/* Sync Frequency */}
        <div className="bg-card rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          <h3 className="text-sm font-semibold text-foreground mb-3">Sync Frequency</h3>
          <button
            type="button"
            onClick={() => setShowFreqPicker(!showFreqPicker)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 border-border bg-background active:border-primary transition-colors"
          >
            <span className="text-sm text-foreground font-medium">{syncFrequency}</span>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showFreqPicker ? "rotate-180" : ""}`} />
          </button>
          {showFreqPicker && (
            <div className="mt-2 flex flex-col gap-1">
              {frequencyOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setSyncFrequency(option)
                    setShowFreqPicker(false)
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                    syncFrequency === option
                      ? "bg-primary/10 text-primary"
                      : "bg-background text-foreground"
                  }`}
                >
                  <span className="text-sm font-medium">{option}</span>
                  {syncFrequency === option && <Check className="w-4 h-4 text-primary" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Connected Services */}
        <div className="bg-card rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          <h3 className="text-sm font-semibold text-foreground mb-3">Connected Services</h3>
          <div className="flex flex-col gap-3">
            {integrations.map((integration) => (
              <div key={integration.id} className="flex items-center gap-3">
                <StatusDot status={integration.status} />
                <span className="text-sm text-foreground flex-1">{integration.name}</span>
                <span className="text-xs text-muted-foreground">
                  {integration.status === "connected" && (integration.lastSync ? `Synced ${integration.lastSync}` : "Active")}
                  {integration.status === "disconnected" && "Not connected"}
                  {integration.status === "error" && "Sync failed"}
                  {integration.status === "connecting" && "Syncing..."}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Manual Sync */}
        <button
          type="button"
          onClick={handleManualSync}
          disabled={syncing || connectedIntegrations.length === 0}
          className={`w-full py-4 rounded-full text-base font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-sm ${
            syncing || connectedIntegrations.length === 0
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-primary text-primary-foreground"
          }`}
        >
          <RefreshCw className={`w-5 h-5 ${syncing ? "animate-spin" : ""}`} />
          {syncing ? "Syncing..." : "Sync Now"}
        </button>

        {connectedIntegrations.length === 0 && (
          <p className="text-xs text-muted-foreground text-center">
            Connect at least one service to enable syncing.
          </p>
        )}

        {/* Error Logs */}
        {integrations.some((i) => i.status === "error") && (
          <div className="bg-destructive/10 rounded-xl p-4 border border-destructive/20">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-destructive" />
              <h3 className="text-sm font-semibold text-destructive">Sync Errors</h3>
            </div>
            {integrations
              .filter((i) => i.status === "error")
              .map((i) => (
                <p key={i.id} className="text-xs text-destructive/80 mt-1">
                  {i.name}: Connection timed out. Please retry.
                </p>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
