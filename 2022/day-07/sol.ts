const input = Deno.readTextFileSync("input.txt").split("\n");

let buffer = [""];
const dirSizes: Map<string, number> = new Map();

const cd = (value: string) => {
  switch (value) {
    case "/":
      buffer = [""];
      break;
    case "..":
      buffer.pop();
      break;
    default:
      buffer.push(value);
  }
};

const updateDireSizes = (fileSize: number) => {
  buffer.forEach((_dir, index) => {
    const path = index === 0 ? '/' : [...buffer].splice(0, index+1).join('/')
    dirSizes.set(path, (dirSizes.get(path) ?? 0) + fileSize);
  });
};

input.forEach((value) => {
  if (value.length === 0) {
    return;
  }
  const [a, b, c] = value.split(" ");
  if (a === '$') {
    if (b === "ls") {
      return;
    }
    if (b === "cd") {
      cd(c);
      return;
    }
    return;
  }

  if (a !== "dir") {
    updateDireSizes(Number(a));
    return;
  }
});

const sumOfDirsUnder100k = [...dirSizes].reduce((accumulator, [_dir, value]) => value < 100000 ? accumulator + value : accumulator
, 0)

console.log('The sum of dirs under 100,000:', sumOfDirsUnder100k);

const totalUsedSpace = dirSizes.get('/') ?? 0;
const maxSpace = 70000000;
const spaceRequired = 30000000;
const spaceToFree = totalUsedSpace + spaceRequired - maxSpace

let smallest = '/'
let smallestSize = totalUsedSpace;
[...dirSizes].some(([dir, size]) => {
  if (size < spaceToFree || size > smallestSize) {
    return
  }
  smallest = dir;
  smallestSize = size;
  if (size === spaceRequired) {
    return true;
  }
})

console.log(`The smallest dir to remove to free up`, spaceToFree, 'is', smallest, 'at', smallestSize)