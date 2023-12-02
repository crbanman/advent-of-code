const input = Bun.file(Bun.argv[2]);

const inputText = await input.text();

let sumOfPowers = 0;

let redCount = 0;
let greenCount = 0;
let blueCount = 0;

let minRed = 0;
let minGreen = 0;
let minBlue = 0;

let gameStartIndex = 0;
let currentGameId = 1;
let currentColorCount = 0;
let isColorCountFound = false;
let currentColor = undefined;
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
    sumOfPowers += minRed * minGreen * minBlue;

    currentColorCount =
      redCount =
      greenCount =
      blueCount =
      minRed =
      minGreen =
      minBlue =
        0;
    currentColor = undefined;
    isColorCountFound = false;

    currentGameId++;
    gameStartIndex = i + 1;
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
      if (redCount > minRed) {
        minRed = redCount;
      }
      break;
    case "g":
      greenCount += currentColorCount;
      if (greenCount > minGreen) {
        minGreen = greenCount;
      }
      break;
    case "b":
      blueCount += currentColorCount;
      if (blueCount > minBlue) {
        minBlue = blueCount;
      }
      break;
  }
}

console.log(sumOfPowers);
