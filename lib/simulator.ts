"use client"

export interface SimulationResult {
    success: boolean
    vcd: string
    output: string
    error?: string
}

export const compileAndRun = async (code: string, testbench: string): Promise<SimulationResult> => {
    try {
        const response = await fetch("/api/simulate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ code, testbench }),
        })

        if (!response.ok) {
            throw new Error(`Simulation failed: ${response.statusText}`)
        }

        return await response.json()
    } catch (err) {
        console.error("Simulation error:", err)
        return {
            success: false,
            vcd: "",
            output: "Error connecting to simulation server.",
            error: err instanceof Error ? err.message : "Unknown error",
        }
    }
}
