import { Bell, Mic, Home, Calendar, User, Plus } from "lucide-react";

export default function RingTaskHome() {
  return (
    <div className="w-[414px] h-[896px] bg-[#F4F7FA] relative flex flex-col shadow-2xl border-[8px] border-[#1E293B] rounded-[60px] overflow-hidden mx-auto">
      {/* Header - Matches Page 15 of PDF */}
      <header className="px-6 py-10 flex justify-between items-center shrink-0">
        <Bell className="text-gray-400" size={24} />
        <h2 className="text-xl font-black text-[#1E293B]">RingTask</h2>
        <div className="bg-[#8B5CF6] p-2 rounded-full text-white shadow-lg"><Mic size={20} fill="currentColor" /></div>
      </header>

      {/* Efficiency Ring Area */}
      <main className="px-6 flex-1 overflow-y-auto">
        <h1 className="text-2xl font-black text-[#1E293B]">Hello, Khaled</h1>
        <p className="text-sm text-gray-400 mb-8">Efficiency is up 12% today!</p>

        <div className="bg-white rounded-[40px] p-10 flex flex-col items-center shadow-sm border border-gray-100 mb-8">
          <div className="w-40 h-40 rounded-full border-[15px] border-[#F1F5F9] border-t-[#10B981] flex items-center justify-center">
            <span className="text-4xl font-black text-[#1E293B]">85%</span>
          </div>
          <p className="mt-4 text-[10px] font-bold text-gray-300 uppercase tracking-widest">Weekly Goal</p>
        </div>

        {/* AI Insight */}
        <div className="bg-[#8B5CF6] p-6 rounded-[30px] text-white shadow-lg shadow-purple-100">
          <p className="text-sm font-bold leading-relaxed italic">
            "Khaled, you usually finish tasks fastest in the morning."
          </p>
        </div>
      </main>

      {/* Navigation Bar */}
      <nav className="absolute bottom-0 w-full bg-white/90 backdrop-blur-md py-8 px-10 flex justify-between items-center border-t border-gray-100">
        <Home className="text-[#10B981]" size={28} />
        <Calendar className="text-gray-300" size={28} />
        <div className="absolute left-1/2 -translate-x-1/2 -top-10">
          <button className="bg-[#10B981] p-5 rounded-full text-white shadow-xl border-[5px] border-[#F4F7FA]"><Plus size={30} /></button>
        </div>
        <Bell className="text-gray-300" size={28} />
        <User className="text-gray-300" size={28} />
      </nav>
    </div>
  );
}