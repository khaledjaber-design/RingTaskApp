"use client"

import { ArrowLeft, Check, Loader2, RefreshCw, AlertCircle } from "lucide-react"
import { useApp, type IntegrationStatus, type Screen } from "@/lib/app-context"
import { VoiceMicButton } from "@/components/voice-mic-button"

function AppleCalIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="6" fill="#FF3B30" />
      <text x="14" y="19" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="sans-serif">26</text>
    </svg>
  )
}

function GoogleCalIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="6" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
      <rect x="4" y="4" width="9" height="9" rx="1" fill="#4285F4" />
      <rect x="15" y="4" width="9" height="9" rx="1" fill="#34A853" />
      <rect x="4" y="15" width="9" height="9" rx="1" fill="#FBBC04" />
      <rect x="15" y="15" width="9" height="9" rx="1" fill="#EA4335" />
    </svg>
  )
}

function MicrosoftIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="6" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
      <rect x="4" y="4" width="9" height="9" fill="#F25022" />
      <rect x="15" y="4" width="9" height="9" fill="#7FBA00" />
      <rect x="4" y="15" width="9" height="9" fill="#00A4EF" />
      <rect x="15" y="15" width="9" height="9" fill="#FFB900" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="6" fill="#6366F1" />
      <path d="M6 10L14 15L22 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="6" y="8" width="16" height="12" rx="2" stroke="white" strokeWidth="1.5" fill="none"/>
    </svg>
  )
}

function StatusBadge({ status }: { status: IntegrationStatus }) {
  if (status === "connected") {
    return (
      <span className="flex items-center gap-1 text-xs font-medium text-[#10B981]">
        <Check className="w-3.5 h-3.5" />
        Syncing
      </span>
    )
  }
  if (status === "connecting") {
    return (
      <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
        Connecting
      </span>
    )
  }
  if (status === "error") {
    return (
      <span className="flex items-center gap-1 text-xs font-medium text-destructive">
        <AlertCircle className="w-3.5 h-3.5" />
        Error
      </span>
    )
  }
  return null
}

const iconMap: Record<string, () => React.ReactNode> = {
  apple: AppleCalIcon,
  google: GoogleCalIcon,
  microsoft: MicrosoftIcon,
  email: EmailIcon,
}

const screenMap: Record<string, Screen> = {
  apple: "connect-apple",
  google: "connect-google",
  microsoft: "connect-microsoft",
  email: "connect-email",
}

export function IntegrationsScreen() {
  const { setScreen, integrations, setIntegrationStatus } = useApp()
  const connectedCount = integrations.filter((i) => i.status === "connected").length

  return (
    <div className="h-full flex flex-col bg-background">
      <header className="flex items-center justify-between px-5 pt-4 pb-2">
        <button type="button" onClick={() => setScreen("settings")} className="p-1" aria-label="Go back">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">Connected Accounts</h1>
        <VoiceMicButton />
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
        {/* Summary */}
        <div className="bg-primary/10 rounded-xl px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">{connectedCount} of {integrations.length} connected</p>
            <p className="text-xs text-muted-foreground mt-0.5">Sync calendars and meetings</p>
          </div>
          {connectedCount > 0 && (
            <button
              type="button"
              onClick={() => setScreen("sync-status")}
              className="px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium active:scale-95 transition-transform"
            >
              Sync Status
            </button>
          )}
        </div>

        {/* Integration Cards */}
        <div className="flex flex-col gap-3">
          {integrations.map((integration) => {
            const Icon = iconMap[integration.id]
            const isConnected = integration.status === "connected"
            const isError = integration.status === "error"

            return (
              <div
                key={integration.id}
                className="bg-card rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex items-center gap-4"
              >
                <div className="flex-shrink-0">{Icon && <Icon />}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{integration.name}</p>
                  <StatusBadge status={integration.status} />
                  {integration.status === "disconnected" && (
                    <p className="text-xs text-muted-foreground">Not connected</p>
                  )}
                </div>

                {isConnected ? (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setScreen(screenMap[integration.id])}
                      className="p-2 rounded-lg active:bg-secondary transition-colors"
                      aria-label="Manage"
                    >
                      <RefreshCw className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                ) : isError ? (
                  <button
                    type="button"
                    onClick={() => setScreen(screenMap[integration.id])}
                    className="px-4 py-2 rounded-full bg-destructive text-destructive-foreground text-xs font-semibold active:scale-95 transition-transform"
                  >
                    Retry
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setScreen(screenMap[integration.id])}
                    className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-semibold active:scale-95 transition-transform"
                  >
                    Connect
                  </button>
                )}
              </div>
            )
          })}
        </div>

        {/* Info */}
        <p className="text-xs text-muted-foreground text-center mt-2 px-4 leading-relaxed">
          Connected calendars sync meetings automatically. You can manage sync settings from the Sync Status screen.
        </p>
      </div>
    </div>
  )
}
