"use client"

import { useStore } from "@/lib/store"
import { useCallback, useState } from "react"

export const useRewards = () => {
    const { coins, gems, addCoins, addGems, streak, updateStreak } = useStore()
    const [isShowerActive, setIsShowerActive] = useState(false)

    const celebrateSuccess = useCallback((rewardCoins: number, rewardGems: number) => {
        addCoins(rewardCoins)
        addGems(rewardGems)
        setIsShowerActive(true)

        // Auto-disable shower after animation duration
        setTimeout(() => {
            setIsShowerActive(false)
        }, 3000)
    }, [addCoins, addGems])

    const canAffordHint = useCallback((cost: number = 1) => {
        return gems >= cost
    }, [gems])

    const spendGems = useCallback((amount: number) => {
        if (canAffordHint(amount)) {
            addGems(-amount)
            return true
        }
        return false
    }, [canAffordHint, addGems])

    const checkDailyStreak = useCallback(() => {
        // Basic implementation: just increment for now
        // In a real app, you'd check lastLogin date
        updateStreak()
    }, [updateStreak])

    return {
        balance: { coins, gems, streak },
        animations: { isShowerActive },
        celebrateSuccess,
        canAffordHint,
        spendGems,
        checkDailyStreak
    }
}
