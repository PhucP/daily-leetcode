/*
You are given an m x n matrix of characters box representing a side-view of a box. Each cell of the box is one of the following:

A stone '#'
A stationary obstacle '*'
Empty '.'
The box is rotated 90 degrees clockwise, causing some of the stones to fall due to gravity. Each stone falls down until it lands on an obstacle, another stone, or the bottom of the box. Gravity does not affect the obstacles' positions, and the inertia from the box's rotation does not affect the stones' horizontal positions.

It is guaranteed that each stone in box rests on an obstacle, another stone, or the bottom of the box.

Return an n x m matrix representing the box after the rotation described above.

 

Example 1:



Input: box = [["#",".","#"]]
Output: [["."],
         ["#"],
         ["#"]]
Example 2:



Input: box = [["#",".","*","."],
              ["#","#","*","."]]
Output: [["#","."],
         ["#","#"],
         ["*","*"],
         [".","."]]
Example 3:



Input: box = [["#","#","*",".","*","."],
              ["#","#","#","*",".","."],
              ["#","#","#",".","#","."]]
Output: [[".","#","#"],
         [".","#","#"],
         ["#","#","*"],
         ["#","*","."],
         ["#",".","*"],
         ["#",".","."]]
 

Constraints:

m == box.length
n == box[i].length
1 <= m, n <= 500
box[i][j] is either '#', '*', or '.'.
*/

function rotateTheBox(box: string[][]): string[][] {
  let bottom: number;
  let result: string[][] = new Array(box[0].length)
    .fill(".")
    .map(() => new Array(box.length).fill("."));
  for (let i = 0; i < box.length; i++) {
    for (let j = box[0].length - 1; j > -1; j--) {
      if (box[i][j] === "#") {
        bottom = findNewPos(box, j + 1, i);
        box[i][j] = ".";
        box[i][bottom] = "#";
      }
    }
  }

  //   console.log(box);
  return copyToResult(box, result);
}

function copyToResult(box: string[][], result: string[][]) {
  for (let i = 0; i < box.length; i++) {
    for (let j = 0; j < box[0].length; j++) {
      result[j][box.length - 1 - i] = box[i][j];
    }
  }
  //   console.log(result);
  return result;
}

function findNewPos(box: string[][], bottom: number, i: number): number {
  while (
    bottom < box[0].length &&
    box[i][bottom] !== "*" &&
    box[i][bottom] !== "#"
  ) {
    bottom++;
  }
  return --bottom;
}

rotateTheBox([
  ["#", ".", "*", "."],
  ["#", "#", "*", "."],
]);
