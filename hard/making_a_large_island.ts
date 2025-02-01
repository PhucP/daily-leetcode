/*
 * You are given an n x n binary matrix grid. You are allowed to change at most one 0 to be 1.
 *
 * Return the size of the largest island in grid after applying this operation.
 *
 * An island is a 4-directionally connected group of 1s.
 *
 *
 * Example 1:
 *
 * Input: grid = [[1,0],[0,1]]
 * Output: 3
 * Explanation: Change one 0 to 1 and connect two 1s, then we get an island with area = 3.
 * Example 2:
 *
 * Input: grid = [[1,1],[1,0]]
 * Output: 4
 * Explanation: Change the 0 to 1 and make the island bigger, only one island with area = 4.
 * Example 3:
 *
 * Input: grid = [[1,1],[1,1]]
 * Output: 4
 * Explanation: Can't change any 0 to 1, only one island with area = 4.
 *
 * Constraints:
 *
 * n == grid.length
 * n == grid[i].length
 * 1 <= n <= 500
 * grid[i][j] is either 0 or 1.
 */
function largestIsland(grid: number[][]): number {
  const n = grid.length;

  // Given row and col, returns all neighbors
  const getNeighbors = (row: number, col: number): [number, number][] => {
    const arr: [number, number][] = [];
    if (row > 0) arr.push([row - 1, col]);
    if (row < n - 1) arr.push([row + 1, col]);
    if (col > 0) arr.push([row, col - 1]);
    if (col < n - 1) arr.push([row, col + 1]);
    return arr;
  };

  // Sets grid[i][j] and all surrounding 1s to groupIndex,
  // and returns area of this island
  const dfs = (i: number, j: number, groupIndex: number) => {
    let maxArea = 1;
    grid[i][j] = groupIndex;
    const neighbors = getNeighbors(i, j);
    for (const [row, col] of neighbors) {
      if (grid[row][col] === 1) {
        grid[row][col] = groupIndex;
        maxArea += dfs(row, col, groupIndex);
      }
    }
    return maxArea;
  };

  // Maps group index to area (groupIndex, groupArea)
  const groupMap = new Map<number, number>();
  // Group index. Start at 2 because 1 is taken
  let groupIndex = 2;

  // Find all groups and their areas, populating (group, area) map
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 1) {
        groupMap.set(groupIndex, dfs(i, j, groupIndex));
        groupIndex++;
      }
    }
  }

  // Max area must be at least as large as the largest group
  // (If grid has no 0s, then maxArea = area of largest group)
  let maxArea = 0;
  for (const [groupIndex, area] of groupMap) {
    maxArea = Math.max(maxArea, area);
  }

  // Find all 0s and the areas that would result from turning them to 1s
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 0) {
        // Keep track of groupIndexes encountered here
        const groupIndexes = new Set<number>();
        const neighbors = getNeighbors(i, j);
        for (const [row, col] of neighbors) {
          if (grid[row][col] > 1) {
            groupIndexes.add(grid[row][col]);
          }
        }
        let localMaxArea = 1; // init to 1 since flipping 0 to 1
        // Sum all areas of the groupIndexes surrounding i, j
        for (const groupIndex of groupIndexes) {
          localMaxArea += groupMap.get(groupIndex)!;
        }
        maxArea = Math.max(maxArea, localMaxArea);
      }
    }
  }

  return maxArea;
}
