/*
 * Given two positive integers num1 and num2, find the positive integer x such that:
 *
 * x has the same number of set bits as num2, and
 * The value x XOR num1 is minimal.
 * Note that XOR is the bitwise XOR operation.
 *
 * Return the integer x. The test cases are generated such that x is uniquely determined.
 *
 * The number of set bits of an integer is the number of 1's in its binary representation.
 *
 *
 * Example 1:
 *
 * Input: num1 = 3, num2 = 5
 * Output: 3
 * Explanation:
 * The binary representations of num1 and num2 are 0011 and 0101, respectively.
 * The integer 3 has the same number of set bits as num2, and the value 3 XOR 3 = 0 is minimal.
 * Example 2:
 *
 * Input: num1 = 1, num2 = 12
 * Output: 3
 * Explanation:
 * The binary representations of num1 and num2 are 0001 and 1100, respectively.
 * The integer 3 has the same number of set bits as num2, and the value 3 XOR 1 = 2 is minimal.
 *
 *
 * Constraints:
 *
 * 1 <= num1, num2 <= 109
 * */

function minimizeXor(num1: number, num2: number): number {
  const num1_2: string[] = changeNumberToString(num1, 32);
  const num2_2: string[] = changeNumberToString(num2, 32);
  const result: string[] = new Array<string>(32).fill("0");

  let bitSet = 0;
  for (let bit of num2_2) {
    if (bit === "1") bitSet++;
  }

  for (let i = 0; i < num1_2.length; i++) {
    if (num1_2[i] === "1" && bitSet > 0) {
      bitSet--;
      result[i] = "1";
    }
  }

  if (bitSet > 0) {
    for (let i = result.length - 1; i >= 0; i--) {
      if (result[i] === "0" && bitSet > 0) {
        result[i] = "1";
        bitSet--;
      }
    }
  }

  return parseInt(result.join(""), 2);
}

function changeNumberToString(number2: number, length: number): string[] {
  const stringNumber = number2.toString(2).padStart(length, "0");
  const binary: string[] = [];
  for (let bit of stringNumber) {
    binary.push(bit);
  }
  return binary;
}
