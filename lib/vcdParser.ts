"use client"

export interface Transition {
    time: number
    value: string
}

export interface SignalData {
    signal: string
    transitions: Transition[]
}

export const parseVCD = (vcdString: string): SignalData[] => {
    const lines = vcdString.split("\n")
    const signals: Record<string, { name: string; transitions: Transition[] }> = {}
    const symbolMap: Record<string, string> = {}

    let currentTime = 0
    let isParsingDefinitions = true

    for (let line of lines) {
        line = line.trim()
        if (!line) continue

        if (isParsingDefinitions) {
            if (line.startsWith("$var")) {
                // Example: $var reg 1 ! clk $end
                // Example: $var reg 8 " out [7:0] $end
                const parts = line.split(/\s+/)
                const symbol = parts[3]
                const name = parts[4]
                const bitRange = parts[5] === "$end" ? "" : parts[5]

                const fullName = bitRange ? `${name}${bitRange}` : name
                symbolMap[symbol] = fullName
                signals[fullName] = { name: fullName, transitions: [] }
            } else if (line.startsWith("$enddefinitions")) {
                isParsingDefinitions = false
            }
            continue
        }

        // Parse time markers
        if (line.startsWith("#")) {
            currentTime = parseInt(line.substring(1), 10)
            continue
        }

        // Parse value changes
        // Single bit: 0!, 1!, x!, z!
        // Multi bit: b0011 "
        if (line.startsWith("b")) {
            const parts = line.split(/\s+/)
            const value = parts[0].substring(1)
            const symbol = parts[1]
            const signalName = symbolMap[symbol]
            if (signalName && signals[signalName]) {
                signals[signalName].transitions.push({ time: currentTime, value })
            }
        } else {
            const value = line.substring(0, 1)
            const symbol = line.substring(1)
            const signalName = symbolMap[symbol]
            if (signalName && signals[signalName]) {
                signals[signalName].transitions.push({ time: currentTime, value })
            }
        }
    }

    return Object.values(signals).map(s => ({
        signal: s.name,
        transitions: s.transitions
    }))
}
