---
title: LeetCode-35. Search Insert Position
permalink: leetcode-35-search-insert-position
date: 2017-08-29 21:50:46
tags: LeetCode
---

Given a sorted array and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.
<!-- more -->
You may assume no duplicates in the array.

Here are few examples.
```
[1,3,5,6], 5 → 2
[1,3,5,6], 2 → 1
[1,3,5,6], 7 → 4
[1,3,5,6], 0 → 0
```

__思路__

二分查找,还需要考虑到边界的问题。

__代码__
```
public static void main(String[] args) throws Exception {
        int[] arr = {1, 3, 5, 6};
        int result = new Test().searchInsert(arr, 6);
        System.out.println(result);
    }

    public static int searchInsert(int[] arr, int target) {
        if (arr == null || arr.length == 0) {
            return -1;
        }
        int start = 0;
        int end = arr.length - 1;
        while (start + 1 < end) {
            int mid = start + (end - start) / 2;
            if (target == arr[mid]) {
                return mid;
            } else if (arr[mid] > target) {
                end = mid;
            } else if (arr[mid] < target) {
                start = mid;
            }
        }
        if (arr[start] == target) {
            return start;
        }
        if (arr[end] == target) {
            return end;
        }
        return -1;
    }
```
