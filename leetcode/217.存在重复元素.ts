/*
 * @lc app=leetcode.cn id=217 lang=typescript
 *
 * [217] 存在重复元素
 */

// @lc code=start
var strStr = function (haystack: string | any[], needle: string | any[]) {
    let len1 = haystack.length;
    let len2 = needle.length;
    if (len2 === 0) return 0;
    for (let i = 0; i < len1; i++) {
        if (haystack[i] === needle[0]) {
            if (haystack.slice(i, i + len2) === needle) return i;
        }
    }
    return -1;
};

// @lc code=end

