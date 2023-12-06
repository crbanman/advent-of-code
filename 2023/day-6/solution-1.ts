// There's a fancy math way to do this which is bugging me...
// Oh well, only cal min and max and go from there.

const input = Bun.file(Bun.argv[2]);
const [times, distances] = (await input.text()).split("\n").map((value) =>
  value
    .split(":")[1]
    .split(" ")
    .filter((value) => value !== "")
    .map((value) => Number(value))
);

let margin = 1;
for (let i = 0; i < times.length; i++) {
  const time = times[i];
  const distance = distances[i];

  let max = 0;
  for (let h = 1; h < time; h++) {
    if (h * (time - h) > distance) {
      max = h;
    }
  }

  let min = 0;
  for (let h = time; h > 0; h--) {
    if (h * (time - h) > distance) {
      min = h;
    }
  }

  margin *= max - min + 1;
}

console.log(margin);
