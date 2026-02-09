"use client"

import React from "react"
import { motion } from "framer-motion"
import { Info, Lightbulb, Activity, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

interface RichLessonViewProps {
    title: string
    description: string
    realWorldExample?: string
    imagePath?: string
    className?: string
}

export const RichLessonView: React.FC<RichLessonViewProps> = ({
    title,
    description,
    realWorldExample,
    imagePath,
    className
}) => {
    return (
        <div className={cn("space-y-8 pb-12", className)}>
            {/* Title & Metadata */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00D9A3] shadow-[0_0_8px_#00D9A3]" />
                    <span className="text-[10px] font-black text-[#00D9A3] uppercase tracking-[0.3em]">Module Lesson</span>
                    <span className="ml-auto text-[8px] font-bold text-gray-500 uppercase tracking-widest opacity-0 group-hover/panel:opacity-100 transition-opacity">Hover to maximize ↗</span>
                </div>
                <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter leading-[0.9]">
                    {title}
                </h2>
            </div>

            {/* Main Image Overlay */}
            {imagePath && imagePath.startsWith('/assets') ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative aspect-video bg-[#0a0a0a] rounded-[32px] overflow-hidden border border-white/10 group shadow-2xl"
                >
                    <img
                        src={imagePath}
                        alt={title}
                        className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                        onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                                parent.innerHTML = `
                                    <div class="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#0c0c0c] to-[#050505] p-12">
                                         <div class="w-full h-full border border-[#00D9A3]/10 rounded-[20px] relative overflow-hidden flex flex-col items-center justify-center">
                                            <div class="absolute top-4 left-4 flex gap-1 opacity-20">
                                                <div class="w-1 h-3 bg-[#00D9A3] rounded-full"></div>
                                                <div class="w-1 h-6 bg-[#00D9A3] rounded-full"></div>
                                                <div class="w-1 h-2 bg-[#00D9A3] rounded-full"></div>
                                            </div>
                                            <div class="w-20 h-20 rounded-2xl bg-[#00D9A3]/5 border border-[#00D9A3]/10 flex items-center justify-center mb-6">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00D9A3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="animate-pulse"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                                            </div>
                                            <span class="text-[12px] font-black text-white italic tracking-tighter uppercase mb-1">${title}</span>
                                            <span class="text-[8px] font-bold text-[#00D9A3] uppercase tracking-[0.2em] opacity-40">High-Resolution Schematic 1.0</span>
                                         </div>
                                    </div>
                                `;
                            }
                        }}
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-6 left-6 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
                            <Activity size={14} className="text-white" />
                        </div>
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">Technical Schematic 1.0</span>
                    </div>
                </motion.div>
            ) : (
                <div className="aspect-[16/9] bg-gradient-to-br from-[#0c0c0c] to-[#050505] border border-white/5 rounded-[32px] flex flex-col items-center justify-center gap-6 text-gray-700 relative overflow-hidden group shadow-inner">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,217,163,0.03)_0%,_transparent_70%)]" />
                    <div className="w-20 h-20 rounded-3xl bg-white/2 border border-white/5 flex items-center justify-center relative group-hover:scale-110 transition-transform duration-500">
                        <div className="absolute inset-0 bg-[#00D9A3]/10 blur-2xl rounded-full opacity-50" />
                        <Activity size={40} className="text-[#00D9A3] opacity-50 drop-shadow-[0_0_15px_rgba(0,217,163,0.4)]" />
                    </div>
                    <div className="text-center space-y-1 z-10 p-4">
                        <p className="text-[12px] font-black uppercase text-white tracking-[0.3em] group-hover:text-[#00D9A3] transition-colors">{title}</p>
                        <p className="text-[8px] font-bold text-gray-600 uppercase tracking-[0.2em]">Architecture Breakdown & Truth Table</p>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-6 left-6 flex gap-1.5 opacity-20">
                        <div className="w-1.5 h-4 bg-[#00D9A3] rounded-full" />
                        <div className="w-1.5 h-8 bg-[#00D9A3] rounded-full" />
                        <div className="w-1.5 h-2 bg-[#00D9A3] rounded-full" />
                    </div>

                    <div className="absolute bottom-6 right-8 flex items-center gap-2 opacity-10">
                        <span className="text-[8px] font-mono">0x7F_ACTIVE</span>
                        <div className="w-2 h-2 rounded-full bg-[#00D9A3]" />
                    </div>
                </div>
            )}

            {/* Description Panel */}
            <section className="bg-[#0a0a0a] border border-white/5 rounded-[32px] p-8 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D9A3] opacity-[0.02] blur-[100px]" />

                <div className="flex items-center gap-2 mb-2">
                    <Info size={16} className="text-[#00D9A3]" />
                    <h3 className="text-xs font-black text-white uppercase tracking-widest italic">Core Fundamentals</h3>
                </div>

                <div className="text-sm text-gray-400 leading-relaxed font-medium space-y-4 whitespace-pre-wrap">
                    {description}
                </div>
            </section>

            {/* Real World Example Card */}
            {realWorldExample && (
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-br from-[#8B5CF6]/10 to-[#8B5CF6]/5 border border-[#8B5CF6]/20 rounded-[32px] p-8 space-y-4 relative overflow-hidden"
                >
                    <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-[#8B5CF6] opacity-10 blur-[50px]" />

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 flex items-center justify-center">
                            <Globe size={20} className="text-[#8B5CF6]" />
                        </div>
                        <div>
                            <h4 className="text-sm font-black text-white uppercase tracking-widest italic">Industrial Application</h4>
                            <p className="text-[10px] font-bold text-[#8B5CF6] uppercase">Real-World Implementation</p>
                        </div>
                    </div>

                    <p className="text-xs text-gray-300 font-bold leading-relaxed italic">
                        "{realWorldExample}"
                    </p>

                    <div className="pt-2 flex items-center gap-2">
                        <div className="h-[1px] flex-1 bg-white/5" />
                        <div className="flex gap-1">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-1 h-1 rounded-full bg-[#8B5CF6]" />
                            ))}
                        </div>
                    </div>
                </motion.section>
            )}

            {/* Hint Alert */}
            <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/2 border border-white/5">
                <Lightbulb size={16} className="text-[#FFD700]" />
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    Engineer Tip: <span className="text-white">Focus on timing diagrams to avoid race conditions.</span>
                </p>
            </div>
        </div>
    )
}
