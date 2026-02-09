"use client"

import React, { useState } from "react"
import { CircuitDiagram } from "./CircuitDiagram"
import { CodeEditor } from "./CodeEditor"
import { cn } from "@/lib/utils"

interface LessonContentProps {
    title: string
    subtitle: string
    theory: string
    challenge?: {
        code: string
        type: 'and' | 'or' | 'not'
    }
}

export const LessonContent = ({ title, subtitle, theory, challenge }: LessonContentProps) => {
    const [inputs, setInputs] = useState([
        { name: "A", value: 0 as (0 | 1) },
        { name: "B", value: 0 as (0 | 1) },
    ])
    const [challengeCode, setChallengeCode] = useState(challenge?.code || "")

    const toggleInput = (idx: number) => {
        const newInputs = [...inputs]
        newInputs[idx].value = newInputs[idx].value === 1 ? 0 : 1
        setInputs(newInputs)
    }

    const output = challenge?.type === 'and' ? (inputs[0].value && inputs[1].value ? 1 : 0) : 0

    return (
        <div className="flex flex-col h-full bg-black">
            <div className="p-6 overflow-y-auto flex-1 scrollbar-hide pb-24">
                <span className="text-[10px] text-[#00D9A3] font-black uppercase tracking-[0.2em] mb-2 block">
                    {subtitle}
                </span>
                <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-6">
                    {title}
                </h2>

                <div className="prose prose-invert max-w-none mb-8 text-gray-400 leading-relaxed text-sm">
                    {theory}
                </div>

                {challenge && (
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xs font-black text-gray-500 uppercase mb-4 tracking-widest">Interactive Diagram</h3>
                            <CircuitDiagram
                                type={challenge.type}
                                inputs={inputs.map((input, idx) => ({ ...input, onToggle: () => toggleInput(idx) }))}
                                output={output}
                            />
                        </div>

                        <div>
                            <h3 className="text-xs font-black text-gray-500 uppercase mb-4 tracking-widest">Code Challenge</h3>
                            <div className="bg-[#1a1a1a] p-4 rounded-2xl border border-white/5 mb-4">
                                <p className="text-xs text-gray-400 mb-4 italic">Complete the module definition to implement the logic above.</p>
                                <CodeEditor code={challengeCode} onChange={setChallengeCode} />
                            </div>

                            <button className="w-full h-12 bg-[#00D9A3] text-black font-black uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(0,217,163,0.3)] active:scale-95 transition-all">
                                Check Logic
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
