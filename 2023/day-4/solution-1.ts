const input = Bun.file(Bun.argv[2]);
const valueText = await input.text();

let card = 1;
let total = 0;
const cardSet = new Set();
let cardTotal = 0;
let digits = "";
for (let i = 8; i < valueText.length; i++) {
  const value = valueText[i];

  if (value === "|") {
    continue;
  }

  if (value === " " || value === "\n") {
    if (digits === "") {
      continue;
    } else {
      if (cardSet.has(digits)) {
        cardTotal = cardTotal === 0 ? 1 : cardTotal * 2;
      } else {
        cardSet.add(digits);
      }

      digits = "";

      if (value === "\n") {
        total += cardTotal;
        card++;
        // Skip past card numbers
        i += Math.floor(Math.log10(card) + 1) + 7;
        cardSet.clear();
        cardTotal = 0;
        continue;
      }
    }
  } else {
    digits += value;
  }
}
console.log(total);
