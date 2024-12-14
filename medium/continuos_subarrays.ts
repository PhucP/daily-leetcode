/*
You are given a 0-indexed integer array nums. A subarray of nums is called continuous if:

Let i, i + 1, ..., right be the indices in the subarray. Then, for each pair of indices i <= i1, i2 <= j, 0 <= |nums[i1] - nums[i2]| <= 2.
Return the total number of continuous subarrays.

A subarray is a contiguous non-empty sequence of elements within an array.

 

Example 1:

Input: nums = [5,4,2,4]
Output: 8
Explanation: 
Continuous subarray of size 1: [5], [4], [2], [4].
Continuous subarray of size 2: [5,4], [4,2], [2,4].
Continuous subarray of size 3: [4,2,4].
Thereare no subarrys of size 4.
Total continuous subarrays = 4 + 3 + 1 = 8.
It can be shown that there are no more continuous subarrays.
 

Example 2:

Input: nums = [1,2,3]
Output: 6
Explanation: 
Continuous subarray of size 1: [1], [2], [3].
Continuous subarray of size 2: [1,2], [2,3].
Continuous subarray of size 3: [1,2,3].
Total continuous subarrays = 3 + 2 + 1 = 6.
 

Constraints:

1 <= nums.length <= 105
1 <= nums[i] <= 109
*/

function continuousSubarrays(nums: number[]): number {
  let min = nums[0] - 2;
  let max = nums[0] + 2;
  let left = 0;
  let result = 0;
  for (let right = 0; right < nums.length; right++) {
    if (nums[right] >= min && nums[right] <= max) {
      max = Math.min(max, nums[right] + 2);
      min = Math.max(min, nums[right] - 2);
    } else {
      left = right;
      max = nums[left] + 2;
      min = nums[left] - 2;
      while (left > 1 && nums[left - 1] >= min && nums[left - 1] <= max) {
        left--;
        max = Math.min(max, nums[left - 1] + 2);
        min = Math.max(min, nums[left - 1] - 2);
      }
    }
    result += right - left + 1;
    console.log(`l: ${left} r: ${right} min: ${min} max: ${max}`);
  }
  console.log(result);

  return result;
}

continuousSubarrays([65, 66, 67, 66, 66, 65, 64, 65, 65, 64]);
