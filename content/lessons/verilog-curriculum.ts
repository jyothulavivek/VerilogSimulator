import { module1Lessons } from "./module-1";
import { module2Lessons } from "./module-2";
import { module3Lessons } from "./module-3";
import { verilogProLessons } from "./verilog-pro";

// Organize Verilog lessons by topic categories
export const verilogLessons = [
    // Topic 1: Fundamentals & Syntax
    ...module1Lessons,
    ...verilogProLessons.filter(l => ['v-pro-1', 'v-pro-2'].includes(l.id)),

    // Topic 2: Combinational Logic
    ...verilogProLessons.filter(l => ['v-pro-3', 'v-pro-4', 'v-pro-5'].includes(l.id)),

    // Topic 3: Sequential Logic & Behavioral Modeling
    ...module2Lessons,
    ...verilogProLessons.filter(l => ['v-pro-6', 'v-pro-7'].includes(l.id)),

    // Topic 4: Advanced Timing & Verification
    ...module3Lessons,
    ...verilogProLessons.filter(l => ['v-pro-8', 'v-pro-9'].includes(l.id))
];

// Topic metadata for UI display
export const verilogTopics = [
    {
        name: "Fundamentals & Syntax",
        description: "Lexical conventions, data types, and basic constructs",
        lessonIds: ['v-1-1', 'v-pro-1', 'v-pro-2']
    },
    {
        name: "Combinational Logic",
        description: "Gates, MUX, decoders, operators, and arithmetic circuits",
        lessonIds: ['v-1-2', 'v-1-3', 'v-pro-3', 'v-pro-4', 'v-pro-5']
    },
    {
        name: "Sequential Logic",
        description: "Flip-flops, FSMs, counters, and behavioral modeling",
        lessonIds: ['v-2-1', 'v-2-2', 'v-2-3', 'v-pro-6', 'v-pro-7']
    },
    {
        name: "Advanced Topics",
        description: "Pipelining, timing analysis, and metastability",
        lessonIds: ['v-3-1', 'v-3-2', 'v-3-3', 'v-pro-8', 'v-pro-9']
    }
];
