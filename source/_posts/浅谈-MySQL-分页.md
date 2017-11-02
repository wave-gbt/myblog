---
title: 浅谈 MySQL 分页
permalink: analysis-mysql-limit
date: 2017-07-06 20:41:48
tags: mysql
copyright: true
---

为什么想去说一下这个问题，一言以蔽之，就是越往后分页，LIMIT语句的偏移量就会越大，速度也会明显变慢。
<!-- more -->
　　因为 MySQL 提供了`Limit`语法，相比于`Top`语法，`Limit`语法要显得优雅了许多。使用它来分页是再自然不过的事情了。
**最开始的写法：**
```
SELECT * FROM table ORDER BY id LIMIT offset, rows; 
```
　　第一个参数指定第一个返回记录行的偏移量，第二个参数指定返回记录行的最大数目，所以当数据量达到百万级的时候，查询效率会明显很慢。
**以下是我总结的一些优化方法：**
- 通过子查询的方式
```
SELECT * FROM table WHERE id >= (SELECT id FROM table LIMIT 1000000, 1) LIMIT 10; 
```
子查询的方式要设置`id`为索引。因为子查询是在索引上完成的，而普通查询是在数据文件上完成的，所以子查询的效率会远高于普通的查询。
- 通过 between...and 的方式
```
SELECT * FROM table WHERE id BETWEEN 1000000 AND 1000010; 
```
- 如果需要查询 id 不是连续的一段，最佳的方法就是先找出 id ，然后用 in 查询 
```
SELECT * FROM table WHERE id IN(10000, 100000, 1000000...); 
```
索引对 MySQL 的`in`语句也是有效的。
　　所以优化查询搜索的关键还是看检索字段有没有走索引，我们可以通过查看 sql 语句的执行计划对 sql性能进行调优。
