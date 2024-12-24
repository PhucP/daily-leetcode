/*
There exist two undirected trees with n and m nodes, numbered from 0 to n - 1 and from 0 to m - 1, respectively. You are given two 2D integer arrays edges1 and edges2 of lengths n - 1 and m - 1, respectively, where edges1[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the first tree and edges2[i] = [ui, vi] indicates that there is an edge between nodes ui and vi in the second tree.

You must connect one node from the first tree with another node from the second tree with an edge.

Return the minimum possible diameter of the resulting tree.

The diameter of a tree is the length of the longest path between any two nodes in the tree.

 

Example 1:

Input: edges1 = [[0,1],[0,2],[0,3]], edges2 = [[0,1]]

Output: 3

Explanation:

We can obtain a tree of diameter 3 by connecting node 0 from the first tree with any node from the second tree.

Example 2:


Input: edges1 = [[0,1],[0,2],[0,3],[2,4],[2,5],[3,6],[2,7]], edges2 = [[0,1],[0,2],[0,3],[2,4],[2,5],[3,6],[2,7]]

Output: 5

Explanation:

We can obtain a tree of diameter 5 by connecting node 0 from the first tree with node 0 from the second tree.

 

Constraints:

1 <= n, m <= 105
edges1.length == n - 1
edges2.length == m - 1
edges1[i].length == edges2[i].length == 2
edges1[i] = [ai, bi]
0 <= ai, bi < n
edges2[i] = [ui, vi]
0 <= ui, vi < m
The input is generated such that edges1 and edges2 represent valid trees.
*/

function minimumDiameterAfterMerge(
  edges1: number[][],
  edges2: number[][]
): number {
  function getDiameter(edges: number[][]): number {
    const graph = new Map();
    for (const [from, to] of edges) {
      if (!graph.get(from)) {
        graph.set(from, new Set());
      }

      if (!graph.get(to)) {
        graph.set(to, new Set());
      }

      graph.get(from).add(to);
      graph.get(to).add(from);
    }

    const seen = Array(edges.length + 1);

    let result = 0;

    // returns longest path from curr node to leaf + update max diameter for curr node
    function dfs(curr: number): number {
      seen[curr] = true;

      let max1 = -1;
      let max2 = -1;

      for (const child of graph.get(curr) || []) {
        if (seen[child]) {
          continue;
        }

        const curr = dfs(child);
        if (curr > max1) {
          [max1, max2] = [curr, max1];
        } else if (curr > max2) {
          max2 = curr;
        }
      }

      result = Math.max(result, max1 + 1 + max2 + 1);
      return max1 + 1;
    }

    dfs(0);

    return result;
  }

  const diameter1 = getDiameter(edges1);
  const diameter2 = getDiameter(edges2);
  const diameter3 = Math.ceil(diameter1 / 2) + 1 + Math.ceil(diameter2 / 2);

  return Math.max(diameter1, diameter2, diameter3);
}
