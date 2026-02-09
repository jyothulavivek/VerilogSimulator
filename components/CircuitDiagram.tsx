"use client"

import React from "react"
import { motion } from "framer-motion"

interface CircuitDiagramProps {
    type: 'and' | 'or' | 'not'
    inputs: Array<{ name: string; value: 0 | 1; onToggle?: () => void }>
    output: 0 | 1
}

export const CircuitDiagram = ({ type, inputs, output }: CircuitDiagramProps) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-black/40 rounded-3xl border border-white/5 my-4">
            <svg width="240" height="120" viewBox="0 0 240 120" className="overflow-visible">
                {/* Input Lines */}
                {inputs.map((input, idx) => (
                    <g key={input.name}>
                        <motion.line
                            x1="20" y1={idx === 0 ? 40 : 80}
                            x2="80" y2={idx === 0 ? 40 : 80}
                            stroke={input.value === 1 ? "#00D9A3" : "#333"}
                            strokeWidth="3"
                        />
                        <circle
                            cx="20" cy={idx === 0 ? 40 : 80} r="6"
                            fill={input.value === 1 ? "#00D9A3" : "#333"}
                            className="cursor-pointer"
                            onClick={input.onToggle}
                        />
                        <text x="5" y={idx === 0 ? 40 : 80} fill="#666" fontSize="10" className="pointer-events-none" dominantBaseline="middle">
                            {input.name}
                        </text>
                    </g>
                ))}

                {/* Gate Body */}
                <g transform="translate(80, 20)">
                    {type === 'and' && (
                        <path
                            d="M0,0 L40,0 C65,0 65,80 40,80 L0,80 Z"
                            fill="none"
                            stroke="#fff"
                            strokeWidth="3"
                        />
                    )}
                    {type === 'or' && (
                        <path
                            d="M0,0 C20,0 20,80 0,80 C40,80 70,70 70,40 C70,10 40,0 0,0 Z"
                            fill="none"
                            stroke="#fff"
                            strokeWidth="3"
                        />
                    )}
                    {type === 'not' && (
                        <>
                            <path d="M0,0 L60,40 L0,80 Z" fill="none" stroke="#fff" strokeWidth="3" />
                            <circle cx="68" cy="40" r="8" fill="none" stroke="#fff" strokeWidth="3" />
                        </>
                    )}
                    <text x="25" y="45" fill="#fff" fontSize="12" fontWeight="bold">
                        {type.toUpperCase()}
                    </text>
                </g>

                {/* Output Line */}
                <motion.line
                    x1={type === 'not' ? 156 : 145} y1="60"
                    x2="220" y2="60"
                    stroke={output === 1 ? "#FF6B9D" : "#333"}
                    strokeWidth="3"
                />
                <circle cx="220" cy="60" r="6" fill={output === 1 ? "#FF6B9D" : "#333"} />
                <text x="228" y="60" fill="#666" fontSize="10" dominantBaseline="middle">Y</text>
            </svg>

            <div className="mt-6 flex gap-8">
                {inputs.map((input) => (
                    <div key={input.name} className="flex flex-col items-center gap-1">
                        <span className="text-[10px] text-gray-500 font-bold uppercase">{input.name}</span>
                        <button
                            onClick={input.onToggle}
                            className={`w-10 h-6 rounded-full transition-colors relative ${input.value === 1 ? 'bg-[#00D9A3]' : 'bg-gray-800'}`}
                        >
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${input.value === 1 ? 'left-5' : 'left-1'}`} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
