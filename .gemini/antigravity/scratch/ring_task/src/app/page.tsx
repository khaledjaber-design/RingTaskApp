import { AuthButtons } from "@/components/AuthButtons";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-200 p-4 font-sans">
      <div className="w-full max-w-[380px] h-[812px] bg-[#f8fafc] rounded-[3.5rem] border-[16px] border-[#1e293b] shadow-2xl flex flex-col relative overflow-hidden ring-4 ring-gray-300 ring-opacity-50">

        {/* Branding */}
        <div className="flex flex-col items-center mt-32 px-6">
          <div className="w-[60px] h-[60px] bg-[#20c997] rounded-2xl flex items-center justify-center mb-6 shadow-sm">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </div>
          <h1 className="text-[32px] font-extrabold text-[#0f172a] tracking-tight leading-none mb-3">RingTask</h1>
          <p className="text-[#64748b] text-[15px] font-medium text-center">Your AI-Powered Task Assistant</p>
        </div>

        {/* Buttons */}
        <div className="px-7 mt-12 w-full">
          <AuthButtons />
        </div>
      </div>
    </main>
  );
}
