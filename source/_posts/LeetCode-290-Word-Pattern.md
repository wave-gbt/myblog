---
title: LeetCode-290. Word Pattern
permalink: leetcode-290-word-pattern
date: 2017-09-12 21:54:51
tags: LeetCode
---

Given a pattern and a string str, find if str follows the same pattern.
<!-- more -->
Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty word in str.

__Examples:__
```
pattern = "abba", str = "dog cat cat dog" should return true.
pattern = "abba", str = "dog cat cat fish" should return false.
pattern = "aaaa", str = "dog cat cat dog" should return false.
pattern = "abba", str = "dog dog dog dog" should return false.
```
__Notes:__
You may assume pattern contains only lowercase letters, and str contains lowercase letters separated by a single space.
__代码__
```
public boolean wordPattern(String pattern, String str) {
        String[] strs = str.split(" ");  
        if(pattern.length() != strs.length) return false;  
        Map<Character, String> map = new HashMap<Character, String>();  
        for(int i=0;i<pattern.length();i++) {  
            if(!map.containsKey(pattern.charAt(i))) {  
                if(map.containsValue(strs[i])) return false;  
                map.put(pattern.charAt(i), strs[i]);  
            }else {  
                if(strs[i].equals(map.get(pattern.charAt(i)))) continue;  
                else return false;  
            }  
        }  
        return true; 
    }
```
