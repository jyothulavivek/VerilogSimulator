"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface GameState {
    coins: number
    gems: number
    streak: number
    progress: Record<string, number> // moduleId -> progress (0-100)
    completedLessons: Record<string, string[]> // moduleId -> lessonIds[]
    badges: string[]

    // Actions
    addCoins: (amount: number) => void
    addGems: (amount: number) => void
    updateStreak: () => void
    unlockBadge: (badgeId: string) => void
    updateProgress: (moduleId: string, lessonId: string, completed: boolean) => void
}

export const useStore = create<GameState>()(
    persist(
        (set) => ({
            coins: 1250, // Initial balance as requested
            gems: 5,
            streak: 1,
            progress: {},
            completedLessons: {},
            badges: [],

            addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),

            addGems: (amount) => set((state) => ({ gems: state.gems + amount })),

            updateStreak: () => set((state) => ({ streak: state.streak + 1 })),

            unlockBadge: (badgeId) => set((state) => ({
                badges: state.badges.includes(badgeId) ? state.badges : [...state.badges, badgeId]
            })),

            updateProgress: (moduleId, lessonId, completed) => set((state) => {
                const completedInModule = state.completedLessons[moduleId] || []

                if (completed && !completedInModule.includes(lessonId)) {
                    const newCompleted = [...completedInModule, lessonId]

                    // Dynamic progress calculation based on actual module size
                    // This will be calculated in the UI based on total lessons in module
                    const newProgress = state.progress[moduleId] || 0

                    return {
                        completedLessons: { ...state.completedLessons, [moduleId]: newCompleted },
                        progress: { ...state.progress, [moduleId]: newProgress }
                    }
                } else if (!completed && completedInModule.includes(lessonId)) {
                    // Allow un-marking lessons
                    const newCompleted = completedInModule.filter(id => id !== lessonId)

                    return {
                        completedLessons: { ...state.completedLessons, [moduleId]: newCompleted },
                        progress: { ...state.progress, [moduleId]: state.progress[moduleId] || 0 }
                    }
                }

                return state
            }),
        }),
        {
            name: "vlsi-lab-storage",
        }
    )
)
