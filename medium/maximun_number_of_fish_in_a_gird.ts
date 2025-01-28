/*
 * You are given a 0-indexed 2D matrix grid of size m x n, where (r, c) represents:
 *
 * A land cell if grid[r][c] = 0, or
 * A water cell containing grid[r][c] fish, if grid[r][c] > 0.
 * A fisher can start at any water cell (r, c) and can do the following operations any number of times:
 *
 * Catch all the fish at cell (r, c), or
 * Move to any adjacent water cell.
 * Return the maximum number of fish the fisher can catch if he chooses his starting cell optimally, or 0 if no water cell exists.
 *
 * An adjacent cell of the cell (r, c), is one of the cells (r, c + 1), (r, c - 1), (r + 1, c) or (r - 1, c) if it exists.
 *
 *
 * Example 1:
 *
 *
 * Input: grid = [[0,2,1,0],[4,0,0,3],[1,0,0,4],[0,3,2,0]]
 * Output: 7
 * Explanation: The fisher can start at cell (1,3) and collect 3 fish, then move to cell (2,3) and collect 4 fish.
 * Example 2:
 *
 *
 * Input: grid = [[1,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,1]]
 * Output: 1
 * Explanation: The fisher can start at cells (0,0) or (3,3) and collect a single fish.
 *
 *
 * Constraints:
 *
 * m == grid.length
 * n == grid[i].length
 * 1 <= m, n <= 10
 * 0 <= grid[i][j] <= 10
 * */

function findMaxFish(grid: number[][]): number {
  const isVisited = Array.from({ length: grid.length }, () =>
    Array.from({ length: grid[0].length }, () => false)
  );
  let result = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] > 0 && !isVisited[i][j]) {
        result = Math.max(result, findFishAround(grid, isVisited, { i, j }));
      }
    }
  }

  return result;
}

function findFishAround(
  grid: number[][],
  isVisited: boolean[][],
  startPos: { i: number; j: number }
): number {
  console.log("-----------------------");
  let stack: [{ i: number; j: number }] = [startPos];
  isVisited[startPos.i][startPos.j] = true;
  let countFish = 0;
  while (stack.length > 0) {
    console.log(stack);
    let currentNode = stack.pop() ?? { i: 0, j: 0 };
    countFish += grid[currentNode.i][currentNode.j];
    //console.log(`${currentNode.i} _ ${currentNode.j}`)
    if (
      currentNode.i < grid.length - 1 &&
      grid[currentNode.i + 1][currentNode.j] > 0 &&
      !isVisited[currentNode.i + 1][currentNode.j]
    ) {
      isVisited[currentNode.i + 1][currentNode.j] = true;
      stack.push({ i: currentNode.i + 1, j: currentNode.j });
    }

    if (
      currentNode.i > 0 &&
      grid[currentNode.i - 1][currentNode.j] > 0 &&
      !isVisited[currentNode.i - 1][currentNode.j]
    ) {
      isVisited[currentNode.i - 1][currentNode.j] = true;
      stack.push({ i: currentNode.i - 1, j: currentNode.j });
    }

    if (
      currentNode.j < grid[0].length - 1 &&
      grid[currentNode.i][currentNode.j + 1] > 0 &&
      !isVisited[currentNode.i][currentNode.j + 1]
    ) {
      isVisited[currentNode.i][currentNode.j + 1] = true;
      stack.push({ i: currentNode.i, j: currentNode.j + 1 });
    }

    if (
      currentNode.j > 0 &&
      grid[currentNode.i][currentNode.j - 1] > 0 &&
      !isVisited[currentNode.i][currentNode.j - 1]
    ) {
      isVisited[currentNode.i][currentNode.j - 1] = true;
      stack.push({ i: currentNode.i, j: currentNode.j - 1 });
    }
  }
  return countFish;
}
