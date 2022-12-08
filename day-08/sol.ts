const input = Deno.readTextFileSync("input.txt");

const grid = [...input.matchAll(/\d/g)].map(Number);
const rows = input.split("\n");
const width = rows[0].length;
const height = grid.length / width;

const posToIndex = (x: number, y: number) => x + y * width;
const indexToPos = (
  index: number,
) => [index % width, Math.floor(index / width)];
const process = (index: number) => {
  const value = grid[index];
  const [treeX, treeY] = indexToPos(index);

  if (
    treeX === 0 || treeX === width - 1 || treeY === 0 || treeY === height - 1
  ) {
    return {
      isVisible: true,
      scenicScore: 0,
    };
  }

  // Look left
  let isVisibleLeft = true;
  let leftScore = 0;
  for (let leftIndex = index - 1; leftIndex >= index - treeX; --leftIndex) {
    ++leftScore;
    if (grid[leftIndex] >= value) {
      isVisibleLeft = false;
      break;
    }
  }

  // Look right
  let isVisibleRight = true;
  let rightScore = 0;
  for (let i = index + 1; i < index + width - treeX; ++i) {
    ++rightScore;
    if (grid[i] >= value) {
      isVisibleRight = false;
      break;
    }
  }

  // Look Up
  let isVisibleTop = true;
  let upScore = 0;
  for (let y = treeY - 1; y >= 0; --y) {
    ++upScore;
    if (grid[posToIndex(treeX, y)] >= value) {
      isVisibleTop = false;
      break;
    }
  }

  // Look Down
  let isVisibleBottom = true;
  let downScore = 0;
  for (let y = treeY + 1; y < height; ++y) {
    ++downScore;
    if (grid[posToIndex(treeX, y)] >= value) {
      isVisibleBottom = false;
      break;
    }
  }

  return {
    isVisible: isVisibleLeft || isVisibleRight || isVisibleTop ||
      isVisibleBottom,
    scenicScore: leftScore * rightScore * upScore * downScore,
  };
};

let totalTrees = 0;
let topScenicScore = 0;
grid.forEach((_, index) => {
  const { isVisible, scenicScore } = process(index);
  if (isVisible) {
    ++totalTrees;
  }
  if (scenicScore > topScenicScore) {
    topScenicScore = scenicScore;
  }
});

console.log("Total visible trees:", totalTrees);
console.log("Top scenic score is:", topScenicScore);
