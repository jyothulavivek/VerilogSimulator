import { uvmProLessons } from "./uvm-pro";

export const uvmLessons = [
  ...uvmProLessons,
  {
    id: "uvm-1",
    title: "5.1 UVM: The Movie Production Standard",
    theory: "The UVM framework uses a hierarchical component structure.",
    detailedDescription: `Universal Verification Methodology (UVM) is the 'Industrial Protocol' for hardware testing. Think of it as a massive **Movie Production Crew** where everyone has a specific, standardized role.

### The Crew Hierarchy:
- **Sequencer**: The 'Script Writer'. Decides what sequences of data should happen.
- **Driver**: The 'Choreographer'. Translates the script into actual signal movements on the hardware pins.
- **Monitor**: The 'Set Photographer'. Quietly observes everything that happens without interfering.
- **Scoreboard**: The 'Continuity Checker'. Compares the Monitor's photos against the original Script. If they don't match, the 'Scene' (test) fails!
- **Agent**: The 'Manager'. Packages the Driver, Monitor, and Sequencer into a single reusable unit.

This hierarchy ensures that once you build a 'High-Speed Bus Agent', you can reuse it in every future 'Movie' (project) you work on.`,
    realWorldExample: "GPU Verification: To verify a 100-billion transistor graphics card, teams of 100+ engineers use UVM to ensures every pixel is mathematically perfect before the chip is even manufactured.",
    imagePath: "/assets/uvm_production_crew_hierarchy.png",
    code: `class my_driver extends uvm_driver #(my_transaction);
  \`uvm_component_utils(my_driver)
  
  virtual task run_phase(uvm_phase phase);
    forever begin
      seq_item_port.get_next_item(req);
      drive_transfer(req);
      seq_item_port.item_done();
    end
  endtask
endclass`,
    track: "uvm",
    module: 3
  }
];

// Topic metadata for UVM
export const uvmTopics = [
  {
    name: "UVM Architecture",
    description: "Factory pattern, config database, and component hierarchy",
    lessonIds: ['uvm-pro-1', 'uvm-pro-2', 'uvm-1']
  },
  {
    name: "Testbench Components",
    description: "Drivers, monitors, sequencers, and agents",
    lessonIds: ['uvm-1']
  },
  {
    name: "Advanced UVM",
    description: "Sequences, virtual sequences, and scoreboards",
    lessonIds: []
  }
];
