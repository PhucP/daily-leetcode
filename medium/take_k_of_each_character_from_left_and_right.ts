/*
You are given a string s consisting of the characters 'a', 'b', and 'c' and a non-negative integer k. Each minute, you may take either the leftmost character of s, or the rightmost character of s.

Return the minimum number of minutes needed for you to take at least k of each character, or return -1 if it is not possible to take k of each character.

 

Example 1:

Input: s = "aabaaaacaabc", k = 2
Output: 8
Explanation: 
Take three characters from the left of s. You now have two 'a' characters, and one 'b' character.
Take five characters from the right of s. You now have four 'a' characters, two 'b' characters, and two 'c' characters.
A total of 3 + 5 = 8 minutes is needed.
It can be proven that 8 is the minimum number of minutes needed.
Example 2:

Input: s = "a", k = 1
Output: -1
Explanation: It is not possible to take one 'b' or 'c' so return -1.
 

Constraints:

1 <= s.length <= 105
s consists of only the letters 'a', 'b', and 'c'.
0 <= k <= s.length
*/

function takeCharacters(s: string, k: number): number {
  let result = s.length;
  let count: number[] = new Array(3).fill(0);

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "a") count[0]++;
    else if (s[i] === "b") count[1]++;
    else count[2]++;
  }
  if (count[0] < k || count[1] < k || count[2] < k) return -1;

  let remove: number[] = new Array(3).fill(0);
  let left = 0;
  for (let right = 0; right < s.length; right++) {
    if (s[right] === "a") remove[0]++;
    else if (s[right] === "b") remove[1]++;
    else remove[2]++;

    let isValid = checkValidWindow(count, remove, k);
    if (isValid) result = Math.min(result, s.length - (right - left + 1));
    else {
      if (s[left] === "a") remove[0]--;
      else if (s[left] === "b") remove[1]--;
      else remove[2]--;
      left++;
    }
  }

  console.log(result);
  return result;
}

function checkValidWindow(
  count: number[],
  remove: number[],
  k: number
): boolean {
  for (let i = 0; i < 3; i++) {
    if (count[i] - remove[i] < k) return false;
  }

  return true;
}
