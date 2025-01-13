/*
 * A parentheses string is a non-empty string consisting only of '(' and ')'. It is valid if any of the following conditions is true:
 *
 * It is ().
 * It can be written as AB (A concatenated with B), where A and B are valid parentheses strings.
 * It can be written as (A), where A is a valid parentheses string.
 * You are given a parentheses string s and a string locked, both of length n. locked is a binary string consisting only of '0's and '1's. For each index i of locked,
 *
 * If locked[i] is '1', you cannot change s[i].
 * But if locked[i] is '0', you can change s[i] to either '(' or ')'.
 * Return true if you can make s a valid parentheses string. Otherwise, return false.
 *
 *
 *
 * Example 1:
 *
 * Input: s = "))()))", locked = "010100"
 * Output: true
 * Explanation: locked[1] == '1' and locked[3] == '1', so we cannot change s[1] or s[3].
 * We change s[0] and s[4] to '(' while leaving s[2] and s[5] unchanged to make s valid.
 * Example 2:
 *
 * Input: s = "()()", locked = "0000"
 * Output: true
 * Explanation: We do not need to make any changes because s is already valid.
 * Example 3:
 *
 * Input: s = ")", locked = "0"
 * Output: false
 * Explanation: locked permits us to change s[0].
 * Changing s[0] to either '(' or ')' will not make s valid.
 *
 *
 * Constraints:
 *
 * n == s.length == locked.length
 * 1 <= n <= 105
 * s[i] is either '(' or ')'.
 * locked[i] is either '0' or '1'.
 */

function canBeValid(s: string, locked: string) {
  if (s.length % 2 === 1) return false;

  let openCount = 0,
    unlockedCount = 0;
  // Iterate through the string to handle '(' and ')'.
  for (let i = 0; i < s.length; i++) {
    if (locked[i] === "0") unlockedCount++;
    else if (s[i] === "(") openCount++;
    else if (s[i] === ")") {
      if (openCount > 0) openCount--;
      else if (unlockedCount > 0) unlockedCount--;
      else return false;
    }
  }

  // Match remaining open brackets with unlocked characters.
  for (let i = s.length - 1, balanceCount = 0; i >= 0; i--) {
    if (locked[i] === "0") {
      balanceCount--;
      unlockedCount--;
    } else if (s[i] === "(") {
      balanceCount++;
      openCount--;
    } else if (s[i] === ")") balanceCount--;

    if (balanceCount > 0) return false;
    if (unlockedCount === 0 && openCount === 0) return true;
  }
  return openCount <= 0;
}
