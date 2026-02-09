"use client"

import React from "react"
import { Lock, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface ModuleCardProps {
    title: string
    topics: string[]
    progress: number
    status: 'locked' | 'available' | 'completed'
    currentLesson?: string
    onClick: () => void
}

export const ModuleCard = ({ title, topics, progress, status, onClick }: ModuleCardProps) => {
    const isLocked = status === 'locked'
    const isCompleted = status === 'completed'
    const isAvailable = status === 'available'

    return (
        <motion.div
            whileHover={{ scale: isLocked ? 1 : 1.02 }}
            whileTap={{ scale: isLocked ? 1 : 0.98 }}
            onClick={isLocked ? undefined : onClick}
            className={cn(
                "glass-card p-5 mb-4 cursor-pointer transition-all duration-300",
                isLocked && "opacity-60 grayscale blur-[1px] border-gray-700 pointer-events-none",
                isAvailable && "gradient-border-green shadow-glow-green",
                isCompleted && "gradient-border-pink"
            )}
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-white mb-1 uppercase italic tracking-wider">
                        {title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {topics.map((topic) => (
                            <span key={topic} className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-400">
                                {topic}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    {isLocked ? (
                        <Lock className="text-gray-500" size={20} />
                    ) : isCompleted ? (
                        <CheckCircle2 className="text-[#FF6B9D]" size={24} />
                    ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-[#00D9A3] border-t-transparent animate-spin" />
                    )}
                </div>
            </div>

            {/* Progress Bar Segments */}
            <div className="flex gap-1.5 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                {[1, 2, 3, 4].map((segment) => {
                    const segmentProgress = (progress / 100) * 4
                    const isFilled = segmentProgress >= segment
                    const isPartial = segmentProgress > segment - 1 && segmentProgress < segment

                    return (
                        <div
                            key={segment}
                            className="flex-1 transition-all duration-500 rounded-full"
                            style={{
                                backgroundColor: isFilled
                                    ? (isCompleted ? '#FF6B9D' : '#00D9A3')
                                    : 'rgba(255, 255, 255, 0.05)',
                                width: isPartial ? `${(segmentProgress % 1) * 100}%` : '100%'
                            }}
                        />
                    )
                })}
            </div>

            <div className="mt-3 flex justify-between items-center">
                <span className="text-xs text-gray-500 font-medium">
                    {isLocked ? "Unlock at Level 2" : `${Math.round(progress)}% Complete`}
                </span>
                {!isLocked && (
                    <span className={cn(
                        "text-xs font-bold uppercase",
                        isCompleted ? "text-[#FF6B9D]" : "text-[#00D9A3]"
                    )}>
                        {isCompleted ? "Review" : "Continue"} →
                    </span>
                )}
            </div>
        </motion.div>
    )
}
