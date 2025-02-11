/*
 * Given two strings s and part, perform the following operation on s until all occurrences of the substring part are removed:
 *
 * Find the leftmost occurrence of the substring part and remove it from s.
 * Return s after removing all occurrences of part.
 *
 * A substring is a contiguous sequence of characters in a string.
 *
 *
 *
 * Example 1:
 *
 * Input: s = "daabcbaabcbc", part = "abc"
 * Output: "dab"
 * Explanation: The following operations are done:
 * - s = "daabcbaabcbc", remove "abc" starting at index 2, so s = "dabaabcbc".
 * - s = "dabaabcbc", remove "abc" starting at index 4, so s = "dababc".
 * - s = "dababc", remove "abc" starting at index 3, so s = "dab".
 * Now s has no occurrences of "abc".
 * Example 2:
 *
 * Input: s = "axxxxyyyyb", part = "xy"
 * Output: "ab"
 * Explanation: The following operations are done:
 * - s = "axxxxyyyyb", remove "xy" starting at index 4 so s = "axxxyyyb".
 * - s = "axxxyyyb", remove "xy" starting at index 3 so s = "axxyyb".
 * - s = "axxyyb", remove "xy" starting at index 2 so s = "axyb".
 * - s = "axyb", remove "xy" starting at index 1 so s = "ab".
 * Now s has no occurrences of "xy".
 *
 *
 * Constraints:
 *
 * 1 <= s.length <= 1000
 * 1 <= part.length <= 1000
 * s​​​​​​ and part consists of lowercase English letters.
 */

function removeOccurrences(s: string, needle: string): string {
  const lps = getLPSTable(needle);
  const hay = s.split("");

  let j = 0;
  for (let i = 0; i < hay.length; ++i) {
    while (j >= 0 && hay[i] != needle[j]) {
      j = lps[j];
    }
    if (++j >= needle.length) {
      hay.splice(i - j + 1, j);
      i = Math.max(0, i - 2 * j) - 1;
      j = 0;
    }
  }

  return hay.join("");
}

function getLPSTable<T>(array: T[] | string): number[] {
  const N = array.length;
  const lps = new Array(N + 1).fill(0);
  lps[0] = -1;

  let j = 0;
  for (let i = 1; i < N; lps[++i] = ++j) {
    while (j >= 0 && array[i] != array[j]) {
      j = lps[j];
    }
  }

  return lps;
}
