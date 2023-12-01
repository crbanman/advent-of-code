const input = Bun.file(Bun.argv[2]);

const inputText = await input.text();

let total = 0;
let first = NaN;
let last = NaN;
for (const char of inputText) {
  if (char === "\n" && first && last) {
    total += first + last;
    first = NaN;
    last = NaN;
    continue;
  }

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

console.log(total);
