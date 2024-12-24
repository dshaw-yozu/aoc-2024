type Wire = string;
type Operator = "AND" | "OR" | "XOR";
type State = 0 | 1 | undefined;
type Gate = {
  a: Wire;
  b: Wire;
  output: Wire;
  operator: Operator;
  executed: boolean;
};
type Wires = Record<Wire, State>;
export function parseInput(rawString: string): {
  gates: Gate[];
  wires: Wires;
} {
  const [init, gatesRaw] = rawString.split("\n\n");

  const initLines = init.split("\n");

  const wires: Wires = {};
  initLines.forEach((line) => {
    const regex = /(\w+):\s(\d)/;

    const matches = line.match(regex);

    if (matches) {
      const [, wire, state] = matches;

      if (["1", "0"].includes(state)) {
        wires[wire] = +state as State;
      }
    }
  });

  const gateLines = gatesRaw.split("\n");
  const gates: Gate[] = [];

  gateLines.forEach((gate) => {
    const regex = /(\w+)\s(\w+)\s(\w+)\s->\s(\w+)/;

    const matches = gate.match(regex);

    if (matches) {
      const [, a, operator, b, output] = matches;

      gates.push({
        a,
        b,
        operator: operator as Operator,
        output,
        executed: false,
      });

      if (!wires.hasOwnProperty(a)) {
        wires[a] = undefined;
      }
      if (!wires.hasOwnProperty(b)) {
        wires[b] = undefined;
      }
      if (!wires.hasOwnProperty(output)) {
        wires[output] = undefined;
      }
    }
  });

  return { gates, wires };
}

export function executeGates({
  gates,
  wires,
}: {
  gates: Gate[];
  wires: Wires;
}): Wires {
  while (gates.some((g) => !g.executed)) {
    const unexcutedGates = gates.filter((g) => !g.executed);

    unexcutedGates.forEach((g) => {
      const { a, b, operator, output } = g;

      const aValue = wires[a];
      const bValue = wires[b];

      if (typeof aValue === "number" && typeof bValue === "number") {
        switch (operator) {
          case "AND":
            wires[output] = (aValue & bValue) as 0 | 1;
            break;
          case "OR":
            wires[output] = (aValue | bValue) as 0 | 1;
            break;
          case "XOR":
            wires[output] = (aValue ^ bValue) as 0 | 1;
            break;
        }

        g.executed = true;
      }
    });
  }

  return wires;
}

export function getNumber(wires: Wires) {
  const zWires = Object.entries(wires).filter(
    ([wires]) => wires.charAt(0) === "z"
  );

  zWires.sort(([a], [b]) => {
    return b.localeCompare(a);
  });

  const binaryDigits = zWires.map((e) => e[1]).join("");

  return parseInt(binaryDigits, 2);
}

export function solution({
  gates,
  wires,
}: {
  gates: Gate[];
  wires: Wires;
}): number {
  const updatedWires = executeGates({ gates, wires });
  return getNumber(updatedWires);
}
