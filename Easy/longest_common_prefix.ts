// Write a function to find the longest common prefix string amongst an array of strings.

// If there is no common prefix, return an empty string "".

// Example 1:

// Input: strs = ["flower","flow","flight"]
// Output: "fl"
// Example 2:

// Input: strs = ["dog","racecar","car"]
// Output: ""
// Explanation: There is no common prefix among the input strings.

// Constraints:

// 1 <= strs.length <= 200
// 0 <= strs[i].length <= 200
// strs[i] consists of only lowercase English letters.

function longestCommonPrefix(strs: string[]): string {
  if (strs.length === 1) return strs[0];
  let maxIndex = -1;
  for (let i = 0; i < strs[0].length; i++) {
    for (let j = 1; j < strs.length; j++) {
      if (i >= strs[j].length || strs[j][i] !== strs[0][i]) {
        return maxIndex === -1 ? "" : strs[0].substring(0, maxIndex + 1);
      }
    }
    maxIndex = i;
  }
  return maxIndex === -1 ? "" : strs[0].substring(0, maxIndex + 1);
}
