"use client";

import React, { useState, useEffect } from 'react';

export default function RingTaskApp() {
  const [tasks, setTasks] = useState<{ id: number; text: string; completed: boolean }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [mounted, setMounted] = useState(false);

  // Load from LocalStorage only after component mounts to avoid Next.js errors
  useEffect(() => {
    const saved = localStorage.getItem('ring-tasks-v1');
    if (saved) setTasks(JSON.parse(saved));
    setMounted(true);
  }, []);

  // Save to LocalStorage whenever tasks change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('ring-tasks-v1', JSON.stringify(tasks));
    }
  }, [tasks, mounted]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: inputValue, completed: false }]);
    setInputValue('');
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: number) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const percentage = tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);

  if (!mounted) return null; // Prevents "Hydration" flicker

  return (
    <main className="min-h-screen bg-white p-8 flex flex-col items-center">
      {/* THE RING PROGRESS */}
      <div className="relative w-48 h-48 mb-8">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <circle className="stroke-gray-100" strokeWidth="3" fill="transparent" r="16" cx="18" cy="18" />
          <circle 
            className="stroke-green-500 transition-all duration-500 ease-in-out" 
            strokeWidth="3" 
            strokeDasharray={`${percentage}, 100`} 
            strokeLinecap="round" 
            fill="transparent" 
            r="16" cx="18" cy="18" 
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold">{percentage}%</span>
          <span className="text-gray-500 text-sm">Done</span>
        </div>
      </div>

      {/* ALWAYS VISIBLE INPUT */}
      <form onSubmit={addTask} className="w-full max-w-md flex gap-2 mb-8">
        <input 
          className="flex-1 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-black"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What's the next goal?"
        />
        <button type="submit" className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition">
          Add
        </button>
      </form>

      {/* TASK LIST */}
      <div className="w-full max-w-md space-y-3">
        {tasks.map(task => (
          <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl group border border-transparent hover:border-gray-200 transition">
            <div className="flex items-center gap-3 cursor-pointer flex-1" onClick={() => toggleTask(task.id)}>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                {task.completed && <span className="text-white text-xs">✓</span>}
              </div>
              <span className={`text-lg ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                {task.text}
              </span>
            </div>
            <button 
              onClick={() => deleteTask(task.id)}
              className="text-gray-400 hover:text-red-500 transition px-2"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}