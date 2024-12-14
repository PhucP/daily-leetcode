/*
You are given an array nums consisting of positive integers.

Starting with score = 0, apply the following algorithm:

Choose the smallest integer of the array that is not marked. If there is a tie, choose the one with the smallest index.
Add the value of the chosen integer to score.
Mark the chosen element and its two adjacent elements if they exist.
Repeat until all the array elements are marked.
Return the score you get after applying the above algorithm.

 

Example 1:

Input: nums = [2,1,3,4,5,2]
Output: 7
Explanation: We mark the elements as follows:
- 1 is the smallest unmarked element, so we mark it and its two adjacent elements: [2,1,3,4,5,2].
- 2 is the smallest unmarked element, so we mark it and its left adjacent element: [2,1,3,4,5,2].
- 4 is the only remaining unmarked element, so we mark it: [2,1,3,4,5,2].
Our score is 1 + 2 + 4 = 7.
Example 2:

Input: nums = [2,3,5,1,3,2]
Output: 5
Explanation: We mark the elements as follows:
- 1 is the smallest unmarked element, so we mark it and its two adjacent elements: [2,3,5,1,3,2].
- 2 is the smallest unmarked element, since there are two of them, we choose the left-most one, so we mark the one at index 0 and its right adjacent element: [2,3,5,1,3,2].
- 2 is the only remaining unmarked element, so we mark it: [2,3,5,1,3,2].
Our score is 1 + 2 + 2 = 5.
 

Constraints:

1 <= nums.length <= 105
1 <= nums[i] <= 106
*/

function findScore(nums: number[]): number {
  let queue: number[][] = [];
  let checkUse: boolean[] = new Array(nums.length).fill(false);
  for (let i = 0; i < nums.length; i++) {
    queue.push([i, nums[i]]);
  }

  queue.sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0] - b[0];
    }
    return b[1] - a[1];
  });

  let result = 0;

  //   for (let i = 0; i < queue.length; i++) {
  //     if (checkUse[queue[i][0]]) continue;
  //     else {
  //       result += queue[i][1];
  //       checkUse[queue[i][0]] = true;
  //       let left = Math.max(queue[i][0] - 1, 0);
  //       let right = Math.min(queue[i][0] + 1, nums.length - 1);
  //       checkUse[left] = true;
  //       checkUse[right] = true;
  //     }
  //   }

  while (queue.length > 0) {
    let top = queue.pop() ?? [0, 0];
    if (checkUse[top[0]]) continue;
    else {
      result += top[1];
      checkUse[top[0]] = true;
      let left = Math.max(top[0] - 1, 0);
      let right = Math.min(top[0] + 1, nums.length - 1);
      checkUse[left] = true;
      checkUse[right] = true;
      //console.log(`t: ${top[0]}  l: ${left} r: ${right}`);
    }
  }

  console.log(result);
  return result;
}

findScore([5, 1, 1, 7, 2, 4]);
