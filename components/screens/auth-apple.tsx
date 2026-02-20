"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Loader2, CheckCircle, Shield } from "lucide-react"
import { useApp } from "@/lib/app-context"
import { VoiceMicButton } from "@/components/voice-mic-button"

type AuthState = "prompt" | "authenticating" | "success"

function AppleLogo({ className }: { className?: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  )
}

function FaceIdIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-foreground" aria-hidden="true">
      {/* Outer frame corners */}
      <path d="M8 16V10a2 2 0 0 1 2-2h6" />
      <path d="M32 8h6a2 2 0 0 1 2 2v6" />
      <path d="M40 32v6a2 2 0 0 1-2 2h-6" />
      <path d="M16 40h-6a2 2 0 0 1-2-2v-6" />
      {/* Eyes */}
      <path d="M18 17v4" />
      <path d="M30 17v4" />
      {/* Nose */}
      <path d="M24 22v4h-2" />
      {/* Mouth */}
      <path d="M18 32c1.5 2 4.5 3 6 3s4.5-1 6-3" />
    </svg>
  )
}

export function AuthApple() {
  const { setScreen } = useApp()
  const [state, setState] = useState<AuthState>("prompt")

  useEffect(() => {
    if (state === "authenticating") {
      const t = setTimeout(() => setState("success"), 2200)
      return () => clearTimeout(t)
    }
    if (state === "success") {
      const t = setTimeout(() => setScreen("home"), 1000)
      return () => clearTimeout(t)
    }
  }, [state, setScreen])

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-4 pb-2">
        <button
          type="button"
          onClick={() => setScreen("login")}
          className="p-1"
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">Sign in with Apple</h1>
        <VoiceMicButton />
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* Apple logo */}
        <div className="w-16 h-16 rounded-2xl bg-[#111827] flex items-center justify-center mb-8 shadow-sm">
          <AppleLogo className="text-white" />
        </div>

        {state === "prompt" && (
          <div className="w-full flex flex-col items-center gap-6">
            {/* Apple Sign-In card */}
            <div className="w-full bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="p-5 flex flex-col items-center gap-4">
                <FaceIdIcon />
                <div className="text-center">
                  <p className="text-base font-semibold text-foreground mb-1">
                    Use Face ID to sign in
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Authenticate securely with Face ID or Touch ID
                  </p>
                </div>
              </div>
              <div className="border-t border-border px-5 py-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#111827] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">KJ</span>
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-semibold text-foreground">Khaled Jaber</p>
                    <p className="text-xs text-muted-foreground">khaled@icloud.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy notice */}
            <div className="flex items-start gap-3 px-2">
              <Shield className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Apple will not track your activity. Your email can be kept private using Hide My Email.
              </p>
            </div>

            {/* Sign in button */}
            <button
              type="button"
              onClick={() => setState("authenticating")}
              className="w-full h-12 rounded-3xl bg-[#111827] text-white text-[15px] font-medium flex items-center justify-center gap-3 active:scale-[0.98] transition-transform"
            >
              <AppleLogo className="text-white !w-5 !h-5" />
              Continue with Apple
            </button>
          </div>
        )}

        {state === "authenticating" && (
          <div className="flex flex-col items-center gap-5">
            {/* Animated Face ID scan */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 rounded-2xl border-2 border-primary animate-pulse" />
              <FaceIdIcon />
            </div>
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
              <p className="text-sm text-muted-foreground">Verifying with Face ID...</p>
            </div>
          </div>
        )}

        {state === "success" && (
          <div className="flex flex-col items-center gap-4 animate-fade-slide-in">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            <p className="text-base font-semibold text-foreground">Authenticated with Apple</p>
            <p className="text-sm text-muted-foreground">Welcome back, Khaled!</p>
          </div>
        )}
      </div>
    </div>
  )
}
