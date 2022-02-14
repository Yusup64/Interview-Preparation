/*
 * @lc app=leetcode.cn id=191 lang=javascript
 *
 * [191] 位1的个数
 */

// @lc code=start
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function (n) {
    // 把n和1做运算，判断n的最低位是不是1，
    // 接着把1左移一位得到2，再和n做运算，就能判断n的次低位是不是1
    let count = 0;
    let flag = 1;
    while (flag) {
        if (n & flag) {
            count++;
        }
        flag = flag << 1;
    }
    return count;
};
console.log(hammingWeight(00000000000000000000000000001011));
// @lc code=end

