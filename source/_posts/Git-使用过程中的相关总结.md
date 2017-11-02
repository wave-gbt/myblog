---
title: Git 使用过程中的相关总结
permalink: git-about-use
date: 2017-02-26 16:10:28
tags: git
copyright: true
---
> Git是目前世界上最先进的分布式版本控制系统，尤其是它极其强大的分支管理，以下是我在开发中的一些总结，会不断补充。
<!-- more -->

- git 忽略文件权限
```
git config core.filemode false
```
- 回退到上一个版本
```
git reset --hard HEAD^
```
- 回退之后，想回到原来的版本，只要记得commit_id 就可以，commit_id 可以通过　git reflog 命令来找到。
```
git reset --hard commit_id
```
