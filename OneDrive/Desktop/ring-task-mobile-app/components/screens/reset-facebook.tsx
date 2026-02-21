"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Loader2, CheckCircle, Mail } from "lucide-react"
import { useApp } from "@/lib/app-context"
import { VoiceMicButton } from "@/components/voice-mic-button"

type ResetState = "form" | "loading" | "success"

export function ResetFacebook() {
  const { setScreen } = useApp()
  const [state, setState] = useState<ResetState>("form")
  const [emailOrPhone, setEmailOrPhone] = useState("")

  useEffect(() => {
    if (state === "loading") {
      const t = setTimeout(() => setState("success"), 2000)
      return () => clearTimeout(t)
    }
  }, [state])

  const handleSend = () => {
    if (!emailOrPhone.trim()) return
    setState("loading")
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-4 pb-2">
        <button
          type="button"
          onClick={() => setScreen("auth-facebook")}
          className="p-1"
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">Reset Facebook Password</h1>
        <VoiceMicButton />
      </header>

      <div className="flex-1 flex flex-col items-center px-8 pt-10">
        {/* Facebook logo */}
        <div className="w-16 h-16 rounded-2xl bg-[#1877F2] flex items-center justify-center mb-6 shadow-sm">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="white" aria-hidden="true">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </div>

        {state === "form" && (
          <div className="w-full flex flex-col gap-5">
            <p className="text-sm text-muted-foreground text-center leading-relaxed">
              Enter your email or phone number to reset your password
            </p>

            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">
                Email or phone
              </label>
              <input
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="khaled@example.com"
                className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#1877F2] text-sm"
              />
            </div>

            <button
              type="button"
              onClick={handleSend}
              disabled={!emailOrPhone.trim()}
              className="w-full h-12 rounded-3xl bg-[#1877F2] text-white font-semibold text-sm active:scale-[0.98] transition-transform disabled:opacity-50 disabled:active:scale-100"
            >
              Send Reset Link
            </button>
          </div>
        )}

        {state === "loading" && (
          <div className="flex flex-col items-center gap-4 pt-8">
            <Loader2 className="w-10 h-10 text-[#1877F2] animate-spin" />
            <p className="text-sm text-muted-foreground">Sending reset link...</p>
          </div>
        )}

        {state === "success" && (
          <div className="w-full flex flex-col items-center gap-5 pt-4 animate-fade-slide-in">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-base font-semibold text-foreground">Reset link sent successfully</p>
              <p className="text-sm text-muted-foreground mt-1">Check your inbox for instructions</p>
            </div>

            <div className="w-full bg-card rounded-2xl p-4 flex items-center gap-3 border border-border mt-2">
              <div className="w-10 h-10 rounded-full bg-[#1877F2]/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-[#1877F2]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{emailOrPhone}</p>
                <p className="text-xs text-muted-foreground">Reset link sent</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setScreen("auth-facebook")}
              className="w-full h-12 rounded-3xl bg-[#1877F2] text-white font-semibold text-sm active:scale-[0.98] transition-transform mt-4"
            >
              Continue to Login
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
