/**
 * VLSI Academy - Dynamic Verilog Simulator Engine
 * A lightweight, rule-based simulator that performs real-time logic evaluation
 * of Verilog/SystemVerilog snippets. 
 */

export interface SimulationTrace {
    signal: string;
    transitions: { time: number; value: string }[];
}

export interface DynamicSimulationResult {
    success: boolean;
    output: string;
    vcd: string;
    error?: string;
}

export class DynamicSimulator {
    private signals: Map<string, any> = new Map();
    private trace: Map<string, SimulationTrace> = new Map();
    private clockCycles: number = 20;
    private timeStep: number = 10;

    constructor(private code: string, private testbench: string) { }

    public simulate(): DynamicSimulationResult {
        try {
            const fullCode = `${this.code}\n${this.testbench}`;

            // 1. Extract Signals
            this.extractSignals(fullCode);

            // 2. Initial Setup
            this.initializeTrace();

            // 3. Execution Loop (Cycle Based)
            let output = "";

            // Support for $display in initial blocks - FIXED REGEX
            // Matches both: initial $display("text"); AND initial begin $display("text"); end
            const displayRegex = /\$display\s*\(\s*["']([^"']*)["']\s*(?:,\s*([^)]*))?\s*\)\s*;/g;
            let dMatch;
            while ((dMatch = displayRegex.exec(fullCode)) !== null) {
                let displayOutput = dMatch[1];

                // If there are format arguments, try basic substitution
                if (dMatch[2]) {
                    const args = dMatch[2].split(',').map(a => a.trim());
                    args.forEach(arg => {
                        const val = this.signals.get(arg);
                        displayOutput = displayOutput.replace(/%[bdh]/, val !== undefined ? val.toString() : '0');
                    });
                }

                output += `[SIM OUT] ${displayOutput}\n`;
            }

            output += "[DYNAMIC SIM] Starting cycle-based execution...\n";

            for (let t = 0; t <= this.clockCycles * this.timeStep; t += this.timeStep) {
                this.evaluateLogic(fullCode, t);
                this.recordSteps(t);
            }

            // 4. Generate VCD
            const vcd = this.generateVCD();
            output += "[DYNAMIC SIM] Waveform generated successfully.\n";
            output += "[DYNAMIC SIM] Simulation finished.";

            return {
                success: true,
                output,
                vcd,
            };
        } catch (error: any) {
            return {
                success: false,
                output: "",
                vcd: "",
                error: error.message,
            };
        }
    }

    private extractSignals(code: string) {
        // Extract input/output/wire/reg declarations
        const signalRegex = /(?:input|output|wire|reg)\s+(?:\[.*?\]\s+)?(\w+)/g;
        let match;
        while ((match = signalRegex.exec(code)) !== null) {
            this.signals.set(match[1], 0);
        }
    }

    private initializeTrace() {
        this.signals.forEach((_, signal) => {
            this.trace.set(signal, { signal, transitions: [] });
        });
    }

    private recordSteps(time: number) {
        this.signals.forEach((value, signal) => {
            const trace = this.trace.get(signal);
            if (trace) {
                const lastTransition = trace.transitions[trace.transitions.length - 1];
                if (!lastTransition || lastTransition.value !== value.toString()) {
                    trace.transitions.push({ time, value: value.toString() });
                }
            }
        });
    }

    private evaluateLogic(code: string, time: number) {
        // 1. Continuous Assignments: assign y = a & b;
        const assignRegex = /assign\s+(\w+)\s*=\s*([^;]+);/g;
        let assignMatch;
        while ((assignMatch = assignRegex.exec(code)) !== null) {
            const target = assignMatch[1];
            const expr = assignMatch[2];
            this.signals.set(target, this.evalExpr(expr));
        }

        // 2. Procedural Combinational: always @(*) ... case(sel)
        if (code.includes("always") && (code.includes("@(*)") || code.includes("@*"))) {
            // Check for case(sel)
            const caseRegex = /case\s*\(\s*(\w+)\s*\)([\s\S]*?)endcase/g;
            let caseMatch;
            while ((caseMatch = caseRegex.exec(code)) !== null) {
                const selSignal = caseMatch[1];
                const caseBody = caseMatch[2];
                const selVal = this.signals.get(selSignal) || 0;

                // Match specific cases: 2'b11: y = d[3];
                const itemRegex = /(\d+'b[01xqz]+|\d+'h[0-9a-fA-F]+|\d+)\s*:\s*(\w+)\s*=\s*([^;]+);/g;
                let itemMatch;
                while ((itemMatch = itemRegex.exec(caseBody)) !== null) {
                    const caseValLiteral = itemMatch[1];
                    const target = itemMatch[2];
                    const expr = itemMatch[3];

                    // Convert literal to number (basic)
                    let caseVal = 0;
                    if (caseValLiteral.includes('b')) caseVal = parseInt(caseValLiteral.split('b')[1], 2);
                    else if (caseValLiteral.includes('h')) caseVal = parseInt(caseValLiteral.split('h')[1], 16);
                    else caseVal = parseInt(caseValLiteral);

                    if (selVal === caseVal) {
                        this.signals.set(target, this.evalExpr(expr));
                    }
                }
            }

            // Direct procedural: y = a | b; (outside case) - Enhanced to support single-statement blocks
            const procAssignRegex = /(?:begin|;|\*\))\s*(\w+)\s*=\s*([^;]+);/g;
            let procMatch;
            while ((procMatch = procAssignRegex.exec(code)) !== null) {
                const target = procMatch[1];
                const expr = procMatch[2];
                // Guard to not overwrite case output
                if (!code.includes('case') || target === 'y') {
                    this.signals.set(target, this.evalExpr(expr));
                }
            }
        }

        // 3. Sequential: always @(posedge clk)
        if (code.includes("always") && code.includes("@(posedge")) {
            const clockSignal = "clk";
            const currentClk = Math.floor(time / this.timeStep) % 2;
            this.signals.set(clockSignal, currentClk);

            if (currentClk === 1) {
                // Non-blocking assignments: q <= d;
                const nbRegex = /(\w+)\s*<=\s*([^;]+);/g;
                let nbMatch;
                const updates: Map<string, any> = new Map();
                while ((nbMatch = nbRegex.exec(code)) !== null) {
                    const target = nbMatch[1];
                    const expr = nbMatch[2];
                    updates.set(target, this.evalExpr(expr));
                }
                updates.forEach((val, key) => this.signals.set(key, val));
            }
        }
    }

    private evalExpr(expr: string): any {
        expr = expr.trim();

        // Bit-select: d[3]
        const bitSelectMatch = expr.match(/(\w+)\[(\d+)\]/);
        if (bitSelectMatch) {
            const signal = bitSelectMatch[1];
            const index = parseInt(bitSelectMatch[2]);
            const val = this.signals.get(signal) || 0;
            return (val >> index) & 1;
        }

        // Binary ops: a & b, a | b, a ^ b
        if (expr.includes('&')) {
            const parts = expr.split('&').map(p => p.trim());
            return parts.reduce((acc, p) => acc & (this.signals.get(p) || 0), ~0);
        }
        if (expr.includes('|')) {
            const parts = expr.split('|').map(p => p.trim());
            return parts.reduce((acc, p) => acc | (this.signals.get(p) || 0), 0);
        }
        if (expr.includes('^')) {
            const parts = expr.split('^').map(p => p.trim());
            return parts.reduce((acc, p) => acc ^ (this.signals.get(p) || 0), 0);
        }

        // NOT: ~a
        if (expr.startsWith('~')) {
            const signal = expr.substring(1).trim();
            return ~(this.signals.get(signal) || 0) & 1;
        }

        // Literal or signal
        if (this.signals.has(expr)) {
            return this.signals.get(expr);
        }

        // Try to parse as number
        if (expr.match(/^\d+$/)) {
            return parseInt(expr);
        }

        return 0;
    }

    private generateVCD(): string {
        let vcd = "$timescale 1ns $end\n";
        vcd += "$scope module top $end\n";

        const signalIds = new Map<string, string>();
        let idCounter = 33; // Start from '!'

        this.trace.forEach((trace, signal) => {
            const id = String.fromCharCode(idCounter++);
            signalIds.set(signal, id);
            vcd += `$var wire 1 ${id} ${signal} $end\n`;
        });

        vcd += "$upscope $end\n$enddefinitions $end\n";
        vcd += "$dumpvars\n";

        this.trace.forEach((trace, signal) => {
            const id = signalIds.get(signal);
            if (trace.transitions.length > 0) {
                vcd += `${trace.transitions[0].value}${id}\n`;
            }
        });

        vcd += "$end\n";

        const allTimes = new Set<number>();
        this.trace.forEach(trace => {
            trace.transitions.forEach(t => allTimes.add(t.time));
        });

        Array.from(allTimes).sort((a, b) => a - b).forEach(time => {
            vcd += `#${time}\n`;
            this.trace.forEach((trace, signal) => {
                const id = signalIds.get(signal);
                const transition = trace.transitions.find(t => t.time === time);
                if (transition) {
                    vcd += `${transition.value}${id}\n`;
                }
            });
        });

        return vcd;
    }
}
