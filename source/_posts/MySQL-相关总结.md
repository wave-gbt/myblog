---
title: MySQL 相关总结
date: 2017-02-01 19:47:35
tags: mysql
---
> 一些MySQL常用命令相关总结，会不断补充。
<!-- more -->


### 常用命令
 - 导出数据库全部表
```
mysqldump -uroot -p 数据库名 > xxx.sql 
```
- 导出数据库某张表
```
mysqldump -uroot -p 数据库名 表名 > xxx.sql
```
- 导出数据库某表的结构
```
mysqldump -uroot -p -d 数据库名 表名 > xxx.sql;
```
- 自动压缩
```
mysqldump -uroot -p 数据库名 | gzip > xxx.sql.gz
```
- 向数据库导入表
```
cat aaa.sql | mysql -h192.168.8.1 -uroot -p 数据库名
mysql -uroot -p dbname < aaa.sql
```
- 压缩的
```
gunzip < xxx.sql.gz | mysql -uroot -p 数据库名
```
- source 方式导入表
```
mysql -uroot -p
show databases;
use dbname;
source ~/Documents/xxx.sql
```
- 复制表
```
CREATE TABLE 新表 SELECT * FROM 旧表
```
- 复制表结构
```
CREATE TABLE 新表 SELECT * FROM 旧表 WHERE 1=2
CREATE TABLE 新表 LIKE 旧表
```
- 查看表结构
```
desc tablename
```
- 查看mysql的事务
```
SELECT * FROM information_schema.INNODB_TRX\G;
kill XXX
```
### 开启远程
- 允许所有ip访问
```
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'moma' WITH GRANT OPTION;
flush privileges;
```
- Ubuntu下还要修改 Mysql 配置文件 my.ini
```
sudo vim /etc/mysql/my.cnf
```
- 将 bind-address = 127.0.0.1 这一行注释掉, 即修改为:
```
#bind-address = 127.0.0.1
```
- 重启 MySQL
```
sudo /etc/init.d/mysql restart
```
### 修改密码
- 方法一：
```
SET PASSWORD FOR 'root'@'localhost' = PASSWORD('root');
```
- 方法二：
```
UPDATE user SET Password = PASSWORD('roothicc409') WHERE user = 'root';
```
### 长期使用Navicat 的方法
> 删除 ～/.navicat 文件夹，试用时间将重新计算，本地查询语句将丢失
可以使用 Navicat Cloud 服务（FREE），这样将永久保存查询语句
