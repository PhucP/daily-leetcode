/*
 * In this problem, a tree is an undirected graph that is connected and has no cycles.
 *
 * You are given a graph that started as a tree with n nodes labeled from 1 to n, with one additional edge added. The added edge has two different vertices chosen from 1 to n, and was not an edge that already existed. The graph is represented as an array edges of length n where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the graph.
 *
 * Return an edge that can be removed so that the resulting graph is a tree of n nodes. If there are multiple answers, return the answer that occurs last in the input.
 *
 *
 *
 * Example 1:
 *
 *
 * Input: edges = [[1,2],[1,3],[2,3]]
 * Output: [2,3]
 * Example 2:
 *
 *
 * Input: edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]
 * Output: [1,4]
 *
 *
 * Constraints:
 *
 * n == edges.length
 * 3 <= n <= 1000
 * edges[i].length == 2
 * 1 <= ai < bi <= edges.length
 * ai != bi
 * There are no repeated edges.
 * The given graph is connected.
 */

function findRedundantConnection(edges: number[][]): number[] {
  const disjointSet = new DisjointSet(edges.length);
  let lastProcessedEdge: number[] = [];

  for (let i = 0; i < edges.length; i++) {
    const [a, b] = edges[i];

    if (disjointSet.areConnected(a, b)) {
      lastProcessedEdge = [a, b];
    }

    disjointSet.union(a, b);
  }

  return lastProcessedEdge;
}

class DisjointSet {
  private readonly parent: number[] = [];
  private readonly rank: number[] = [];

  public constructor(size: number) {
    this.parent = new Array(size);
    this.rank = new Array(size).fill(0);

    for (let i = 0; i < size; i++) {
      this.parent[i] = i;
    }
  }

  public find(i: number): number {
    if (this.parent[i] === i) {
      return this.parent[i];
    }

    this.parent[i] = this.find(this.parent[i]);
    return this.parent[i];
  }

  public union(i: number, j: number): void {
    const rootI = this.find(i);
    const rootJ = this.find(j);

    if (rootI === rootJ) {
      return;
    }

    if (this.rank[rootI] < this.rank[rootJ]) {
      this.parent[rootI] = rootJ;
    } else if (this.rank[rootI] > this.rank[rootJ]) {
      this.parent[rootJ] = rootI;
    } else {
      this.parent[rootJ] = rootI;
      this.rank[rootI]++;
    }
  }

  public areConnected(i: number, j: number): boolean {
    return this.find(i) === this.find(j);
  }
}
