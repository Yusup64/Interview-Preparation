/*
 * @lc app=leetcode.cn id=7 lang=typescript
 *
 * [7] 整数反转
 */

// @lc code=start
function reverse(x: number): number {
    let result = 0;
    let flag = 1;
    if (x < 0) {
        flag = -1;
    }
    x = Math.abs(x);
    while (x > 0) {
        result = result * 10 + x % 10;
        x = Math.floor(x / 10);
    }
    if (result > 2 ** 31 - 1) {
        return 0;
    }
    return result * flag;
};
// @lc code=end

