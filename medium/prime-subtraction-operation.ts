/*
You are given a 0-indexed integer array nums of length n.

You can perform the following operation as many times as you want:

Pick an index i that you haven’t picked before, and pick a prime p strictly less than nums[i], then subtract p from nums[i].
Return true if you can make nums a strictly increasing array using the above operation and false otherwise.

A strictly increasing array is an array whose each element is strictly greater than its preceding element.

 

Example 1:

Input: nums = [4,9,6,10]
Output: true
Explanation: In the first operation: Pick i = 0 and p = 3, and then subtract 3 from nums[0], so that nums becomes [1,9,6,10].
In the second operation: i = 1, p = 7, subtract 7 from nums[1], so nums becomes equal to [1,2,6,10].
After the second operation, nums is sorted in strictly increasing order, so the answer is true.
Example 2:

Input: nums = [6,8,11,12]
Output: true
Explanation: Initially nums is sorted in strictly increasing order, so we don't need to make any operations.
Example 3:

Input: nums = [5,8,3]
Output: false
Explanation: It can be proven that there is no way to perform operations to make nums sorted in strictly increasing order, so the answer is false.
 

Constraints:

1 <= nums.length <= 1000
1 <= nums[i] <= 1000
nums.length == n

* note : fix  lại trường hợp eratosthenes[0]
*/

function primeSubOperation(nums: number[]): boolean {
  const eratosthenes = new Array(1001).fill(0);
  setUperatosthenes(eratosthenes);
  let pre = 0;
  let maxPrime = 0;
  for (let i = 0; i < nums.length; i++) {
    maxPrime = findMaxPrime(nums[i] - pre - 1, eratosthenes);
    if (maxPrime < 0) return false;
    pre = nums[i] - maxPrime;
    console.log(`${nums[i]} _ ${pre} _ ${nums[i] - pre}`);
  }
  return true;
}

function findMaxPrime(max: number, eratosthenes: number[]): number {
  while (max >= 0) {
    if (eratosthenes[max] === 1) return max;
    max--;
  }
  return -1;
}

function setUperatosthenes(eratosthenes: number[]) {
  eratosthenes[0] = 1;
  eratosthenes[1] = -1;
  for (let i = 2; i < eratosthenes.length; i++) {
    if (eratosthenes[i] === 0) {
      eratosthenes[i] = 1;
      for (let j = 2; j < eratosthenes.length / i; j++) {
        eratosthenes[i * j] = -1;
      }
    }
  }
}

console.log(primeSubOperation([998, 2]));
