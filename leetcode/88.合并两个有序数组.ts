/*
 * @lc app=leetcode.cn id=88 lang=typescript
 *
 * [88] 合并两个有序数组
 */

// @lc code=start
/**
 Do not return anything, modify nums1 in-place instead.
 */
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
    let i = m + n - 1;
    m--;
    n--;
    while (m >= 0 || n >= 0) {
        if (m < 0) {
            nums1[i--] = nums2[n--]
        }
    }

};
console.log(merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3));

// @lc code=end

