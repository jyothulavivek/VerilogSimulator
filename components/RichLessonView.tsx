"use client"

import React from "react"
import { motion } from "framer-motion"
import { Info, Lightbulb, Activity, Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import { LogicGatesDiagram, MultiplexerDiagram, DFlipFlopDiagram } from "./diagrams"

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
    // Helper to render diagrams based on path
    const renderDiagram = () => {
        if (!imagePath) return null

        switch (imagePath) {
            case "/assets/logic_gates_overview.png":
                return <LogicGatesDiagram />
            case "/assets/mux_decoder_schema.png":
                return <MultiplexerDiagram />
            case "/assets/sequential_dff_schematic.png":
                return <DFlipFlopDiagram />
            default:
                return null
        }
    }

    const diagramComponent = renderDiagram()

    return (
        <div className={cn("space-y-8 pb-12", className)}>
            {/* Title & Metadata */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00D9A3] shadow-[0_0_8px_#00D9A3]" />
                    <span className="text-[10px] font-black text-[#00D9A3] uppercase tracking-[0.3em]">Module Lesson</span>
                </div>
                <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter leading-[0.9]">
                    {title}
                </h2>
            </div>

            {/* Main Image Overlay OR CSS Diagram */}
            {diagramComponent ? (
                diagramComponent
            ) : imagePath && imagePath.startsWith('/assets') ? (
                <div className="aspect-video bg-[#0a0a0a] rounded-[32px] border border-white/10 flex flex-col items-center justify-center relative overflow-hidden group">
                    {/* Placeholder for missing images */}
                    <div className="text-center space-y-2 z-10 p-4">
                        <div className="mx-auto w-16 h-16 rounded-2xl bg-[#00D9A3]/5 border border-[#00D9A3]/10 flex items-center justify-center mb-4">
                            <Activity size={24} className="text-[#00D9A3] opacity-50" />
                        </div>
                        <p className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">Diagram Generation Pending</p>
                        <p className="text-[8px] font-bold text-gray-700 uppercase tracking-widest">{title}</p>
                    </div>
                </div>
            ) : null}

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
                        </div>
                    </div>

                    <p className="text-xs text-gray-300 font-bold leading-relaxed italic">
                        "{realWorldExample}"
                    </p>
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
