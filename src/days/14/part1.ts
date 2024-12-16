export type Position = [number, number];
export type Velocity = [number, number];
export type RobotConfig = [Position, Velocity];

export const WIDTH = 101;
export const HEIGHT = 103;

export function parseInput(rawText: string): RobotConfig[] {
  const lines = rawText.split("\n");

  const configRegex = /p=(\d+),(\d+)\sv=(-*\d+),(-*\d+)/;

  return lines.map((line) => {
    const matches = line.match(configRegex)!;

    const [, x, y, dx, dy] = matches;
    return [
      [parseInt(x), parseInt(y)],
      [parseInt(dx), parseInt(dy)],
    ];
  });
}

export function wrap(coord: number, lower: number, upper: number) {
  if (coord < lower) {
    return upper - (lower - coord - 1);
  }

  if (coord > upper) {
    return lower - (upper - coord + 1);
  }

  return coord;
}

export function moveRobot(
  robot: RobotConfig,
  width = WIDTH,
  height = HEIGHT
): RobotConfig {
  const [[x, y], velocity] = robot;

  const newX = x + velocity[0];
  const newY = y + velocity[1];

  return [[wrap(newX, 0, width - 1), wrap(newY, 0, height - 1)], velocity];
}

export function moveRobots(
  robots: RobotConfig[],
  steps: number,
  width = WIDTH,
  height = HEIGHT
): RobotConfig[] {
  let updatedRobots = [...robots];

  for (let n = 0; n < steps; n++) {
    updatedRobots = updatedRobots.map((robot) =>
      moveRobot(robot, width, height)
    );
  }

  return updatedRobots;
}

export function findSafetyFactor(
  robots: RobotConfig[],
  width = WIDTH,
  height = HEIGHT
): { safetyFactor: number; quadrants: [number, number, number, number] } {
  let nw = 0;
  let ne = 0;
  let sw = 0;
  let se = 0;
  let boundary = 0;

  const verticalBoundary = Math.ceil((width - 1) / 2);
  const horizontalBoundary = Math.ceil((height - 1) / 2);

  robots.forEach((robot) => {
    const [[x, y]] = robot;

    if (x < verticalBoundary && y < horizontalBoundary) {
      return nw++;
    }
    if (x > verticalBoundary && y < horizontalBoundary) {
      return ne++;
    }
    if (x < verticalBoundary && y > horizontalBoundary) {
      return sw++;
    }
    if (x > verticalBoundary && y > horizontalBoundary) {
      return se++;
    }
    boundary++;
  });

  return { safetyFactor: nw * ne * sw * se, quadrants: [nw, ne, sw, se] };
}
