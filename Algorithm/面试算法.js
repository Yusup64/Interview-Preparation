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
    let count = 0;
    function dp(remain) {
        for (let i = 0; i < coins.length; i++) {
            if (remain - coins[i] >= 0) {
                count++;
                dp(remain - coins[i])
            }
        }
    }
    dp(amount);
    return count
}
console.log(coinChange(5, [1, 2, 5]));