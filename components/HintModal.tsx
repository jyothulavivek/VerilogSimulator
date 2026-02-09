"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Lightbulb, Sparkles } from "lucide-react"

interface HintModalProps {
    isOpen: boolean
    onClose: () => void
    hint: string
    lessonTitle: string
}

export const HintModal = ({ isOpen, onClose, hint, lessonTitle }: HintModalProps) => {
    if (!isOpen) return null

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                />

                {/* Modal */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative bg-[#0a0a0a] border-2 border-[#8B5CF6] rounded-3xl p-8 max-w-2xl w-full shadow-[0_0_50px_rgba(139,92,246,0.3)]"
                >
                    {/* Glow effect */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent shadow-[0_0_20px_#8B5CF6]" />

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
                    >
                        <X size={20} className="text-gray-400" />
                    </button>

                    {/* Header */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center">
                            <Lightbulb size={32} className="text-[#8B5CF6]" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Sparkles size={14} className="text-[#8B5CF6]" />
                                <span className="text-[10px] font-black text-[#8B5CF6] uppercase tracking-widest">
                                    Hint Unlocked
                                </span>
                            </div>
                            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                                {lessonTitle}
                            </h2>
                        </div>
                    </div>

                    {/* Hint content */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
                        <p className="text-sm text-gray-300 leading-relaxed">
                            {hint}
                        </p>
                    </div>

                    {/* Cost indicator */}
                    <div className="flex items-center justify-between p-4 bg-[#8B5CF6]/5 border border-[#8B5CF6]/20 rounded-xl">
                        <span className="text-xs text-gray-500 font-bold">
                            This hint cost you 1 gem
                        </span>
                        <span className="text-xs text-[#8B5CF6] font-black">
                            -1 💎
                        </span>
                    </div>

                    {/* Action button */}
                    <button
                        onClick={onClose}
                        className="w-full mt-6 h-12 bg-[#8B5CF6] text-white font-black uppercase tracking-widest rounded-xl hover:bg-[#7C3AED] transition-all shadow-lg"
                    >
                        Got it!
                    </button>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}
