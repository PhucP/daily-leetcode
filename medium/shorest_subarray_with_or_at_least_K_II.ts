/*
You are given an array nums of non-negative integers and an integer k.

An array is called special if the bitwise OR of all of its elements is at least k.

Return the length of the shortest special non-empty 
subarray
 of nums, or return -1 if no special subarray exists.

 

Example 1:

Input: nums = [1,2,3], k = 2

Output: 1

Explanation:

The subarray [3] has OR value of 3. Hence, we return 1.

Example 2:

Input: nums = [2,1,8], k = 10

Output: 3

Explanation:

The subarray [2,1,8] has OR value of 11. Hence, we return 3.

Example 3:

Input: nums = [1,2], k = 0

Output: 1

Explanation:

The subarray [1] has OR value of 1. Hence, we return 1.

 

Constraints:

1 <= nums.length <= 2 * 105
0 <= nums[i] <= 109
0 <= k <= 109

tip:
- sử dụng cửa sổ trượt để duyêt qua các phần tử
- duyệt qua tất cả các phần tử trong array 
-> tìm or của các phần tử đó sao cho, kết quả lưu vào trong biến count
-> nếu như or > k, xóa bớt các phần tử từ phía bên trái cho đến khi không thỏa mãn điều kiện nữa, đồng thời tính lại giá trị count khi không có phần tử đó
--> cách tính cout: 
    - thêm phần tử: duyệt bit trong phần tử đó, nếu nó là 1, tăng biến đếm bit 1 của mảng đánh dấu bit lên 1, đồng thời bật bit 1 của count bằng cách dịch phải tới vị trí bit 1 đó rồi sử dụng phép & 1
    - xóa phần tử: duyệt bit trong phần tử đó, nêú nó là 1, giảm biến đếm bit 1 của mảng đánh dấu tại vị trí đó đi 1, nếu giá trị giảm xuống 0, dịch trái count sau đó tắt bỉt 1 của  count đi bằng cách dùng phép xor(^) 1
-> tiếp tục duyệt mảng với giá trị của biến count sau lần cuối cùng xóa phần tử

*/

function minimumSubarrayLength(nums: number[], k: number): number {
  let resultOr = 0;
  let countBit = new Array(32).fill(0);
  let left = 0;
  let right = 0;
  let minLength = Infinity;

  for (let i = 0; i < nums.length; i++) {
    right = i;
    resultOr = add(countBit, resultOr, nums[i]);
    while (resultOr >= k && left <= right) {
      minLength = Math.min(minLength, right - left + 1);
      resultOr = remove(countBit, resultOr, nums[left]);
      left++;
    }
  }

  return minLength === Infinity ? -1 : minLength;
}

function add(counter: number[], resultOr: number, element: number): number {
  for (let i = 0; i < counter.length; i++) {
    if ((element >> i) & 1 && counter[i]++ === 0) {
      resultOr |= 1 << i;
    }
  }

  return resultOr;
}

function remove(counter: number[], resultOr: number, element: number): number {
  for (let i = 0; i < 32; i++) {
    if ((element >> i) & 1 && --counter[i] === 0) {
      resultOr &= ~(1 << i);
    }
  }

  return resultOr;
}
