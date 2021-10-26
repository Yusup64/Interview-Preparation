/*
 * @lc app=leetcode.cn id=1 lang=typescript
 *
 * [1] 两数之和
 */

// @lc code=start
// 时间复杂O(n2)
/* function twoSum(nums: number[], target: number): number[] {
    let k = 0, l = 0;
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length; j++) {
            if ((nums[j] + nums[i]) == target) {
                k = i, l = j;
                break;
            }
        }
    }
    return [k, l]
}; */
function twoSum(nums: number[], target: number): number[] {
    let map = {} as { [key: string]: any };
    for (let i = 0; i < nums.length; i++) {
        let diff = map[target - nums[i]]
        if (diff != null) {
            return [diff, i]
        } else {
            map[nums[i]] = i
        }
    }
    return []
}

// @lc code=end

