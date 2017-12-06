---
title: JS 获取字符串实际长度
date: 2017-12-06 17:19:25
tags: front-end
permalink: js-get-str-length
copyright: true
password:
top:
---

解决思路，把中文转换为两个字节的英文，再计算长度。
```js
    function getStrLength(str) {
         return str.replace(/[\u0391-\uFFE5]/g,"aa").length;
    }
```
<!-- more -->

> Reference: 
> - [JS获取字符串实际长度(包含汉字)的简单方法](http://www.jb51.net/article/90289.htm)
