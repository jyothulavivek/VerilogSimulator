"use client"

// Disable static generation for this page (requires client-side interactivity)
export const dynamic = 'force-dynamic'

import React, { useState, useEffect, Suspense } from "react"
import { Header } from "@/components/Header"
import { CodeEditor } from "@/components/CodeEditor"
import { WaveformViewer } from "@/components/WaveformViewer"
import { TestResult } from "@/components/TestResult"
import { SuccessCard } from "@/components/SuccessCard"
import { CoinShower } from "@/components/CoinShower"
import { useRewards } from "@/hooks/useRewards"
import { DynamicSimulator } from "@/lib/dynamic-simulator"
import { parseVCD } from "@/lib/vcdParser"
import { Lightbulb, Rocket, Activity, Code2, ListChecks, Info, ChevronRight, GraduationCap } from "lucide-react"
import { RichLessonView } from "@/components/RichLessonView"
import { useSearchParams } from "next/navigation"
import { verilogLessons } from "@/content/lessons/verilog-curriculum"
import { systemVerilogLessons } from "@/content/lessons/system-verilog"
import { uvmLessons } from "@/content/lessons/uvm"
import { advancedVerificationLessons } from "@/content/lessons/advanced-verification"

function WideSimulatorContent() {
    const searchParams = useSearchParams()
    const trackId = searchParams.get('track') || 'verilog'
    const moduleId = searchParams.get('module') || 'v-1'

    // State Management
    const [activeLesson, setActiveLesson] = useState<any>(null)
    const [designCode, setDesignCode] = useState("")
    const [tbCode, setTbCode] = useState("")
    const [activeEditorTab, setActiveEditorTab] = useState<'design' | 'tb'>('design')
    const [activeViewTab, setActiveViewTab] = useState<'waves' | 'results'>('waves')
    const [simulationResult, setSimulationResult] = useState<any>(null)
    const [isSimulating, setIsSimulating] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [isTheoryExpanded, setIsTheoryExpanded] = useState(false)

    const { animations, celebrateSuccess, spendGems } = useRewards()

    // Load Content
    useEffect(() => {
        let lesson = null
        if (trackId === 'verilog') lesson = verilogLessons.find(l => l.id === moduleId) || verilogLessons[0]
        if (trackId === 'sv') lesson = systemVerilogLessons.find(l => l.id === moduleId) || systemVerilogLessons[0]
        if (trackId === 'uvm') lesson = uvmLessons.find(l => l.id === moduleId) || advancedVerificationLessons.find(l => l.id === moduleId) || uvmLessons[0]

        if (lesson) {
            setActiveLesson(lesson)
            setDesignCode(lesson.code)
            setTbCode((lesson as any).testbench || "")
        }
    }, [trackId, moduleId])

    // Navigate to next lesson
    const handleNextLesson = () => {
        let lessons: any[] = []
        if (trackId === 'verilog') lessons = verilogLessons
        if (trackId === 'sv') lessons = systemVerilogLessons
        if (trackId === 'uvm') lessons = [...uvmLessons, ...advancedVerificationLessons]

        const currentIndex = lessons.findIndex(l => l.id === moduleId)
        if (currentIndex >= 0 && currentIndex < lessons.length - 1) {
            const nextLesson = lessons[currentIndex + 1]
            // Navigate to next lesson
            window.location.href = `/simulator?track=${trackId}&module=${nextLesson.id}`
        } else {
            // Last lesson - go back to curriculum
            window.location.href = '/curriculum'
        }
        setShowSuccess(false)
    }

    const handleRun = async () => {
        setIsSimulating(true)

        try {
            // Use client-side DynamicSimulator for production compatibility
            const simulator = new DynamicSimulator(designCode, tbCode)
            const result = simulator.simulate()

            setIsSimulating(false)

            if (result.success) {
                const parsedData = parseVCD(result.vcd)
                setSimulationResult({
                    ...result,
                    signals: parsedData.map(s => ({
                        name: s.signal,
                        values: s.transitions,
                        color: s.signal.includes("clk") ? "#00D9A3" : "#FF6B9D"
                    }))
                })

                // Trigger success mock
                if (designCode.length > 20) {
                    setTimeout(() => {
                        setShowSuccess(true)
                        celebrateSuccess(100, 2)
                    }, 1000)
                }
            } else {
                setSimulationResult(result)
            }
        } catch (error: any) {
            setIsSimulating(false)
            setSimulationResult({
                success: false,
                output: '',
                error: error.message || 'Simulation failed',
                vcd: '',
                signals: []
            })
        }
    }

    if (!activeLesson) return <div className="p-8 text-white">Loading Experiment...</div>

    return (
        <div className="flex flex-col h-screen bg-[#050505] overflow-hidden">
            <Header title={`LAB: ${activeLesson.title}`} showBack />
            <CoinShower active={animations.isShowerActive} />

            <main className="flex-1 flex overflow-hidden">
                {/* Left Panel: Rich Educational Content */}
                <section
                    className={`border-r border-white/5 bg-[#0a0a0a] flex flex-col min-h-0 overflow-y-auto custom-scrollbar transition-all duration-500 ease-in-out relative group/panel ${isTheoryExpanded ? 'w-[850px]' : 'w-[450px]'}`}
                >
                    <button
                        onClick={() => setIsTheoryExpanded(!isTheoryExpanded)}
                        className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-0 group-hover/panel:opacity-100 transition-opacity z-20 hover:bg-white/10"
                        title={isTheoryExpanded ? "Minimize Definitions" : "Maximize Definitions"}
                    >
                        {isTheoryExpanded ? <ChevronRight size={16} className="rotate-180" /> : <ChevronRight size={16} />}
                    </button>

                    <div className="p-8">
                        <RichLessonView
                            title={activeLesson.title}
                            description={activeLesson.detailedDescription || activeLesson.theory}
                            realWorldExample={activeLesson.realWorldExample}
                            imagePath={activeLesson.imagePath}
                        />

                        <div className="pt-8 border-t border-white/5">
                            <button
                                onClick={() => spendGems(1)}
                                className="w-full h-12 border border-[#8B5CF6]/30 bg-[#8B5CF6]/5 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black text-[#8B5CF6] uppercase hover:bg-[#8B5CF6]/10 transition-all shadow-lg"
                            >
                                <Lightbulb size={16} />
                                <span>Unlock Engineering Hint (-1💎)</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* Center Panel: Professional IDE */}
                <section className="flex-1 flex flex-col border-r border-white/5 bg-black">
                    <div className="h-12 border-b border-white/5 flex items-center px-4 bg-[#0a0a0a]">
                        <div className="flex gap-4">
                            <button
                                onClick={() => setActiveEditorTab('design')}
                                className={`flex items-center gap-2 text-[10px] font-black uppercase transition-all ${activeEditorTab === 'design' ? 'text-[#00D9A3]' : 'text-gray-600'}`}
                            >
                                <Code2 size={14} /> design.sv
                            </button>
                            <button
                                onClick={() => setActiveEditorTab('tb')}
                                className={`flex items-center gap-2 text-[10px] font-black uppercase transition-all ${activeEditorTab === 'tb' ? 'text-[#00D9A3]' : 'text-gray-600'}`}
                            >
                                <Code2 size={14} /> testbench.sv
                            </button>
                        </div>

                        <button
                            onClick={handleRun}
                            disabled={isSimulating}
                            className="ml-auto flex items-center gap-2 bg-[#00D9A3] text-black px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:shadow-[0_0_20px_rgba(0,217,163,0.4)] transition-all active:scale-95"
                        >
                            {isSimulating ? <div className="w-3 h-3 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : <Rocket size={14} />}
                            <span>Compile & Run</span>
                        </button>
                    </div>

                    <div className="flex-1 relative">
                        <CodeEditor
                            code={activeEditorTab === 'design' ? designCode : tbCode}
                            onChange={activeEditorTab === 'design' ? setDesignCode : setTbCode}
                        />
                    </div>
                </section>

                {/* Right Panel: Visualization & Results */}
                <section className="w-1/3 flex flex-col min-h-0 bg-[#050505]">
                    <div className="h-12 border-b border-white/5 flex items-center px-4 bg-[#0a0a0a]">
                        <div className="flex gap-6">
                            <button
                                onClick={() => setActiveViewTab('waves')}
                                className={`flex items-center gap-2 text-[10px] font-black uppercase transition-all ${activeViewTab === 'waves' ? 'text-[#FF6B9D]' : 'text-gray-600'}`}
                            >
                                <Activity size={14} /> Logic Analyzer
                            </button>
                            <button
                                onClick={() => setActiveViewTab('results')}
                                className={`flex items-center gap-2 text-[10px] font-black uppercase transition-all ${activeViewTab === 'results' ? 'text-[#FF6B9D]' : 'text-gray-600'}`}
                            >
                                <ListChecks size={14} /> Validation
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                        {activeViewTab === 'waves' ? (
                            <div className="space-y-4">
                                <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Waveform Output</h3>
                                {simulationResult ? (
                                    <WaveformViewer signals={simulationResult.signals} maxTime={40} />
                                ) : (
                                    <div className="h-48 border border-white/5 rounded-2xl flex flex-col items-center justify-center text-gray-700 bg-white/2">
                                        <Activity size={32} className="mb-2 opacity-20" />
                                        <p className="text-[10px] font-bold uppercase tracking-widest">No Signal Data</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Test Summary</h3>
                                {simulationResult ? (
                                    <div className="space-y-3">
                                        <TestResult name="COMPILATION" status={simulationResult.success ? "pass" : "fail"} />
                                        <TestResult
                                            name="FUNCTIONAL ACCURACY"
                                            status={simulationResult.success ? "pass" : "fail"}
                                            expected={activeLesson.expectedOutput || "Logic matching specification"}
                                            actual={simulationResult.success ?
                                                (simulationResult.output.includes("[SIM OUT]") ?
                                                    simulationResult.output.split("[SIM OUT]")[1].split("\n")[0].trim() :
                                                    "Logic verified successfully") :
                                                "Blocked by Compilation Log"}
                                        />
                                        <TestResult
                                            name="ASSERTIONS (SVA)"
                                            status={simulationResult.success && !simulationResult.output.includes("ASSERTION FAILED") ? "pass" : "fail"}
                                        />
                                    </div>
                                ) : (
                                    <div className="p-8 text-center opacity-20 italic text-sm text-gray-400">
                                        Run simulation to view validation results.
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Console/Log Output */}
                        <div className="space-y-4">
                            <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-widest">System Console</h3>
                            <div className="bg-[#0a0a0a] rounded-xl p-4 border border-white/5 font-mono text-[11px] min-h-[120px] text-gray-400">
                                {simulationResult ? (
                                    <pre className="whitespace-pre-wrap">
                                        [INFO] Starting Simulator v1.0.0...
                                        {simulationResult.output}
                                        [DONE] Simulation finished at 40ns.
                                    </pre>
                                ) : (
                                    <span className="opacity-30">Waiting for simulation...</span>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Success Modal Overlay */}
            {showSuccess && (
                <div className="absolute inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-8">
                    <SuccessCard
                        coins={100}
                        gems={2}
                        stats={{ time: "0.8s", tests: "100%", power: "1.2mW" }}
                        badge={{ icon: "trophy", title: "Verification Engineer", name: "DV Master" }}
                        onNext={handleNextLesson}
                    />
                </div>
            )}
        </div>
    )
}

// Wrap in Suspense to handle useSearchParams
export default function WideSimulator() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-black text-white">Loading...</div>}>
            <WideSimulatorContent />
        </Suspense>
    )
}
