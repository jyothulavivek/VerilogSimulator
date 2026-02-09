"use client"

// Disable static generation (requires client-side state)
export const dynamic = 'force-dynamic'

import React, { useState } from "react"
import { Header } from "@/components/Header"
import { verilogLessons } from "@/content/lessons/verilog-curriculum"
import { systemVerilogLessons } from "@/content/lessons/system-verilog"
import { uvmLessons } from "@/content/lessons/uvm"
import { advancedVerificationLessons } from "@/content/lessons/advanced-verification"
import { motion, AnimatePresence } from "framer-motion"
import {
    Code2,
    Cpu,
    ShieldCheck,
    BookOpen,
    Play,
    Lock,
    CheckCircle2,
    ChevronRight,
    ArrowRight,
    Layers,
    Zap,
    Activity
} from "lucide-react"
import Link from "next/link"
import { useStore } from "@/lib/store"
import { cn } from "@/lib/utils"

export default function Curriculum() {
    const [activeModule, setActiveModule] = useState<number>(1)
    const { progress = {}, completedLessons = {} } = useStore()

    const modules = [
        {
            id: 1,
            title: "Verilog HDL",
            tagline: "Digital Design & RTL Fundamentals",
            icon: Code2,
            color: "#00D9A3",
            lessons: verilogLessons  // All Verilog content (basic + professional)
        },
        {
            id: 2,
            title: "SystemVerilog",
            tagline: "Advanced Verification & OOP",
            icon: Cpu,
            color: "#8B5CF6",
            lessons: systemVerilogLessons  // All SystemVerilog content (basic + professional)
        },
        {
            id: 3,
            title: "UVM Framework",
            tagline: "Universal Verification Methodology",
            icon: ShieldCheck,
            color: "#FF6B9D",
            lessons: uvmLessons  // All UVM content (basic + professional)
        }
    ]

    // Calculate real-time progress for each module
    const moduleProgress = modules.map(mod => {
        const completedInModule = completedLessons[`module-${mod.id}`] || []
        const totalLessons = mod.lessons.length
        const completedCount = mod.lessons.filter(l => completedInModule.includes(l.id)).length
        const percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0

        return {
            moduleId: mod.id,
            total: totalLessons,
            completed: completedCount,
            percentage
        }
    })

    const currentModule = modules.find(m => m.id === activeModule) || modules[0]
    const currentProgress = moduleProgress.find(p => p.moduleId === activeModule) || { total: 0, completed: 0, percentage: 0 }

    return (
        <div className="flex flex-col min-h-screen bg-black">
            <Header title="Knowledge Curriculum" />

            <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
                {/* Module Selector - Modern Vertical or Grid? Let's use a sleek grid scroll */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-12">
                    {modules.map((mod) => {
                        const isActive = activeModule === mod.id
                        const Icon = mod.icon
                        const modProgress = moduleProgress.find(p => p.moduleId === mod.id) || { total: 0, completed: 0, percentage: 0 }

                        return (
                            <button
                                key={mod.id}
                                onClick={() => setActiveModule(mod.id)}
                                className={cn(
                                    "p-5 rounded-[28px] border transition-all duration-500 relative overflow-hidden group flex flex-col items-start gap-4",
                                    isActive
                                        ? "bg-[#0a0a0a] border-white/10 shadow-lg"
                                        : "bg-transparent border-white/5 hover:border-white/10"
                                )}
                            >
                                {/* Progress Badge */}
                                <div className="absolute top-3 right-3 z-10">
                                    <div
                                        className="px-2 py-1 rounded-full text-[10px] font-black"
                                        style={{
                                            backgroundColor: `${mod.color}15`,
                                            color: mod.color,
                                            border: `1px solid ${mod.color}30`
                                        }}
                                    >
                                        {modProgress.percentage}%
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 w-full">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500 group-hover:scale-110"
                                        style={{
                                            backgroundColor: isActive ? `${mod.color}20` : 'rgba(255,255,255,0.05)',
                                            borderColor: isActive ? `${mod.color}40` : 'rgba(255,255,255,0.05)',
                                            color: isActive ? mod.color : '#666'
                                        }}
                                    >
                                        <Icon size={20} />
                                    </div>
                                    <div className="text-left flex-1">
                                        <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{mod.tagline}</p>
                                        <h3 className={cn(
                                            "text-xs font-black uppercase italic tracking-tight transition-colors",
                                            isActive ? "text-white" : "text-gray-600"
                                        )}>{mod.title}</h3>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full transition-all duration-700 rounded-full"
                                        style={{
                                            width: `${modProgress.percentage}%`,
                                            backgroundColor: mod.color
                                        }}
                                    />
                                </div>

                                {/* Stats */}
                                <div className="text-[10px] font-bold text-gray-600">
                                    {modProgress.completed} / {modProgress.total} Lessons
                                </div>
                            </button>
                        )
                    })}
                </div>

                {/* Lessons List */}
                <div className="space-y-12">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeModule}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-8"
                        >
                            <div className="space-y-2 px-2">
                                <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-none">
                                    {currentModule.title}
                                </h2>
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-[0.2em]">
                                    {currentModule.tagline} • Mastery Units
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {currentModule.lessons.map((lesson, idx) => {
                                    const isCompleted = (progress[lesson.id] || 0) === 100
                                    // Simple unlock logic for demo - can be refined
                                    const isLocked = false

                                    return (
                                        <div
                                            key={lesson.id}
                                            className={cn(
                                                "bg-[#0a0a0a] border border-white/5 rounded-[40px] p-6 space-y-6 flex flex-col group transition-all duration-500",
                                                !isLocked && "hover:border-white/10 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                                            )}
                                        >
                                            <div className="aspect-[16/10] bg-white/5 rounded-[24px] overflow-hidden relative">
                                                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                                    <BookOpen size={48} className="text-white" />
                                                </div>
                                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent" />

                                                {!isLocked && (
                                                    <div className="absolute top-4 right-4 z-10">
                                                        {isCompleted ? (
                                                            <div className="w-8 h-8 rounded-full bg-[#00D9A3]/10 border border-[#00D9A3]/30 flex items-center justify-center">
                                                                <CheckCircle2 size={16} className="text-[#00D9A3]" />
                                                            </div>
                                                        ) : (
                                                            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/20 flex items-center justify-center">
                                                                <ArrowRight size={16} className="text-white/40" />
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="space-y-4 flex-1">
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Unit {idx + 1}</span>
                                                        <div className="w-1 h-1 rounded-full bg-white/10" />
                                                        <span className="text-[10px] font-black uppercase text-gray-400">Advanced RTL</span>
                                                    </div>
                                                    <h4 className="text-xl font-black text-white italic uppercase tracking-tighter leading-tight group-hover:text-[#00D9A3] transition-colors">
                                                        {lesson.title}
                                                    </h4>
                                                </div>
                                                <p className="text-xs text-gray-500 font-bold leading-relaxed line-clamp-4 overflow-hidden">
                                                    {lesson.theory}
                                                </p>
                                            </div>

                                            <div className="pt-4 border-t border-white/5">
                                                <Link
                                                    href={`/simulator?track=${lesson.track}&module=${lesson.id}`}
                                                    className="w-full h-12 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest italic transition-all bg-white text-black hover:bg-white/90 active:scale-[0.98] shadow-lg"
                                                >
                                                    {isCompleted ? "Practice Again" : "Start Learning"}
                                                    <Play size={14} fill="currentColor" />
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    )
}
