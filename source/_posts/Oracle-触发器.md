---
title: Oracle 触发器
date: 2017-12-04 10:40:55
tags: Oracle
permalink: oracle-trigger
copyright: true
password:
top:
---

## 触发器相关概念及语法
### 触发器概述
#### 什么是触发器
　　触发器是一种特殊的存储过程，和存储过程和存储函数一样是一个pl/sql程序块，触发器是不能接受参数，不能显示调用，只是随着事件触发隐式运行的存储过程程序块。
<!-- more --> 
#### 触发器的应用场景
1. 复杂的安全性检查
2. 数据确认
3. 实现审计功能
4. 完成数据的备份和同步

### 触发器概念和第一个触发器
#### 概念
　　数据库触发器是一个与表相关联的，存储的PL/SQL程序，每当一个特定的数据库操作语句（insert ，update，delete）在指定的表上发出时，Oracle自动地执行触发器中定义得语句序列。

#### 第一个触发器
```oraclesqlplus
-- 第一个触发器：每当成功插入新员工后，自动打印“成功插入新员工”
-- 触发器单词：trigger
create trigger saynewem -- 创建触发器名称
after insert -- 在插入操作以后
on emp -- 针对emp的表
declare -- 操作体
begin
 dbms_output.put_line('成功插入新员工');  -- 触发器操作的内容 
end;

```

### 触发器的应用场景
1. 复杂的安全性的场景(涉及到权限的问题)；
2. 数据的确认(涉及数据是否合理问题)；
3. 数据的审计(涉及到数据的增、删、改的操作记录)；
4. 数据的备份和同步(备份和同步重要);

### 触发器的语法
```
create[or replace] trigger 触发器名
{before|after}
{delete|insert|update[of 列名]}
on 表名
[for each row [when(条件)]]  (有这条语句的话就是行级触发器,否则就是语句级触发器)
PLSQL 块
```

### 触发器的类型
#### 语句级触发器
　　在指定的操作语句操作之前或之后执行一次，不管这条语句影响了多少行。(针对的是表，触发最多一次)
#### 行级触发器
　　触发语句作用的每一条记录都被触发。在行级触发器中使用 :old 和 :new 伪记录变量，识别值的状态。(针对的是行，触发器触发次数不一样，有多少行满足条件就触发多少次)

## 触发器应用
### 应用一——复杂的安全性检查
```oraclesqlplus
-- 例如禁止在非工作时间插入数据
/**
  1.周末： to_char(sysdate,'day') in ('星期六'，‘星期日’)
  2.上班前，下班后： to_number(to_char(sysdate,'hh24')) not between 9 and 18
/

create or replace trigger securityemp
before insert 
on emp 
begin 
  if to_char(sysdate,'day') in ('星期六', '星期日') or
    to_number(to_char(sysdate,'hh24')) not between 9 and 18 then

   raise_application_error(-20001,'禁止在非工作时间插入新员工');
 end if;
end;
/
```

### 应用二——数据确认
```oraclesqlplus
-- 涨工资不能越涨越少
/**
 * :old 和 :new 代表同一条记录
 * :old 表示操作该行之前，这一行的值
 * :new 表示操作该行值后，这一行的值
 */


create or replace trigger check_salary
before update 
on emp
for each row
begin 
if :new.sal<:odl.sal then
raise_application_error(-20002,'涨后薪水不能少于涨前薪水。 涨后薪水为：'||:new.sal ||'涨前的薪水：'||:old.sal);
end if;
end;
```

### 应用三——实现审计功能
```oraclesqlplus
-- 给员工涨工资，当涨后的薪水超过6000块时候，审计该员工的信息

-- 创建表，用于保存审计信息
create table audit_info(
information varchar2(200)
);

create or replace trigger do_audit_emp_salary
after update 
on emp
for each row 
begin 
if :new.sal>6000 then 
insert into audit_info values(:new.empno||' '||:new.ename||' '||:new.sal);
end if;
end;
```

### 应用四——完成数据的备份和同步
```oraclesqlplus
-- 创建备份表
create table emp_back as select * from emp;
-- 利用触发器实现数据的同步部分
-- 当给员工涨完工资后，自动备份新的工资到备份表中
create or replace trigger sync_salary
after update 
on emp
for each row 
begin
  -- 当主表更新后，自动更新备份表
   update emp_back set sal=:new.sal where empno=:new.empno; 
end;
/
```

> Reference: 
> - [慕课网－oracle 触发器](https://www.imooc.com/video/8744)
