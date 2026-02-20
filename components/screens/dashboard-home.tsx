"use client"

import { useEffect, useState, useMemo } from "react"
import { Calendar, Check, Flame, Target, Sparkles, ChevronRight, Pencil } from "lucide-react"
import { useApp } from "@/lib/app-context"
import { VoiceMicButton } from "@/components/voice-mic-button"
import { BottomNav } from "@/components/bottom-nav"

const categoryColors: Record<string, string> = {
  Work: "#3B82F6",
  Personal: "#8B5CF6",
  Health: "#10B981",
}

const weeklyData = [
  { day: "Mon", value: 5 },
  { day: "Tue", value: 3 },
  { day: "Wed", value: 6 },
  { day: "Thu", value: 4 },
  { day: "Fri", value: 7 },
  { day: "Sat", value: 2 },
  { day: "Sun", value: 4 },
]

function ProgressRing({ completed, total }: { completed: number; total: number }) {
  const [animate, setAnimate] = useState(false)
  const radius = 54
  const stroke = 8
  const circumference = 2 * Math.PI * radius
  const progress = total > 0 ? completed / total : 0
  const offset = circumference - progress * circumference

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth={stroke}
        />
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animate ? offset : circumference}
          style={{ transition: "stroke-dashoffset 1.2s ease-out" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-foreground">{completed}/{total}</span>
        <span className="text-xs text-muted-foreground mt-0.5">tasks done</span>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, color }: {
  icon: typeof Check
  label: string
  value: string
  color: string
}) {
  return (
    <button
      type="button"
      className="flex-1 bg-card rounded-xl p-3 shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex flex-col items-center gap-1.5 active:scale-[0.97] transition-transform"
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center"
        style={{ backgroundColor: `${color}18` }}
      >
        <Icon className="w-4 h-4" style={{ color }} />
      </div>
      <span className="text-lg font-bold text-foreground">{value}</span>
      <span className="text-[10px] text-muted-foreground leading-tight text-center">{label}</span>
    </button>
  )
}

function ProductivityChart() {
  const maxVal = Math.max(...weeklyData.map((d) => d.value))

  return (
    <div className="flex items-end justify-between gap-2 h-24 px-1">
      {weeklyData.map((d, i) => {
        const heightPercent = maxVal > 0 ? (d.value / maxVal) * 100 : 0
        const isToday = d.day === "Sun"

        return (
          <div key={d.day} className="flex flex-col items-center gap-1 flex-1">
            <div className="w-full flex items-end justify-center h-20">
              <div
                className={`w-6 rounded-t-md animate-bar-grow ${isToday ? "bg-primary" : "bg-primary/30"}`}
                style={{
                  height: `${heightPercent}%`,
                  animationDelay: `${i * 0.08}s`,
                }}
              />
            </div>
            <span className={`text-[10px] ${isToday ? "text-primary font-semibold" : "text-muted-foreground"}`}>
              {d.day}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export function DashboardHome() {
  const { tasks, toggleTask, setScreen, integrations, syncInsightDismissed, setSyncInsightDismissed } = useApp()
  const hasConnectedIntegrations = integrations.some((i) => i.status === "connected")

  const completedCount = useMemo(() => tasks.filter((t) => t.completed).length, [tasks])
  const totalTasks = tasks.length
  const percentage = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0

  const upcomingTasks = useMemo(
    () => tasks.filter((t) => !t.completed).slice(0, 3),
    [tasks],
  )

  const weeklyGoal = 20
  const weeklyCompleted = 12
  const weeklyProgress = (weeklyCompleted / weeklyGoal) * 100

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-5 pb-1">
        <div>
          <h1 className="text-xl font-bold text-foreground">Good afternoon, Khaled</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{"Here\u2019s your productivity snapshot"}</p>
        </div>
        <VoiceMicButton />
      </header>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-24 px-4 pt-4 flex flex-col gap-6">

        {/* Daily Progress Card */}
        <div className="bg-card rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          <ProgressRing completed={completedCount} total={totalTasks} />
          <div className="text-center mt-3">
            <p className="text-2xl font-bold text-primary">{percentage}% <span className="text-sm font-normal text-muted-foreground">complete</span></p>
            <p className="text-xs text-muted-foreground mt-1">{"You\u2019re on track today"}</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex gap-3">
          <StatCard icon={Check} label="Completed Today" value={String(completedCount)} color="#14B8A6" />
          <StatCard icon={Flame} label="Current Streak" value="6 days" color="#F59E0B" />
          <StatCard icon={Target} label="Focus Score" value="82%" color="#3B82F6" />
        </div>

        {/* AI Insights Card */}
        <div className="bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">AI Insight</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                You complete more tasks in the morning. Schedule focus work before noon.
              </p>
              <button
                type="button"
                className="mt-3 px-4 py-1.5 rounded-full bg-[#8B5CF6] text-white text-xs font-medium active:scale-95 transition-transform"
              >
                Apply Suggestion
              </button>
            </div>
          </div>
        </div>

        {/* AI Sync Insight */}
        {hasConnectedIntegrations && !syncInsightDismissed && (
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">Calendar Sync Active</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  You have 3 meetings tomorrow from your calendar. Would you like to block focus time?
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    type="button"
                    onClick={() => setSyncInsightDismissed(true)}
                    className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium active:scale-95 transition-transform"
                  >
                    Apply Suggestion
                  </button>
                  <button
                    type="button"
                    onClick={() => setSyncInsightDismissed(true)}
                    className="px-4 py-1.5 rounded-full border border-border text-muted-foreground text-xs font-medium active:scale-95 transition-transform"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upcoming Tasks Preview */}
        <div className="bg-card rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">Upcoming Tasks</h3>
            <button
              type="button"
              onClick={() => setScreen("calendar")}
              className="flex items-center gap-0.5 text-xs text-primary font-medium active:opacity-70"
            >
              View Full Calendar
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="flex flex-col gap-2.5">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => toggleTask(task.id)}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    task.completed
                      ? "bg-primary border-primary"
                      : "border-muted-foreground/30"
                  }`}
                  aria-label={`Mark "${task.title}" as ${task.completed ? "incomplete" : "complete"}`}
                >
                  {task.completed && <Check className="w-2.5 h-2.5 text-primary-foreground" />}
                </button>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                    {task.title}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: categoryColors[task.category] || "#9CA3AF" }}
                  />
                  <span className="text-[11px] text-muted-foreground">{task.time}</span>
                </div>
              </div>
            ))}
            {upcomingTasks.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-3">All tasks completed!</p>
            )}
          </div>
        </div>

        {/* Weekly Goal */}
        <div className="bg-card rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-foreground">Weekly Goal</h3>
            <button type="button" className="p-1 active:opacity-70" aria-label="Edit goal">
              <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground mb-2">Complete {weeklyGoal} tasks</p>
          <div className="w-full h-2.5 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${weeklyProgress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1.5">
            <span className="text-foreground font-semibold">{weeklyCompleted}</span> / {weeklyGoal}
          </p>
        </div>

        {/* Productivity Trend */}
        <div className="bg-card rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          <h3 className="text-sm font-semibold text-foreground mb-3">Productivity Trend</h3>
          <ProductivityChart />
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
