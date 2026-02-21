"use client"

import { ArrowLeft, BellRing, Sparkles } from "lucide-react"
import { useApp } from "@/lib/app-context"
import { VoiceMicButton } from "@/components/voice-mic-button"
import { BottomNav } from "@/components/bottom-nav"

export function NotificationsScreen() {
  const { setScreen, previousScreen, notifications, markNotificationRead, setSelectedNotification } = useApp()

  const handleBack = () => {
    setScreen(previousScreen === "notifications" ? "home" : previousScreen)
  }

  const handleNotificationTap = (notif: (typeof notifications)[0]) => {
    markNotificationRead(notif.id)
    setSelectedNotification(notif)
    setScreen("notification-detail")
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-4 pb-2">
        <button
          type="button"
          onClick={handleBack}
          className="p-1"
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">Notifications</h1>
        <VoiceMicButton />
      </header>

      {/* Notification list */}
      <div className="flex-1 overflow-y-auto px-5 py-4 pb-24 flex flex-col gap-3">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <BellRing className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-sm">No notifications yet</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <button
              key={notif.id}
              type="button"
              onClick={() => handleNotificationTap(notif)}
              className={`w-full text-left rounded-2xl p-4 transition-all active:scale-[0.98] ${
                notif.read
                  ? "bg-card"
                  : "bg-card shadow-sm ring-1 ring-primary/20"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    notif.type === "reminder"
                      ? "bg-primary/10"
                      : "bg-accent/10"
                  }`}
                >
                  {notif.type === "reminder" ? (
                    <BellRing className="w-5 h-5 text-primary" />
                  ) : (
                    <Sparkles className="w-5 h-5 text-accent" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm text-foreground ${!notif.read ? "font-semibold" : "font-medium"}`}>
                      {notif.title}
                    </p>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                    {notif.description}
                  </p>
                  <p className="text-[10px] text-muted-foreground/70 mt-2">{notif.time}</p>
                </div>
                {/* Arrow indicator */}
                <svg className="w-4 h-4 text-muted-foreground/50 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
            </button>
          ))
        )}
      </div>

      <BottomNav />
    </div>
  )
}
