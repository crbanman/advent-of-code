const input = Bun.file(Bun.argv[2]);
const valueGrid = (await input.text()).split("\n");

main();

function main() {
  const width = valueGrid[0].length;
  const height = valueGrid.length;

  let sumOfPartIds = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const value = valueGrid[y][x];
      if (value === "." || isNumber(value)) {
        continue;
      }

      sumOfPartIds +=
        scanRow(x, valueGrid[y - 1]) + // top
        scanRow(x, valueGrid[y]) + // middle
        scanRow(x, valueGrid[y + 1]); // bottom
    }
  }

  console.log(sumOfPartIds);
}

function isNumber(char: string) {
  if (char.length === 0) {
    return false;
  }
  const charCode = char.charCodeAt(0);
  return charCode >= "0".charCodeAt(0) && charCode <= "9".charCodeAt(0);
}

function scanRow(startingPos: number, row: string): number {
  let left = row[startingPos - 1];
  let middle = row[startingPos];
  let right = row[startingPos + 1];

  if (isNumber(left)) {
    left = scanLeft(startingPos - 1, row) + left;
  } else {
    left = "";
  }

  if (isNumber(middle)) {
    const rightScan = scanRight(startingPos, row);
    if (rightScan !== "") {
      right = ""; // prevent right from being scanned below as it's part of middle
    }
    middle += rightScan;

    if (left !== "") {
      // middle is part of left
      left += middle;
      middle = "";
    }
  } else {
    middle = "";
  }

  if (isNumber(right)) {
    right += scanRight(startingPos + 1, row);
  } else {
    right = "";
  }

  return Number(left) + Number(middle) + Number(right);
}

function scanLeft(startingPos: number, row: string): string {
  let value = "";
  for (let i = startingPos - 1; i >= 0; i--) {
    const leftValue = row[i];
    if (!isNumber(leftValue)) {
      break;
    }
    value = leftValue + value;
  }

  return value;
}

function scanRight(startingPos: number, row: string) {
  let value = "";
  for (let i = startingPos + 1; i < row.length; i++) {
    const rightValue = row[i];
    if (!isNumber(rightValue)) {
      break;
    }
    value += rightValue;
  }

  return value;
}
