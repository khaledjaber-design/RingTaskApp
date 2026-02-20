"use client"

import { useState } from "react"
import { ArrowLeft, ChevronRight, Sun, Moon, Check, AlertTriangle, Link2 } from "lucide-react"
import { useApp } from "@/lib/app-context"
import { VoiceMicButton } from "@/components/voice-mic-button"
import { BottomNav } from "@/components/bottom-nav"

function Toggle({
  on,
  onToggle,
}: {
  on: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`w-12 h-7 rounded-full transition-colors relative ${
        on ? "bg-primary" : "bg-muted-foreground/30"
      }`}
      role="switch"
      aria-checked={on}
    >
      <span
        className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-sm transition-transform ${
          on ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  )
}

export function SettingsScreen() {
  const { setScreen, darkMode, setDarkMode, integrations } = useApp()
  const connectedCount = integrations.filter((i) => i.status === "connected").length
  const [pushNotif, setPushNotif] = useState(true)
  const [emailReminder, setEmailReminder] = useState(false)
  const [sound, setSound] = useState(true)
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const handleLogout = () => {
    setShowLogoutModal(false)
    setDarkMode(false)
    setScreen("login")
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-4 pb-2">
        <button
          type="button"
          onClick={() => setScreen("home")}
          className="p-1"
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">Settings</h1>
        <VoiceMicButton />
      </header>

      {/* Content */}
      <div className="flex-1 min-h-0 overflow-y-auto px-5 pt-4">
        <div className="flex flex-col gap-5 pb-28">
        {/* Profile Card */}
        <div className="bg-card rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-lg font-bold">KJ</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-base font-semibold text-foreground">Khaled Jaber</p>
            <p className="text-sm text-muted-foreground">khaled@example.com</p>
          </div>
          <button
            type="button"
            className="px-4 py-2 rounded-lg border-2 border-primary text-primary text-sm font-medium active:scale-95 transition-transform"
          >
            Edit
          </button>
        </div>

        {/* Connected Accounts */}
        <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => setScreen("integrations")}
            className="flex items-center justify-between px-5 py-4 w-full"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                <Link2 className="w-4 h-4 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-foreground">Connected Accounts</p>
                <p className="text-xs text-muted-foreground">
                  {connectedCount > 0
                    ? `${connectedCount} service${connectedCount > 1 ? "s" : ""} connected`
                    : "Sync calendars & email"}
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Appearance */}
        <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 pt-4 pb-2">
            Appearance
          </h3>
          <div className="flex gap-3 px-5 pb-4">
            <button
              type="button"
              onClick={() => setDarkMode(false)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-colors ${
                !darkMode
                  ? "border-primary bg-primary/5"
                  : "border-border"
              }`}
            >
              <Sun className={`w-5 h-5 ${!darkMode ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`text-sm font-medium ${!darkMode ? "text-primary" : "text-muted-foreground"}`}>
                Light
              </span>
              {!darkMode && <Check className="w-4 h-4 text-primary" />}
            </button>
            <button
              type="button"
              onClick={() => setDarkMode(true)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-colors ${
                darkMode
                  ? "border-primary bg-primary/5"
                  : "border-border"
              }`}
            >
              <Moon className={`w-5 h-5 ${darkMode ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`text-sm font-medium ${darkMode ? "text-primary" : "text-muted-foreground"}`}>
                Dark
              </span>
              {darkMode && <Check className="w-4 h-4 text-primary" />}
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 pt-4 pb-2">
            Notifications
          </h3>
          <div className="flex flex-col divide-y divide-border">
            <div className="flex items-center justify-between px-5 py-4">
              <span className="text-sm text-foreground">Push Notifications</span>
              <Toggle on={pushNotif} onToggle={() => setPushNotif(!pushNotif)} />
            </div>
            <div className="flex items-center justify-between px-5 py-4">
              <span className="text-sm text-foreground">Email Reminders</span>
              <Toggle on={emailReminder} onToggle={() => setEmailReminder(!emailReminder)} />
            </div>
            <div className="flex items-center justify-between px-5 py-4">
              <span className="text-sm text-foreground">Sound</span>
              <Toggle on={sound} onToggle={() => setSound(!sound)} />
            </div>
          </div>
        </div>

        {/* Account */}
        <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 pt-4 pb-2">
            Account
          </h3>
          <div className="flex flex-col divide-y divide-border">
            <button
              type="button"
              className="flex items-center justify-between px-5 py-4 w-full"
            >
              <span className="text-sm text-foreground">Change Password</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            <button
              type="button"
              onClick={() => setShowLogoutModal(true)}
              className="flex items-center justify-between px-5 py-4 w-full"
            >
              <span className="text-sm text-destructive font-medium">Logout</span>
              <ChevronRight className="w-5 h-5 text-destructive" />
            </button>
          </div>
        </div>
        </div>
      </div>

      <BottomNav />

      {/* Logout confirmation modal */}
      {showLogoutModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-foreground/40">
          <div className="bg-card rounded-2xl p-6 mx-8 shadow-xl w-full max-w-[300px] animate-fade-slide-in">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10 mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <h3 className="text-lg font-bold text-foreground text-center mb-2">
              Log out?
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-6">
              Are you sure you want to log out of your account?
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-3 rounded-xl border-2 border-border text-foreground text-sm font-medium active:scale-95 transition-transform"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="flex-1 py-3 rounded-xl bg-destructive text-destructive-foreground text-sm font-medium active:scale-95 transition-transform"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
