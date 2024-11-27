/*
You are given an integer n and a 2D integer array queries.

There are n cities numbered from 0 to n - 1. Initially, there is a unidirectional road from city i to city i + 1 for all 0 <= i < n - 1.

queries[i] = [ui, vi] represents the addition of a new unidirectional road from city ui to city vi. After each query, you need to find the length of the shortest path from city 0 to city n - 1.

Return an array answer where for each i in the range [0, queries.length - 1], answer[i] is the length of the shortest path from city 0 to city n - 1 after processing the first i + 1 queries.

 

Example 1:

Input: n = 5, queries = [[2,4],[0,2],[0,4]]

Output: [3,2,1]

Explanation:



After the addition of the road from 2 to 4, the length of the shortest path from 0 to 4 is 3.



After the addition of the road from 0 to 2, the length of the shortest path from 0 to 4 is 2.



After the addition of the road from 0 to 4, the length of the shortest path from 0 to 4 is 1.

Example 2:

Input: n = 4, queries = [[0,3],[0,2]]

Output: [1,1]

Explanation:



After the addition of the road from 0 to 3, the length of the shortest path from 0 to 3 is 1.



After the addition of the road from 0 to 2, the length of the shortest path remains 1.

 

Constraints:

3 <= n <= 500
1 <= queries.length <= 500
queries[i].length == 2
0 <= queries[i][0] < queries[i][1] < n
1 < queries[i][1] - queries[i][0]
There are no repeated roads among the queries.
*/

function shortestDistanceAfterQueries(
  n: number,
  queries: number[][]
): number[] {
  let map = createMap(n);
  let result: number[] = [];

  for (let i = 0; i < queries.length; i++) {
    let currentRoads = map.get(queries[i][0]) || [];
    currentRoads.push(queries[i][1]);
    map.set(queries[i][0], currentRoads);
    result.push(bfs2(map, n));
  }
  console.log(result);
  return result;
}

function bfs2(map: Map<number, number[]>, n: number): number {
  let queue: number[] = [];
  let check = new Array(n).fill(true);
  let backTrack = new Map<number, number>();

  queue.push(0);
  check[0] = false;
  backTrack.set(0, 0);
  while (queue.length > 0) {
    const currentNode = Number(queue.shift());
    check[currentNode] = false;
    const temp = map.get(currentNode) || [];
    for (const element of temp) {
      if (check[element]) {
        backTrack.set(element, (backTrack.get(currentNode) || 0) + 1);
        if (element === n - 1) {
          return backTrack.get(element) || 0;
        }
        check[element] = false;
        queue.push(element);
      }
    }
  }

  return -1;
}

function createMap(n: number): Map<number, number[]> {
  let newMap = new Map<number, number[]>();
  for (let i = 0; i < n; i++) {
    newMap.set(i, [i + 1]);
  }
  return newMap;
}

shortestDistanceAfterQueries(5, [
  [2, 4],
  [0, 2],
  [0, 4],
]);
