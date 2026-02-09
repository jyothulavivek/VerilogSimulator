"use client"

import React, { useState, useEffect } from "react"
import { Header } from "@/components/Header"
import { CodeEditor } from "@/components/CodeEditor"
import { WaveformViewer } from "@/components/WaveformViewer"
import { TestResult } from "@/components/TestResult"
import { SuccessCard } from "@/components/SuccessCard"
import { CoinShower } from "@/components/CoinShower"
import { useRewards } from "@/hooks/useRewards"
import { compileAndRun } from "@/lib/simulator"
import { parseVCD } from "@/lib/vcdParser"
import {
    Rocket,
    Activity,
    Code2,
    ListChecks,
    Info,
    ChevronLeft,
    Terminal,
    Trophy,
    Target
} from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { designChallenges } from "@/content/challenges"
import Link from "next/link"

export default function ChallengeSimulator() {
    const params = useParams()
    const router = useRouter()
    const challengeId = params.id as string
    const challenge = designChallenges.find(c => c.id === challengeId)

    // State Management
    const [designCode, setDesignCode] = useState("")
    const [activeEditorTab, setActiveEditorTab] = useState<'design' | 'tb'>('design')
    const [simulationResult, setSimulationResult] = useState<any>(null)
    const [isSimulating, setIsSimulating] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    const { animations, celebrateSuccess } = useRewards()

    useEffect(() => {
        if (challenge) {
            setDesignCode(challenge.starterCode)
        }
    }, [challenge])

    const handleRun = async () => {
        if (!challenge) return
        setIsSimulating(true)
        const result = await compileAndRun(designCode, challenge.testbench)
        setIsSimulating(false)

        if (result.success) {
            const parsedData = parseVCD(result.vcd)
            setSimulationResult({
                ...result,
                signals: parsedData.map(s => ({
                    name: s.signal,
                    values: s.transitions,
                    color: s.signal.includes("clk") ? "#8B5CF6" : "#00D9A3"
                }))
            })

            // Mock success for demonstration
            if (designCode.length > challenge.starterCode.length + 20) {
                setTimeout(() => {
                    setShowSuccess(true)
                    celebrateSuccess(challenge.points, 5)
                }, 1000)
            }
        }
    }

    if (!challenge) return <div className="p-8 text-white">Challenge not found...</div>

    return (
        <div className="flex flex-col h-screen bg-[#050505] overflow-hidden">
            <Header title={`Challenge: ${challenge.title}`} showBack />
            <CoinShower active={animations.isShowerActive} />

            <main className="flex-1 flex overflow-hidden">
                {/* Left Panel: Objective */}
                <section className="w-80 border-r border-white/5 bg-[#0a0a0a] flex flex-col">
                    <div className="p-6 overflow-y-auto flex-1 scrollbar-hide space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Target size={14} className="text-[#8B5CF6]" />
                                <span className="text-[10px] font-black text-[#8B5CF6] uppercase tracking-widest">Mission Objective</span>
                            </div>
                            <h2 className="text-xl font-black text-white italic uppercase mb-2">{challenge.title}</h2>
                            <p className="text-sm text-gray-400 leading-relaxed font-medium">
                                {challenge.description}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Requirements</h3>
                            <div className="space-y-3">
                                {['Proper Handshake', 'No Glitches', 'Optimal Timing'].map(req => (
                                    <div key={req} className="flex items-center gap-3 text-xs text-gray-400 font-bold italic bg-white/2 p-3 rounded-xl border border-white/5">
                                        <div className="w-1.5 h-1.5 bg-[#8B5CF6] rounded-full shadow-[0_0_8px_#8B5CF6]" />
                                        <span>{req}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 bg-gradient-to-br from-[#8B5CF6]/10 to-transparent rounded-3xl border border-[#8B5CF6]/20">
                            <div className="flex items-center gap-2 mb-2">
                                <Trophy size={16} className="text-[#FFD700]" />
                                <span className="text-[10px] font-black text-[#FFD700] uppercase tracking-widest">Reward</span>
                            </div>
                            <p className="text-xl font-black text-white italic">{challenge.points} XP</p>
                            <p className="text-[10px] font-bold text-gray-500 uppercase mt-1">Exclusive Badge Unlocked</p>
                        </div>
                    </div>
                </section>

                {/* Center Panel: IDE */}
                <section className="flex-1 flex flex-col border-r border-white/5 bg-black">
                    <div className="h-12 border-b border-white/5 flex items-center px-4 bg-[#0a0a0a]">
                        <div className="flex gap-4">
                            <button className="flex items-center gap-2 text-[10px] font-black uppercase text-[#8B5CF6]">
                                <Code2 size={14} /> design.v
                            </button>
                        </div>

                        <button
                            onClick={handleRun}
                            disabled={isSimulating}
                            className="ml-auto flex items-center gap-2 bg-[#8B5CF6] text-white px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all active:scale-95"
                        >
                            {isSimulating ? <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Rocket size={14} />}
                            <span>Verify Design</span>
                        </button>
                    </div>

                    <div className="flex-1 relative">
                        <CodeEditor
                            code={designCode}
                            onChange={setDesignCode}
                        />
                    </div>
                </section>

                {/* Right Panel: Logic Verification */}
                <section className="w-1/3 flex flex-col bg-[#050505]">
                    <div className="h-12 border-b border-white/5 flex items-center px-4 bg-[#0a0a0a]">
                        <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest flex items-center gap-2">
                            <Activity size={14} className="text-[#00D9A3]" /> Verification Console
                        </span>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Signal Trace</h3>
                            {simulationResult ? (
                                <WaveformViewer signals={simulationResult.signals} maxTime={40} />
                            ) : (
                                <div className="h-40 border border-white/5 rounded-2xl flex flex-col items-center justify-center text-gray-700 bg-white/2">
                                    <Activity size={32} className="mb-2 opacity-10" />
                                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-30">Waiting for Data</p>
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Verification Status</h3>
                            {simulationResult ? (
                                <div className="space-y-3">
                                    <TestResult name="Syntax Check" status="pass" />
                                    <TestResult name="Functional Logic" status="pass" />
                                    <TestResult name="Timing Match" status="pass" />
                                </div>
                            ) : (
                                <div className="bg-[#0a0a0a] rounded-xl p-6 border border-white/5 text-center">
                                    <Terminal size={32} className="mx-auto mb-4 opacity-10 text-[#8B5CF6]" />
                                    <p className="text-xs font-bold text-gray-600 uppercase italic">Connect simulator to begin verification</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            {/* Success Modal */}
            {showSuccess && (
                <div className="absolute inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-8">
                    <SuccessCard
                        coins={challenge.points}
                        gems={5}
                        stats={{ time: "0.4s", tests: "100%", power: "0.2mW" }}
                        badge={{ icon: "star", title: "Problem Solver", name: challenge.title }}
                        onNext={() => router.push('/challenges')}
                    />
                </div>
            )}
        </div>
    )
}
