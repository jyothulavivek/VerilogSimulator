const hdl = require('hdl-js');

const verilog = `
module and_gate(input a, b, output y);
  assign y = a & b;
endmodule
`;

try {
    console.log("Parsing Verilog...");
    const ast = hdl.parse(verilog);
    console.log("AST:", JSON.stringify(ast, null, 2));
} catch (e) {
    console.error("Parse error:", e.message);
}
