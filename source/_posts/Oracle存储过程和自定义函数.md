---
title: Oracle存储过程和自定义函数
date: 2017-12-02 15:27:31
tags: Oracle
permalink: oracle-procedure-function
copyright: true
password:
top:
---

## 概述

　　存储过程和存储函数是指存储在数据库中供所有用户程序调用的子程序叫存储过程、存储函数。
<!-- more --> 
### 异同点：　
- 存储过程和存储函数的相同点：完成特定功能的程序。
- 存储过程和存储函数的区别：是否用return语句返回值。

## 存储过程的创建和调用
### 第一个存储过程：`打印 hello world`
```oraclesqlplus
create or replace procedure sayhelloword
as
  -- 说明部分,as一定要写
begin
    dbms_output.put_line('Hello World');
end;
/
```
### 调用存储过程
1. `exec sayhelloworld()`
2. 
```oraclesqlplus
-- 调用两次
begin
   sayhelloworld();
   sayhelloworld();
end;
/
```

### oracle 带参数的存储过程
```oraclesqlplus
-- 创建一个带参数的存储过程
-- 给指定的员工涨100块钱的工资，并且打印涨前后涨后的薪水
create or replace procedure raisesalary(eno in number) -- in 这是一个输入参数
as
  -- 定义一个变量保存涨前的薪水
    psal emp.sal%type;
begin
   -- 得到员工涨前的薪水
    select sal into psal from emp where empno=eno;
   -- 给该员工涨100块钱
    update emp set sal=sal+100 where empno=eno;
   -- 一般，这里不需要 commit ！ 也不需要 rollback
   -- 注意：一般不在存储过程或者存储函数中，commit 和 rollback 
   -- 打印
    dbms_output.put_line('涨前：'||psal||'，涨后：'||(psal+100));
end;
/
-- 调用：
begin
   raisesalary(7839);
   raisesalary(7566); 
end;
/
```

### 如何调试存储过程
1. 调试存储过程最好放到Oracle数据库所在的系统或虚拟机上，解压SQL developer ，双击运行。
2. 为了确保存储过程或函数是可调试的，右键“以编译并进行调试”，点击红色按钮“调试”
3. 利用已写好的调用函数进行调试。
4. 给调试账户授权
```oraclesqlplus
grant DEBUG CONNECT SESSION ,DEBUG ANY PROCEDURE to scott;
```

## 存储函数
### 函数的定义
　　是一个命名的存储程序，可带参数，并返回一个计算值。必须有return 子句，用于返回函数值。

### 创建存储函数语法
```oraclesqlplus
  create or replace function 函数名(参数列表)
  return 函数值类型
  as
  begin
    PLSQL子程序体;
  end;
```
**注意** 表达式中某个字段为空时，表达式返回值为空。为防止含有表达式的返回值错误，在可能为空的字段上加上NVL(字段名，0)。
```oraclesqlplus
--查询某个员工的年收入
create or replace function queryemp_income(eno in number)
return number
as 
    --定义变量接收薪水和奖金
    p_sal emp.sal%type;
    p_comm emp.comm%type;
begin
  select sal,comm into p_sal,p_comm from emp where empno=eno;
  --nvl为遇空函数，如果p_comm为空则返回0
  return nvl(p_comm,0)+p_sal*12;
end;
/
```

## out 参数
　　存储过程和存储函数都可以有多个输入（in）和输出参数（out），都可以通过out参数实现返回多个值。
```oraclesqlplus
-- out参数：查询某个员工姓名、月薪和职位
-- 原则： 如果只有一个返回值，用存储函数；否则，就用存储过程。
create or replace procedure queryempinfor(eno in number,pename out varchar2,
  psal out number,pjob out varchar2)
as 
begin
   -- 得到该员工的姓名、月薪和职位
    select ename,sal,empjob into pename,psal,pjob from emp where empno=eno;
end;
/
```

## 在 out 参数中访问光标

### 申明包结构
  - 包头(申明)
  - 包体(实现)

### 案例
```oraclesqlplus
-- 查询某个部门中所有员工的所有信息  //ref(reference引用) cursor(光标)
#包头
create or replace package mypackage as
type empcursor is ref cursor;
procedure queryEmpList(dno in number,empList out empcursor);
end mypackage;

#包体
create or replace package body mypackage as
procedure queryEmpList(dno in number,empList out empcursor) as
 begin
   open empList for select * from emp where deptno=dno;
 end queryEmpList;
end mypackage;
***********包体需要实现包头中声明的所有方法*********************
```

## 在应用程序中访问
　　在java应用程序中访问存储过程和存储函数以及访问包下的存储过程，可以查看**java API**文档。

> Reference: 
> - [慕课网－oracle 存储过程和自定义函数](https://www.imooc.com/learn/370)


