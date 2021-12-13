/*
 * @lc app=leetcode.cn id=121 lang=javascript
 *
 * [121] 买卖股票的最佳时机
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    let max = 0;
    let min = Infinity;
    for (let i = 0; i < prices.length; i++) {
        if (prices[i] < min) {
            min = prices[i];
        }
        if (prices[i] - min > max) {
            max = prices[i] - min;
        }
    }
    return max;
};
console.log(maxProfit([7, 6, 4, 3, 1]));
// @lc code=end

