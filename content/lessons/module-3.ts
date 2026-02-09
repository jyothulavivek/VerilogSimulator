// Module 3: Advanced Digital Design
export const module3Lessons = [
  {
    id: "v-3-1",
    title: "3.1 Pipelining & High Performance",
    theory: "Pipelining improves throughput by overlapping instruction execution.",
    detailedDescription: `Pipelining is the art of extreme multitasking in a high-performance processor. Instead of waiting for one instruction to finish, we overlap the execution of multiple instructions.

### The Stages of Silicon (The Pipeline):
1. **Instruction Fetch (IF)**: Pulling high-speed data from memory.
2. **Decode (ID)**: Breaking down the opcode into control signals.
3. **Execute (EX)**: The ALU performing math or logic.
4. **Memory Access (MEM)**: Reading or writing to the cache.
5. **Write-back (WB)**: Updating the final result registers.

### The Throughput Law:
By keeping all stages busy, a pipelined processor can finish **one instruction per clock cycle**, even though each single instruction takes 5 cycles to complete. This is the secret behind gigahertz-speed computing!`,
    realWorldExample: "A Commercial Laundry Room: You don't wait for your first pile of clothes to dry before starting the next wash. While Load 1 is in the Dryer, Load 2 is in the Washer, and Load 3 is being Folded. You finish more laundry in an hour, without washing any faster!",
    imagePath: "/assets/pipelining_process_flow.png",
    code: `module pipelined_adder(input clk, input [7:0] a, b, output reg [8:0] sum);
  reg [7:0] a_reg, b_reg;
  always @(posedge clk) begin
    a_reg <= a;           // Stage 1: Input Latch
    b_reg <= b;
    sum <= a_reg + b_reg; // Stage 2: Execution & Output
  end
endmodule`,
    testbench: `module tb;
  reg clk; reg [7:0] a, b; wire [8:0] sum;
  pipelined_adder dut(clk, a, b, sum);
  always #5 clk = ~clk;
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0, tb);
    clk=0; a=10; b=20; #10; a=5; b=5; #10; a=100; b=100; #30; $finish;
  end
endmodule`,
    track: "verilog",
    module: 3
  }
];
