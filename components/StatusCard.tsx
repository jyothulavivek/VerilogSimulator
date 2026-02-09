"use client"

import React from "react"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatusCardProps {
    label: string
    value: string | number
    subValue?: string
    icon: LucideIcon
    color: string
    progress?: number
    className?: string
}

export const StatusCard = ({
    label,
    value,
    subValue,
    icon: Icon,
    color,
    progress,
    className
}: StatusCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className={cn(
                "bg-[#0a0a0a] border border-white/5 rounded-[32px] p-6 relative overflow-hidden group transition-all duration-500 hover:border-white/10 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]",
                className
            )}
        >
            {/* Background Glow */}
            <div
                className="absolute -right-4 -top-4 w-32 h-32 blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                style={{ backgroundColor: color }}
            />

            <div className="flex items-start justify-between relative z-10">
                <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                        {label}
                    </p>
                    <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase">
                        {value}
                    </h3>
                    {subValue && (
                        <p className="text-[10px] font-bold text-gray-400 opacity-60">
                            {subValue}
                        </p>
                    )}
                </div>

                <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-500 group-hover:scale-110"
                    style={{
                        backgroundColor: `${color}10`,
                        borderColor: `${color}30`,
                        color: color
                    }}
                >
                    <Icon size={24} />
                </div>
            </div>

            {progress !== undefined && (
                <div className="mt-8 space-y-2 relative z-10">
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                            style={{ backgroundColor: color }}
                        />
                    </div>
                    <div className="flex justify-between text-[10px] font-black uppercase text-gray-600 tracking-widest">
                        <span>Overall Progress</span>
                        <span style={{ color }}>{progress}%</span>
                    </div>
                </div>
            )}
        </motion.div>
    )
}
