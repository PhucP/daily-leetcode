/*
 * You are given a 0-indexed array of positive integers nums and a positive integer limit.
 *
 * In one operation, you can choose any two indices i and j and swap nums[i] and nums[j] if |nums[i] - nums[j]| <= limit.
 *
 * Return the lexicographically smallest array that can be obtained by performing the operation any number of times.
 *
 * An array a is lexicographically smaller than an array b if in the first position where a and b differ, array a has an element that is less than the corresponding element in b. For example, the array [2,10,3] is lexicographically smaller than the array [10,2,3] because they differ at index 0 and 2 < 10.
 *
 *
 * Example 1:
 *
 * Input: nums = [1,5,3,9,8], limit = 2
 * Output: [1,3,5,8,9]
 * Explanation: Apply the operation 2 times:
 * - Swap nums[1] with nums[2]. The array becomes [1,3,5,9,8]
 * - Swap nums[3] with nums[4]. The array becomes [1,3,5,8,9]
 * We cannot obtain a lexicographically smaller array by applying any more operations.
 * Note that it may be possible to get the same result by doing different operations.
 * Example 2:
 *
 * Input: nums = [1,7,6,18,2,1], limit = 3
 * Output: [1,6,7,18,1,2]
 * Explanation: Apply the operation 3 times:
 * - Swap nums[1] with nums[2]. The array becomes [1,6,7,18,2,1]
 * - Swap nums[0] with nums[4]. The array becomes [2,6,7,18,1,1]
 * - Swap nums[0] with nums[5]. The array becomes [1,6,7,18,1,2]
 * We cannot obtain a lexicographically smaller array by applying any more operations.
 * Example 3:
 *
 * Input: nums = [1,7,28,19,10], limit = 3
 * Output: [1,7,28,19,10]
 * Explanation: [1,7,28,19,10] is the lexicographically smallest array we can obtain because we cannot apply the operation on any two indices.
 *
 *
 * Constraints:
 *
 * 1 <= nums.length <= 105
 * 1 <= nums[i] <= 109
 * 1 <= limit <= 109
 */

function lexicographicallySmallestArray(
  nums: number[],
  limit: number
): number[] {
  const cloneNums = [...nums];
  cloneNums.sort((a, b) => a - b);

  const groups = new Map<number, number>();
  const checkedGroups = new Map<number, number>();
  let currGroup = 0;
  groups.set(0, currGroup);
  checkedGroups.set(cloneNums[0], currGroup);
  let pre = cloneNums[0];
  for (let i = 1; i < cloneNums.length; i++) {
    if (Math.abs(cloneNums[i] - pre) <= limit) {
      groups.set(i, currGroup);
    } else {
      groups.set(i, ++currGroup);
    }
    checkedGroups.set(cloneNums[i], currGroup);

    pre = cloneNums[i];
  }

  const sortedGroups: number[][] = Array.from(
    { length: currGroup + 1 },
    () => []
  );
  for (let [num, group] of groups) {
    sortedGroups[group].push(cloneNums[num]);
  }

  for (let group of sortedGroups) {
    group.sort((a, b) => a - b);
  }

  const groupIndex = new Array(sortedGroups.length).fill(0);
  let res: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    let group = checkedGroups.get(nums[i]) ?? 0;
    res.push(sortedGroups[group][groupIndex[group]++]);
  }
  return res;
}
