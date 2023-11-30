const input = Deno.readTextFileSync("test.txt");

const pairs = input.split('\n')

let containedPairs = 0;
let overlappingPairs = 0;
pairs.forEach((pair) => {
  const [a1, a2, b1, b2] = pair.split(/-|,/).map((val) => Number(val))

  if (a1 >= b1 && a2 <= b2 || 
      b1 >= a1 && b2 <= a2) {
    ++containedPairs
  }

  if (a1 <= b2 && a2 >= b1) {
    ++overlappingPairs
  }
})

console.log('Contained pairs:', containedPairs)
console.log('Overlapping pairs:', overlappingPairs)
