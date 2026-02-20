"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"

export type Screen =
  | "login" | "auth-google" | "auth-facebook" | "auth-apple" | "auth-email"
  | "reset-facebook" | "reset-email"
  | "home" | "calendar" | "day-view" | "new-task" | "settings" | "notifications" | "notification-detail"
  | "integrations" | "connect-apple" | "connect-google" | "connect-microsoft" | "connect-email" | "sync-status"

export type Category = "Work" | "Personal" | "Health"
export type Priority = "Urgent" | "Medium" | "Low"

export interface Task {
  id: string
  title: string
  category: Category
  priority: Priority
  date: string
  time: string
  completed: boolean
  reminder: boolean
  repeat: "None" | "Daily" | "Weekly" | "Monthly"
  alarm: boolean
  source?: "apple" | "google" | "microsoft" | "email"
  location?: string
}

export interface Notification {
  id: string
  title: string
  description: string
  time: string
  type: "reminder" | "suggestion"
  read: boolean
}

export type IntegrationStatus = "disconnected" | "connecting" | "connected" | "error"

export interface Integration {
  id: string
  name: string
  status: IntegrationStatus
  lastSync?: string
}

interface AppContextType {
  screen: Screen
  setScreen: (screen: Screen) => void
  previousScreen: Screen
  voiceModalOpen: boolean
  setVoiceModalOpen: (open: boolean) => void
  tasks: Task[]
  addTask: (task: Omit<Task, "id" | "completed">) => void
  toggleTask: (id: string) => void
  selectedDate: Date
  setSelectedDate: (date: Date) => void
  activeFilter: string
  setActiveFilter: (filter: string) => void
  darkMode: boolean
  setDarkMode: (dark: boolean) => void
  notifications: Notification[]
  markNotificationRead: (id: string) => void
  selectedNotification: Notification | null
  setSelectedNotification: (notification: Notification | null) => void
  integrations: Integration[]
  setIntegrationStatus: (id: string, status: IntegrationStatus) => void
  syncFrequency: string
  setSyncFrequency: (freq: string) => void
  syncInsightDismissed: boolean
  setSyncInsightDismissed: (dismissed: boolean) => void
}

const AppContext = createContext<AppContextType | null>(null)

const defaultTasks: Task[] = [
  {
    id: "1",
    title: "Team Meeting",
    category: "Work",
    priority: "Medium",
    date: "2026-01-26",
    time: "2:00 PM",
    completed: false,
    reminder: true,
    repeat: "Weekly",
    alarm: false,
  },
  {
    id: "2",
    title: "Gym Workout",
    category: "Health",
    priority: "Low",
    date: "2026-01-26",
    time: "6:00 PM",
    completed: false,
    reminder: false,
    repeat: "Daily",
    alarm: true,
  },
  {
    id: "3",
    title: "Buy Groceries",
    category: "Personal",
    priority: "Urgent",
    date: "2026-01-27",
    time: "10:00 AM",
    completed: false,
    reminder: true,
    repeat: "None",
    alarm: false,
  },
  {
    id: "4",
    title: "Project Review",
    category: "Work",
    priority: "Urgent",
    date: "2026-01-26",
    time: "4:00 PM",
    completed: false,
    reminder: true,
    repeat: "None",
    alarm: false,
  },
  {
    id: "5",
    title: "Morning Run",
    category: "Health",
    priority: "Medium",
    date: "2026-01-27",
    time: "7:00 AM",
    completed: false,
    reminder: true,
    repeat: "Daily",
    alarm: true,
  },
  {
    id: "6",
    title: "Dentist Appointment",
    category: "Personal",
    priority: "Urgent",
    date: "2026-01-28",
    time: "10:30 AM",
    completed: false,
    reminder: true,
    repeat: "None",
    alarm: true,
  },
  {
    id: "7",
    title: "Client Presentation",
    category: "Work",
    priority: "Urgent",
    date: "2026-01-28",
    time: "3:00 PM",
    completed: false,
    reminder: true,
    repeat: "None",
    alarm: false,
  },
  {
    id: "8",
    title: "Yoga Class",
    category: "Health",
    priority: "Low",
    date: "2026-01-29",
    time: "6:00 AM",
    completed: false,
    reminder: false,
    repeat: "Weekly",
    alarm: false,
  },
  {
    id: "9",
    title: "Sprint Planning",
    category: "Work",
    priority: "Medium",
    date: "2026-01-22",
    time: "9:00 AM",
    completed: true,
    reminder: true,
    repeat: "Weekly",
    alarm: false,
  },
  {
    id: "10",
    title: "Read Book",
    category: "Personal",
    priority: "Low",
    date: "2026-01-30",
    time: "8:00 PM",
    completed: false,
    reminder: false,
    repeat: "Daily",
    alarm: false,
  },
  {
    id: "11",
    title: "Pick Up Dry Cleaning",
    category: "Personal",
    priority: "Medium",
    date: "2026-01-26",
    time: "12:00 PM",
    completed: false,
    reminder: true,
    repeat: "None",
    alarm: false,
  },
  {
    id: "12",
    title: "Code Review",
    category: "Work",
    priority: "Medium",
    date: "2026-01-26",
    time: "10:00 AM",
    completed: true,
    reminder: false,
    repeat: "None",
    alarm: false,
  },
]

const defaultNotifications: Notification[] = [
  {
    id: "n1",
    title: "Team Meeting in 30 minutes",
    description: "Your team meeting starts at 2:00 PM. Tap to review agenda.",
    time: "1:30 PM",
    type: "reminder",
    read: false,
  },
  {
    id: "n2",
    title: "AI Suggestion: Block focus time",
    description: "You have 3 urgent tasks this week. Want me to block 2 hours for deep work?",
    time: "9:00 AM",
    type: "suggestion",
    read: false,
  },
  {
    id: "n3",
    title: "Gym Workout today at 6 PM",
    description: "Don't forget your gym session. Pack your gear!",
    time: "12:00 PM",
    type: "reminder",
    read: true,
  },
  {
    id: "n4",
    title: "AI Suggestion: Reschedule task",
    description: "\"Buy Groceries\" conflicts with \"Project Review\". Move to Wednesday?",
    time: "Yesterday",
    type: "suggestion",
    read: true,
  },
]

const defaultIntegrations: Integration[] = [
  { id: "apple", name: "Apple Calendar", status: "disconnected" },
  { id: "google", name: "Google Calendar", status: "disconnected" },
  { id: "microsoft", name: "Outlook & Teams", status: "disconnected" },
  { id: "email", name: "Email", status: "disconnected" },
]

export function AppProvider({ children }: { children: ReactNode }) {
  const [screen, setScreenState] = useState<Screen>("login")
  const [previousScreen, setPreviousScreen] = useState<Screen>("login")
  const [voiceModalOpen, setVoiceModalOpen] = useState(false)
  const [tasks, setTasks] = useState<Task[]>(defaultTasks)
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 0, 26))
  const [activeFilter, setActiveFilter] = useState("All")
  const [darkMode, setDarkModeState] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>(defaultNotifications)
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)
  const [integrations, setIntegrations] = useState<Integration[]>(defaultIntegrations)
  const [syncFrequency, setSyncFrequency] = useState("Hourly")
  const [syncInsightDismissed, setSyncInsightDismissed] = useState(false)

  const setScreen = useCallback(
    (newScreen: Screen) => {
      setPreviousScreen(screen)
      setScreenState(newScreen)
    },
    [screen],
  )

  const setDarkMode = useCallback((dark: boolean) => {
    setDarkModeState(dark)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [darkMode])

  const addTask = useCallback((task: Omit<Task, "id" | "completed">) => {
    setTasks((prev) => [
      ...prev,
      { ...task, id: Date.now().toString(), completed: false },
    ])
  }, [])

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    )
  }, [])

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    )
  }, [])

  const setIntegrationStatus = useCallback((id: string, status: IntegrationStatus) => {
    setIntegrations((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, status, lastSync: status === "connected" ? new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : i.lastSync }
          : i,
      ),
    )
    // When an integration connects, add synced meeting tasks
    if (status === "connected") {
      const syncedTasks = getSyncedTasks(id)
      setTasks((prev) => {
        const existingTitles = new Set(prev.map((t) => t.title))
        const newTasks = syncedTasks.filter((t) => !existingTitles.has(t.title))
        return [...prev, ...newTasks]
      })
    }
  }, [])

  return (
    <AppContext.Provider
      value={{
        screen,
        setScreen,
        previousScreen,
        voiceModalOpen,
        setVoiceModalOpen,
        tasks,
        addTask,
        toggleTask,
        selectedDate,
        setSelectedDate,
        activeFilter,
        setActiveFilter,
        darkMode,
        setDarkMode,
        notifications,
        markNotificationRead,
        selectedNotification,
        setSelectedNotification,
        integrations,
        setIntegrationStatus,
        syncFrequency,
        setSyncFrequency,
        syncInsightDismissed,
        setSyncInsightDismissed,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

function getSyncedTasks(integrationId: string): Task[] {
  const source = integrationId as Task["source"]
  if (integrationId === "apple") {
    return [
      { id: `sync-a1`, title: "Lunch with Sarah", category: "Personal", priority: "Low", date: "2026-01-27", time: "12:30 PM", completed: false, reminder: true, repeat: "None", alarm: false, source: "apple", location: "Cafe Roma" },
      { id: `sync-a2`, title: "Doctor Follow-up", category: "Health", priority: "Medium", date: "2026-01-29", time: "9:00 AM", completed: false, reminder: true, repeat: "None", alarm: true, source: "apple", location: "City Medical" },
    ]
  }
  if (integrationId === "google") {
    return [
      { id: `sync-g1`, title: "Design Review", category: "Work", priority: "Medium", date: "2026-01-27", time: "11:00 AM", completed: false, reminder: true, repeat: "None", alarm: false, source: "google", location: "meet.google.com/abc-xyz" },
      { id: `sync-g2`, title: "Marketing Sync", category: "Work", priority: "Low", date: "2026-01-28", time: "1:00 PM", completed: false, reminder: true, repeat: "Weekly", alarm: false, source: "google", location: "meet.google.com/def-uvw" },
    ]
  }
  if (integrationId === "microsoft") {
    return [
      { id: `sync-m1`, title: "All-Hands Meeting", category: "Work", priority: "Medium", date: "2026-01-27", time: "3:00 PM", completed: false, reminder: true, repeat: "Weekly", alarm: false, source: "microsoft", location: "Teams Meeting" },
      { id: `sync-m2`, title: "1:1 with Manager", category: "Work", priority: "Urgent", date: "2026-01-29", time: "10:00 AM", completed: false, reminder: true, repeat: "Weekly", alarm: false, source: "microsoft", location: "Teams Meeting" },
    ]
  }
  if (integrationId === "email") {
    return [
      { id: `sync-e1`, title: "Investor Call", category: "Work", priority: "Urgent", date: "2026-01-28", time: "4:00 PM", completed: false, reminder: true, repeat: "None", alarm: true, source: "email", location: "Zoom link in email" },
    ]
  }
  return []
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error("useApp must be used within AppProvider")
  return context
}
