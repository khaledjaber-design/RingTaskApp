import BottomNav from "./BottomNav";
import VoiceModal from "@/components/VoiceModal";

export const dynamic = "force-dynamic";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-slate-200 p-4 font-sans">
            <div className="w-full max-w-[380px] h-[812px] bg-[#f8fafc] rounded-[3.5rem] border-[16px] border-[#1e293b] shadow-2xl flex flex-col relative overflow-hidden ring-4 ring-gray-300 ring-opacity-50">

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
