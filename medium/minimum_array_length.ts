/*
You are given two integers n and x. You have to construct an array of positive integers nums of size n where for every 0 <= i < n - 1, nums[i + 1] is greater than nums[i], and the result of the bitwise AND operation between all elements of nums is x.

Return the minimum possible value of nums[n - 1].

 

Example 1:

Input: n = 3, x = 4

Output: 6

Explanation:

nums can be [4,5,6] and its last element is 6.

Example 2:

Input: n = 2, x = 7

Output: 15

Explanation:

nums can be [7,15] and its last element is 15.

 

Constraints:

1 <= n, x <= 108
*/

function minEnd(n: number, x: number): number {
  let result: bigint = BigInt(x);
  let remaining: bigint = BigInt(n - 1);
  let position: bigint = 1n;

  while (remaining > 0n) {
    if ((BigInt(x) & position) === 0n) {
      result |= (remaining & 1n) * position;
      remaining >>= 1n;
    }
    position <<= 1n;
  }

  return Number(result);
}
