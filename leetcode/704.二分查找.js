/*
 * @lc app=leetcode.cn id=704 lang=javascript
 算法 二分查找
 * [704] 二分查找
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 * 时间复杂度：O(\log n)O(logn)，其中 nn 是数组的长度。
 * 空间复杂度：O(1)O(1)。
 */
var search = function (nums, target) {
    let low = 0,
        high = nums.length - 1;
    while (low <= high) {
        const mid = Math.floor((high - low) / 2) + low
        const num = nums[mid]
        if (num == target) {
            return mid
        } else if (num > target) {
            high = mid - 1
        } else {
            low = mid + 1
        }
    }
    return -1
};
console.log(search([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10));
// @lc code=end

