/*
 * You are given a 0-indexed integer array arr, and an m x n integer matrix mat. arr and mat both contain all the integers in the range [1, m * n].
 *
 * Go through each index i in arr starting from index 0 and paint the cell in mat containing the integer arr[i].
 *
 * Return the smallest index i at which either a row or a column will be completely painted in mat.
 *
 *
 * Example 1:
 *
 * image explanation for example 1
 * Input: arr = [1,3,4,2], mat = [[1,4],[2,3]]
 * Output: 2
 * Explanation: The moves are shown in order, and both the first row and second column of the matrix become fully painted at arr[2].
 * Example 2:
 *
 * image explanation for example 2
 * Input: arr = [2,8,7,4,1,3,5,6,9], mat = [[3,2,5],[1,4,6],[8,7,9]]
 * Output: 3
 * Explanation: The second column becomes fully painted at arr[3].
 *
 * Constraints:
 *
 * m == mat.length
 * n = mat[i].length
 * arr.length == m * n
 * 1 <= m, n <= 105
 * 1 <= m * n <= 105
 * 1 <= arr[i], mat[r][c] <= m * n
 * All the integers of arr are unique.
 * All the integers of mat are unique.
 *
 */

function firstCompleteIndex(arr: number[], mat: number[][]): number {
  const n = mat.length; // Number of rows
  const m = mat[0].length; // Number of columns

  // Arrays to map each number in the matrix to its row and column indices
  const numberToRow: number[] = new Array(n * m);
  const numberToCol: number[] = new Array(n * m);

  // Preprocess the matrix to create a direct mapping of numbers to their row and column
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < m; col++) {
      const value = mat[row][col];
      numberToRow[value] = row;
      numberToCol[value] = col;
    }
  }

  // Arrays to track how many elements have been filled in each row and column
  const rowCounts: number[] = new Array(n).fill(0);
  const colCounts: number[] = new Array(m).fill(0);

  // Process the `arr` to find the first completed row or column
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    const row = numberToRow[current];
    const col = numberToCol[current];

    // Update row and column counts
    rowCounts[row]++;
    colCounts[col]++;

    // Check if the current row or column is completed, we will return the index if it is
    if (rowCounts[row] === m || colCounts[col] === n) {
      return i;
    }
  }

  // Return -1 if no row or column is completed
  return -1;
}
