const input = Deno.readTextFileSync("input.txt");

let sum1 = 0;
let sum2 = 0;
let count = 0;
const group: Map<string, number> = new Map();
const resolveValue = (code: number) => code <= 90 ? code - 65 + 27 : code - 96;
input.split('\n').forEach((row) => {
  if (row.length === 0) {
    return;
  }

  const compSize = row.length/2;
  const first = row.substring(0, compSize);
  const second = row.substring(compSize, row.length)
  dance:
  for (let i = 0; i < first.length; ++i) {
    for(let j = 0; j < second.length; ++j) {
      if (first[i] === second[j]) {
        sum1 += resolveValue(first[i].charCodeAt(0));
        break dance;
      }
    }
  }

  ++count;
  const uniqueValues: Map<string, 1> = new Map();
  for (let i = 0; i < row.length; ++i) {
    if (!uniqueValues.get(row[i])) {
      uniqueValues.set(row[i], 1)
      group.set(row[i], (group.get(row[i]) ?? 0) + 1 )
    }
  }
  if (count % 3 === 0) {
    const it = group.entries()
    for (const [char,count] of it) {
      if (count === 3) {
        sum2 += resolveValue(char.charCodeAt(0))
        break;
      }
    }
    count = 0;
    group.clear();
  }
})
console.log('The sum of priorities is:', sum1)
console.log('The sum of group badge priorities is:', sum2)