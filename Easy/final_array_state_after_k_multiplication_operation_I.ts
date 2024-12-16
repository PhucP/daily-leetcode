/*
You are given an integer array nums, an integer k, and an integer multiplier.

You need to perform k operations on nums. In each operation:

Find the minimum value x in nums. If there are multiple occurrences of the minimum value, select the one that appears first.
Replace the selected minimum value x with x * multiplier.
Return an integer array denoting the final state of nums after performing all k operations.

 

Example 1:

Input: nums = [2,1,3,5,6], k = 5, multiplier = 2

Output: [8,4,6,5,6]

Explanation:

Operation	Result
After operation 1	[2, 2, 3, 5, 6]
After operation 2	[4, 2, 3, 5, 6]
After operation 3	[4, 4, 3, 5, 6]
After operation 4	[4, 4, 6, 5, 6]
After operation 5	[8, 4, 6, 5, 6]
Example 2:

Input: nums = [1,2], k = 3, multiplier = 4

Output: [16,8]

Explanation:

Operation	Result
After operation 1	[4, 2]
After operation 2	[4, 8]
After operation 3	[16, 8]
 

Constraints:

1 <= nums.length <= 100
1 <= nums[i] <= 100
1 <= k <= 10
1 <= multiplier <= 5
*/

function getFinalState(
  nums: number[],
  k: number,
  multiplier: number
): number[] {
  const queue: number[][] = [];
  for (let i = 0; i < nums.length; i++) {
    queue.push([i, nums[i]]);
  }
  queue.sort((a, b) => {
    if (a[1] === b[1]) {
      return b[0] - a[0];
    }
    return b[1] - a[1];
  });

  for (let i = 0; i < k; i++) {
    let dequeue: number[][] = [];
    console.log(queue);
    let top = queue.pop() ?? [0, 0];

    top[1] *= multiplier;
    nums[top[0]] = top[1];

    let checkInserted: boolean = false;

    while (queue.length > 0) {
      let second = queue.pop() ?? [0, 0];
      if (second[1] > top[1] || (second[1] === top[1] && second[0] < top[0])) {
        dequeue.push(top);
        dequeue.push(second);
        checkInserted = true;
        break;
      } else dequeue.push(second);
    }
    if (!checkInserted) dequeue.push(top);

    while (dequeue.length > 0) {
      let top = dequeue.pop() ?? [0, 0];
      queue.push(top);
    }
  }

  return nums;
}

getFinalState([2, 1, 3, 5, 6], 5, 2);
