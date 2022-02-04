// 算法 洗牌算法
function shuffle(arr) {
    var result = [],
        random;
    while (arr.length > 0) {
        random = Math.floor(Math.random() * arr.length);
        result.push(arr[random])
        arr.splice(random, 1)
    }
    return result;
};
/**
 * 零钱兑换II
 * @param {number} amount 
 * @param {number[]} coins
 * @return {number}
 * @example 输入：amount = 5, coins = [1, 2, 5]
            输出：4
            解释：有四种方式可以凑成总金额：
            5=5
            5=2+2+1
            5=2+1+1+1
            5=1+1+1+1+1
 * */
function coinChange(amount, coins) {
    if (amount < 0 || !coins || coins.length === 0) return 0;
    const dp = new Array(amount + 1).fill(0);
    dp[0] = 1;
    for (let num of coins) {
        for (let i = num; i <= amount; i++) {
            dp[i] += dp[i - num];
        }
    }
    return dp[amount];
}
// console.log(coinChange(5, [1, 2, 5]))
// console.log(coinChange(5, [2, 3]));
var a = 10
let obj = {
    a: 20,
    fn: () => { console.log(this.a) }
}
var aa = { a: 30 }
obj.fn.call(aa)
