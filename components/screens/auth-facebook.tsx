"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Loader2, CheckCircle, Eye, EyeOff } from "lucide-react"
import { useApp } from "@/lib/app-context"
import { VoiceMicButton } from "@/components/voice-mic-button"

type AuthState = "form" | "loading" | "success"

export function AuthFacebook() {
  const { setScreen } = useApp()
  const [state, setState] = useState<AuthState>("form")
  const [email, setEmail] = useState("khaled@example.com")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

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

  const handleLogin = () => {
    if (!email.trim()) return
    setState("loading")
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
        <h1 className="text-lg font-bold text-foreground">Sign in with Facebook</h1>
        <VoiceMicButton />
      </header>

      <div className="flex-1 flex flex-col items-center px-8 pt-8">
        {/* Facebook logo */}
        <div className="w-16 h-16 rounded-2xl bg-[#1877F2] flex items-center justify-center mb-8 shadow-sm">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="white" aria-hidden="true">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </div>

        {state === "form" && (
          <div className="w-full flex flex-col gap-4">
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">Email or Phone</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#1877F2] text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#1877F2] text-sm"
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

            {/* Login button */}
            <button
              type="button"
              onClick={handleLogin}
              className="w-full h-12 rounded-3xl bg-[#1877F2] text-white font-semibold text-sm active:scale-[0.98] transition-transform mt-2"
            >
              Log In
            </button>

            <button
              type="button"
              onClick={() => setScreen("reset-facebook")}
              className="text-sm text-[#1877F2] text-center font-medium"
            >
              Forgot password?
            </button>
          </div>
        )}

        {state === "loading" && (
          <div className="flex flex-col items-center gap-4 pt-8">
            <Loader2 className="w-10 h-10 text-[#1877F2] animate-spin" />
            <p className="text-sm text-muted-foreground">Signing in...</p>
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
