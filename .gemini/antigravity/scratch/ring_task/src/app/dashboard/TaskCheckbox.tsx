"use client";

import { useTransition } from "react";
import { toggleTaskCompletion } from "@/lib/actions";

export default function TaskCheckbox({ id, defaultChecked }: { id: string, defaultChecked: boolean }) {
    const [isPending, startTransition] = useTransition();

    return (
        <button
            disabled={isPending}
            onClick={() => {
                startTransition(() => {
                    toggleTaskCompletion(id, !defaultChecked);
                });
            }}
            className={`w-5 h-5 rounded-full border-[1.5px] shrink-0 flex items-center justify-center transition-colors ${defaultChecked ? 'bg-[#20c997] border-[#20c997]' : 'border-gray-300 hover:border-[#20c997]'}`}
        >
            {defaultChecked && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            )}
        </button>
    );
}
