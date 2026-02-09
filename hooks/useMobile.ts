"use client"

import { useEffect, useState } from "react"

export const useMobile = () => {
    const [isMobile, setIsMobile] = useState(false)
    const [isPortrait, setIsPortrait] = useState(true)

    useEffect(() => {
        const checkViewport = () => {
            setIsMobile(window.innerWidth < 768)
            setIsPortrait(window.innerHeight > window.innerWidth)
        }

        checkViewport()
        window.addEventListener("resize", checkViewport)
        return () => window.removeEventListener("resize", checkViewport)
    }, [])

    return { isMobile, isPortrait }
}
