"use client"

import { Home, Calendar, Plus, Bell, User } from "lucide-react"
import { useApp, type Screen } from "@/lib/app-context"

export function BottomNav() {
  const { screen, setScreen, notifications } = useApp()
  const unreadCount = notifications.filter((n) => !n.read).length

  const navItems: { icon: typeof Home; label: string; targetScreen: Screen }[] = [
    { icon: Home, label: "Home", targetScreen: "home" },
    { icon: Calendar, label: "Calendar", targetScreen: "calendar" },
    { icon: Plus, label: "Add", targetScreen: "new-task" },
    { icon: Bell, label: "Alerts", targetScreen: "notifications" },
    { icon: User, label: "Profile", targetScreen: "settings" },
  ]

  return (
    <nav className="absolute bottom-0 left-0 right-0 h-20 bg-card border-t border-border flex items-center justify-around px-2 z-10">
      {navItems.map((item) => {
        if (item.label === "Add") {
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => setScreen("new-task")}
              className="-mt-6 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg active:scale-95 transition-transform"
              aria-label="Add new task"
            >
              <Plus className="w-7 h-7 text-primary-foreground" />
            </button>
          )
        }

        const isActive =
          (item.label === "Home" && screen === "home") ||
          (item.label === "Calendar" && (screen === "calendar" || screen === "day-view")) ||
          (item.label === "Profile" && screen === "settings") ||
          (item.label === "Alerts" && screen === "notifications")

        return (
          <button
            key={item.label}
            type="button"
            onClick={() => setScreen(item.targetScreen)}
            className="flex flex-col items-center gap-1 p-2 relative"
            aria-label={item.label}
          >
            <div className="relative">
              <item.icon
                className={`w-6 h-6 ${isActive ? "text-primary" : "text-muted-foreground"}`}
              />
              {item.label === "Alerts" && unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[9px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            <span
              className={`text-[10px] ${isActive ? "text-primary font-medium" : "text-muted-foreground"}`}
            >
              {item.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
