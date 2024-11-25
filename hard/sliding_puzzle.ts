/*
On an 2 x 3 board, there are five tiles labeled from 1 to 5, and an empty square represented by 0. A move consists of choosing 0 and a 4-directionally adjacent number and swapping it.

The state of the board is solved if and only if the board is [[1,2,3],[4,5,0]].

Given the puzzle board board, return the least number of moves required so that the state of the board is solved. If it is impossible for the state of the board to be solved, return -1.

 

Example 1:


Input: board = [[1,2,3],[4,0,5]]
Output: 1
Explanation: Swap the 0 and the 5 in one move.
Example 2:


Input: board = [[1,2,3],[5,4,0]]
Output: -1
Explanation: No number of moves will make the board solved.
Example 3:


Input: board = [[4,1,2],[5,0,3]]
Output: 5
Explanation: 5 is the smallest number of moves that solves the board.
An example path:
After move 0: [[4,1,2],[5,0,3]]
After move 1: [[4,1,2],[0,5,3]]
After move 2: [[0,1,2],[4,5,3]]
After move 3: [[1,0,2],[4,5,3]]
After move 4: [[1,2,0],[4,5,3]]
After move 5: [[1,2,3],[4,5,0]]
 

Constraints:

board.length == 2
board[i].length == 3
0 <= board[i][j] <= 5
Each value board[i][j] is unique.
*/


function slidingPuzzle(board: number[][]): number {
  const target = "123450"; // Trạng thái đích
  const rows = 2, cols = 3; // Kích thước bảng

  // Chuyển trạng thái từ bảng 2D sang chuỗi
  const boardToString = (board: number[][]): string =>
      board.flat().join("");

  // Chuyển trạng thái từ chuỗi sang bảng 2D
  const stringToBoard = (state: string): number[][] => {
      const arr = state.split("").map(Number);
      return [arr.slice(0, 3), arr.slice(3)];
  };

  // Các hướng di chuyển [dx, dy]
  const directions = [
      [-1, 0], // lên
      [1, 0],  // xuống
      [0, -1], // trái
      [0, 1],  // phải
  ];

  // BFS
  const startState = boardToString(board);
  const queue: [string, number][] = [[startState, 0]]; // [trạng thái, số bước]
  const visited = new Set<string>();
  visited.add(startState);

  while (queue.length > 0) {
      const [currentState, steps] = queue.shift()!;
      
      if (currentState === target) return steps;

      const zeroIndex = currentState.indexOf("0"); // Vị trí của số 0
      const x = Math.floor(zeroIndex / cols); // Hàng của 0
      const y = zeroIndex % cols; // Cột của 0

      for (const [dx, dy] of directions) {
          const newX = x + dx;
          const newY = y + dy;

          if (newX >= 0 && newX < rows && newY >= 0 && newY < cols) {
              const newIndex = newX * cols + newY;
              const newStateArray = currentState.split("");
              // Hoán đổi 0 với ô mới
              [newStateArray[zeroIndex], newStateArray[newIndex]] =
                  [newStateArray[newIndex], newStateArray[zeroIndex]];
              const newState = newStateArray.join("");

              if (!visited.has(newState)) {
                  visited.add(newState);
                  queue.push([newState, steps + 1]);
              }
          }
      }
  }

  return -1; // Không tìm được trạng thái đích
}

