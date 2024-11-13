/* 
Given a 0-indexed integer array nums of size n and two integers lower and upper, return the number of fair pairs.

A pair (i, j) is fair if:

0 <= i < j < n, and
lower <= nums[i] + nums[j] <= upper
 

Example 1:

Input: nums = [0,1,7,4,4,5], lower = 3, upper = 6
Output: 6
Explanation: There are 6 fair pairs: (0,3), (0,4), (0,5), (1,3), (1,4), and (1,5).
Example 2:

Input: nums = [1,7,9,2,5], lower = 11, upper = 11
Output: 1
Explanation: There is a single fair pair: (2,3).
 

Constraints:

1 <= nums.length <= 105
nums.length == n
-109 <= nums[i] <= 109
-109 <= lower <= upper <= 109

*/

function countFairPairs(nums: number[], lower: number, upper: number): number {
  nums.sort((a, b) => {
    return a - b;
  });
  let minIndex = 0;
  let maxIndex = 0;
  let result = 0;
  for (let i = 0; i < nums.length; i++) {
    minIndex = binarySearchLowwer(nums, lower - nums[i], i + 1);
    maxIndex = binarySearchLowwer(nums, upper - nums[i] + 1, i + 1);

    result += maxIndex - minIndex;
  }
  return result;
}

function binarySearchLowwer(
  nums: number[],
  target: number,
  start: number
): number {
  let left = start;
  let right = nums.length - 1;
  while (left <= right) {
    let mid = Math.floor(left + (right - left) / 2);
    if (nums[mid] >= target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return left;
}

countFairPairs([0, 1, 7, 4, 4, 5], 3, 6);
