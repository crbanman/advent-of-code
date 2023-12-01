const input = Bun.file(Bun.argv[2]);

const inputTextLines = (await input.text()).split("\n");

let total = 0;
for (const row of inputTextLines) {
  if (row.trim() === "") {
    continue;
  }

  let word = row;
  word = parseSpelledNumberFromString(word, "one", 1);
  word = parseSpelledNumberFromString(word, "two", 2);
  word = parseSpelledNumberFromString(word, "three", 3);
  word = parseSpelledNumberFromString(word, "four", 4);
  word = parseSpelledNumberFromString(word, "five", 5);
  word = parseSpelledNumberFromString(word, "six", 6);
  word = parseSpelledNumberFromString(word, "seven", 7);
  word = parseSpelledNumberFromString(word, "eight", 8);
  word = parseSpelledNumberFromString(word, "nine", 9);

  let first = NaN;
  let last = NaN;
  for (const char of word) {
    const val = Number(char);
    if (isNaN(val)) {
      continue;
    }

    if (isNaN(first)) {
      first = val * 10;
      last = val;
      continue;
    }

    last = val;
  }

  total += first + last;
}

/**
 * Parses all instances of a spelled number from the string and adds
 * the number after the first character of the spelled word.
 *
 * Example: ("onetwoone", "one", 1) => "o1netwoo1ne".
 */
function parseSpelledNumberFromString(
  string: string,
  numberString: string,
  numberValue: number
): string {
  let word = string;
  const index = word.indexOf(numberString);
  if (index >= 0) {
    word =
      word.substring(0, index + 1) +
      numberValue +
      // Recursively parse the rest of the string
      parseSpelledNumberFromString(
        word.substring(index + 1),
        numberString,
        numberValue
      );
  }

  return word;
}

console.log(total);
