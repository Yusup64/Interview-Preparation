/*
 * @lc app=leetcode.cn id=69 lang=javascript
 *
 * [69] Sqrt(x)
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) { 
    let left = 0, right = x;
    while(left < right) {
        let mid = Math.floor((left + right) / 2);
        if(mid * mid > x) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left - 1;
};
console.log(mySqrt(9));
// @lc code=end

