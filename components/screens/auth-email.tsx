"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Loader2, CheckCircle, Eye, EyeOff, AlertCircle } from "lucide-react"
import { useApp } from "@/lib/app-context"
import { VoiceMicButton } from "@/components/voice-mic-button"

type AuthState = "form" | "loading" | "error" | "success"

export function AuthEmail() {
  const { setScreen } = useApp()
  const [state, setState] = useState<AuthState>("form")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    if (state === "loading") {
      const t = setTimeout(() => {
        if (!email.includes("@") || password.length < 1) {
          setErrorMsg("Invalid email or password. Please try again.")
          setState("error")
        } else {
          setState("success")
        }
      }, 1800)
      return () => clearTimeout(t)
    }
    if (state === "success") {
      const t = setTimeout(() => setScreen("home"), 1000)
      return () => clearTimeout(t)
    }
  }, [state, setScreen, email, password])

  const handleSignIn = () => {
    if (!email.trim() || !password.trim()) {
      setErrorMsg("Please fill in all fields.")
      setState("error")
      return
    }
    setState("loading")
  }

  const handleRetry = () => {
    setErrorMsg("")
    setState("form")
  }

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
        <h1 className="text-lg font-bold text-foreground">Sign in with Email</h1>
        <VoiceMicButton />
      </header>

      <div className="flex-1 flex flex-col items-center px-8 pt-10">
        {/* Email icon */}
        <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-8 shadow-sm">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>

        {(state === "form" || state === "error") && (
          <div className="w-full flex flex-col gap-4">
            {/* Error message */}
            {state === "error" && (
              <div className="flex items-center gap-3 bg-destructive/10 text-destructive rounded-xl px-4 py-3 animate-fade-slide-in">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">{errorMsg}</p>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (state === "error") handleRetry() }}
                placeholder="khaled@example.com"
                className={`w-full px-4 py-3 rounded-xl bg-card border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm ${
                  state === "error" ? "border-destructive" : "border-border"
                }`}
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); if (state === "error") handleRetry() }}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-3 pr-12 rounded-xl bg-card border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm ${
                    state === "error" ? "border-destructive" : "border-border"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <Eye className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setScreen("reset-email")}
              className="text-sm text-primary text-right font-medium -mt-1"
            >
              Forgot password?
            </button>

            {/* Sign In button */}
            <button
              type="button"
              onClick={handleSignIn}
              className="w-full h-12 rounded-3xl bg-primary text-primary-foreground font-semibold text-sm active:scale-[0.98] transition-transform mt-1"
            >
              Sign In
            </button>
          </div>
        )}

        {state === "loading" && (
          <div className="flex flex-col items-center gap-4 pt-8">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground">Verifying credentials...</p>
          </div>
        )}

        {state === "success" && (
          <div className="flex flex-col items-center gap-4 pt-8 animate-fade-slide-in">
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
