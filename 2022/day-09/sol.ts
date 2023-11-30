const input = Deno.readTextFileSync("input.txt").split(/\n/g)

const getPositionsTailVisited = (numKnots: number) => {
  if (numKnots < 2) {
    return 0
  }
  const knots: {x: number, y:number}[] = []
  for (let i = 0; i < numKnots; ++i) {
    knots.push({x: 0, y: 0})
  }
  
  const tailVisited = new Set(['0,0'])
  
  input.forEach((row) => {
    if (row === '') {
      return;
    }
    const [direction, steps] = row.split(' ');
    for (let i = 0; i < Number(steps); ++i) {
      switch (direction) {
        case 'U':
          knots[0].y++;
          break;
        case 'D':
          knots[0].y--;
          break;
        case 'L':
          knots[0].x--;
          break;
        case 'R':
          knots[0].x++;
          break;
      }
      
      for (let j = 0; j < knots.length - 1; ++j) {
        const xDiff = knots[j].x - knots[j + 1].x
        const yDiff = knots[j].y - knots[j + 1].y
        const moveX = Math.abs(xDiff) > 1;
        const moveY = Math.abs(yDiff) > 1;
        if (moveX || moveY) {
          knots[j + 1].x += Math.sign(xDiff);
        }
        if (moveX || moveY) {
          knots[j + 1].y += Math.sign(yDiff);
        }
      }
      tailVisited.add(`${knots[knots.length - 1].x},${knots[knots.length - 1].y}`)
    }
  })

  return tailVisited.size
}

console.log("Unique positions of t with 2 knots:", getPositionsTailVisited(2))
console.log("Unique positions of t with 10:", getPositionsTailVisited(10))
