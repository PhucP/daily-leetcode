// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

// An input string is valid if:

// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.
// Every close bracket has a corresponding open bracket of the same type.

// Example 1:

// Input: s = "()"

// Output: true

// Example 2:

// Input: s = "()[]{}"

// Output: true

// Example 3:

// Input: s = "(]"

// Output: false

// Example 4:

// Input: s = "([])"

// Output: true

// Constraints:

// 1 <= s.length <= 104
// s consists of parentheses only '()[]{}'.

function isValid(s: string): boolean {
  const myStack: string[] = [];
  for (let i = 0; i < s.length; i++) {
    if (myStack.length > 0) {
      const top: string = myStack.pop() as string;

      //exception
      if (
        (top === "(" && (s[i] === "}" || s[i] === "]")) ||
        (top === "[" && (s[i] === ")" || s[i] === "}")) ||
        (top === "{" && (s[i] === ")" || s[i] === "]"))
        // top === ")" ||
        // top === "}" ||
        // top === "]"
      )
        return false;
      //

      if (
        (top === "(" && s[i] === ")") ||
        (top === "[" && s[i] === "]") ||
        (top === "{" && s[i] === "}")
      )
        continue;
      else {
        myStack.push(top);
        myStack.push(s[i]);
      }
    } else myStack.push(s[i]);
  }

  return myStack.length === 0;
}
