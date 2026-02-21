"use client"

import { useMemo } from "react"
import {
  ArrowLeft,
  Check,
  Flame,
  Minus,
  CheckCircle,
  Plus,
  Mic,
  CalendarDays,
} from "lucide-react"
import { useApp } from "@/lib/app-context"
import { VoiceMicButton } from "@/components/voice-mic-button"

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

const categoryColors: Record<string, string> = {
  Work: "#3B82F6",
  Personal: "#8B5CF6",
  Health: "#10B981",
}

const priorityConfig: Record<string, { color: string; icon: typeof Flame }> = {
  Urgent: { color: "#EF4444", icon: Flame },
  Medium: { color: "#F59E0B", icon: Minus },
  Low: { color: "#10B981", icon: CheckCircle },
}

export function DayView() {
  const { selectedDate, tasks, toggleTask, setScreen, setVoiceModalOpen } = useApp()

  const dayName = DAY_NAMES[selectedDate.getDay()]
  const monthName = MONTH_NAMES[selectedDate.getMonth()]
  const dayNum = selectedDate.getDate()
  const year = selectedDate.getFullYear()

  const dateStr = `${year}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`

  const dayTasks = useMemo(() => {
    return tasks
      .filter((t) => t.date === dateStr)
      .sort((a, b) => {
        const timeA = new Date(`2026-01-01 ${a.time}`).getTime()
        const timeB = new Date(`2026-01-01 ${b.time}`).getTime()
        return timeA - timeB
      })
  }, [tasks, dateStr])

  const completedCount = dayTasks.filter((t) => t.completed).length
  const totalCount = dayTasks.length
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-4 pb-2">
        <button
          type="button"
          onClick={() => setScreen("calendar")}
          className="p-1"
          aria-label="Back to calendar"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-base font-bold text-foreground text-center">
          {dayName}, {monthName} {dayNum}
        </h1>
        <VoiceMicButton />
      </header>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-28">
        {/* Day Summary Card */}
        <div className="mx-5 mt-3 p-4 bg-card rounded-2xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-2xl font-bold text-foreground">{monthName} {dayNum}, {year}</p>
              <p className="text-sm text-muted-foreground mt-0.5">
                {totalCount} {totalCount === 1 ? "task" : "tasks"} scheduled
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <CalendarDays className="w-6 h-6 text-primary" />
            </div>
          </div>

          {totalCount > 0 && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-muted-foreground">Completion</span>
                <span className="text-xs font-semibold text-primary">{progressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Task List */}
        {totalCount > 0 ? (
          <div className="px-5 mt-5 flex flex-col gap-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Today{"'"}s Tasks
            </h3>
            {dayTasks.map((task) => {
              const pConfig = priorityConfig[task.priority]
              const PriorityIcon = pConfig?.icon || Minus
              return (
                <div
                  key={task.id}
                  className={`flex items-start gap-3 bg-card rounded-2xl p-4 shadow-sm border border-border transition-all ${
                    task.completed ? "opacity-60" : ""
                  }`}
                >
                  {/* Checkbox */}
                  <button
                    type="button"
                    onClick={() => toggleTask(task.id)}
                    className={`w-6 h-6 mt-0.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      task.completed
                        ? "bg-primary border-primary"
                        : "border-muted-foreground/30 hover:border-primary"
                    }`}
                    aria-label={`Mark "${task.title}" as ${task.completed ? "incomplete" : "complete"}`}
                  >
                    {task.completed && (
                      <Check className="w-3 h-3 text-primary-foreground animate-check-in" />
                    )}
                  </button>

                  {/* Task info */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium leading-snug ${
                        task.completed ? "line-through text-muted-foreground" : "text-foreground"
                      }`}
                    >
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-xs text-muted-foreground">{task.time}</span>
                      <div className="w-0.5 h-0.5 rounded-full bg-muted-foreground/40" />
                      <div className="flex items-center gap-1">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: categoryColors[task.category] }}
                        />
                        <span className="text-xs text-muted-foreground">{task.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* Priority */}
                  <div
                    className="flex items-center justify-center w-7 h-7 rounded-lg flex-shrink-0"
                    style={{ backgroundColor: `${pConfig?.color || "#9CA3AF"}15` }}
                  >
                    <PriorityIcon
                      className="w-3.5 h-3.5"
                      style={{ color: pConfig?.color || "#9CA3AF" }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center px-5 mt-16">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
              <CalendarDays className="w-10 h-10 text-muted-foreground/40" />
            </div>
            <p className="text-base font-semibold text-foreground mb-1">No tasks scheduled</p>
            <p className="text-sm text-muted-foreground text-center mb-6">
              This day is free. Add a task or use voice to plan your day.
            </p>
            <button
              type="button"
              onClick={() => setScreen("new-task")}
              className="px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-md active:scale-95 transition-transform"
            >
              Add Task
            </button>
          </div>
        )}
      </div>

      {/* Quick Actions Bar */}
      <div className="absolute bottom-0 left-0 right-0 px-5 pb-6 pt-3 bg-gradient-to-t from-background via-background to-transparent">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setScreen("new-task")}
            className="flex-1 h-12 rounded-2xl bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2 shadow-lg active:scale-[0.97] transition-transform"
          >
            <Plus className="w-4 h-4" />
            Add Task
          </button>
          <button
            type="button"
            onClick={() => setVoiceModalOpen(true)}
            className="w-12 h-12 rounded-2xl bg-[#8B5CF6] flex items-center justify-center shadow-lg active:scale-95 transition-transform"
            aria-label="Voice input"
          >
            <Mic className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}
