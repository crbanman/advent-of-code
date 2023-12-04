const input = Bun.file(Bun.argv[2]);
const valueText = await input.text();

let card = 1;
let numberOfCards = 0;
const cardSet = new Set();
const cardCopies = new Map();
let cardTotalWins = 0;
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
        cardTotalWins++;
        const copyWon = cardCopies.get(card + cardTotalWins) ?? 1;
        const currentCardCopies = cardCopies.get(card) ?? 1;
        cardCopies.set(card + cardTotalWins, copyWon + currentCardCopies);
      } else {
        cardSet.add(digits);
      }

      digits = "";

      if (value === "\n") {
        numberOfCards += cardCopies.get(card) ?? 1;
        card++;
        // Skip past card numbers
        i += Math.floor(Math.log10(card) + 1) + 7;
        cardSet.clear();
        cardTotalWins = 0;
        continue;
      }
    }
  } else {
    digits += value;
  }
}
console.log(numberOfCards);
