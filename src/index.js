import chalk from "chalk";
import readline from "readline";
import { exec } from "child_process";
import { existsSync } from "fs";

const log = console.log;

const yellow = chalk.bgYellow.black.bold;

// Create an interface for input and output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

const logError = (message) => {
  log(chalk.bgRed.black("  Error  "), message);
};

const clearLastLine = () => {
  readline.moveCursor(process.stdout, 0, -1); // up one line
  readline.clearLine(process.stdout, 1); // from cursor to end
};

// Main async function
const main = async () => {
  // Get user input using await
  const day = await askQuestion(chalk.yellow("Please select a day (1,25): "));

  clearLastLine();

  const filePath = `${import.meta.dirname}/days/${day}`;
  const file = `${filePath}/index.ts`;

  try {
    if (!existsSync(filePath)) {
      throw new Error();
    }
  } catch (e) {
    logError(`file does not exist: ${file}`);
    rl.close();
    return;
  }

  // Print the result
  exec(`npx tsx ${filePath}`, (error, stdout) => {
    if (error) {
      logError(`exec error: ${error}`);
    }

    console.log(stdout);
  });

  // Close the readline interface
  rl.close();
};

log(yellow("  ADVENT OF CODE - 2024  " + "\n\n"));
main();
