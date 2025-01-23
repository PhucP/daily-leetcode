/*
 * You are given a map of a server center, represented as a m * n integer matrix grid, where 1 means that on that cell there is a server and 0 means that it is no server. Two servers are said to communicate if they are on the same row or on the same column.
 *
 * Return the number of servers that communicate with any other server.
 *
 *
 *
 * Example 1:
 *
 *
 * Input: grid = [[1,0],[0,1]]
 * Output: 0
 * Explanation: No servers can communicate with others.
 * Example 2:
 *
 *
 * Input: grid = [[1,0],[1,1]]
 * Output: 3
 * Explanation: All three servers can communicate with at least one other server.
 * Example 3:
 *
 *
 * Input: grid = [[1,1,0,0],[0,0,1,0],[0,0,1,0],[0,0,0,1]]
 * Output: 4
 * Explanation: The two servers in the first row can communicate with each other. The two servers in the third column can communicate with each other. The server at right bottom corner can't communicate with any other server.
 *
 *
 * Constraints:
 *
 * m == grid.length
 * n == grid[i].length
 * 1 <= m <= 250
 * 1 <= n <= 250
 * grid[i][j] == 0 or 1
 */
function countServers(grid: number[][]): number {
  const countRow: number[] = Array<number>(grid.length).fill(0);
  const countColumn: number[] = Array<number>(grid[0].length).fill(0);

  let countServer = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 1) {
        countServer++;
        countRow[i]++;
        countColumn[j]++;
      }
    }
  }

  let countDisconnected = 0;
  for (let i = 0; i < countRow.length; i++) {
    if (countRow[i] === 1) {
      for (let j = 0; j < countColumn.length; j++) {
        if (grid[i][j] === 1 && countColumn[j] === 1) {
          countDisconnected++;
          break;
        }
      }
    }
  }

  return countServer - countDisconnected;
}
