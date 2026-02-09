export const uvmProLessons = [
    {
        id: "uvm-pro-1",
        title: "UVM Pro 2.1: The Factory Pattern (The Assembly Line)",
        theory: "The UVM Factory allows for dynamic component replacement without modifying the testbench hierarchy.",
        detailedDescription: `In professional verification, you often need to swap a specific component (like a standard Driver) with an 'Error-Injecting Driver' for a specific test. Repeating this 100 times is inefficient. **The Factory** is the solution.

### 1. Dynamic Substitution:
Instead of hard-coding \`new()\`, we use \`type_id::create()\`. This tells UVM to ask the Factory for the component.

### 2. Factory Overrides:
You can tell the Factory: "Whenever a test asks for a 'Standard_Driver', give them an 'Error_Driver' instead."
- **Type Override**: Affects every instance of that class in the chip.
- **Instance Override**: Affects only a specific path (e.g., just the Driver in 'Agent_A').

### 3. The Power of Choice:
This allows you to customize your testbench behavior at runtime, without ever recompiling your top-level environment.`,
        realWorldExample: "Late-Stage Driver Swapping: Imagine you've built a 10,000-line environment for a Networking chip. Suddenly, you need to test a 'Slow Clock' scenario. Instead of rewriting the code, you use a **Factory Override** to swap the standard Driver for a 'Slow Driver'. This saves weeks of re-verification and keeps your project on schedule.",
        imagePath: "/assets/uvm_factory_logic.png",
        expectedOutput: "Successful Factory Type Override",
        code: `class base_driver extends uvm_driver;
    \`uvm_component_utils(base_driver)
    function new(string name, uvm_component parent); super.new(name, parent); endfunction
    virtual task run(); $display("Standard Driving..."); endtask
endclass

class error_driver extends base_driver;
    \`uvm_component_utils(error_driver)
    function new(string name, uvm_component parent); super.new(name, parent); endfunction
    virtual task run(); $display("--- ERROR INJECTION ACTIVE ---"); endtask
endclass

// In the test:
// factory.set_type_override_by_type(base_driver::get_type(), error_driver::get_type());`,
        testbench: `// Standalone UVM logic`,
        track: "verilog",
        module: 6
    },
    {
        id: "uvm-pro-2",
        title: "UVM Pro 2.2: Config DB (The Centralized Registry)",
        theory: "The UVM Configuration Database provides a mechanism for sharing variables and interfaces across the hierarchy.",
        detailedDescription: `Passing a 'Virtual Interface' from the top-level module down to a Driver 10 levels deep is a wiring nightmare. **Config DB** acts as the 'Central Registry' of the testbench.

### 1. The SET/GET Protocol:
- **SET**: A high-level component (like the Test) 'deposits' a value or interface into the database.
- **GET**: A low-level component (like a Monitor) 'withdraws' it.

### 2. Hierarchical Control:
You can control access using strings. You can make a variable visible to the 'Entire Chip' or restrict it to a 'Specific Agent'.

### 3. Virtual Interfaces:
This is the most common use case. It's how you safely pass physical hardware pins into your abstract UVM classes.`,
        realWorldExample: "Hierarchical Interface Delivery: In a Multi-Core CPU, every core needs its own 'Power Control' interface. Instead of manual wiring, the Top module 'Sets' each interface handle into the **Config DB** with a unique string ID (\"core_0_vif\", \"core_1_vif\"). Each core's Agent then 'Gets' its specific interface, creating a perfectly organized and scalable system.",
        imagePath: "/assets/uvm_config_db.png",
        expectedOutput: "Config DB interface retrieval check",
        code: `// Setting in the Top Module or Test
// uvm_config_db#(virtual my_if)::set(null, "uvm_test_top.*", "vif", top.vif);

// Getting in the Driver/Monitor
// if(!uvm_config_db#(virtual my_if)::get(this, "", "vif", vif))
//    \`uvm_fatal("VIF_ERR", "Could not get Virtual Interface!")`,
        testbench: `// Standalone UVM logic`,
        track: "verilog",
        module: 6
    }
];
