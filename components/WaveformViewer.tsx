"use client"

import React, { useRef, useEffect, useState } from "react"
import { Play, Pause, ZoomIn, ZoomOut } from "lucide-react"

interface Signal {
    name: string
    values: Array<{ time: number; value: 0 | 1 | string }>
    color: string
}

interface WaveformViewerProps {
    signals: Signal[]
    maxTime?: number
}

export const WaveformViewer = ({ signals, maxTime = 100 }: WaveformViewerProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [zoom, setZoom] = useState(1)
    const [currentTime, setCurrentTime] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)

    const labelWidth = 60
    const padding = 20
    const rowHeight = 40
    const timeScale = 5 * zoom // pixels per ns

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const width = canvas.width
        const height = canvas.height

        // Clear canvas
        ctx.clearRect(0, 0, width, height)

        // Draw grid and background
        ctx.strokeStyle = "#333"
        ctx.lineWidth = 0.5

        // X-axis (Time)
        for (let t = 0; t <= maxTime; t += 10) {
            const x = labelWidth + t * timeScale
            ctx.beginPath()
            ctx.moveTo(x, 0)
            ctx.lineTo(x, height)
            ctx.stroke()

            ctx.fillStyle = "#666"
            ctx.font = "10px Inter"
            ctx.fillText(`${t}ns`, x + 2, height - 5)
        }

        // Signals
        signals.forEach((signal, index) => {
            const yBase = padding + index * rowHeight
            const color = signal.color || "#00D9A3"

            // Draw label
            ctx.fillStyle = "#fff"
            ctx.font = "bold 11px Inter"
            ctx.fillText(signal.name, 10, yBase + 20)

            // Draw waveform
            ctx.strokeStyle = color
            ctx.lineWidth = 2
            ctx.beginPath()

            let lastX = labelWidth
            let lastY = yBase + (signal.values[0]?.value === 1 ? 5 : 30)

            ctx.moveTo(lastX, lastY)

            signal.values.forEach((v) => {
                const x = labelWidth + v.time * timeScale
                const y = yBase + (v.value === 1 ? 5 : 30)

                // Vertical transition
                ctx.lineTo(x, lastY)
                // Horizontal stable
                ctx.lineTo(x, y)

                lastX = x
                lastY = y
            })

            // Draw to end
            ctx.lineTo(labelWidth + maxTime * timeScale, lastY)
            ctx.stroke()
        })

        // Cursor line
        const cursorX = labelWidth + currentTime * timeScale
        ctx.strokeStyle = "#FF6B9D"
        ctx.lineWidth = 1
        ctx.setLineDash([5, 5])
        ctx.beginPath()
        ctx.moveTo(cursorX, 0)
        ctx.lineTo(cursorX, height)
        ctx.stroke()
        ctx.setLineDash([])

    }, [signals, zoom, currentTime, maxTime, timeScale])

    // Playback animation
    useEffect(() => {
        let interval: NodeJS.Timeout
        if (isPlaying) {
            interval = setInterval(() => {
                setCurrentTime(prev => (prev < maxTime ? prev + 1 : 0))
            }, 50)
        }
        return () => clearInterval(interval)
    }, [isPlaying, maxTime])

    return (
        <div className="glass-card overflow-hidden">
            <div className="bg-black/50 p-2 border-b border-white/10 flex justify-between items-center">
                <div className="flex gap-2">
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-1.5 hover:bg-white/10 rounded-lg text-white transition-colors"
                    >
                        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                    </button>
                    <div className="w-[1px] h-6 bg-white/10 mx-1" />
                    <button onClick={() => setZoom(prev => Math.min(5, prev + 0.5))} className="p-1.5 hover:bg-white/10 rounded-lg text-white">
                        <ZoomIn size={18} />
                    </button>
                    <button onClick={() => setZoom(prev => Math.max(0.5, prev - 0.5))} className="p-1.5 hover:bg-white/10 rounded-lg text-white">
                        <ZoomOut size={18} />
                    </button>
                </div>
                <span className="text-[10px] text-[#FF6B9D] font-mono tracking-widest uppercase">
                    Time: {currentTime}ns
                </span>
            </div>

            <div className="overflow-x-auto overflow-y-hidden scrollbar-hide">
                <canvas
                    ref={canvasRef}
                    width={labelWidth + maxTime * timeScale + padding}
                    height={signals.length * rowHeight + padding * 2}
                    className="block"
                />
            </div>
        </div>
    )
}
