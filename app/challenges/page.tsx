"use client"

import React from "react"
import { Header } from "@/components/Header"
import { designChallenges } from "@/content/challenges"
import { motion } from "framer-motion"
import {
    Rocket,
    Dna,
    Terminal,
    ChevronRight,
    Zap,
    Code2,
    Lock,
    Star
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function ProblemSolving() {
    return (
        <div className="flex flex-col min-h-screen bg-black">
            <Header title="Challenge Lab" />

            <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
                {/* Hero Section */}
                <section className="mb-12 relative overflow-hidden rounded-[40px] bg-[#0a0a0a] border border-white/5 p-12">
                    <div className="absolute right-0 top-0 w-96 h-96 bg-[#8B5CF6] opacity-5 blur-[100px]" />
                    <div className="relative z-10 max-w-2xl space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center">
                                <Rocket className="text-[#8B5CF6]" size={16} />
                            </div>
                            <span className="text-[10px] font-black text-[#8B5CF6] uppercase tracking-[0.3em]">Advanced Lab</span>
                        </div>
                        <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter leading-[0.9]">
                            Problem<br />Solving Lab
                        </h2>
                        <p className="text-gray-500 font-bold text-sm leading-relaxed">
                            Apply your Verilog and SystemVerilog knowledge to build industry-standard hardware blocks. Complete challenges to earn exclusive badges and lab credits.
                        </p>
                    </div>
                </section>

                {/* Challenges Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
                    {designChallenges.map((challenge) => (
                        <motion.div
                            key={challenge.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -8 }}
                            className="bg-[#0a0a0a] border border-white/5 rounded-[40px] p-8 flex flex-col space-y-6 group transition-all duration-500 hover:border-white/10"
                        >
                            <div className="flex justify-between items-start">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-[#8B5CF6]/10 group-hover:border-[#8B5CF6]/20 transition-all duration-500">
                                    <Code2 size={28} className="text-gray-600 group-hover:text-[#8B5CF6]" />
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="flex items-center gap-1 text-[#FFD700]">
                                        <Star size={12} fill="currentColor" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">{challenge.points} XP</span>
                                    </div>
                                    <span className={cn(
                                        "text-[9px] font-black uppercase px-2 py-0.5 rounded-full mt-2",
                                        challenge.difficulty === 'Advanced' ? 'bg-[#00D9A3]/10 text-[#00D9A3]' :
                                            challenge.difficulty === 'Expert' ? 'bg-[#FF6B9D]/10 text-[#FF6B9D]' :
                                                'bg-[#8B5CF6]/10 text-[#8B5CF6]'
                                    )}>
                                        {challenge.difficulty}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-none group-hover:text-[#8B5CF6] transition-colors">
                                    {challenge.title}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {challenge.tags.map(tag => (
                                        <span key={tag} className="text-[8px] font-black uppercase text-gray-600 tracking-widest bg-white/5 px-2 py-0.5 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <p className="text-xs text-gray-500 font-bold leading-relaxed flex-1">
                                {challenge.description}
                            </p>

                            <div className="pt-6 border-t border-white/5">
                                <Link href={`/challenges/${challenge.id}`}>
                                    <button className="w-full h-12 bg-white text-black font-black uppercase tracking-widest italic rounded-2xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 hover:bg-gray-100">
                                        Enter Lab <Terminal size={16} />
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    )
}
