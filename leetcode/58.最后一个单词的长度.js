/*
 * @lc app=leetcode.cn id=58 lang=javascript
 *
 * [58] 最后一个单词的长度
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
    let index = s.length - 1;
    while(index >= 0 && s[index] == ' ') {
        index--;
    }
    let count = 0;
    while(index >= 0 && s[index] != ' ') {
        count++;
        index--;
    }
    return count;
};
console.log(lengthOfLastWord("a"));
// @lc code=end

