const input = Deno.readTextFileSync("input.txt").split(/\n/g).map((val) =>
  val.split(" ")
);

let cycles = 1;
let register = 1;
const interestingSignals: number[] = [];
let interestingSignalsSum = 0;
const width = 40;
const crt: string[] = [];

const checkStrength = () => {
  if (cycles === 20 || (cycles - 20) % 40 === 0) {
    interestingSignals.push(register * cycles);
    interestingSignalsSum += register * cycles;
  }
};

const render = () => {
  const pixel = (cycles - 1) % 40;
  crt.push((pixel >= (register - 1) && pixel <= (register + 1)) ? "#" : ".");
};

input.forEach(([op, param]) => {
  if (op === "") {
    return;
  }
  render();
  ++cycles;
  checkStrength();
  if (op === "noop") {
    return;
  }
  render();
  ++cycles;
  register += Number(param);
  checkStrength();
});

let crtOutput = "";
crt.forEach((val, index) => {
  crtOutput += index % width === 0 ? `\n${val}` : val;
});

console.log("Sum of interesting signal strengths:", interestingSignalsSum);
console.log(crtOutput);
