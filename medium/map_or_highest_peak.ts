/*
 * You are given an integer matrix isWater of size m x n that represents a map of land and water cells.
 *
 * If isWater[i][j] == 0, cell (i, j) is a land cell.
 * If isWater[i][j] == 1, cell (i, j) is a water cell.
 * You must assign each cell a height in a way that follows these rules:
 *
 * The height of each cell must be non-negative.
 * If the cell is a water cell, its height must be 0.
 * Any two adjacent cells must have an absolute height difference of at most 1. A cell is adjacent to another cell if the former is directly north, east, south, or west of the latter (i.e., their sides are touching).
 * Find an assignment of heights such that the maximum height in the matrix is maximized.
 *
 * Return an integer matrix height of size m x n where height[i][j] is cell (i, j)'s height. If there are multiple solutions, return any of them.
 *
 *
 * Example 1:
 *
 *
 * Input: isWater = [[0,1],[0,0]]
 * Output: [[1,0],[2,1]]
 * Explanation: The image shows the assigned heights of each cell.
 * The blue cell is the water cell, and the green cells are the land cells.
 * Example 2:
 *
 *
 * Input: isWater = [[0,0,1],[1,0,0],[0,0,0]]
 * Output: [[1,1,0],[0,1,1],[1,2,2]]
 * Explanation: A height of 2 is the maximum possible height of any assignment.
 * Any height assignment that has a maximum height of 2 while still meeting the rules will also be accepted.
 *
 * Constraints:
 *
 * m == isWater.length
 * n == isWater[i].length
 * 1 <= m, n <= 1000
 * isWater[i][j] is 0 or 1.
 * There is at least one water cell.
 */

// Direction array for moving north, east, south, and west
// This uses a sliding window technique for less memory usage
const HIGHEST_PEEK_DIRECTIONS: number[] = [0, 1, 0, -1, 0];

function highestPeak(isWater: number[][]): number[][] {
  const m = isWater.length;
  const n = isWater[0].length;

  const heights = Array.from({ length: m }, () => Array(n).fill(-1));
  let queue: [number, number, number][] = [];

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      if (isWater[row][col] === 1) {
        heights[row][col] = 0;
        queue.push([row, col, 0]);
      }
    }
  }

  while (queue.length > 0) {
    const nextQueue: [number, number, number][] = [];
    for (const [currentRow, currentCol, currentHeight] of queue) {
      for (let i = 0; i < 4; i++) {
        const nextRow = currentRow + HIGHEST_PEEK_DIRECTIONS[i];
        const nextCol = currentCol + HIGHEST_PEEK_DIRECTIONS[i + 1];

        if (
          nextRow < 0 ||
          nextRow >= m ||
          nextCol < 0 ||
          nextCol >= n ||
          heights[nextRow][nextCol] !== -1
        ) {
          continue;
        }

        heights[nextRow][nextCol] = currentHeight + 1;
        queue.push([nextRow, nextCol, currentHeight + 1]);
      }
    }
    queue = nextQueue;
  }

  return heights;
}
