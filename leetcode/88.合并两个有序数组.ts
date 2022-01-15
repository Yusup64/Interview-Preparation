/*
 * @lc app=leetcode.cn id=88 lang=typescript
 *
 * [88] 合并两个有序数组
 */

// @lc code=start
/**
 Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1: number[], m: number, nums2: number[], n: number) {
    let i = nums1.length - 1
    m--
    n--
    while (n >= 0) {
        if (nums1[m] > nums2[n]) {
            nums1[i--] = nums1[m--]
        } else {
            nums1[i--] = nums2[n--]
        }
    }
};

// @lc code=end

function merge1(nums1: number[], m: number, nums2: number[], n: number) {
    for (let i = 0; i < n; i++) {
        nums1[m] = nums2[i]
        m++
    }
    nums1.sort((a, b) => a - b)
}
console.log(merge1([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3));
