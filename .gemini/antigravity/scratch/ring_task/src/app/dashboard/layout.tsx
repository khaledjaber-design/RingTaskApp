import BottomNav from "./BottomNav";
import VoiceModal from "@/components/VoiceModal";

export const dynamic = "force-dynamic";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-slate-200 dark:bg-black p-4 font-sans transition-colors duration-300">
            <div className="w-full max-w-[380px] h-[812px] bg-[#f8fafc] dark:bg-[#0f172a] rounded-[3.5rem] border-[16px] border-[#1e293b] shadow-2xl flex flex-col relative overflow-hidden ring-4 ring-gray-300 dark:ring-gray-800 ring-opacity-50 transition-colors duration-300">

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto pb-[90px] no-scrollbar">
                    {children}
                </div>

                {/* Bottom Navigation Bar Client Component */}
                <BottomNav />

                {/* Global Voice Overlay */}
                <VoiceModal />
            </div>
        </main>
    );
}
