import fs from "fs";

const input = fs.readFileSync("input.txt", "utf8");
let currentElf = 1;
let total = 0;
const top3 = new Map();
top3.set(1, { elf: 0, total: 0 });
top3.set(2, { elf: 0, total: 0 });
top3.set(3, { elf: 0, total: 0 });
input.split("\n").forEach((line) => {
  if (line.length === 0) {
    console.log(`Elf ${currentElf} as ${total} calories`);
    [...top3].some(([key, elf]) => {
      if (total > elf.total) {
        if (key < 3) {
          top3.set(3, top3.get(2));
        }
        if (key < 2) {
          top3.set(2, top3.get(1));
        }
        top3.set(key, { elf: currentElf, total });
        return true;
      }
    });
    ++currentElf;
    total = 0;
    return;
  }
  total += Number(line);
});

console.log(top3);

let top3Total = 0;
top3.forEach((elf) => {
  top3Total += elf.total;
});

console.log(
  `The top 3 elves have a total of calories with a total of ${top3Total} calories`
);
