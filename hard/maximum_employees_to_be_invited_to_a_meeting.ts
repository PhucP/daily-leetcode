/*
 * A company is organizing a meeting and has a list of n employees, waiting to be invited. They have arranged for a large circular table, capable of seating any number of employees.
 *
 * The employees are numbered from 0 to n - 1. Each employee has a favorite person and they will attend the meeting only if they can sit next to their favorite person at the table. The favorite person of an employee is not themself.
 *
 * Given a 0-indexed integer array favorite, where favorite[i] denotes the favorite person of the ith employee, return the maximum number of employees that can be invited to the meeting.
 *
 *
 * Example 1:
 *
 * Input: favorite = [2,2,1,2]
 * Output: 3
 * Explanation:
 * The above figure shows how the company can invite employees 0, 1, and 2, and seat them at the round table.
 * All employees cannot be invited because employee 2 cannot sit beside employees 0, 1, and 3, simultaneously.
 * Note that the company can also invite employees 1, 2, and 3, and give them their desired seats.
 * The maximum number of employees that can be invited to the meeting is 3.
 * Example 2:
 *
 * Input: favorite = [1,2,0]
 * Output: 3
 * Explanation:
 * Each employee is the favorite person of at least one other employee, and the only way the company can invite them is if they invite every employee.
 * The seating arrangement will be the same as that in the figure given in example 1:
 * - Employee 0 will sit between employees 2 and 1.
 * - Employee 1 will sit between employees 0 and 2.
 * - Employee 2 will sit between employees 1 and 0.
 * The maximum number of employees that can be invited to the meeting is 3.
 * Example 3:
 *
 * Input: favorite = [3,0,1,4,1]
 * Output: 4
 * Explanation:
 * The above figure shows how the company will invite employees 0, 1, 3, and 4, and seat them at the round table.
 * Employee 2 cannot be invited because the two spots next to their favorite employee 1 are taken.
 * So the company leaves them out of the meeting.
 * The maximum number of employees that can be invited to the meeting is 4.
 *
 *
 * Constraints:
 *
 * n == favorite.length
 * 2 <= n <= 105
 * 0 <= favorite[i] <= n - 1
 * favorite[i] != i
 */

/**
 * Finds the maximum number of people that can be invited to sit together at a round table.
 *
 * The solution considers:
 * 1) The length of the largest cycle in the graph.
 * 2) The combined length of chains attached to all mutual-favorite pairs (2-cycles).
 *
 * @param favorite - An array where each index `i` represents a person, and `favorite[i]` is the person they favor.
 * @returns The maximum number of people that can be invited.
 */
function maximumInvitations(favorite: number[]): number {
  const n = favorite.length;

  // Array to track the number of people favoring each person.
  const inDegree = Array(n).fill(0);

  // Compute the in-degree for each person.
  for (const person of favorite) {
    inDegree[person] += 1;
  }

  // Arrays for tracking visited nodes and chain depths.
  const visited = Array(n).fill(false); // Whether a node has been visited.
  const longestChain = Array(n).fill(1); // Longest chain depth ending at each node.

  // Queue to process nodes with no incoming edges (in-degree = 0).
  const queue: number[] = [];
  for (let i = 0; i < n; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
      visited[i] = true; // Mark as visited during chain processing.
    }
  }

  // Perform topological sorting to compute chain depths.
  while (queue.length > 0) {
    const currentNode = queue.pop()!;
    const nextNode = favorite[currentNode];

    // Reduce the in-degree of the next node and update its chain depth.
    inDegree[nextNode]--;
    longestChain[nextNode] = Math.max(
      longestChain[nextNode],
      longestChain[currentNode] + 1
    );

    // If the next node has no more incoming edges, add it to the queue.
    if (inDegree[nextNode] === 0) {
      queue.push(nextNode);
      visited[nextNode] = true;
    }
  }

  let maxCycleLength = 0; // Largest cycle length in the graph.
  let twoCycleChainLength = 0; // Total chain length contributed by all 2-cycles.

  // Iterate through all nodes to find cycles and calculate chain contributions.
  for (let i = 0; i < n; i++) {
    if (visited[i]) continue; // Skip nodes already processed.

    let currentNode = i;
    let cycleLength = 0;

    // Traverse the cycle and mark nodes as visited.
    while (!visited[currentNode]) {
      visited[currentNode] = true;
      currentNode = favorite[currentNode];
      cycleLength++;
    }

    // If the cycle is larger than 2, update maxCycleLength.
    if (cycleLength > 2) {
      maxCycleLength = Math.max(maxCycleLength, cycleLength);
    }
    // If it's a 2-cycle, calculate the chain contributions.
    else if (cycleLength === 2) {
      const node1 = i;
      const node2 = favorite[i];
      twoCycleChainLength += longestChain[node1] + longestChain[node2];
    }
  }

  // Return the maximum between the largest cycle and the combined 2-cycle chain length.
  return Math.max(maxCycleLength, twoCycleChainLength);
}
