/*
 * @lc app=leetcode.cn id=112 lang=javascript
 *
 * [112] 路径总和
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function(root, targetSum) {
    if(!root) return false;
    // BFS法 创建两个数组 一个记录所有节点 一个记录路径和
    let queue = [];
    const res = [];
    queue.push(root);
    res.push(root.val);
    while(queue.length) {
        const top = queue.pop();
        const sum = res.pop();
        if(top.left == null && top.right === null) {
            if(sum === targetSum) return true;
        }
        if(top.left) {
            queue.push(top.left);
            res.push(sum + top.left.val);
        }
        if(top.right) {
            queue.push(top.right);
            res.push(sum + top.right.val);
        }
    }
    return false;
};
// @lc code=end

