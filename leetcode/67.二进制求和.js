/*
 * @lc app=leetcode.cn id=67 lang=javascript
 *
 * [67] 二进制求和
 */

// @lc code=start
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
    let i = a.length - 1, j = b.length - 1, carry = 0, res = '';
    while (i >= 0 || j >= 0) {
        let sum = carry;
        if (i >= 0) sum += a[i--] - '0';
        if (j >= 0) sum += b[j--] - '0';
        res = sum % 2 + res;
        carry = sum / 2;
    }
    return carry ? '1' + res : res;
};
console.log(addBinary('11', '1'));
// @lc code=end

