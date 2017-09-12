---
title: LeetCode-167. Two Sum II - Input array is sorted
permalink: leetcode-167-two-sum-II
date: 2017-09-12 21:10:31
tags: LeetCode
---

Given an array of integers that is already sorted in ascending order, find two numbers such that they add up to a specific target number.
<!-- more -->
The function twoSum should return indices of the two numbers such that they add up to the target, where index1 must be less than index2. Please note that your returned answers (both index1 and index2) are not zero-based.

You may assume that each input would have exactly one solution and you may not use the same element twice.

__Input:__ numbers={2, 7, 11, 15}, target=9
__Output:__ index1=1, index2=2

__思路__
因为数组是有序的，所以通过二分法解决。

__代码__
```
class Solution {
    public int[] twoSum(int[] numbers, int target) {
        if(numbers==null || numbers.length < 1) return null;
        int i=0, j=numbers.length-1;
        while(i<j) {
            int x = numbers[i] + numbers[j];
            if(x<target) {
                ++i;
            } else if(x>target) {
                --j;
            } else {
                return new int[]{i+1, j+1};
            }
        }
        return null;
    }
}
```

