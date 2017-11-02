---
title: LeetCode-1. Two Sum
permalink: leetcode-1-two-sum
date: 2017-09-07 21:09:51
tags: LeetCode
copyright: true
---

Given an array of integers, return indices of the two numbers such that they add up to a specific target.
You may assume that each input would have exactly one solution, and you may not use the same element twice.
<!-- more -->

Example:
```
Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].
```
__思路__

利用hashmap，key存放数值，value存放出现的位置。从前到后进行遍历，将target值减去当前的值,看是否存在map中,若存在map中则取出相应的标号，退出。

__代码__
```
public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> map = new HashMap<Integer, Integer>();
        int result[] = new int[2];
        for (int i = 0; i < nums.length; i++){
            int num = target - nums[i];
            if(map.containsKey(num)){
                result[0] = map.get(num);
                result[1] = i;
                return result;
            }
            map.put(nums[i], i);
        }
        return result;
    }
```
