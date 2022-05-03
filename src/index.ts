import chalk from "chalk";
import readline from "readline";
import { validWords } from "./validWords";
import { times } from "lodash";

const GRAY = "#797D7F";
const GREEN = "#6AAB63";
const YELLOW = "#CAB557";

const printGray = (char: string) => {
  const _char = char.toUpperCase();
  return chalk.bgHex(GRAY).bold(_char);
};
const printGreen = (char: string) => {
  const _char = char.toUpperCase();
  return chalk.bgHex(GREEN).bold(_char);
};
const printYellow = (char: string) => {
  const _char = char.toUpperCase();
  return chalk.bgHex(YELLOW).bold(_char);
};
const printSpace = () => {
  return chalk.underline(" ");
};

const printUserAnswer = (coloredAnswer: string[]) => {
  console.log(
    `${coloredAnswer[0]}${coloredAnswer[1]}${coloredAnswer[2]}${coloredAnswer[3]}${coloredAnswer[4]}`
  );
};

const answer = "hello";

console.log(
  `${printGray("T")}${printGreen("E")}${printYellow("R")}${printGray(
    "M"
  )}${printGreen("I")}${printGreen("D")}${printYellow("L")}${printGray("E")}`
);

console.log("");

const printBlanks = () => {
  const line = `${printSpace()}${printSpace()}${printSpace()}${printSpace()}${printSpace()}`;

  console.log(line);
};

const printCurrentPhase = (userAnswers: string[][]) => {
  userAnswers.forEach((answer) => {
    printUserAnswer(answer);
  });
  times(6 - userAnswers.length, () => {
    printBlanks();
  });
};

const main = async () => {
  let collectCount = 0;
  const userAnswers: string[][] = [];
  for (;;) {
    printCurrentPhase(userAnswers);

    const userAnswer = await prompt(
      `Guess a five-letter word! (${userAnswers.length + 1}/6)`
    );

    if (userAnswer.length !== 5) {
      console.error("[ERROR] Answer must be 5 letters.");
      continue;
    }

    if (!validWords.includes(userAnswer)) {
      console.error("[ERROR] Invalid words");
      continue;
    }

    const coloredAnswer: string[] = [];

    Array.from(userAnswer).forEach((userChar, userCharIndex) => {
      if (answer.includes(userChar)) {
        const indexes = Array.from(answer)
          .map((elm, idx) => (elm === userChar ? idx : ""))
          .filter(String);
        if (indexes.includes(userCharIndex)) {
          coloredAnswer.push(printGreen(userChar));
          collectCount += 1;
        } else {
          coloredAnswer.push(printYellow(userChar));
        }
      } else {
        coloredAnswer.push(printGray(userChar));
      }
    });
    userAnswers.push(coloredAnswer);

    if (collectCount === 5) {
      printCurrentPhase(userAnswers);
      console.log("Congratulations!!");
      break;
    }
    if (userAnswers.length === 6) {
      console.log("Game over..");
      break;
    }

    // line break
    console.log("");

    collectCount = 0;
  }
};

const prompt = async (msg) => {
  console.log(msg);
  const answer = await question("> ");
  return answer.trim();
};

const question = (question) => {
  const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise<string>((resolve) => {
    readlineInterface.question(question, (answer) => {
      resolve(answer);
      readlineInterface.close();
    });
  });
};

// 起動
(async () => {
  await main();
})();
