export const module1Lessons = [
  {
    id: "v-1-1",
    title: "1.1 Boolean Algebra & Gates",
    theory: "Logic gates (AND, OR, NOT) are the building blocks of digital systems.",
    detailedDescription: `Digital logic gates are the fundamental decision-makers inside every electronic device. Like the atoms of a digital universe, they combine to form complex behaviors.

### The Fundamental Trinity:
- **NOT Gate**: The 'Inverter'. It flips the state. In hardware, this is often implemented using a single CMOS pair.
- **AND Gate**: The 'Gatekeeper'. Output is 1 only if all inputs are 1. Essential for enabling signals or masking data.
- **OR Gate**: The 'Collector'. It detects if any signal is active. Used for error flags and interrupts.

In Verilog, we model these using primitives like 'and', 'or', 'xor'. While modern synthesis uses RTL (Assign), understanding gate-level modeling is crucial for timing and area optimization.`,
    realWorldExample: "A Smart Home Alarm: If the 'Security Armed' signal is 1 AND the 'Door Sensor' is 1, the 'Alarm Trigger' fires. Logic gates protect your house without needing a CPU!",
    imagePath: "/assets/logic_gates_overview.png",
    expectedOutput: "Y=1 when A=1, B=1 (Truth Table Match)",
    code: `module gate_level_modeling(input a, b, output y_and, y_nand);
  and #2 (y_and, a, b);   // 2 unit delay
  nand #2 (y_nand, a, b);
endmodule`,
    testbench: `module tb;
  reg a, b;
  wire y_and, y_nand;
  gate_level_modeling dut(a, b, y_and, y_nand);
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0, tb);
    a=0; b=0; #10; a=1; #10; b=1; #10;
  end
endmodule`,
    track: "verilog",
    module: 1
  },
  {
    id: "v-1-2",
    title: "1.2 Combinational Building Blocks",
    theory: "Multiplexers select one of many inputs. Decoders route inputs to specific outputs.",
    detailedDescription: `If gates are the atoms, building blocks like Multiplexers (MUX) are the functional molecules.

### Key Components:
- **Multiplexers (MUX)**: The 'Digital Switch'. It selects one data path from many. In a CPU, MUXes route operands to the ALU.
- **Decoders**: The 'Address Translators'. They take a binary code and activate exactly one line. This is how your RAM knows which specific byte you're reading.
- **Encoders**: The opposite of decoders. They take multiple signal lines and condense them into a binary signature.

Mastering these blocks allows you to build data-routing networks that operate at gigahertz speeds.`,
    realWorldExample: "A Stream Selector: Netflix, YouTube, and Disney+ all send data to your TV. The TV uses a MUX (controlled by your remote) to pick which 'stream' actually gets displayed on the screen.",
    imagePath: "/assets/mux_decoder_schema.png",
    expectedOutput: "y = d[sel] (MUX logic verified)",
    code: `module mux4to1(input [3:0] d, input [1:0] sel, output reg y);
  always @(*) begin
    case(sel)
      2'b00: y = d[0];
      2'b01: y = d[1];
      2'b10: y = d[2];
      2'b11: y = d[3];
    endcase
  end
endmodule`,
    testbench: `module tb;
  reg [3:0] d; reg [1:0] sel; wire y;
  mux4to1 dut(d, sel, y);
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0, tb);
    d=4'b1010; sel=0; #10; sel=1; #10; sel=2; #10; sel=3; #10;
  end
endmodule`,
    track: "verilog",
    module: 1
  },
  {
    id: "v-1-3",
    title: "1.3 Arithmetic Logic Units (ALU)",
    theory: "Adders and ALUs perform mathematical operations in silicon.",
    detailedDescription: `The Arithmetic Logic Unit (ALU) is the 'Calculated Engine' of every processor. It performs the hard math and logic required for software to run.

### The Arithmetic Stack:
- **Half Adder**: Simple addition of two bits.
- **Full Adder**: Adds two bits plus a 'Carry-In' from a previous stage. Essential for multi-bit addition.
- **ALU Design**: A complex block that combines Adders, Logical Gates, and MUXes. By changing a 'control signal', you tell the ALU to either ADD, SUBTRACT, or perform an AND/OR.

In this lab, you'll build your first mathematical core.`,
    realWorldExample: "Calculator 'Add': When you press '+', you're sending a 'Select Signal' to the ALU. It switches its MUX to the Adder circuit and outputs the result in nanoseconds.",
    imagePath: "/assets/arithmetic_alu_diagram.png",
    expectedOutput: "Sum & Cout match Binary Addition",
    code: `module full_adder(input a, b, cin, output sum, cout);
  assign sum = a ^ b ^ cin;
  assign cout = (a & b) | (b & cin) | (a & cin);
endmodule`,
    testbench: `module tb;
  reg a, b, cin; wire sum, cout;
  full_adder dut(a, b, cin, sum, cout);
  initial begin
    $dumpfile("dump.vcd"); $dumpvars(0, tb);
    a=0; b=1; cin=0; #10; a=1; cin=1; #10;
  end
endmodule`,
    track: "verilog",
    module: 1
  }
];
