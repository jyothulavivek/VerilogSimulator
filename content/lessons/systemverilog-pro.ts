export const systemVerilogProLessons = [
    {
        id: "sv-pro-1",
        title: "SV Pro 1.1: Dynamic Array Systems (Expanding Storage)",
        theory: "Dynamic arrays allow for runtime memory allocation, essential for variable-length data simulation.",
        detailedDescription: `In standard Verilog, array sizes are fixed at compile time. In modern verification, we don't always know how much data we'll receive. **Dynamic Arrays** are the solution.

### 1. The Expanding Bin:
A dynamic array is declared with empty brackets \`[]\`. It consumes zero memory until you allocate it using the \`new[]\` operator.

### 2. Runtime Flexibility:
- **Allocation**: \`data = new[10];\` // Create 10 slots.
- **Resizing**: \`data = new[20](data);\` // Expand to 20 slots while KEEPING the old data.
- **De-allocation**: \`data.delete();\` // Free the memory.

### 3. Native Methods:
- \`size()\`: Returns current length.
- \`foreach\`: The preferred way to iterate over dynamic content.`,
        realWorldExample: "Variable-Length Networking Packets: When simulating an Ethernet switch, packets can range from 64 to 1518 bytes. You cannot use a fixed array; you use a **Dynamic Array** to 'stretch' the data buffer to match the size of each incoming packet as it arrives.",
        imagePath: "/assets/dynamic_arrays_sv.png",
        expectedOutput: "Dynamic Allocation & Retention check",
        code: `module dynamic_array_demo;
    int payload []; // Empty bin
    
    initial begin
        // Allocate space for a packet
        payload = new[4];
        payload = '{10, 20, 30, 40};
        
        // Resize to add header without losing payload
        payload = new[payload.size() + 1](payload);
        payload[payload.size()-1] = 99; // Add trailing flag
        
        foreach(payload[i]) 
            $display("Byte %0d: %0h", i, payload[i]);
    end
endmodule`,
        testbench: `// Standard SV module for standalone execution`,
        track: "verilog", // Using 'verilog' track for simulator categorization
        module: 5
    },
    {
        id: "sv-pro-2",
        title: "SV Pro 1.2: High-Performance Queues (The Theater Line)",
        theory: "Queues are variable-sized ordered collections that support efficient insertion and removal.",
        detailedDescription: `If Dynamic Arrays are bins, **Queues** are theater lines. They are the most powerful data structure in SystemVerilog for modeling hardware buffers and FIFOs (First-In-First-Out).

### 1. The Queue Syntax:
Declared with a dollar sign \`[$]\`.
- \`int msg_queue[$];\`

### 2. Interaction Methods:
- \`push_back()\`: Join the end of the line.
- \`pop_front()\`: Get the person at the front.
- \`insert(index, val)\`: "Cut" the line at a specific spot.

### 3. Benefits over Arrays:
Unlike dynamic arrays, you don't need to call \`new[]\`. The queue grows and shrinks automatically as you push/pop data. It is highly optimized for simulation performance.`,
        realWorldExample: "CPU Transaction FIFO: Inside a processor, instructions are 'queued' up before the ALU is ready. Designers use SystemVerilog Queues to model this instruction pipeline. If a 'High Priority' interrupt arrives, they use \`push_front()\` to jump the instruction to the start of the line.",
        imagePath: "/assets/sv_queues.png",
        expectedOutput: "FIFO Queue behavioral verification",
        code: `module queue_demo;
    int instruction_fifo [$];
    
    initial begin
        // Add normal instructions
        instruction_fifo.push_back(32'hADD);
        instruction_fifo.push_back(32'hSUB);
        
        // IRQ arrives! Push to front
        instruction_fifo.push_front(32'hINT);
        
        while(instruction_fifo.size() > 0) begin
            int current = instruction_fifo.pop_front();
            $display("Executing: %h", current);
        end
    end
endmodule`,
        testbench: `// Standard SV module`,
        track: "verilog",
        module: 5
    },
    {
        id: "sv-pro-3",
        title: "SV Pro 1.3: OOP Inheritance (The Evolutionary Chain)",
        theory: "Inheritance allows you to create new classes based on existing ones, promoting code reuse.",
        detailedDescription: `In a complex verification environment, you don't want to re-write your 'Bus Driver' for every new chip. **Inheritance** lets you evolve your code.

### 1. The 'EXTENDS' Keyword:
When you extend a class, the child inherits all properties and methods from the parent.
- \`class ErrorPacket extends BasePacket;\`

### 2. Overriding (Super):
You can change how a function works in the child class while still calling the original logic using \`super.method_name()\`.

### 3. The Blueprint Factory:
Inheritance is the foundation of UVM (Universal Verification Methodology). It allows a single testbench to handle hundreds of different test cases by simply swapping objects.`,
        realWorldExample: "Error Injection: To test if a CPU can handle a 'Corrupted Memory Read', you don't build a new testbench. You take your standard 'Memory Transaction' class and **Inherit** it to create a 'Corrupted Transaction' that flips a few random bits. This 'Evolutionary' approach is how high-reliability chips (Automotive/Space) are verified.",
        imagePath: "/assets/sv_inheritance.png",
        expectedOutput: "Inheritance & Super call verification",
        code: `class BaseTransaction;
    int addr;
    function new(int a); addr = a; endfunction
    virtual function void print();
        $display("Base Addr: %0h", addr);
    endfunction
endclass

class ErrorTransaction extends BaseTransaction;
    function new(int a); super.new(a); endfunction
    function void print();
        $display("--- ERROR INJECTED ---");
        super.print();
    endfunction
endclass

module tb;
    ErrorTransaction et;
    initial begin
        et = new(32'hDEADBEEF);
        et.print();
    end
endmodule`,
        testbench: `// Standalone SV logic`,
        track: "verilog",
        module: 5
    },
    {
        id: "sv-pro-4",
        title: "SV Pro 1.4: Smart Constraints (The Random Dealer)",
        theory: "Constraints guide the random numbers generated by SystemVerilog, ensuring they stay within legal hardware limits.",
        detailedDescription: `Pure random data is useless for hardware. If you send a "Random Opcode" to a CPU, 99.9% of the time it will just crash. **Constraints** make randomness "Smart".

### 1. Weighted Randomization (\`dist\`):
You can tell the simulator to pick certain values more often than others. 
- *Example*: Pick 'Read' 90% of the time, and 'Write' 10% of the time.

### 2. Set Membership (\`inside\`):
Ensure a value stays within a valid list or range.
- \`constraint c_addr { addr inside {[0:4095]}; }\`

### 3. Implications (->):
Create conditional rules. "IF the command is WRITE, THEN the strobe bits must be active."`,
        realWorldExample: "The Illegal Opcode Trap: When verification engineers test a new RISC-V processor, they use **Constraints** to ensure the random generator produces mostly 'Valid' instructions (ADD, SUB) while occasionally 'stress-testing' the edge cases (Overflows). This ensures the CPU is robust without wasting simulation time on nonsensical data.",
        imagePath: "/assets/sv_constraints.png",
        expectedOutput: "Successful Constrained Randomization",
        code: `class BurstTransaction;
    rand bit [7:0] size;
    rand bit [31:0] addr;
    
    // The Smart Dealer's Rules
    constraint c_burst {
        size inside {1, 2, 4, 8, 16}; // Industry standard burst sizes
        addr % 4 == 0;                // Word-aligned addresses
    }
endclass

module tb;
    BurstTransaction bt;
    initial begin
        bt = new();
        repeat(3) begin
            if (bt.randomize())
                $display("Size: %0d, Addr: %0h", bt.size, bt.addr);
        end
    end
endmodule`,
        testbench: `// Standalone SV logic`,
        track: "verilog",
        module: 5
    }
];
