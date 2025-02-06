/*
 * You are given two strings s1 and s2 of equal length. A string swap is an operation where you choose two indices in a string (not necessarily different) and swap the characters at these indices.
 *
 * Return true if it is possible to make both strings equal by performing at most one string swap on exactly one of the strings. Otherwise, return false.
 *
 *
 *
 * Example 1:
 *
 * Input: s1 = "bank", s2 = "kanb"
 * Output: true
 * Explanation: For example, swap the first character with the last character of s2 to make "bank".
 * Example 2:
 *
 * Input: s1 = "attack", s2 = "defend"
 * Output: false
 * Explanation: It is impossible to make them equal with one string swap.
 * Example 3:
 *
 * Input: s1 = "kelb", s2 = "kelb"
 * Output: true
 * Explanation: The two strings are already equal, so no string swap operation is required.
 *
 *
 * Constraints:
 *
 * 1 <= s1.length, s2.length <= 100
 * s1.length == s2.length
 * s1 and s2 consist of only lowercase English letters.
 */
function areAlmostEqual(s1: string, s2: string): boolean {
  // Case 1: If s1 and s2 are equal, return true
  if (s1 === s2) {
    return true;
  }

  // Initialize the count of different characters and their indexes
  let differentCount = 0;
  const swapIndexes: number[] = new Array(2);

  // Step 3: Count the different characters
  for (let i = 0; i < s1.length; i++) {
    // Skip characters that are already equal
    if (s1[i] === s2[i]) {
      continue;
    }

    // Case 2: If more than 2 different characters are found, return false
    if (differentCount === 2) {
      return false;
    }

    // Record the index of the different character
    swapIndexes[differentCount] = i;

    // Increment the count of different characters
    differentCount++;
  }

  // Case 3: Check if swapping the two different characters makes the strings equal
  return (
    s1[swapIndexes[0]] === s2[swapIndexes[1]] &&
    s1[swapIndexes[1]] === s2[swapIndexes[0]]
  );
}
