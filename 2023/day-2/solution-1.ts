const input = Bun.file(Bun.argv[2]);

const inputText = await input.text();

const NUMBER_OF_RED = 12;
const NUMBER_OF_GREEN = 13;
const NUMBER_OF_BLUE = 14;

let possibleGameIdSum = 0;

let redCount = 0;
let greenCount = 0;
let blueCount = 0;

let gameStartIndex = 0;
let currentGameId = 1;
let currentColorCount = 0;
let isColorCountFound = false;
let currentColor = undefined;
let isGamePossible = true;
for (let i = 0; i < inputText.length; i++) {
  let gameStartIndexOffset = 8;
  switch (true) {
    case currentGameId >= 10:
      gameStartIndexOffset = 9;
      break;
    case currentGameId >= 100:
      gameStartIndexOffset = 10;
  }
  if (i < gameStartIndex + gameStartIndexOffset) {
    continue;
  }

  if (inputText[i] === "\n" || i === inputText.length - 1) {
    if (isGamePossible) {
      possibleGameIdSum += currentGameId;
    }
    currentColorCount = redCount = greenCount = blueCount = 0;
    currentColor = undefined;
    isColorCountFound = false;
    isGamePossible = true;

    currentGameId++;
    gameStartIndex = i + 1;
    continue;
  }

  if (!isGamePossible) {
    continue;
  }

  if (!isColorCountFound && inputText[i] !== " ") {
    if (currentColorCount === 0) {
      currentColorCount = Number(inputText[i]);
      continue;
    }

    currentColorCount *= 10 + Number(inputText[i]);
    continue;
  }

  if (inputText[i] === " ") {
    if (!isColorCountFound && currentColorCount !== 0) {
      isColorCountFound = true;
    }
    continue;
  }

  if (inputText[i] === "," || inputText[i] === ";") {
    currentColorCount = 0;
    currentColor = undefined;
    isColorCountFound = false;

    if (inputText[i] === ";") {
      redCount = greenCount = blueCount = 0;
    }
    continue;
  }

  if (currentColor) {
    continue;
  }

  currentColor = inputText[i];
  switch (currentColor) {
    case "r":
      redCount += currentColorCount;
      if (redCount > NUMBER_OF_RED) {
        isGamePossible = false;
        break;
      }
      break;
    case "g":
      greenCount += currentColorCount;
      if (greenCount > NUMBER_OF_GREEN) {
        isGamePossible = false;
        break;
      }
      break;
    case "b":
      blueCount += currentColorCount;
      if (blueCount > NUMBER_OF_BLUE) {
        isGamePossible = false;
      }
      break;
  }
}

console.log(possibleGameIdSum);
