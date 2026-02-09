import { systemVerilogProLessons } from "./systemverilog-pro";

export const systemVerilogLessons = [
  ...systemVerilogProLessons,
  {
    id: "sv-1",
    title: "4.1 Data Types & Silicon Reality",
    theory: "SystemVerilog introduces logic, bit, byte, and specialized 2-state/4-state types.",
    detailedDescription: `In 'Classic' Verilog, we wrestled with the distinctions between 'wire' and 'reg'. SystemVerilog unifies these into the **logic** type, but the real power lies in state-management.

### The 4-State vs 2-State Divide:
- **4-State (logic, integer)**: Represents 0, 1, X (Unknown), and Z (High-Impedance). This is the 'Golden Standard' for hardware simulation, allowing us to catch uninitialized signals (X) and bus contention.
- **2-State (bit, int, byte)**: Represents only 0 and 1. By removing X and Z, simulators can run up to **5x faster**. Huge verification environments use 2-state types for testbench counters and abstract data structures to save time and memory.

Mastering types is about balancing 'Silicon Accuracy' with 'Simulation Velocity'.`,
    realWorldExample: "High-Speed Memory Simulation: When simulating a 1TB DDR5 memory module, engineers use 2-state 'bit' types for the internal storage to prevent the simulator from crashing under memory pressure.",
    imagePath: "/assets/sv_data_types_architecture.png",
    code: `module sv_types;
  logic [7:0] my_logic; // 4-state (0,1,X,Z)
  bit [7:0] my_bit;     // 2-state (0,1)
  
  initial begin
    my_logic = 8'hx;    // Correctly captures unknown
    my_bit = 8'hx;      // Coerced to 0 for speed
    $display("Logic: %h, Bit: %h", my_logic, my_bit);
  end
endmodule`,
    track: "sv",
    module: 2
  },
  {
    id: "sv-3",
    title: "4.3 OOP: The Blueprint Methodology",
    theory: "Object-Oriented Programming (OOP) allows for reusable, modular testbenches.",
    detailedDescription: `Object-Oriented Programming (OOP) is the single biggest leap from Verilog to SystemVerilog. It moves hardware testing from 'Manual Checking' to 'Automated Verification Factories'.

### Core OOP Pillars in VLSI:
- **Class (The Blueprint)**: Defines what a data transaction (like a PCIe Packet) looks like.
- **Object (The Instance)**: An actual transaction flowing through the chip.
- **Inheritance**: Allows you to create a 'Base Packet' and then 'Extend' it to create 'Error Packets' or 'Priority Packets' without re-writing the original logic.
- **Polymorphism**: The ability to treat different packets through a single interface, making your testbench incredibly flexible.

Without OOP, modern 100-billion transistor chips would be impossible to verify.`,
    realWorldExample: "Smartphone Chip Testing: A single verification environment uses OOP to test Wi-Fi, 5G, and GPU components by sharing a common 'Bus Transaction' base class, saving months of engineering time.",
    imagePath: "/assets/sv_oop_class_diagram.png",
    code: `class packet;
  bit [31:0] addr;
  bit [31:0] data;
  
  function new(bit [31:0] a, d);
    addr = a; data = d;
  endfunction
  
  virtual function void display();
    $display("Addr: %0h, Data: %0h", addr, data);
  endfunction
endclass

module top;
  packet p;
  initial begin
    p = new(32'hA000, 32'h1234);
    p.display();
  end
endmodule`,
    track: "sv",
    module: 2
  }
];

// Topic metadata for SystemVerilog
export const systemVerilogTopics = [
  {
    name: "Advanced Data Structures",
    description: "Dynamic arrays, queues, and associative arrays",
    lessonIds: ['sv-pro-1', 'sv-pro-2']
  },
  {
    name: "Object-Oriented Programming",
    description: "Classes, inheritance, polymorphism, and encapsulation",
    lessonIds: ['sv-pro-3', 'sv-1', 'sv-3']
  },
  {
    name: "Constrained Randomization",
    description: "Smart random stimulus generation with constraints",
    lessonIds: ['sv-pro-4']
  }
];
