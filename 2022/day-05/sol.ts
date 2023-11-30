const input = Deno.readTextFileSync("input.txt");

const stacks9000: Map<number, string[]> = new Map();
const stacks9001: Map<number, string[]> = new Map();
let state: "reading" | "moving" = "reading";
input.split("\n").forEach((row) => {
  if (state == "reading" && row.match(/\s*\d/)) {
    state = "moving";
  }
  if (row == "") {
    return;
  }

  switch (state) {
    case "reading": {
      row.split(/\s{4}|\s/).forEach((crate, index) => {
        const stack = stacks9000.get(index + 1) ?? [];
        if (crate != "") {
          stack.push(crate.charAt(1));
          stacks9000.set(index + 1, stack);
          stacks9001.set(index + 1, [...stack]);
        }
      });

      break;
    }

    case "moving": {
      const instructions = row.match(/move\s(\d+)\sfrom\s(\d+)\sto\s(\d+)/);
      if (instructions == null || instructions.length == 0) {
        return;
      }

      const [_, count, from, to] = instructions.map(Number);
      const fromStack9000 = stacks9000.get(from) as string[];
      const toStack9000 = stacks9000.get(to) as string[];
      const movingItems9000 = fromStack9000.splice(0, count);
      movingItems9000.reverse();
      toStack9000.unshift(...movingItems9000);

      const fromStack9001 = stacks9001.get(from) as string[];
      const toStack9001 = stacks9001.get(to) as string[];
      const movingItems9001 = fromStack9001.splice(0, count);
      toStack9001.unshift(...movingItems9001);

      break;
    }
  }
});

let topOfStacks = "";
for (let i = 0; i < stacks9000.size; ++i) {
  topOfStacks += (stacks9000.get(i + 1) ?? []).shift();
}

console.log("Top of stacks if CrateMover9000:", topOfStacks);

topOfStacks = "";
for (let i = 0; i < stacks9001.size; ++i) {
  topOfStacks += (stacks9001.get(i + 1) ?? []).shift();
}

console.log("Top of stacks if CrateMover9001:", topOfStacks);
