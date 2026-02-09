export const advancedVerificationLessons = [
  {
    id: "adv-1",
    title: "6.1 CDC & The Danger of Metastability",
    theory: "Clock Domain Crossing (CDC) requires careful synchronization to prevent metastability.",
    detailedDescription: `Clock Domain Crossing (CDC) is one of the most dangerous and difficult parts of modern chip design. It's like moving between two different marching bands, each playing at a different tempo.

### The Physics of Failure:
- **Metastability**: Imagine trying to balance a ball perfectly on a sharp hilltop. It wobbles before falling left (0) or right (1). In hardware, if one clock domain reads a signal while the other is still 'wobbling', your entire silicon chip could lock up or crash.
- **The Multi-Flop Synchronizer**: To solve this, we use a 2-FF or 3-FF Synchronizer. It acts like a 'holding room', giving the signal two clock cycles to settle down before it enters the new domain. 

Mastering CDC is what separates a junior designer from a Senior Architect who builds billions-of-transistor processors.`,
    realWorldExample: "USB Connection: Your mouse runs on a slow 12MHz clock, but your CPU runs at 3.0GHz. Every single mouse click passes through deep CDC synchronizers to ensure your computer doesn't freeze!",
    imagePath: "/assets/cdc_synchronizer_circuit.png",
    code: `module cdc_synchronizer (
  input clk_b, rst_b,
  input d_in, // Signal from clk_a
  output q_out // Signal safe for clk_b
);
  reg q1, q2;
  always @(posedge clk_b or posedge rst_b) begin
    if (rst_b) begin
      q1 <= 0; q2 <= 0;
    end else begin
      q1 <= d_in; // 1st Flop: Buffer the wobble
      q2 <= q1;   // 2nd Flop: Settle the bit
    end
  end
  assign q_out = q2;
endmodule`,
    track: "sv", // Advanced verification usually falls under SV track
    module: 6
  }
];
