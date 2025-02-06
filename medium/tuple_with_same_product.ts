/*
 * Given an array nums of distinct positive integers, return the number of tuples (a, b, c, d) such that a * b = c * d where a, b, c, and d are elements of nums, and a != b != c != d.
 *
 *
 *
 * Example 1:
 *
 * Input: nums = [2,3,4,6]
 * Output: 8
 * Explanation: There are 8 valid tuples:
 * (2,6,3,4) , (2,6,4,3) , (6,2,3,4) , (6,2,4,3)
 * (3,4,2,6) , (4,3,2,6) , (3,4,6,2) , (4,3,6,2)
 * Example 2:
 *
 * Input: nums = [1,2,4,5,10]
 * Output: 16
 * Explanation: There are 16 valid tuples:
 * (1,10,2,5) , (1,10,5,2) , (10,1,2,5) , (10,1,5,2)
 * (2,5,1,10) , (2,5,10,1) , (5,2,1,10) , (5,2,10,1)
 * (2,10,4,5) , (2,10,5,4) , (10,2,4,5) , (10,2,5,4)
 * (4,5,2,10) , (4,5,10,2) , (5,4,2,10) , (5,4,10,2)
 *
 *
 * Constraints:
 *
 * 1 <= nums.length <= 1000
 * 1 <= nums[i] <= 104
 * All elements in nums are distinct.
 */
function tupleSameProduct(nums: number[]): number {
  const map = new Map<number, [number, number][]>();

  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      let multi = nums[i] * nums[j];
      let listPair = map.get(multi) ?? [];
      listPair.push([nums[i], nums[j]]);
      map.set(multi, listPair);
    }
  }

  let result = 0;

  for (let [key, value] of map) {
    console.log(key);
    console.log(value);
    console.log("--------------------------------");
    if (value.length > 1) {
      for (let i = 0; i < value.length - 1; i++) {
        for (let j = i + 1; j < value.length; j++) {
          if (
            value[i][0] !== value[i][1] &&
            value[i][0] !== value[j][0] &&
            value[i][0] !== value[j][1] &&
            value[i][1] !== value[j][0] &&
            value[i][1] !== value[j][1]
          ) {
            result += 8;
          }
        }
      }
    }
  }

  return result;
}
