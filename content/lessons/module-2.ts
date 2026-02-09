export const module2Lessons = [
  {
    id: "v-2-1",
    title: "2.1 Storage Elements",
    theory: "Latches and Flip-flops are the basic memory elements.",
    detailedDescription: `In digital design, 'Sequential Logic' is logic that has a memory. The D-Flip Flop (DFF) is the most fundamental memory element in silicon.

### The Mechanism of Memory:
- **Latches**: Level-sensitive. They 'open' when the clock is high and 'close' when it's low. Like a window that stays open as long as you hold it.
- **Flip-Flops**: Edge-sensitive. They only capture data at the exact nanosecond the clock 'ticks' (Rising/Falling edge).
- **The Setup/Hold Window**: To capture data correctly, the input signal must be stable just before (Setup) and just after (Hold) the clock edge. Violating this leads to **Metastability**—where the bit wobbles between 0 and 1!

Without Flip-Flops, your computer wouldn't be able to store even a single bit of information while executing a program.`,
    realWorldExample: "The Camera Shutter: A camera doesn't record everything it sees. It only captures the image at the exact moment you press the button (the Clock Edge). What happens before or after doesn't affect the permanent photo.",
    imagePath: "/assets/sequential_dff_schematic.png",
    code: `module d_flip_flop(input d, clk, rst, output reg q);
  always @(posedge clk or posedge rst) begin
    if (rst) q <= 1'b0;
    else q <= d;
  end
endmodule`,
    testbench: `module tb;
  reg d, clk, rst; wire q;
  d_flip_flop dut(d, clk, rst, q);
  always #5 clk = ~clk;
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0, tb);
    clk=0; rst=1; d=0; #12; rst=0; d=1; #10; d=0; #10; $finish;
  end
endmodule`,
    track: "verilog",
    module: 2
  },
  {
    id: "v-2-3",
    title: "2.3 Finite State Machines (FSM)",
    theory: "FSMs manage sequential logic using states and transitions.",
    detailedDescription: `Finite State Machines (FSMs) are the 'Conductors' of the hardware orchestra. They manage complex sequences of operations by moving through discrete 'States'.

### FSM Architectures:
- **Moore Machine**: Outputs depend ONLY on the current state. They are generally safer and easier to time.
- **Mealy Machine**: Outputs depend on the state AND the inputs. They can be faster because they react immediately to input changes within the same clock cycle.
- **State Encoding**: Binary, One-Hot (where 1 bit = 1 state), or Gray code. Choosing the right encoding is the difference between a high-speed CPU and a slow, buggy controller.

In this lab, you'll design a pattern detector, the core of networking protocols and security firewalls.`,
    realWorldExample: "A Vending Machine: It starts in 'IDLE'. You insert a coin (Input) -> State moves to 'COIN_COUNT'. You select an item -> State moves to 'DISPENSING'. The outputs (Release Item, Change) are decided by which state the machine is in.",
    imagePath: "/assets/fsm_controller_schema.png",
    code: `module pattern_detector(input clk, rst, in, output out);
  parameter S0=0, S1=1, S2=2;
  reg [1:0] state, next;
  always @(posedge clk or posedge rst) 
    state <= rst ? S0 : next;
    
  always @(*) begin
    case(state)
      S0: next = in ? S1 : S0;
      S1: next = in ? S2 : S0;
      S2: next = in ? S2 : S0;
      default: next = S0;
    endcase
  end
  assign out = (state == S2);
endmodule`,
    testbench: `module tb;
  reg clk, rst, in; wire out;
  pattern_detector dut(clk, rst, in, out);
  always #5 clk = ~clk;
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0, tb);
    clk=0; rst=1; in=0; #12; rst=0; in=1; #10; in=1; #10; in=0; #20; $finish;
  end
endmodule`,
    track: "verilog",
    module: 2
  }
];
