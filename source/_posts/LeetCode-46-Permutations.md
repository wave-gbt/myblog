---
title: LeetCode-46. Permutations
permalink: leetcode-46-permutations
date: 2017-08-19 20:04:06
tags: LeetCode
---

Given a collection of distinct numbers, return all possible permutations.
<!-- more -->

For example,
[1,2,3] have the following permutations:
```
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]
```
__思路__

对于nums数组中的每一个数，都依次放入结果集中，如果结果集中已经包含这个数，就继续下一次循环。

以数组[1,2,3]为例，每次循环的结果是：
```
[1,2,3]
[1,3,2]
[2,1,3]
[2,3,1]
[3,1,2]
[3,2,1]
```
__代码__
```
public List<List<Integer>> permute(int[] nums) {
   List<List<Integer>> list = new ArrayList<>();
   backtrack(list, new ArrayList<>(), nums);
   return list;
}

private void backtrack(List<List<Integer>> list, List<Integer> tempList, int [] nums){
   if(tempList.size() == nums.length){
      list.add(new ArrayList<>(tempList));
   } else{
      for(int i = 0; i < nums.length; i++){ 
         if(tempList.contains(nums[i])) continue;
         tempList.add(nums[i]);
         backtrack(list, tempList, nums);
         tempList.remove(tempList.size() - 1);
      }
   }
}

```
