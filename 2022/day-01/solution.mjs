import fs from "fs";

const input = fs.readFileSync("input.txt", "utf8");
let currentElf = 1;
let elfWithMost = 1;
let elfWithMostTotal = 0;
let total = 0;
input.split("\n").forEach((line) => {
  console.log(currentElf, line, line.length, Number(line));
  if (line.length === 0) {
    console.log(`Elf ${currentElf} as ${total} calories`);
    if (total > elfWithMostTotal) {
      elfWithMost = currentElf;
      elfWithMostTotal = total;
    }
    ++currentElf;
    total = 0;
    return;
  }
  total += Number(line);
});

console.log(
  `Elf ${elfWithMost} has the most calories with a total of ${elfWithMostTotal}`
);
