import Link from "next/link";
import { getTasksForDate } from "@/lib/actions";
import TaskCheckbox from "../../TaskCheckbox";

export const dynamic = "force-dynamic";

type Task = Awaited<ReturnType<typeof getTasksForDate>>[number];

export default async function DailyTasks({ params }: { params: { date: string } }) {
    const dateStr = params.date ?? new Date().toISOString().split('T')[0];

    const [year, month, day] = dateStr.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    const formattedDate = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(dateObj);

    let tasks: Task[] = [];
    try {
        tasks = await getTasksForDate(dateStr);
    } catch (_e) {
        // unauthenticated or error — show empty state
    }

    const completed = tasks.filter(t => t.isCompleted);
    const todo = tasks.filter(t => !t.isCompleted);
    const percent = tasks.length === 0 ? 0 : Math.round((completed.length / tasks.length) * 100);

    const categoryColor: Record<string, string> = {
        Work: 'bg-[#3b82f6]',
        Personal: 'bg-[#8b5cf6]',
        Health: 'bg-[#20c997]',
    };

    return (
        <div className="flex flex-col min-h-full bg-[#f8fafc] dark:bg-[#0f172a] w-full relative px-5 pt-8 pb-10 transition-colors duration-300">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <Link href="/dashboard/calendar" className="w-10 h-10 bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-transparent rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-[#64748b] dark:stroke-gray-400 transition-colors">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </Link>
                <h1 className="text-[17px] font-extrabold text-[#0f172a] dark:text-white tracking-tight transition-colors">{formattedDate}</h1>
                <div className="w-10 h-10 bg-white dark:bg-[#1e293b] rounded-full flex items-center justify-center opacity-0 pointer-events-none transition-colors"></div>
            </div>

            {/* Daily Progress Card */}
            <div className="bg-white dark:bg-[#1e293b] rounded-[1.5rem] p-5 shadow-sm border border-gray-100 dark:border-transparent flex flex-col gap-3 mb-6 transition-colors">
                <div className="flex justify-between items-end">
                    <div>
                        <h3 className="font-bold text-[#0f172a] dark:text-white text-[16px] transition-colors">Daily Progress</h3>
                        <p className="text-[#64748b] dark:text-gray-400 text-[13px] font-medium mt-1 transition-colors">Schedule for {formattedDate}</p>
                    </div>
                    <div className="text-right">
                        <span className="font-extrabold text-[#20c997] text-[22px] transition-colors">{percent}%</span>
                    </div>
                </div>
                <div className="w-full h-3.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mt-1 transition-colors">
                    <div className="h-full bg-[#20c997] rounded-full transition-all duration-1000 ease-out" style={{ width: `${percent}%` }}></div>
                </div>
                <p className="text-[12px] font-bold text-[#0f172a] dark:text-white mt-1 transition-colors">
                    {completed.length} <span className="text-[#94a3b8] font-medium transition-colors">/ {tasks.length} tasks completed</span>
                </p>
            </div>

            {/* To Do Tasks */}
            {todo.length > 0 && (
                <>
                    <h2 className="font-bold text-[#0f172a] dark:text-white text-[15px] mb-3 px-1 transition-colors">To Do ({todo.length})</h2>
                    <div className="flex flex-col gap-3 mb-8">
                        {todo.map((task) => (
                            <div key={task.id} className="bg-white dark:bg-[#1e293b] rounded-[1.2rem] p-4 shadow-sm border border-gray-100 dark:border-transparent flex items-center justify-between transition-colors">
                                <div className="flex items-center gap-4">
                                    <TaskCheckbox id={task.id} defaultChecked={false} />
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-[#0f172a] dark:text-white text-[15px] transition-colors">{task.title}</span>
                                        {task.time && <span className="text-[#64748b] dark:text-gray-400 text-[12px] font-medium mt-0.5 transition-colors">{task.time}</span>}
                                    </div>
                                </div>
                                <div className={`w-3 h-3 rounded-full ${categoryColor[task.category] ?? 'bg-[#20c997]'}`}></div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Completed Tasks */}
            {completed.length > 0 && (
                <>
                    <h2 className="font-bold text-[#0f172a] dark:text-white text-[15px] mb-3 px-1 transition-colors">Completed ({completed.length})</h2>
                    <div className="flex flex-col gap-3">
                        {completed.map((task) => (
                            <div key={task.id} className="bg-gray-50 dark:bg-[#1e293b]/50 rounded-[1.2rem] p-4 border border-gray-100 dark:border-transparent flex items-center justify-between opacity-75 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-6 h-6 rounded-full border-2 border-[#20c997] bg-[#20c997] flex items-center justify-center flex-shrink-0">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-[#94a3b8] dark:text-gray-500 text-[15px] line-through decoration-2 transition-colors">{task.title}</span>
                                        {task.time && <span className="text-[#94a3b8] dark:text-gray-600 text-[12px] font-medium mt-0.5 transition-colors">{task.time}</span>}
                                    </div>
                                </div>
                                <div className={`w-3 h-3 rounded-full opacity-60 ${categoryColor[task.category] ?? 'bg-[#20c997]'}`}></div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Empty state */}
            {tasks.length === 0 && (
                <div className="flex flex-col items-center justify-center flex-1 py-16 gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-[#1e293b] flex items-center justify-center transition-colors">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 12h8M12 8v8"></path></svg>
                    </div>
                    <p className="text-[#64748b] dark:text-gray-400 font-semibold text-[15px] text-center transition-colors">No tasks for this day</p>
                    <p className="text-[#94a3b8] dark:text-gray-500 text-[13px] text-center transition-colors">Tap the + button to add a task</p>
                </div>
            )}

        </div>
    );
}
