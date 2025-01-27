/**
 * There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course ai first if you want to take course bi.
 *
 * For example, the pair [0, 1] indicates that you have to take course 0 before you can take course 1.
 * Prerequisites can also be indirect. If course a is a prerequisite of course b, and course b is a prerequisite of course c, then course a is a prerequisite of course c.
 *
 * You are also given an array queries where queries[j] = [uj, vj]. For the jth query, you should answer whether course uj is a prerequisite of course vj or not.
 *
 * Return a boolean array answer, where answer[j] is the answer to the jth query.
 *
 *
 *
 * Example 1:
 *
 *
 * Input: numCourses = 2, prerequisites = [[1,0]], queries = [[0,1],[1,0]]
 * Output: [false,true]
 * Explanation: The pair [1, 0] indicates that you have to take course 1 before you can take course 0.
 * Course 0 is not a prerequisite of course 1, but the opposite is true.
 * Example 2:
 *
 * Input: numCourses = 2, prerequisites = [], queries = [[1,0],[0,1]]
 * Output: [false,false]
 * Explanation: There are no prerequisites, and each course is independent.
 * Example 3:
 *
 *
 * Input: numCourses = 3, prerequisites = [[1,2],[1,0],[2,0]], queries = [[1,0],[1,2]]
 * Output: [true,true]
 *
 *
 * Constraints:
 *
 * 2 <= numCourses <= 100
 * 0 <= prerequisites.length <= (numCourses * (numCourses - 1) / 2)
 * prerequisites[i].length == 2
 * 0 <= ai, bi <= numCourses - 1
 * ai != bi
 * All the pairs [ai, bi] are unique.
 * The prerequisites graph has no cycles.
 * 1 <= queries.length <= 104
 * 0 <= ui, vi <= numCourses - 1
 * ui != vi
 */
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @param {number[][]} queries
 * @return {boolean[]}
 */
function checkIfPrerequisite(
  numCourses: number,
  prerequisites: number[][],
  queries: number[][]
): boolean[] {
  // Initialize the graph
  const graph: number[][] = Array.from({ length: numCourses }, () => []);

  // Construct the graph with the prerequisite dependencies
  for (const [u, v] of prerequisites) {
    graph[u].push(v);
  }

  // Define the reachable set of each node
  const reachable = Array.from({ length: numCourses }, () => new Set<number>());

  // Use DFS to calculate the reachable set of each node
  const dfs = (node: number) => {
    for (const neighbor of graph[node]) {
      // Skip if the neighbor is already reachable
      if (reachable[node].has(neighbor)) {
        continue;
      }

      // Add the neighbor to the reachable set
      reachable[node].add(neighbor);

      // Recursively call the DFS
      dfs(neighbor);

      // Add the reachable set of the neighbor to the reachable set of the node
      for (const n of reachable[neighbor]) {
        reachable[node].add(n);
      }
    }
  };

  // Find the reachable set of each node
  for (let i = 0; i < numCourses; i++) {
    dfs(i);
  }

  // Return the result
  return queries.map(([u, v]) => reachable[u].has(v));
}
