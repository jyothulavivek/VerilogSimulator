export const designChallenges = [
    {
        id: "challenge-1",
        title: "FIFO Buffer Design",
        difficulty: "Advanced",
        description: "Design a synchronous FIFO with parameterized depth and width. Handle full and empty conditions correctly.",
        points: 1000,
        tags: ["Memory", "Pointers", "Flow Control"],
        starterCode: `module synchronous_fifo #(
  parameter DEPTH = 16,
  parameter WIDTH = 8
)(
  input clk, rst,
  input wr_en, rd_en,
  input [WIDTH-1:0] din,
  output [WIDTH-1:0] dout,
  output full, empty
);
  // YOUR DESIGN HERE
endmodule`,
        testbench: `module tb;
  // FIFO validation logic...
endmodule`
    },
    {
        id: "challenge-2",
        title: "Round Robin Arbiter",
        difficulty: "Expert",
        description: "Implement a 4-request round robin arbiter that ensures fairness between multiple requestors.",
        points: 1500,
        tags: ["Arbiter", "FSM", "Fairness"],
        starterCode: `module rr_arbiter(
  input clk, rst,
  input [3:0] req,
  output reg [3:0] gnt
);
  // YOUR DESIGN HERE
endmodule`,
        testbench: `module tb;
  // Arbiter validation logic...
endmodule`
    },
    {
        id: "challenge-3",
        title: "SPI Master Controller",
        difficulty: "Professional",
        description: "Design a Serial Peripheral Interface (SPI) master that supports Mode 0 communication.",
        points: 2000,
        tags: ["Protocol", "Serial", "Clocking"],
        starterCode: `module spi_master(
  input clk, rst,
  input start,
  input [7:0] tx_data,
  output reg sclk, mosi, cs_n,
  output reg done
);
  // YOUR DESIGN HERE
endmodule`,
        testbench: `module tb;
  // SPI validation logic...
endmodule`
    }
]
