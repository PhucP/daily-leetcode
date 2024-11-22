/*
You are given an m x n binary matrix matrix.

You can choose any number of columns in the matrix and flip every cell in that column (i.e., Change the value of the cell from 0 to 1 or vice versa).

Return the maximum number of rows that have all values equal after some number of flips.

 

Example 1:

Input: matrix = [[0,1],[1,1]]
Output: 1
Explanation: After flipping no values, 1 row has all values equal.
Example 2:

Input: matrix = [[0,1],[1,0]]
Output: 2
Explanation: After flipping values in the first column, both rows have equal values.
Example 3:

Input: matrix = [[0,0,0],[0,0,1],[1,1,0]]
Output: 2
Explanation: After flipping values in the first two columns, the last two rows have equal values.
 

Constraints:

m == matrix.length
n == matrix[i].length
1 <= m, n <= 300
matrix[i][j] is either 0 or 1.
*/

function maxEqualRowsAfterFlips(matrix: number[][]): number {
  let result = 1;
  let map = new Map<string, number>();
  map = createRowMatrix(matrix, map);
  map.forEach((val, key) => {
    result = Math.max(result, val);
  });

  return result;
}

function createRowMatrix(
  matrix: number[][],
  map: Map<string, number>
): Map<string, number> {
  for (let i = 0; i < matrix.length; i++) {
    let key = "";
    let reveseKey = "";
    for (let j = 0; j < matrix[0].length; j++) {
      key += matrix[i][j];
      if (matrix[i][j] === 0) reveseKey += "1";
      else reveseKey += "0";
    }
    if (map.has(key)) {
      map.set(key, (map.get(key) || 0) + 1);
    } else {
      if (map.has(reveseKey)) {
        map.set(reveseKey, (map.get(reveseKey) || 0) + 1);
      } else map.set(key, 1);
    }
  }
  return map;
}

maxEqualRowsAfterFlips([
  [0, 1],
  [1, 0],
]);
