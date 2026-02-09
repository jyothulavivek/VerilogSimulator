"use client"

import React, { useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface CoinShowerProps {
    active: boolean
}

export const CoinShower = ({ active }: CoinShowerProps) => {
    const coins = useMemo(() => {
        return Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            x: Math.random() * 375, // Within phone width
            delay: Math.random() * 2,
            duration: 1.5 + Math.random() * 1.5,
        }))
    }, [])

    return (
        <div className="absolute inset-0 pointer-events-none z-[100] overflow-hidden">
            <AnimatePresence>
                {active && coins.map((coin) => (
                    <motion.div
                        key={coin.id}
                        initial={{ y: -50, x: coin.x, opacity: 1, rotate: 0 }}
                        animate={{
                            y: 812 + 50, // Beyond phone height
                            rotate: 720,
                            opacity: [1, 1, 0]
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: coin.duration,
                            delay: coin.delay,
                            ease: "easeIn"
                        }}
                        className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] border-2 border-[#FF8C00] flex items-center justify-center shadow-lg"
                    >
                        <span className="text-white font-bold text-sm">$</span>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}
