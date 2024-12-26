/*
Given the root of a binary tree, return an array of the largest value in each row of the tree (0-indexed).

 

Example 1:


Input: root = [1,3,2,5,3,null,9]
Output: [1,3,9]
Example 2:

Input: root = [1,2,3]
Output: [1,3]
 

Constraints:

The number of nodes in the tree will be in the range [0, 104].
-231 <= Node.val <= 231 - 1
*/

// Definition for a binary tree node.
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

function largestValues(root: TreeNode | null): number[] {
  const result: number[] = [];
  if (!root) {
    return [];
  }

  const getRowValue = (row: number, tree: TreeNode): void => {
    const value = tree.val;
    const max = result[row] ?? -Infinity;
    result[row] = Math.max(max, value);

    if (tree.left) {
      getRowValue(row + 1, tree.left);
    }
    if (tree.right) {
      getRowValue(row + 1, tree.right);
    }
  };
  getRowValue(0, root);

  return result;
}
