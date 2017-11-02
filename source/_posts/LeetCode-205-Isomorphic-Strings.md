---
title: LeetCode-205. Isomorphic Strings
permalink: leetcode-205-isomorphic-strings
date: 2017-09-12 21:33:46
tags: LeetCode
copyright: true
---

Given two strings s and t, determine if they are isomorphic.
<!-- more -->
Two strings are isomorphic if the characters in s can be replaced to get t.

All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character but a character may map to itself.
__For example,__
Given `"egg", "add"`, return `true`.
Given `"foo", "bar"`, return `false`.
Given `"paper", "title"`, return `true`.

__Note:__
You may assume both s and t have the same length.

__代码__
```
public boolean isIsomorphic(String s, String t) {
        if (s == null || t == null || s.length() != s.length()) {
            return false;
        }
        HashMap<Character,Character> m1 = new HashMap<Character,Character>();
        HashMap<Character,Character> m2 = new HashMap<Character,Character>();
        for (int i = 0; i < s.length(); i++) {
            if (!m1.containsKey(s.charAt(i))) {
                if (m2.containsKey(t.charAt(i))) return false;
                m1.put(s.charAt(i), t.charAt(i));
                m2.put(t.charAt(i), s.charAt(i));
            } else {
                if (m1.get(s.charAt(i)) != t.charAt(i)) return false;
            }
        }
        return true;
    }
```
