/*
You are given the root of a binary tree with unique values.

In one operation, you can choose any two nodes at the same level and swap their values.

Return the minimum number of operations needed to make the values at each level sorted in a strictly increasing order.

The level of a node is the number of edges along the path between it and the root node.

 

Example 1:


Input: root = [1,4,3,7,6,8,5,null,null,null,null,9,null,10]
Output: 3
Explanation:
- Swap 4 and 3. The 2nd level becomes [3,4].
- Swap 7 and 5. The 3rd level becomes [5,6,8,7].
- Swap 8 and 7. The 3rd level becomes [5,6,7,8].
We used 3 operations so return 3.
It can be proven that 3 is the minimum number of operations needed.
Example 2:


Input: root = [1,3,2,7,6,5,4]
Output: 3
Explanation:
- Swap 3 and 2. The 2nd level becomes [2,3].
- Swap 7 and 4. The 3rd level becomes [4,6,5,7].
- Swap 6 and 5. The 3rd level becomes [4,5,6,7].
We used 3 operations so return 3.
It can be proven that 3 is the minimum number of operations needed.
Example 3:


Input: root = [1,2,3,4,5,6]
Output: 0
Explanation: Each level is already sorted in increasing order so return 0.
 

Constraints:

The number of nodes in the tree is in the range [1, 105].
1 <= Node.val <= 105
All the values of the tree are unique.
*/

//Definition for a binary tree node.
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function minimumOperations(root: TreeNode | null): number {
  if (!root) return 0;

  const queue: TreeNode[] = [root];
  let totalSwaps = 0;

  while (queue.length > 0) {
    const levelSize = queue.length;
    const levelValues: number[] = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      levelValues.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    totalSwaps += calculateMinSwaps(levelValues);
  }

  return totalSwaps;
}

// Helper function
function calculateMinSwaps(arr: number[]): number {
  const n = arr.length;
  const sorted = [...arr]
    .map((val, idx) => [val, idx])
    .sort((a, b) => a[0] - b[0]);
  const visited = new Array(n).fill(false);
  let swaps = 0;

  for (let i = 0; i < n; i++) {
    if (visited[i] || sorted[i][1] === i) continue;

    // Calculate cycle size
    let cycleSize = 0;
    let j = i;
    while (!visited[j]) {
      visited[j] = true;
      j = sorted[j][1];
      cycleSize++;
    }
    swaps += cycleSize - 1;
  }

  return swaps;
}
