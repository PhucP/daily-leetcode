/*
You are given an integer array nums and an integer target.

You want to build an expression out of nums by adding one of the symbols '+' and '-' before each integer in nums and then concatenate all the integers.

For example, if nums = [2, 1], you can add a '+' before 2 and a '-' before 1 and concatenate them to build the expression "+2-1".
Return the number of different expressions that you can build, which evaluates to target.

 

Example 1:

Input: nums = [1,1,1,1,1], target = 3
Output: 5
Explanation: There are 5 ways to assign symbols to make the sum of nums be target 3.
-1 + 1 + 1 + 1 + 1 = 3
+1 - 1 + 1 + 1 + 1 = 3
+1 + 1 - 1 + 1 + 1 = 3
+1 + 1 + 1 - 1 + 1 = 3
+1 + 1 + 1 + 1 - 1 = 3
Example 2:

Input: nums = [1], target = 1
Output: 1
 

Constraints:

1 <= nums.length <= 20
0 <= nums[i] <= 1000
0 <= sum(nums[i]) <= 1000
-1000 <= target <= 1000
*/

function findTargetSumWays(nums: number[], target: number): number {
  let sm = nums.reduce((a, b) => a + b, 0);
  if (sm < Math.abs(target) || (sm + target) % 2 !== 0) return 0;
  let totalsum = (sm + target) / 2;

  let dp = Array(totalsum + 1).fill(0);
  dp[0] = 1;

  for (let num of nums) {
    for (let T = totalsum; T >= num; T--) {
      dp[T] += dp[T - num];
    }
  }
  return dp[totalsum];
}
