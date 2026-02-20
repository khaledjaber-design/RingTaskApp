"use client"

import { useMemo, useState } from "react"
import { Bell, ChevronLeft, ChevronRight } from "lucide-react"
import { useApp } from "@/lib/app-context"
import { VoiceMicButton } from "@/components/voice-mic-button"
import { BottomNav } from "@/components/bottom-nav"

const DAYS = ["S", "M", "T", "W", "T", "F", "S"]
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

const categoryColors: Record<string, string> = {
  Work: "#3B82F6",
  Personal: "#8B5CF6",
  Health: "#10B981",
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

export function CalendarHome() {
  const {
    tasks,
    selectedDate,
    setSelectedDate,
    setScreen,
  } = useApp()

  const [pressedDay, setPressedDay] = useState<number | null>(null)

  const year = selectedDate.getFullYear()
  const month = selectedDate.getMonth()
  const today = 26
  const todayMonth = 0
  const todayYear = 2026

  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  const prevMonthDays = getDaysInMonth(year, month - 1)

  const taskDates = useMemo(() => {
    const map: Record<number, string[]> = {}
    for (const task of tasks) {
      const d = new Date(task.date)
      if (d.getFullYear() === year && d.getMonth() === month) {
        if (!map[d.getDate()]) map[d.getDate()] = []
        map[d.getDate()].push(task.category)
      }
    }
    return map
  }, [tasks, year, month])

  const taskCountByDay = useMemo(() => {
    const map: Record<number, number> = {}
    for (const task of tasks) {
      const d = new Date(task.date)
      if (d.getFullYear() === year && d.getMonth() === month) {
        map[d.getDate()] = (map[d.getDate()] || 0) + 1
      }
    }
    return map
  }, [tasks, year, month])

  const calendarDays = useMemo(() => {
    const days: { day: number; currentMonth: boolean }[] = []
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: prevMonthDays - i, currentMonth: false })
    }
    for (let d = 1; d <= daysInMonth; d++) {
      days.push({ day: d, currentMonth: true })
    }
    const remaining = 42 - days.length
    for (let d = 1; d <= remaining; d++) {
      days.push({ day: d, currentMonth: false })
    }
    return days
  }, [daysInMonth, firstDay, prevMonthDays])

  const selectedDay = selectedDate.getDate()

  const changeMonth = (delta: number) => {
    const d = new Date(year, month + delta, 1)
    setSelectedDate(d)
  }

  const handleDayTap = (day: number) => {
    setPressedDay(day)
    setSelectedDate(new Date(year, month, day))
    setTimeout(() => {
      setPressedDay(null)
      setScreen("day-view")
    }, 200)
  }

  const totalTasks = tasks.filter((t) => {
    const d = new Date(t.date)
    return d.getFullYear() === year && d.getMonth() === month
  }).length

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Bell className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">RingTask</span>
        </div>
        <VoiceMicButton />
      </header>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Month navigation */}
        <div className="flex items-center justify-between px-5 py-3">
          <button type="button" onClick={() => changeMonth(-1)} className="p-1" aria-label="Previous month">
            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <h2 className="text-base font-semibold text-foreground">
            {MONTH_NAMES[month]} {year}
          </h2>
          <button type="button" onClick={() => changeMonth(1)} className="p-1" aria-label="Next month">
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Calendar grid */}
        <div className="px-4">
          <div className="grid grid-cols-7 mb-1">
            {DAYS.map((d, i) => (
              <div key={`${d}-${i}`} className="text-center text-xs font-medium text-muted-foreground py-2">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {calendarDays.map((cell, i) => {
              const isToday =
                cell.currentMonth &&
                cell.day === today &&
                month === todayMonth &&
                year === todayYear
              const isSelected = cell.currentMonth && cell.day === selectedDay
              const isPressed = cell.currentMonth && cell.day === pressedDay
              const dots = cell.currentMonth ? taskDates[cell.day] : undefined
              const count = cell.currentMonth ? taskCountByDay[cell.day] : undefined

              return (
                <button
                  type="button"
                  key={i}
                  onClick={() => {
                    if (cell.currentMonth) {
                      handleDayTap(cell.day)
                    }
                  }}
                  disabled={!cell.currentMonth}
                  className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all duration-150 ${
                    !cell.currentMonth ? "opacity-30 cursor-default" : "cursor-pointer active:scale-90"
                  } ${isPressed ? "scale-110 bg-primary/20" : ""} ${isSelected && !isToday && !isPressed ? "bg-primary/10" : ""}`}
                  aria-label={cell.currentMonth ? `${MONTH_NAMES[month]} ${cell.day}, ${count || 0} tasks` : undefined}
                >
                  <span
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition-all ${
                      isToday
                        ? "bg-primary text-primary-foreground font-bold"
                        : isPressed
                          ? "bg-primary text-primary-foreground font-semibold"
                          : cell.currentMonth
                            ? "text-foreground"
                            : "text-muted-foreground/40"
                    }`}
                  >
                    {cell.day}
                  </span>
                  {dots && dots.length > 0 ? (
                    <div className="flex gap-0.5 mt-0.5 h-1.5">
                      {dots.slice(0, 3).map((cat, j) => (
                        <div
                          key={j}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: categoryColors[cat] || "#9CA3AF" }}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="h-1.5 mt-0.5" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="px-5 pt-4 pb-2">
          <div className="flex items-center gap-4">
            {Object.entries(categoryColors).map(([name, color]) => (
              <div key={name} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-xs text-muted-foreground">{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Month summary card */}
        <div className="mx-5 mt-2 p-4 bg-card rounded-2xl border border-border shadow-sm">
          <h3 className="text-sm font-semibold text-foreground mb-2">Month Overview</h3>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{totalTasks}</p>
              <p className="text-[10px] text-muted-foreground">Total Tasks</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{tasks.filter((t) => { const d = new Date(t.date); return d.getFullYear() === year && d.getMonth() === month && t.completed; }).length}</p>
              <p className="text-[10px] text-muted-foreground">Completed</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <p className="text-2xl font-bold text-[#8B5CF6]">{Object.keys(taskDates).length}</p>
              <p className="text-[10px] text-muted-foreground">Active Days</p>
            </div>
          </div>
        </div>

        {/* Hint */}
        <p className="text-center text-xs text-muted-foreground mt-4 px-5">
          Tap any date to view and manage tasks for that day
        </p>
      </div>

      <BottomNav />
    </div>
  )
}
