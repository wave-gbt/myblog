---
title: 慕课网 Oracle 高级教程
permalink: imooc-oracle-course
date: 2017-07-31 17:15:51
tags: Oracle
copyright: true
---

　　高级查询在数据库的开发过程中应用广泛，本教程通过大量的案例和老师的详细讲解，从分组查询、多表查询和子查询三个方面介绍Oracle的高级查询，也介绍了一些查询的应用场景。
<!-- more --> 
#### 分组查询
1. 分组函数的概念：
 分组函数作用于一组数据，并对一组数据返回一个值。
2. 分组函数的使用：
```
- avg()　/**求平均值**/　eg: select avg(sal)　from emp;
- sum()  /**求总和**/　eg: select sum(sal)　from emp;
- min()  /**求最小值**/　eg: select min(sal)　from emp;
- max()  /**求最大值**/　eg: select max(sal)　from emp;
- count()  /**求个数**/　eg: select count(deptno)　from emp;
- distinct  /**剔除重复**/  eg: select count(distinct deptno) from emp;
- WM_CONCAT  /**行转列**/  eg: select deptno ，wm_concat(ename) from emp group by deptno;  
/**按照部门号分组，将相同部门号的员工以逗号分隔的形式展示到一行中**/
```
**注意**：
　　分组函数会自动忽略空值，要用`nvl()` 函数转换空值才行.
__NVL（表达式1，表达式2）__
　　如果表达式1为空值，NVL返回值为表达式2的值，否则返回表达式1的值。 该函数的目的是把一个空值（null）转换成一个实际的值。其表达式的值可以是数字型、字符型和日期型。但是表达式1和表达式2的数据类型必须为同一个类型。
3. group by字句分组：
```
// 查询不同部门，不同职位的员工工资
select deptno ,job,sum(sal) from emp group by deptno, job;
```
**注意**：
　　在select 列表中所有未包含在组函数中的列都应该包含在group by子句中，不然属于非法使用组函数。
4. 使用having 字句过滤分组：
`having` 字句和 `where`一样，可以进行条件过滤。

**注意**：
 　　`having`先分组在过滤；`where`先过滤在分组。`where`效率更高，`where`中不能使用分组函数。
　　两者可以通用的话。我们尽量先过滤再分组，即尽量使用where,优化，提高性能
5. 在分组查询中使用排序：
 order by 子句可以跟 字段名 别名 表达式（聚合函数）以及 字段的位置序号。
```
select deptno avg(sal) from emp group by deptno order by deptno;　
```
6. group by 语句的增强：
group by语句的增强，主要用于报表中
```
select deptno,job,sum(sal) from emp group by deptno,job;
select deptno,sum(sal) from emp group by deptno;
select sum(sal) from emp;
```
上面的三条语句合起来的效果与下面的一条语句相同,下面是 group by 语句的加强
```
select deptno,job,sum(sal) from emp group by rollup(deptno,job);
// 语法
select 列名1,列名2,组函数(x) from tablename group by rollup(列名1,列名2);
```
7. sql*plus的报表功能：
- 使用ttitle命令设置报表的名称，col表示列的意思，15表示空15列显示“我的报表”这个标题，然后再空35个列，显示sql.pno,sql.pno表示报表的页码。
- col也可以用来设置列的别名，比如第二行把deptno标题设置为部门号
- break on deptno skip 1，在上一节课程已经介绍过，表示遇见重复的部门号就只显示一次，不同的部门号之间空一行
- set pagesize 10  每页显示10行
#### 多表查询
1. 什么是多表查询？ 
从多个表中获取数据就称为多表查询
![duobiao](/img/58b782c80001238f12800720.jpg)
2. 笛卡尔积
两张表进行`笛卡尔积`运算，最终结果的列数等于各表中列数之和，行数等于各个表中行数之积。
![duobiao](/img/591c6eb300015ae512800720.jpg)
为了避免使用`笛卡尔全集`，使用where加入有效的连接条件
多表链接条件个数至少为`（n-1）`n为表的个数。
3. 等值连接
等值连接，连接条件用等号相连。
```
select e.empno,e,ename,e.sal,d.dname from emp e,deptno d where e.deptno=d.deptno;
```
4. 不等值连接
连接条件中间不是由等号相连
```
select e.empno,e.ename,e.sal,s.grade from emp e,salgrade s where e.sal between s.losal and s.hisal;
```
5. 外连接
__外连接__：通过外连接，把对于连接条件不成立的记录，仍然包含在最后的结果中
__左外连接__：当连接条件不成立的时候，等号左边的表仍然被包含 a = b（+）
__右外连接__：当连接条件不成立的时候，等号右边的表仍然被包含  a（+）= b
```
// 按部门统计员工人数，要求显示：部门号，部门名称，人数
select d.deptno 部门号,d.dname 部门名称,count(e.empno) 人数
from emp e,dept d
where e.deptno(+)=d.deptno
group by d.deptno,d.dname;
```
6. 自连接
通过表的别名，将一张表视为多张表
```
// 查询验工姓名和员工老板的姓名
select e.ename 员工姓名，b.ename 老板
from emp e,emp b
where e.mgr=b.empno;//员工的老板号 = 老板的员工号
```
**注意**
自连接存在的问题:不适合操作大表,会产生笛卡尔积
层次查询优点:本质是一个单表查询,不涉及笛卡尔乘积原理,便于查找
```
select level,empno,ename,sal,mgr 
from emp 
connect by prior empno=mgr
start with mgr is null order by 1;
```
#### 子查询
1. 子查询概述：
使用子查询解决不能一步完成的查询（查询的嵌套）
```
// 查询比scott工资高的员工信息
select  * from emp 
where sal>(select * from emp where ename = 'SCOTT')；
```
2. 子查询需要注意的10个问题：
- 子查询语法中的小括号
- 子查询的书写风格（方便阅读）
- 可以使用子查询的位置：where,select,having,from
- 不可以使用子查询的位置：group by
- 强调：from 后面的子查询
- 子查询和主查询可以不是同一张表
- 一般不在子查询中使用排序；但在Top-N分析问题中必须对子查询排序
- 一般先执行子查询再执行主查询；但是相关子查询例外
- 单行子查询只能使用单行操作符；多行使用多行
- 注意:子查询中是null的问题
3. 可以使用子查询的位置：where 、select、having、from
4. 相关子查询：将主查询中的值作为参数传递给子查询
```
// 找出员工薪水大于本部门的平均薪水的员工
select empno,ename,sal,(select avg(sal) from emp where deptno=e.deptno) avgsal 
from emp e where sal > (select avg(sal) from emp where deptno=e.deptno);
```
5. 不可以使用not in 来判断存在空值的集合。只要有空值，使用not in 永远都是假。

> Reference: 
> - [慕课网－oracle 高级查询](http://www.imooc.com/video/8494)
