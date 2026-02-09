"use client"

import React from "react"
import { LayoutDashboard, GraduationCap, Cpu, Code2, ShieldCheck, Settings, Trophy, Zap, Rocket } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const sidebarItems = [
    {
        group: "Overview", items: [
            { label: "Student Status", icon: LayoutDashboard, href: "/" },
        ]
    },
    {
        group: "Learning", items: [
            { label: "Knowledge Base", icon: GraduationCap, href: "/curriculum" },
            { label: "Challenge Lab", icon: Rocket, href: "/challenges" },
        ]
    },
    {
        group: "Practice", items: [
            { label: "Wide Simulator", icon: Cpu, href: "/simulator" },
            { label: "Waveform Viewer", icon: Zap, href: "/simulator?tool=waves" },
        ]
    },
    {
        group: "System", items: [
            { label: "Settings", icon: Settings, href: "/settings" },
        ]
    }
]

export const Sidebar = () => {
    const pathname = usePathname()

    return (
        <div className="w-64 h-screen bg-[#0a0a0a] border-r border-white/5 flex flex-col fixed left-0 top-0 z-[100]">
            <div className="p-6">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-[#00D9A3] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,217,163,0.4)] rotate-3">
                        <Code2 className="text-black" size={24} />
                    </div>
                    <div>
                        <h1 className="text-lg font-black text-white italic tracking-tighter uppercase leading-none">
                            VLSI LAB
                        </h1>
                        <span className="text-[10px] text-[#00D9A3] font-black uppercase tracking-widest">Academy</span>
                    </div>
                </div>

                <nav className="space-y-8">
                    {sidebarItems.map((group) => (
                        <div key={group.group}>
                            <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] mb-4 px-3">
                                {group.group}
                            </h3>
                            <div className="space-y-1">
                                {group.items.map((item) => {
                                    const isActive = pathname === item.href
                                    const Icon = item.icon

                                    return (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            className={cn(
                                                "flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 group",
                                                isActive
                                                    ? "bg-[#00D9A3]/10 text-[#00D9A3] border border-[#00D9A3]/20"
                                                    : "text-gray-500 hover:text-white hover:bg-white/5"
                                            )}
                                        >
                                            <Icon size={20} className={cn(
                                                "transition-all",
                                                isActive ? "drop-shadow-[0_0_8px_rgba(0,217,163,0.5)]" : "group-hover:text-white"
                                            )} />
                                            <span className="text-sm font-bold">{item.label}</span>

                                            {isActive && (
                                                <div className="ml-auto w-1 h-1 bg-[#00D9A3] rounded-full shadow-[0_0_8px_#00D9A3]" />
                                            )}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </nav>
            </div>

            <div className="mt-auto p-6">
                <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/5 rounded-2xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-[#FFD700] flex items-center justify-center shadow-[0_0_10px_#FFD700]">
                            <Zap size={16} className="text-black fill-black" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-500 uppercase">Power Level</p>
                            <p className="text-xs font-bold text-white tracking-widest uppercase">Expert</p>
                        </div>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-[#FFD700] w-[80%] shadow-[0_0_10px_#FFD700]" />
                    </div>
                </div>
            </div>
        </div>
    )
}
