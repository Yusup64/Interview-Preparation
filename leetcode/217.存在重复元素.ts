/*
 * @lc app=leetcode.cn id=217 lang=typescript
 *
 * [217] 存在重复元素
 */

// @lc code=start
function containsDuplicate(nums: number[]): boolean {
    let map: { [key: string]: any } = {};
    for (let i = 0; i < nums.length; i++) {
        if (map[nums[i]]) return true
        map[nums[i]] = 1
    }
    return false
};

// @lc code=end

