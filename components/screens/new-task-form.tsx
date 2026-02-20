"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Flame,
  Minus,
  CheckCircle,
  ChevronDown,
} from "lucide-react"
import { useApp, type Category, type Priority } from "@/lib/app-context"
import { VoiceMicButton } from "@/components/voice-mic-button"

const categories: { label: Category; color: string; bg: string }[] = [
  { label: "Work", color: "#3B82F6", bg: "bg-[#3B82F6]" },
  { label: "Personal", color: "#8B5CF6", bg: "bg-[#8B5CF6]" },
  { label: "Health", color: "#10B981", bg: "bg-[#10B981]" },
]

const priorities: { label: Priority; color: string; bg: string; icon: typeof Flame }[] = [
  { label: "Urgent", color: "#EF4444", bg: "bg-[#EF4444]", icon: Flame },
  { label: "Medium", color: "#F59E0B", bg: "bg-[#F59E0B]", icon: Minus },
  { label: "Low", color: "#10B981", bg: "bg-[#10B981]", icon: CheckCircle },
]

const repeatOptions = ["None", "Daily", "Weekly", "Monthly"] as const

export function NewTaskForm() {
  const { setScreen, addTask } = useApp()

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState<Category>("Work")
  const [priority, setPriority] = useState<Priority>("Medium")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [reminder, setReminder] = useState(false)
  const [repeat, setRepeat] = useState<(typeof repeatOptions)[number]>("None")
  const [alarm, setAlarm] = useState(false)
  const [showRepeatDropdown, setShowRepeatDropdown] = useState(false)

  const handleSave = () => {
    if (!title.trim()) return
    addTask({
      title: title.trim(),
      category,
      priority,
      date: date || "2026-01-27",
      time: time || "12:00 PM",
      reminder,
      repeat,
      alarm,
    })
    setScreen("home")
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
        <h1 className="text-lg font-bold text-foreground">New Task</h1>
        <VoiceMicButton />
      </header>

      {/* Form */}
      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-5">
        {/* Title */}
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full text-lg font-medium px-4 py-3.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
          />
        </div>

        {/* Category */}
        <div>
          <label className="text-sm font-semibold text-muted-foreground block mb-2">Category</label>
          <div className="flex gap-3">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat.label}
                onClick={() => setCategory(cat.label)}
                className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all ${
                  category === cat.label
                    ? `${cat.bg} text-white shadow-md`
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Priority */}
        <div>
          <label className="text-sm font-semibold text-muted-foreground block mb-2">Priority</label>
          <div className="flex gap-3">
            {priorities.map((p) => {
              const Icon = p.icon
              return (
                <button
                  type="button"
                  key={p.label}
                  onClick={() => setPriority(p.label)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    priority === p.label
                      ? `${p.bg} text-white shadow-md`
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {p.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="text-sm font-semibold text-muted-foreground block mb-2">Date</label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Time */}
        <div>
          <label className="text-sm font-semibold text-muted-foreground block mb-2">Time</label>
          <div className="relative">
            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Reminder toggle */}
        <div className="flex items-center justify-between bg-card rounded-xl px-4 py-3.5 border border-border">
          <span className="text-sm font-medium text-foreground">Set Reminder</span>
          <button
            type="button"
            onClick={() => setReminder(!reminder)}
            className={`w-12 h-7 rounded-full transition-colors relative ${
              reminder ? "bg-primary" : "bg-muted-foreground/30"
            }`}
            role="switch"
            aria-checked={reminder}
          >
            <span
              className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-sm transition-transform ${
                reminder ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>

        {/* Repeat dropdown */}
        <div className="relative">
          <div className="flex items-center justify-between bg-card rounded-xl px-4 py-3.5 border border-border">
            <span className="text-sm font-medium text-foreground">Repeat</span>
            <button
              type="button"
              onClick={() => setShowRepeatDropdown(!showRepeatDropdown)}
              className="flex items-center gap-1 text-sm text-muted-foreground"
            >
              {repeat}
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          {showRepeatDropdown && (
            <div className="absolute right-0 top-full mt-1 bg-card rounded-xl shadow-lg border border-border py-1 z-20 w-40">
              {repeatOptions.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => {
                    setRepeat(opt)
                    setShowRepeatDropdown(false)
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-secondary ${
                    repeat === opt ? "text-primary font-medium" : "text-foreground"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Alarm toggle */}
        <div className="flex items-center justify-between bg-card rounded-xl px-4 py-3.5 border border-border">
          <span className="text-sm font-medium text-foreground">Alarm</span>
          <button
            type="button"
            onClick={() => setAlarm(!alarm)}
            className={`w-12 h-7 rounded-full transition-colors relative ${
              alarm ? "bg-primary" : "bg-muted-foreground/30"
            }`}
            role="switch"
            aria-checked={alarm}
          >
            <span
              className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-sm transition-transform ${
                alarm ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Save button */}
      <div className="px-5 pb-6 pt-2">
        <button
          type="button"
          onClick={handleSave}
          className="w-full h-14 rounded-3xl bg-primary text-primary-foreground text-base font-semibold active:scale-[0.98] transition-transform shadow-lg"
        >
          Save Task
        </button>
      </div>
    </div>
  )
}
