"use client"

import React from "react"
import { motion } from "framer-motion"
import { Zap, Diamond, Trophy, Share2, Download, ChevronRight } from "lucide-react"

interface SuccessCardProps {
    coins: number
    gems: number
    badge?: { icon: string; title: string; name: string }
    stats: { time: string; tests: string; power: string }
    onNext: () => void
}

export const SuccessCard = ({ coins, gems, badge, stats, onNext }: SuccessCardProps) => {
    return (
        <div className="absolute inset-0 flex items-center justify-center p-6 bg-black/60 backdrop-blur-md z-[110]">
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="glass-card w-full p-6 border-2 border-[#00D9A3] relative overflow-hidden"
            >
                {/* Glow behind */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00D9A3] to-transparent shadow-[0_0_20px_#00D9A3]" />

                <h2 className="text-2xl font-black text-[#00D9A3] text-center mb-6 uppercase tracking-tighter italic">
                    COMPILE SUCCESS!
                </h2>

                <div className="space-y-4 mb-8">
                    {/* Rewards */}
                    <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#FFD700] flex items-center justify-center shadow-[0_0_10px_#FFD700]">
                                <Zap size={16} className="text-black fill-black" />
                            </div>
                            <span className="text-lg font-bold">+{coins} COINS</span>
                        </div>
                        <span className="text-[10px] text-gray-500 uppercase font-black">Rewarded</span>
                    </div>

                    <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#8B5CF6] flex items-center justify-center shadow-[0_0_10px_#8B5CF6]">
                                <Diamond size={16} className="text-white fill-white" />
                            </div>
                            <span className="text-lg font-bold">+{gems} GEMS</span>
                        </div>
                        <span className="text-[10px] text-gray-500 uppercase font-black">Rewarded</span>
                    </div>
                </div>

                {/* Badge Section */}
                {badge && (
                    <div className="flex flex-col items-center mb-8 bg-gradient-to-b from-[#FFD700]/10 to-transparent p-4 rounded-3xl border border-[#FFD700]/20">
                        <div className="w-16 h-16 rounded-full bg-[#FFD700] flex items-center justify-center shadow-[0_0_20px_#FFD700] mb-3">
                            <Trophy size={32} className="text-black" />
                        </div>
                        <span className="text-[10px] text-[#FFD700] font-black uppercase tracking-widest">Badge Unlocked</span>
                        <h4 className="text-lg font-bold text-white uppercase italic">{badge.name}</h4>
                    </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-2 mb-8">
                    {[
                        { label: "TIME", value: stats.time },
                        { label: "TESTS", value: stats.tests },
                        { label: "POWER", value: stats.power }
                    ].map((stat) => (
                        <div key={stat.label} className="bg-black p-2 rounded-lg border border-white/10 text-center">
                            <span className="text-[8px] text-gray-500 block font-black">{stat.label}</span>
                            <span className="text-[10px] text-white font-mono">{stat.value}</span>
                        </div>
                    ))}
                </div>

                {/* Level Progress */}
                <div className="mb-8">
                    <div className="flex justify-between items-end mb-1">
                        <span className="text-[10px] font-black uppercase text-gray-500">Level 1 Progress</span>
                        <span className="text-[10px] font-black text-[#FFD700]">80%</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "80%" }}
                            className="h-full bg-[#FFD700] shadow-[0_0_10px_#FFD700]"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <button className="flex-1 bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/10 flex items-center justify-center transition-colors">
                        <Share2 size={18} className="text-gray-400" />
                    </button>
                    <button className="flex-1 bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/10 flex items-center justify-center transition-colors">
                        <Download size={18} className="text-gray-400" />
                    </button>
                    <button
                        onClick={onNext}
                        className="flex-[2] bg-[#00D9A3] hover:bg-[#00B894] text-black p-3 rounded-xl flex items-center justify-center gap-2 font-black uppercase transition-colors"
                    >
                        <span>Next Lesson</span>
                        <ChevronRight size={18} />
                    </button>
                </div>
            </motion.div>
        </div>
    )
}
