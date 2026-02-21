"use client"

import { useState } from "react"
import { ArrowLeft, BellRing, Sparkles, CheckCircle, Clock, Eye, X } from "lucide-react"
import { useApp } from "@/lib/app-context"
import { VoiceMicButton } from "@/components/voice-mic-button"

export function NotificationDetail() {
  const { setScreen, selectedNotification } = useApp()
  const [snoozed, setSnoozed] = useState(false)
  const [markedDone, setMarkedDone] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  if (!selectedNotification) {
    return (
      <div className="h-full flex flex-col bg-background items-center justify-center">
        <p className="text-muted-foreground text-sm">No notification selected</p>
        <button
          type="button"
          onClick={() => setScreen("notifications")}
          className="mt-4 text-sm text-primary font-medium"
        >
          Go back
        </button>
      </div>
    )
  }

  const isReminder = selectedNotification.type === "reminder"

  const handleMarkDone = () => {
    setMarkedDone(true)
    setTimeout(() => setScreen("notifications"), 800)
  }

  const handleSnooze = () => {
    setSnoozed(true)
    setTimeout(() => setSnoozed(false), 2000)
  }

  const handleDismiss = () => {
    setDismissed(true)
    setTimeout(() => setScreen("notifications"), 600)
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-4 pb-2">
        <button
          type="button"
          onClick={() => setScreen("notifications")}
          className="p-1"
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">Notification</h1>
        <VoiceMicButton />
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-5">
        {/* Type badge + icon */}
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isReminder ? "bg-primary/10" : "bg-accent/10"
            }`}
          >
            {isReminder ? (
              <BellRing className="w-6 h-6 text-primary" />
            ) : (
              <Sparkles className="w-6 h-6 text-accent" />
            )}
          </div>
          <div>
            <span
              className={`text-xs font-semibold uppercase tracking-wide ${
                isReminder ? "text-primary" : "text-accent"
              }`}
            >
              {isReminder ? "Task Reminder" : "AI Insight"}
            </span>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              {selectedNotification.time}
            </p>
          </div>
        </div>

        {/* Full content card */}
        <div className="bg-card rounded-2xl p-5 border border-border">
          <h2 className="text-base font-semibold text-foreground leading-snug">
            {selectedNotification.title}
          </h2>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            {selectedNotification.description}
          </p>
        </div>

        {/* Related details card */}
        <div className="bg-card rounded-2xl p-4 border border-border">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            {isReminder ? "Related Task" : "Insight Details"}
          </p>
          {isReminder ? (
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {selectedNotification.title.replace(" in 30 minutes", "").replace(" today at 6 PM", "")}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Scheduled - {selectedNotification.time}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground leading-relaxed">
                {selectedNotification.description}
              </p>
            </div>
          )}
        </div>

        {/* Feedback states */}
        {markedDone && (
          <div className="flex items-center gap-3 bg-primary/10 rounded-2xl px-4 py-3 animate-fade-slide-in">
            <CheckCircle className="w-5 h-5 text-primary" />
            <p className="text-sm font-medium text-primary">Marked as done</p>
          </div>
        )}
        {snoozed && (
          <div className="flex items-center gap-3 bg-accent/10 rounded-2xl px-4 py-3 animate-fade-slide-in">
            <Clock className="w-5 h-5 text-accent" />
            <p className="text-sm font-medium text-accent">Snoozed for 30 minutes</p>
          </div>
        )}
        {dismissed && (
          <div className="flex items-center gap-3 bg-muted rounded-2xl px-4 py-3 animate-fade-slide-in">
            <X className="w-5 h-5 text-muted-foreground" />
            <p className="text-sm font-medium text-muted-foreground">Dismissed</p>
          </div>
        )}

        {/* Action buttons */}
        {!markedDone && !dismissed && (
          <div className="flex flex-col gap-3 mt-auto pb-4">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleMarkDone}
                className="flex items-center justify-center gap-2 h-11 rounded-2xl bg-primary text-primary-foreground text-sm font-semibold active:scale-[0.97] transition-transform"
              >
                <CheckCircle className="w-4 h-4" />
                Mark as Done
              </button>
              <button
                type="button"
                onClick={handleSnooze}
                disabled={snoozed}
                className="flex items-center justify-center gap-2 h-11 rounded-2xl bg-accent text-accent-foreground text-sm font-semibold active:scale-[0.97] transition-transform disabled:opacity-50"
              >
                <Clock className="w-4 h-4" />
                Snooze
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setScreen("calendar")}
                className="flex items-center justify-center gap-2 h-11 rounded-2xl bg-card border border-border text-foreground text-sm font-medium active:scale-[0.97] transition-transform"
              >
                <Eye className="w-4 h-4" />
                View Task
              </button>
              <button
                type="button"
                onClick={handleDismiss}
                className="flex items-center justify-center gap-2 h-11 rounded-2xl bg-card border border-border text-muted-foreground text-sm font-medium active:scale-[0.97] transition-transform"
              >
                <X className="w-4 h-4" />
                Dismiss
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
