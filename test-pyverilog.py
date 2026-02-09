import sys
from pyverilog.vparser.parser import parse

code = """
module and_gate(input a, b, output y);
  assign y = a & b;
endmodule
"""

# Need to write to a file because pyverilog expects a file path
with open("temp_test.v", "w") as f:
    f.write(code)

try:
    ast, directives = parse(["temp_test.v"])
    ast.show()
    print("Success: AST generated.")
except Exception as e:
    print(f"Error: {e}")
