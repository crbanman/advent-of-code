// There's a fancy math way to do this which is bugging me...
// Oh well, only cal min and max and go from there.

const input = Bun.file(Bun.argv[2]);
const [time, distance] = (await input.text())
  .split("\n")
  .map((value) => Number(value.split(":")[1].replaceAll(" ", "")));

let margin = 1;

let max = 0;
for (let h = 1; h < time; h++) {
  if (h * (time - h) > distance) {
    max = h;
    break;
  }
}

let min = 0;
for (let h = time; h > 0; h--) {
  if (h * (time - h) > distance) {
    min = h;
    break;
  }
}

margin *= min - max + 1;

console.log(margin);
