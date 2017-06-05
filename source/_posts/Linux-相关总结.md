---
title: Linux 相关总结
permalink: linux-summary
date: 2017-02-06 22:56:07
tags: linux
---

> 一些Linux常用命令相关总结，会不断补充。
<!-- more -->

- 修改文件夹权限（递归设置）
```
sudo chmod 765 filename -R
```
- 查找相关端口进程
```
lsof -i:8080
```
- 通过游览器共享文件
```
python -m SimpleHTTPServer 9999
```
- .gz.tar 解压/压缩
```
# 解压
tar zxvf FileName.tar.gz
# 压缩
tar zcvf FileName.tar.gz DirName
```
-  查看内存情况
```
free -m
```
- 查看系统情况
```
lsb_release -a
uname -a
```
- 上一次ssh 连接
```
!ssh
```
