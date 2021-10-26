/*
 * @lc app=leetcode.cn id=53 lang=typescript
 *
 * [53] 最大子序和
 */

// @lc code=start
function maxSubArray(nums: number[]): number {
    for (let i = 0; i < nums.length; i++) {
        nums[i] = nums[i] + (i != 0 ? Math.max(nums[i - 1], 0) : 0)
    }
    return Math.max(...nums)
};

// @lc code=end

