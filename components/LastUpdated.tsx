"use client"

import { useEffect, useState } from "react"
import { Clock } from "lucide-react"

export const LastUpdated = () => {
    const [timeText, setTimeText] = useState<string>("")
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)

        // Get build time from environment or use fallback
        const buildTime = process.env.NEXT_PUBLIC_BUILD_TIME || new Date().toISOString()

        const formatDate = (isoString: string) => {
            try {
                const date = new Date(isoString)
                const now = new Date()
                const diffMs = now.getTime() - date.getTime()
                const diffMins = Math.floor(diffMs / 60000)
                const diffHours = Math.floor(diffMs / 3600000)
                const diffDays = Math.floor(diffMs / 86400000)

                // Show relative time if recent
                if (diffMins < 1) return "Just now"
                if (diffMins < 60) return `${diffMins}m ago`
                if (diffHours < 24) return `${diffHours}h ago`
                if (diffDays < 7) return `${diffDays}d ago`

                // Otherwise show date
                return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
                })
            } catch (error) {
                return "Recently"
            }
        }

        setTimeText(formatDate(buildTime))

        // Update every minute
        const interval = setInterval(() => {
            setTimeText(formatDate(buildTime))
        }, 60000)

        return () => clearInterval(interval)
    }, [])

    if (!mounted || !timeText) return null

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2 flex items-center gap-2 shadow-lg">
                <Clock size={12} className="text-[#00D9A3]" />
                <div className="flex flex-col">
                    <span className="text-[8px] text-gray-500 uppercase font-black tracking-wider">
                        Last Updated
                    </span>
                    <span className="text-[10px] text-white font-mono">
                        {timeText}
                    </span>
                </div>
            </div>
        </div>
    )
}
