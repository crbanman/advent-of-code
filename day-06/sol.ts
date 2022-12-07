const input = Deno.readTextFileSync("input.txt");

const bufferSize = Number(prompt("What is the buffer size?", "4"));

let buffer = new Map();

[...input].some((char, index) => {
  // buffer.set(char, 1);
  if (buffer.get(char) != null) {
    const bufferValues = [...buffer];
    bufferValues.some(([key, _], index) => {
      if (key === char) {
        buffer = new Map([
          ...bufferValues.splice(index + 1, bufferValues.length - 1),
          [key, 1],
        ]);
      }
    });
    return false;
  }
  buffer.set(char, 1);
  if (buffer.size === bufferSize) {
    console.log("First marker is at:", index + 1);
    return true;
  }

  return false;
});
