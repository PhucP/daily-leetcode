/*
You are given a 0-indexed array heights of positive integers, where heights[i] represents the height of the ith building.

If a person is in building i, they can move to any other building j if and only if i < j and heights[i] < heights[j].

You are also given another array queries where queries[i] = [ai, bi]. On the ith query, Alice is in building ai while Bob is in building bi.

Return an array ans where ans[i] is the index of the leftmost building where Alice and Bob can meet on the ith query. If Alice and Bob cannot move to a common building on query i, set ans[i] to -1.

 

Example 1:

Input: heights = [6,4,8,5,2,7], queries = [[0,1],[0,3],[2,4],[3,4],[2,2]]
Output: [2,5,-1,5,2]
Explanation: In the first query, Alice and Bob can move to building 2 since heights[0] < heights[2] and heights[1] < heights[2]. 
In the second query, Alice and Bob can move to building 5 since heights[0] < heights[5] and heights[3] < heights[5]. 
In the third query, Alice cannot meet Bob since Alice cannot move to any other building.
In the fourth query, Alice and Bob can move to building 5 since heights[3] < heights[5] and heights[4] < heights[5].
In the fifth query, Alice and Bob are already in the same building.  
For ans[i] != -1, It can be shown that ans[i] is the leftmost building where Alice and Bob can meet.
For ans[i] == -1, It can be shown that there is no building where Alice and Bob can meet.
Example 2:

Input: heights = [5,3,8,2,6,1,4,6], queries = [[0,7],[3,5],[5,2],[3,0],[1,6]]
Output: [7,6,-1,4,6]
Explanation: In the first query, Alice can directly move to Bob's building since heights[0] < heights[7].
In the second query, Alice and Bob can move to building 6 since heights[3] < heights[6] and heights[5] < heights[6].
In the third query, Alice cannot meet Bob since Bob cannot move to any other building.
In the fourth query, Alice and Bob can move to building 4 since heights[3] < heights[4] and heights[0] < heights[4].
In the fifth query, Alice can directly move to Bob's building since heights[1] < heights[6].
For ans[i] != -1, It can be shown that ans[i] is the leftmost building where Alice and Bob can meet.
For ans[i] == -1, It can be shown that there is no building where Alice and Bob can meet.

 

Constraints:

1 <= heights.length <= 5 * 104
1 <= heights[i] <= 109
1 <= queries.length <= 5 * 104
queries[i] = [ai, bi]
0 <= ai, bi <= heights.length - 1
*/

function leftmostBuildingQueries(
  heights: number[],
  queries: [number, number][]
): number[] {
  const output = new Array<number>(queries.length).fill(-1);
  // Assume Alice is always to left of Bob
  const missed = new Map<number, (typeof queries)[number][]>(); // BobIndex => [maxHeight(Alice, Bob), queryIndex][]
  queries.forEach((q, i) => {
    const [L, R] = q.sort((a, b) => a - b);
    if (L === R || heights[L] < heights[R]) {
      output[i] = R;
    } else {
      const element: (typeof queries)[number] = [
        Math.max(heights[L], heights[R]),
        i,
      ];
      missed.get(R)?.push(element) || missed.set(R, [element]);
    }
  });
  const minHeap = new Heap<[number, number]>((a, b) => a[0] - b[0]); // a, b = [maxHeight(Alice, Bob), queryIndex]
  heights.forEach((h, i) => {
    for (const [maxHeight, queryIndex] of missed.get(i) || []) {
      minHeap.enqueue([maxHeight, queryIndex]);
    }
    while (minHeap.size > 0 && minHeap.front()![0] < h) {
      const queryIndex = minHeap.dequeue()![1];
      output[queryIndex] = i;
    }
  });
  return output;
}

class Heap<T> {
  private heap: T[] = [];
  private comparator: (a: T, b: T) => number;
  /**
   * Construct a new Heap with the given comparator.
   * @param comparator - The comparator to use when ordering values in the heap.
   * For MinHeap use (a, b) => a - b, for MaxHeap use (a, b) => b - a
   */
  constructor(comparator: (a: T, b: T) => number) {
    this.comparator = comparator;
  }
  get size() {
    return this.heap.length;
  }
  private bubbleUp() {
    let idx = this.heap.length - 1;
    const element = this.heap[idx];
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const parent = this.heap[parentIdx];
      if (this.comparator(element, parent) >= 0) break;
      this.heap[parentIdx] = element;
      this.heap[idx] = parent;
      idx = parentIdx;
    }
  }
  private bubbleDown() {
    let idx = 0;
    const length = this.heap.length;
    const element = this.heap[0];
    while (true) {
      const leftChildIdx = 2 * idx + 1;
      const rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;
      if (leftChildIdx < length) {
        leftChild = this.heap[leftChildIdx];
        if (this.comparator(leftChild, element) < 0) {
          swap = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        rightChild = this.heap[rightChildIdx];
        if (
          (!swap && this.comparator(rightChild, element) < 0) ||
          (swap && this.comparator(rightChild, leftChild!) < 0)
        ) {
          swap = rightChildIdx;
        }
      }
      if (swap === null) break;
      this.heap[idx] = this.heap[swap];
      this.heap[swap] = element;
      idx = swap;
    }
  }
  enqueue(val: T) {
    this.heap.push(val);
    this.bubbleUp();
  }
  dequeue(): T | undefined {
    const max = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end!;
      this.bubbleDown();
    }
    return max;
  }
  front(): T | undefined {
    return this.heap[0];
  }
  toArray() {
    return this.heap;
  }
}
