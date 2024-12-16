import readline from "readline";

import {
  findSafetyFactor,
  HEIGHT,
  moveRobot,
  moveRobots,
  RobotConfig,
  WIDTH,
} from "./part1";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export function displayRobots(
  robots: RobotConfig[],
  width = WIDTH,
  height = HEIGHT
): void {
  const blank: string[] = [];

  for (let i = 0; i < height; i++) {
    blank.push(" ".repeat(width));
  }

  robots.forEach(([[x, y]]) => {
    const line = blank[y];
    const replacement = "█";
    const updatedLine =
      line.substring(0, x) +
      replacement +
      line.substring(x + replacement.length);
    blank.splice(y, 1, updatedLine);
  });

  console.log(blank.join("\n"));
}

export function findLowestSafetyFactor(
  robots: RobotConfig[],
  width = WIDTH,
  height = HEIGHT
) {
  let updatedRobots = [...robots];
  let lowestSafetyFactor: number | undefined = undefined;
  let step = 0;
  for (let i = 1; i < 10000; i++) {
    updatedRobots = moveRobots(updatedRobots, 1, width, height);
    const x = findSafetyFactor(updatedRobots, width, height);
    if (!lowestSafetyFactor) {
      lowestSafetyFactor = x.safetyFactor;
    } else {
      if (x.safetyFactor < lowestSafetyFactor) {
        lowestSafetyFactor = x.safetyFactor;
        step = i;
      }
    }
  }

  return { lowestSafetyFactor, step };
}

export async function manualStepMoveRobots(
  robots: RobotConfig[],
  width = WIDTH,
  height = HEIGHT,
  currentStep: number
) {
  return new Promise(async (resolve) => {
    let updatedRobots = [...robots];

    let keepGoing = true;
    let step = currentStep + 1;
    while (keepGoing) {
      updatedRobots = updatedRobots.map((robot) =>
        moveRobot(robot, width, height)
      );
      displayRobots(updatedRobots);
      console.log(step);
      step++;
      const response = await new Promise((resolve) => {
        rl.question("quit (y)?", (answer) => {
          resolve(answer);
        });
      });

      if (response === "y") {
        keepGoing = false;
      }
    }
    rl.close();
    resolve(step);
  });
}
