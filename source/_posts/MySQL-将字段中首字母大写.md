---
title: MySQL 将字段中首字母大写
permalink: mysql-upcase-first-letter
date: 2017-06-22 21:47:48
tags: mysql
copyright: true
---

　　英文的单纯一般首个字母都是大写的，虽然MySQL中有转换大小写字母的函数，但是那是对整个字段都进行转换，如果需要将字段中首字母大写却没有直接的函数，不过我们可以使用其它的函数将字符串切割，再转换为大写，最后再拼接字符串即可。
<!-- more -->
#### 一使用到的函数：
- CONCAT(str1,str2)：字符连接函数 
- UPPER(str)：将字符串改为大写字母 
- LOWER(str)：将字符串改为小写字母 
- LENGTH(str)：判定字符串长度 
- SUBSTRING(str,a,b)：提取字段中的一段，从字符串str的第a位开始提取，提取b个字符 
- LEFT(str,n)：提取字符串最左边的n个字符 
- RIGHT(str,n)：提取字符串最右边的n个字符（该例未用到） 
#### 解决思路 
1. 用LEFT单独将首字母取出并用UPPER换成大写 
2. 确定字段的长度，并用SBUSTRING取出从第二位到最后一位的所有字段备用。 
3. 用CONCAT连接上边的两个值 
4. update表中字段的值即可。 

#### 解决方法
```
update table set field = concat(UPPER(left(field,1)),substring(field,2,(length(field)-1))); 
```
