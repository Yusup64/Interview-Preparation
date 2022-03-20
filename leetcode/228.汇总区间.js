/*
 * @lc app=leetcode.cn id=228 lang=javascript
 *
 * [228] 汇总区间
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {string[]}
 */
var summaryRanges = function(nums) {
    let res = [];
    let start = 0;
    let end = 0;
    /* while (end < nums.length) {
        while (end < nums.length - 1 && nums[end] + 1 == nums[end + 1]) {
            end++;
        }
        if (start == end) {
            res.push(nums[start].toString());
        } else {
            res.push(nums[start] + '->' + nums[end]);
        }
        start = end + 1;
        end = start;
    }
    return res; */
};
// @lc code=end

