"use client"

import React from "react"
import { ChevronLeft, Zap } from "lucide-react"
import { useRouter } from "next/navigation"
import { useStore } from "@/lib/store"

interface HeaderProps {
    title: string
    showBack?: boolean
}

export const Header = ({ title, showBack = false }: HeaderProps) => {
    const router = useRouter()
    const { coins } = useStore()

    return (
        <header className="sticky top-0 w-full h-16 bg-black/40 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8 z-[60]">
            <div className="flex items-center gap-4">
                {showBack && (
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-white/10 rounded-xl transition-all border border-transparent hover:border-white/10"
                    >
                        <ChevronLeft size={20} className="text-white" />
                    </button>
                )}
                <h1 className="text-xl font-black tracking-tight text-white uppercase italic">
                    {title}
                </h1>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 bg-[#FFD700]/5 border border-[#FFD700]/20 px-4 py-1.5 rounded-full">
                    <Zap size={14} className="text-[#FFD700] fill-[#FFD700]" />
                    <span className="text-[#FFD700] text-sm font-black tracking-widest">
                        {coins.toLocaleString()}
                    </span>
                </div>

                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center">
                    <span className="text-xs font-black text-white">JD</span>
                </div>
            </div>
        </header>
    )
}
