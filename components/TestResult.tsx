"use client"

import React from "react"
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface TestResultProps {
    name: string
    status: 'pass' | 'fail' | 'error'
    expected?: string
    actual?: string
    error?: string
}

export const TestResult = ({ name, status, expected, actual, error }: TestResultProps) => {
    const isPass = status === 'pass'
    const isFail = status === 'fail'

    return (
        <div className={cn(
            "p-3 rounded-xl border mb-2 transition-all duration-300",
            isPass ? "bg-green-500/10 border-green-500/30 text-green-400" :
                isFail ? "bg-red-500/10 border-red-500/30 text-red-500" :
                    "bg-yellow-500/10 border-yellow-500/30 text-yellow-500"
        )}>
            <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                    {isPass ? <CheckCircle2 size={16} /> :
                        isFail ? <XCircle size={16} /> :
                            <AlertCircle size={16} />}
                    <span className="text-sm font-bold uppercase tracking-tight">{name}</span>
                </div>
                <span className="text-[10px] font-bold uppercase py-0.5 px-1.5 rounded bg-black/20">
                    {status}
                </span>
            </div>

            {(expected || actual) && (
                <div className="flex gap-4 mt-2 mb-1">
                    {expected && (
                        <div className="flex flex-col">
                            <span className="text-[9px] uppercase opacity-50 font-bold">Expected</span>
                            <span className="text-xs font-mono">{expected}</span>
                        </div>
                    )}
                    {actual && (
                        <div className="flex flex-col">
                            <span className="text-[9px] uppercase opacity-50 font-bold">Actual</span>
                            <span className="text-xs font-mono">{actual}</span>
                        </div>
                    )}
                </div>
            )}

            {error && (
                <p className="text-[10px] text-gray-400 mt-2 italic border-t border-white/5 pt-2 leading-relaxed">
                    {error}
                </p>
            )}
        </div>
    )
}
