---
title: LeetCode-49. Group Anagrams
permalink: leetcode-49-group-anagrams
date: 2017-08-19 20:04:34
tags: LeetCode
---

Given an array of strings, group anagrams together.
<!-- more -->

For example, given: 
```
[“eat”, “tea”, “tan”, “ate”, “nat”, “bat”], 
```
Return:
```
[
  ["ate", "eat","tea"],
  ["nat","tan"],
  ["bat"]
]
```
Note:

For the return value, each inner list’s elements must follow the lexicographic order.
All inputs will be in lower-case.

__思路__

将每一个字符串里面的字符进行排序放到HashMap中。

__代码__
```
public class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        List<List<String>> ll = new ArrayList<>();
        if (strs.length <= 0) return ll;
        Map<String, List<String>> map = new HashMap<>();
        for (String str : strs) {
            String sstr = sortStr(str);
             if (map.containsKey(sstr)) {
                map.get(sstr).add(str);
            } else {
                List<String> l = new ArrayList<>();
                l.add(str);
                map.put(sstr, l);
            }
        }
        return new ArrayList<>(map.values());
    }

    public String sortStr(String str) {
        char[] cc = str.toCharArray();
        Arrays.sort(cc);
        return String.valueOf(cc);
    }
}
```
