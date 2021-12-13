/*
 * @lc app=leetcode.cn id=28 lang=typescript
 *
 * [28] 实现 strStr()
 */

// @lc code=start
var strStr = function (haystack, needle) {
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
console.log(strStr('hello', 'll'));

// @lc code=end

