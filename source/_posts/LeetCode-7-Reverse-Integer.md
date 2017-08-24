---
title: LeetCode-7. Reverse Integer
permalink: leetcode-7-reverse-integer
date: 2017-08-24 21:53:40
tags: LeetCode
---

Reverse digits of an integer.
<!-- more -->

Example1:
```
x = 123, return 321
```
Example2:
```
x = -123, return -321
```

Note:

The input is assumed to be a 32-bit signed integer. Your function should return 0 when the reversed integer overflows.

__代码__

```
public long reverse(int x){
    long y=0;
    int n;
    while( x != 0){
        n = x%10;
        y = y*10 + n;
        x /= 10;
    }
    return y;
} 
```
