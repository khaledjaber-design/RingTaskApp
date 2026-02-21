"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Loader2, CheckCircle, Mail } from "lucide-react"
import { useApp } from "@/lib/app-context"
import { VoiceMicButton } from "@/components/voice-mic-button"

type ResetState = "form" | "loading" | "success"

export function ResetEmail() {
  const { setScreen } = useApp()
  const [state, setState] = useState<ResetState>("form")
  const [email, setEmail] = useState("")

  useEffect(() => {
    if (state === "loading") {
      const t = setTimeout(() => setState("success"), 2000)
      return () => clearTimeout(t)
    }
  }, [state])

  const handleSend = () => {
    if (!email.trim() || !email.includes("@")) return
    setState("loading")
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-4 pb-2">
        <button
          type="button"
          onClick={() => setScreen("auth-email")}
          className="p-1"
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">Reset Your Password</h1>
        <VoiceMicButton />
      </header>

      <div className="flex-1 flex flex-col items-center px-8 pt-10">
        {/* Email icon */}
        <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-6 shadow-sm">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>

        {state === "form" && (
          <div className="w-full flex flex-col gap-5">
            <p className="text-sm text-muted-foreground text-center leading-relaxed">
              Enter your email address to receive a reset link
            </p>

            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="khaled@example.com"
                className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>

            <button
              type="button"
              onClick={handleSend}
              disabled={!email.trim()}
              className="w-full h-12 rounded-3xl bg-primary text-primary-foreground font-semibold text-sm active:scale-[0.98] transition-transform disabled:opacity-50 disabled:active:scale-100"
            >
              Send Reset Email
            </button>
          </div>
        )}

        {state === "loading" && (
          <div className="flex flex-col items-center gap-4 pt-8">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground">Sending reset email...</p>
          </div>
        )}

        {state === "success" && (
          <div className="w-full flex flex-col items-center gap-5 pt-4 animate-fade-slide-in">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-base font-semibold text-foreground">Check your email for reset instructions</p>
              <p className="text-sm text-muted-foreground mt-1">We sent a link to reset your password</p>
            </div>

            <div className="w-full bg-card rounded-2xl p-4 flex items-center gap-3 border border-border mt-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{email}</p>
                <p className="text-xs text-muted-foreground">Reset email sent</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setScreen("auth-email")}
              className="w-full h-12 rounded-3xl bg-primary text-primary-foreground font-semibold text-sm active:scale-[0.98] transition-transform mt-4"
            >
              Continue to Login
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
