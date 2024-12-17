export type RegistryMap = Map<"A" | "B" | "C", number>;
export type Program = number[];

export type ParsedInput = {
  registry: RegistryMap;
  program: Program;
};

export function parseInput(rawInput: string): ParsedInput {
  const map: RegistryMap = new Map();

  const matches = rawInput.match(/(\d+)/g);
  let program: Program = [];

  if (matches) {
    const [a, b, c, ...rest] = matches;
    map.set("A", parseInt(a));
    map.set("B", parseInt(b));
    map.set("C", parseInt(c));

    program = rest.map((p) => parseInt(p));
  }

  return { registry: map, program };
}

export function bitwiseXOR(a: number, b: number): number {
  return a ^ b;
}

export function getCombo(registry: RegistryMap, command: number): number {
  switch (command) {
    case 0:
    case 1:
    case 2:
    case 3:
      return command;
    case 4:
      return registry.get("A")!;
    case 5:
      return registry.get("B")!;
    case 6:
      return registry.get("C")!;
    default:
      return -1;
  }
}

export function adv(registry: RegistryMap, combo: number): void {
  const a = registry.get("A")!;

  const result = a / Math.pow(2, combo);

  registry.set("A", Math.trunc(result));
}

export function bxl(registry: RegistryMap, literal: number): void {
  const b = registry.get("B")!;
  registry.set("B", bitwiseXOR(b, literal));
}

export function bst(registry: RegistryMap, combo: number): void {
  registry.set("B", combo % 8);
}

export function jnz(
  registry: RegistryMap,
  literal: number,
  pointer: number
): number {
  const a = registry.get("A")!;

  return a === 0 ? pointer + 2 : literal;
}

export function bxc(registry: RegistryMap, literal: number): void {
  const b = registry.get("B")!;
  const c = registry.get("C")!;

  registry.set("B", bitwiseXOR(b, c));
}

export function out(combo: number): number {
  return combo % 8;
}

export function bdv(registry: RegistryMap, combo: number) {
  const a = registry.get("A")!;

  const result = a / Math.pow(2, combo);

  registry.set("B", Math.trunc(result));
}

export function cdv(registry: RegistryMap, combo: number) {
  const a = registry.get("A")!;

  const result = a / Math.pow(2, combo);

  registry.set("C", Math.trunc(result));
}

export function executeCommand(
  registry: RegistryMap,
  command: number,
  operand: number,
  pointer: number
): [number, number | undefined] {
  const combo = getCombo(registry, operand);

  let output: number | undefined;
  let updatedPointer = pointer;
  let manualUpdate = false;
  switch (command) {
    case 0: // adv
      if (combo === -1) return [Infinity, undefined];
      adv(registry, combo);
      break;
    case 1: // bxl
      bxl(registry, operand);
      break;
    case 2: // bst
      if (combo === -1) return [Infinity, undefined];

      bst(registry, combo);
      break;
    case 3: // jnz
      updatedPointer = jnz(registry, operand, pointer);
      manualUpdate = true;
      break;
    case 4: // bxc
      bxc(registry, operand);
      break;
    case 5: // out
      if (combo === -1) return [Infinity, undefined];

      output = out(combo);
      break;
    case 6: // bdv
      if (combo === -1) return [Infinity, undefined];

      bdv(registry, combo);
      break;
    case 7: // cdv
      if (combo === -1) return [Infinity, undefined];

      cdv(registry, combo);
      break;
  }

  return [manualUpdate ? updatedPointer : pointer + 2, output];
}

export function solution(input: ParsedInput): string {
  const output: number[] = [];

  let i = 0;

  while (i <= input.program.length - 2) {
    const command = input.program[i];
    const operand = input.program[i + 1];

    const [updatedPointer, out] = executeCommand(
      input.registry,
      command,
      operand,
      i
    );

    if (typeof out === "number") {
      output.push(out);
    }

    if (i === -1) {
      i = input.program.length;
    }

    i = updatedPointer;
  }

  return output.join(",");
}
