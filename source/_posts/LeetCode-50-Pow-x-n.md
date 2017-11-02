---
title: 'LeetCode-50. Pow(x,n)'
permalink: leetcode-50-pow-x-n
date: 2017-08-21 22:21:22
tags: LeetCode
copyright: true
---

Implement pow(x, n).
<!-- more -->

__思路__

利用递归求解。

__代码__

```
    public double myPow(double x, int n)
    {
        if(n == 0) return 1D;
        long N = n; //use long to avoid overflow.
        return solve(n < 0 ? (1 / x) : x, N < 0 ? (N * -1) : N);
    }

    public double solve(double x, long n)
    {
        if(n == 1) return x;
        double val = solve(x, n / 2);
        return val * val * ((n % 2) == 0 ? 1 : x);
    }

```
