"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Loader2, CheckCircle, User } from "lucide-react"
import { useApp } from "@/lib/app-context"
import { VoiceMicButton } from "@/components/voice-mic-button"

type AuthState = "select" | "loading" | "success"

export function AuthGoogle() {
  const { setScreen } = useApp()
  const [state, setState] = useState<AuthState>("select")

  useEffect(() => {
    if (state === "loading") {
      const t = setTimeout(() => setState("success"), 1800)
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
        <h1 className="text-lg font-bold text-foreground">Sign in with Google</h1>
        <VoiceMicButton />
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* Google logo */}
        <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center mb-8 shadow-sm">
          <svg width="32" height="32" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
        </div>

        {state === "select" && (
          <div className="w-full flex flex-col gap-4">
            <p className="text-sm text-muted-foreground text-center mb-2">Choose an account to continue</p>

            {/* Account card */}
            <button
              type="button"
              onClick={() => setState("loading")}
              className="w-full flex items-center gap-4 bg-card rounded-2xl p-4 border border-border shadow-sm active:scale-[0.98] transition-transform"
            >
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <span className="text-primary-foreground text-sm font-bold">KJ</span>
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="text-sm font-semibold text-foreground">Khaled Jaber</p>
                <p className="text-xs text-muted-foreground">khaled@example.com</p>
              </div>
            </button>

            <button
              type="button"
              className="w-full flex items-center gap-4 bg-card rounded-2xl p-4 border border-border shadow-sm active:scale-[0.98] transition-transform"
            >
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-muted-foreground">Use another account</p>
              </div>
            </button>
          </div>
        )}

        {state === "loading" && (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground">Signing in as Khaled Jaber...</p>
          </div>
        )}

        {state === "success" && (
          <div className="flex flex-col items-center gap-4 animate-fade-slide-in">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            <p className="text-base font-semibold text-foreground">Welcome back, Khaled!</p>
            <p className="text-sm text-muted-foreground">Redirecting to your tasks...</p>
          </div>
        )}
      </div>
    </div>
  )
}
