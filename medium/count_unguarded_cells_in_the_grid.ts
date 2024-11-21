/*
You are given two integers m and n representing a 0-indexed m x n grid. You are also given two 2D integer arrays guards and walls where guards[i] = [rowi, coli] and walls[j] = [rowj, colj] represent the positions of the ith guard and jth wall respectively.

A guard can see every cell in the four cardinal directions (north, east, south, or west) starting from their position unless obstructed by a wall or another guard. A cell is guarded if there is at least one guard that can see it.

Return the number of unoccupied cells that are not guarded.

 

Example 1:


Input: m = 4, n = 6, guards = [[0,0],[1,1],[2,3]], walls = [[0,1],[2,2],[1,4]]
Output: 7
Explanation: The guarded and unguarded cells are shown in red and green respectively in the above diagram.
There are a total of 7 unguarded cells, so we return 7.
Example 2:


Input: m = 3, n = 3, guards = [[1,1]], walls = [[0,1],[1,0],[2,1],[1,2]]
Output: 4
Explanation: The unguarded cells are shown in green in the above diagram.
There are a total of 4 unguarded cells, so we return 4.
 

Constraints:

1 <= m, n <= 105
2 <= m * n <= 105
1 <= guards.length, walls.length <= 5 * 104
2 <= guards.length + walls.length <= m * n
guards[i].length == walls[j].length == 2
0 <= rowi, rowj < m
0 <= coli, colj < n
All the positions in guards and walls are unique.
*/

function countUnguarded(
  m: number,
  n: number,
  guards: number[][],
  walls: number[][]
): number {
  let map = new Array(m).fill(0).map(() => new Array(n).fill(0));
  markToMap(map, guards, 1);
  markToMap(map, walls, 2);

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] === 1) {
        check(map, i, j);
      }
    }
  }

  let count = 0;
  for (let i = 0; i < map.length; i++) {
    let s: string = "";
    for (let j = 0; j < map[0].length; j++) {
      s += map[i][j] + " ";
      if (map[i][j] === 0) count++;
    }
    console.log(s);
  }

  return count;
}

function check(map: number[][], i: number, j: number) {
  //up
  let up = i - 1;
  while (up > -1 && map[up][j] !== 2 && map[up][j] !== 1) {
    map[up][j] = 3;
    up--;
  }
  //right
  let right = j + 1;
  while (right < map[0].length && map[i][right] !== 2 && map[i][right] !== 1) {
    map[i][right] = 3;
    right++;
  }
  //down
  let down = i + 1;
  while (down < map.length && map[down][j] !== 2 && map[down][j] !== 1) {
    map[down][j] = 3;
    down++;
  }
  //left
  let left = j - 1;
  while (left > -1 && map[i][left] !== 2 && map[i][left] !== 1) {
    map[i][left] = 3;
    left--;
  }
}

function markToMap(map: number[][], a: number[][], value: number) {
  a.forEach((element) => {
    map[element[0]][element[1]] = value;
  });
}

countUnguarded(
  2,
  7,
  [
    [1, 5],
    [1, 1],
    [1, 6],
    [0, 2],
  ],
  [
    [0, 6],
    [0, 3],
    [0, 5],
  ]
);
