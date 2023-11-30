
const input = Deno.readTextFileSync("input.txt");

enum Moves {
  ROCK,
  PAPER,
  SCISSORS
}

enum Outcomes {
  LOSE,
  WIN,
  DRAW,
}

const pointValues = new Map([
  [Moves.ROCK, {value: 1, beats: Moves.SCISSORS, losesTo: Moves.PAPER}],
  [Moves.PAPER, {value: 2, beats: Moves.ROCK, losesTo: Moves.SCISSORS}],
  [Moves.SCISSORS, {value: 3, beats: Moves.PAPER, losesTo: Moves.ROCK}]
])


const outcomeValues = new Map([
  [Outcomes.LOSE, 0],
  [Outcomes.DRAW, 3],
  [Outcomes.WIN, 6],
])

const elfMoves = {
  A: Moves.ROCK,
  B: Moves.PAPER,
  C: Moves.SCISSORS
}

const myMoves = {
  X: Moves.ROCK,
  Y: Moves.PAPER,
  Z: Moves.SCISSORS
}

const expectedOutcomes = {
  X: Outcomes.LOSE,
  Y: Outcomes.DRAW,
  Z: Outcomes.WIN,
}

function scoreResolver(myMove: Moves, elfMove: Moves) {
  if (myMove === elfMove) {
    return outcomeValues.get(Outcomes.DRAW) as number
  }
  if (pointValues.get(myMove)?.beats === elfMove) {
    return outcomeValues.get(Outcomes.WIN) as number
  }
  return outcomeValues.get(Outcomes.LOSE) as number
}

function movePicker(elfMove: Moves, desiredResult: Outcomes) {
  switch (desiredResult) {
    case Outcomes.DRAW:
      return elfMove;
    case Outcomes.WIN:
      return pointValues.get(elfMove)?.losesTo
    case Outcomes.LOSE:
      return pointValues.get(elfMove)?.beats
    default:
      return undefined
  }
}

let scoreIfMove = 0;
let scoreIfResult = 0;

input.split('\n').forEach((row) => {
  const [elfChar, meChar] = row.split(' ') as ['A' | 'B' | 'C', 'X' | 'Y' | 'Z'];
  const myMove = myMoves[meChar];
  const elfMove = elfMoves[elfChar]
  if (myMove == null || elfMove == null) {
    return;
  }
  const moveValue = pointValues.get(myMove)?.value ?? 0;
  const resultValue = scoreResolver(myMove, elfMove);
  scoreIfMove += moveValue;
  scoreIfMove += resultValue;
  const calculatedMove = movePicker(elfMove, expectedOutcomes[meChar])
  if (calculatedMove == null) {
    return
  }
  scoreIfResult += pointValues.get(calculatedMove)?.value ?? 0
  scoreIfResult += scoreResolver(calculatedMove, elfMove)
})

console.log(`Total score if my move: ${scoreIfMove}`)
console.log(`Total score if expected outcome: ${scoreIfResult}`)
