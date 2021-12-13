/*
 * @lc app=leetcode.cn id=35 lang=javascript
 *
 * [35] 搜索插入位置
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
    for (let i = 0, len = nums.length; i < len; i++) {
        if (nums[i] >= target) {
            return i;
        } else if (i === len - 1) {
            return i + 1;
        }

    }
};
console.log(searchInsert([1, 3, 5, 6], 2));
// @lc code=end

