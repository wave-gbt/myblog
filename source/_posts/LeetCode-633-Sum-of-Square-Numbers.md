---
title: LeetCode-633. Sum of Square Numbers
permalink: leetcode-633-sum-of-square-numbers
date: 2017-09-07 21:10:20
tags: LeetCode
copyright: true
---

Given a non-negative integer c, your task is to decide whether there're two integers a and b such that a2 + b2 = c. 
<!-- more -->

Example 1:
```
Input: 5
Output: True
Explanation: 1 * 1 + 2 * 2 = 5
```

Example 2:
```
Input: 3
Output: False
```

__題意__

给一个数字 c，判断是否满足 `a^2 + b^2 = c`

__思路__

从 0 到 sqrt（c）之间进行遍历，检测剩下的数开方后是不是整数。

__代码__
```
boolean judgeSquareSum(int c) {
        int limit = (int) Math.sqrt(c);
        for (int n = 0; n <= limit; n++) {
            double test = Math.sqrt(c - n * n);
            if (test - (int)test == 0)
                return true;
        }
        return false;
    }
```
