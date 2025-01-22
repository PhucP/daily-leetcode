/*
 * Given an m x n grid. Each cell of the grid has a sign pointing to the next cell you should visit if you are currently in this cell. The sign of grid[i][j] can be:
 *
 * 1 which means go to the cell to the right. (i.e go from grid[i][j] to grid[i][j + 1])
 * 2 which means go to the cell to the left. (i.e go from grid[i][j] to grid[i][j - 1])
 * 3 which means go to the lower cell. (i.e go from grid[i][j] to grid[i + 1][j])
 * 4 which means go to the upper cell. (i.e go from grid[i][j] to grid[i - 1][j])
 * Notice that there could be some signs on the cells of the grid that point outside the grid.
 *
 * You will initially start at the upper left cell (0, 0). A valid path in the grid is a path that starts from the upper left cell (0, 0) and ends at the bottom-right cell (m - 1, n - 1) following the signs on the grid. The valid path does not have to be the shortest.
 *
 * You can modify the sign on a cell with cost = 1. You can modify the sign on a cell one time only.
 *
 * Return the minimum cost to make the grid have at least one valid path.
 *
 *
 *
 * Example 1:
 *
 *
 * Input: grid = [[1,1,1,1],[2,2,2,2],[1,1,1,1],[2,2,2,2]]
 * Output: 3
 * Explanation: You will start at point (0, 0).
 * The path to (3, 3) is as follows. (0, 0) --> (0, 1) --> (0, 2) --> (0, 3) change the arrow to down with cost = 1 --> (1, 3) --> (1, 2) --> (1, 1) --> (1, 0) change the arrow to down with cost = 1 --> (2, 0) --> (2, 1) --> (2, 2) --> (2, 3) change the arrow to down with cost = 1 --> (3, 3)
 * The total cost = 3.
 * Example 2:
 *
 *
 * Input: grid = [[1,1,3],[3,2,2],[1,1,4]]
 * Output: 0
 * Explanation: You can follow the path from (0, 0) to (2, 2).
 * Example 3:
 *
 *
 * Input: grid = [[1,2],[4,3]]
 * Output: 1
 *
 *
 * Constraints:
 *
 * m == grid.length
 * n == grid[i].length
 * 1 <= m, n <= 100
 * 1 <= grid[i][j] <= 4
 */

const enum Direction {
  Right = 1,
  Left,
  Down,
  Up,
}

interface Path {
  finishX: number;
  finishY: number;
  cost: number;
}

function minCost(grid: number[][]): number {
  const [n, m] = [grid.length, grid[0].length];

  const queue: Path[] = [{ finishX: 0, finishY: 0, cost: 0 }];
  const processedVertexIds: Set<string> = new Set();
  const targetVertexId = getVertexId(n - 1, m - 1);

  while (queue.length > 0) {
    const currentPath = queue.pop();
    const { finishX: x, finishY: y, cost: cost } = currentPath;
    const currentVertexId = getVertexId(x, y);

    if (currentVertexId === targetVertexId) {
      return currentPath.cost;
    }

    if (processedVertexIds.has(currentVertexId)) {
      continue;
    }

    if (x < n - 1) {
      if (grid[x][y] === Direction.Down)
        queue.push({ finishX: x + 1, finishY: y, cost: cost });
      else queue.unshift({ finishX: x + 1, finishY: y, cost: cost + 1 });
    }
    if (x > 0) {
      if (grid[x][y] === Direction.Up)
        queue.push({ finishX: x - 1, finishY: y, cost: cost });
      else queue.unshift({ finishX: x - 1, finishY: y, cost: cost + 1 });
    }
    if (y < m - 1) {
      if (grid[x][y] === Direction.Right)
        queue.push({ finishX: x, finishY: y + 1, cost: cost });
      else queue.unshift({ finishX: x, finishY: y + 1, cost: cost + 1 });
    }
    if (y > 0) {
      if (grid[x][y] === Direction.Left)
        queue.push({ finishX: x, finishY: y - 1, cost: cost });
      else queue.unshift({ finishX: x, finishY: y - 1, cost: cost + 1 });
    }

    processedVertexIds.add(currentVertexId);
  }
}

function getVertexId(x: number, y: number): string {
  return `${x}_${y}`;
}
