---
title: LeetCode-176. Second Highest Salary
date: 2017-11-07 14:22:31
tags: [LeetCode,mysql]
permalink: leetcode-second-height-salary
copyright: true
password:
top:
---

Write a SQL query to get the second highest salary from the `Employee` table.
<!-- more -->

```
+----+--------+
| Id | Salary |
+----+--------+
| 1  | 100    |
| 2  | 200    |
| 3  | 300    |
+----+--------+
```
For example, given the above Employee table, the query should return 200 as `the second highest salary`. If there is no second highest salary, then the query should return `null`.
```
+---------------------+
| SecondHighestSalary |
+---------------------+
| 200                 |
+---------------------+
```
**思路：**
　　按薪水`salary` 倒序排序，然后从第一个开始，取下一个。
　　
**一开始我的SQL(`Wrong Answer`)**
```
    SELECT DISTINCT Salary as SecondHighestSalary
      FROM Employee
  ORDER BY Salary DESC
     LIMIT 1 OFFSET 1
```
忽略了如果表中`salary`的值只有一种的情况，这样就没有`the second highest salary`，输出 `null`.
**正确写法：**
```
SELECT IFNULL(
      (SELECT DISTINCT Salary
       FROM Employee
       ORDER BY Salary DESC
        LIMIT 1 OFFSET 1),
       NULL) AS SecondHighestSalary
```
**IFNULL**
　　这儿用到了 MySQL 的 `IFNULL(expr1,expr2)`函数，如果 expr1 不是 NULL，IFNULL() 返回 expr1，否则它返回 expr2。
　　

