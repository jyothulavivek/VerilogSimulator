"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code2, Activity, ListChecks, Play } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileSimulatorProps {
    editor: React.ReactNode
    waveform: React.ReactNode
    results: React.ReactNode
    onRun: () => void
    isSimulating: boolean
}

export const MobileSimulator = ({ editor, waveform, results, onRun, isSimulating }: MobileSimulatorProps) => {
    const [activeTab, setActiveTab] = useState<'code' | 'waves' | 'tests'>('code')

    const tabs = [
        { id: 'code', label: 'Code', icon: Code2 },
        { id: 'waves', label: 'Waveform', icon: Activity },
        { id: 'tests', label: 'Results', icon: ListChecks },
    ] as const

    return (
        <div className="flex flex-col h-full bg-black relative">
            {/* Tab Content */}
            <div className="flex-1 overflow-hidden p-4">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="h-full"
                    >
                        {activeTab === 'code' && editor}
                        {activeTab === 'waves' && waveform}
                        {activeTab === 'tests' && results}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Mobile Tab Bar */}
            <div className="h-16 bg-[#1a1a1a] border-t border-white/5 flex items-center justify-around px-4">
                {tabs.map((tab) => {
                    const Icon = tab.icon
                    const isActive = activeTab === tab.id

                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "flex flex-col items-center gap-1 transition-all",
                                isActive ? "text-[#00D9A3]" : "text-gray-500"
                            )}
                        >
                            <Icon size={20} />
                            <span className="text-[10px] font-black uppercase">{tab.label}</span>
                        </button>
                    )
                })}
            </div>

            {/* Floating Action Button */}
            <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onRun}
                disabled={isSimulating}
                className="absolute bottom-20 right-6 w-14 h-14 bg-[#00D9A3] rounded-full shadow-[0_0_20px_rgba(0,217,163,0.5)] flex items-center justify-center text-black z-[70]"
            >
                {isSimulating ? (
                    <div className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                    <Play size={24} fill="currentColor" />
                )}
            </motion.button>
        </div>
    )
}
