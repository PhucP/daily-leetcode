/*
 * You are given two string arrays words1 and words2.
 *
 * A string b is a subset of string a if every letter in b occurs in a including multiplicity.
 *
 * For example, "wrr" is a subset of "warrior" but is not a subset of "world".
 * A string a from words1 is universal if for every string b in words2, b is a subset of a.
 *
 * Return an array of all the universal strings in words1. You may return the answer in any order.
 *
 *
 * Example 1:
 *
 * Input: words1 = ["amazon","apple","facebook","google","leetcode"], words2 = ["e","o"]
 *
 * Output: ["facebook","google","leetcode"]
 *
 * Example 2:
 *
 * Input: words1 = ["amazon","apple","facebook","google","leetcode"], words2 = ["lc","eo"]
 *
 * Output: ["leetcode"]
 *
 * Example 3:
 *
 * Input: words1 = ["acaac","cccbb","aacbb","caacc","bcbbb"], words2 = ["c","cc","b"]
 *
 * Output: ["cccbb"]
 *
 *
 * Constraints:
 *
 * 1 <= words1.length, words2.length <= 104
 * 1 <= words1[i].length, words2[i].length <= 10
 * words1[i] and words2[i] consist only of lowercase English letters.
 * All the strings of words1 are unique.
 */
function wordSubsets(words1: string[], words2: string[]): string[] {
  let words2_arr = new Array(26).fill(0);
  for (let i = 0; i < words2.length; i++) {
    let temp_arr = new Array(26).fill(0);
    for (let j = 0; j < words2[i].length; j++) {
      temp_arr[words2[i][j].charCodeAt(0) - "a".charCodeAt(0)] += 1;
    }
    for (let k = 0; k < temp_arr.length; k++) {
      if (temp_arr[k] > words2_arr[k]) {
        words2_arr[k] = temp_arr[k];
      }
    }
  }
  const res = [];
  for (let i = 0; i < words1.length; i++) {
    let temp_arr = new Array(26).fill(0);
    for (let j = 0; j < words1[i].length; j++) {
      temp_arr[words1[i][j].charCodeAt(0) - "a".charCodeAt(0)] += 1;
    }
    let flag = 1;
    for (let k = 0; k < temp_arr.length; k++) {
      if (temp_arr[k] >= words2_arr[k]) {
        continue;
      } else {
        flag = 0;
        break;
      }
    }
    if (flag) {
      res.push(words1[i]);
    }
  }
  return res;
}
