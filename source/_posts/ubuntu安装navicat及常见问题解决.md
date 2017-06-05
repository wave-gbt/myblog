---
title: ubuntu安装navicat及常见问题解决
permalink: ubuntu-install-navicat
date: 2017-03-24 22:07:43
tags: linux
---

> 如果系统中没有安装wine组件则执行./start_navicat命令则系统毫无反应，没有错误日志等，因此需要安装wine和修改脚本...
<!-- more --> 

1. 安装navicat
  - 下载Navicat，网址：http://www.navicat.com/en/download/download.html 
  - 进入下载目录，解压压缩包：tar -zxvf  navicat11_mysql_en.tar.gz
  - 打开解压后的目录，会看到 start_navicat文件  运行他就可以了
  - 执行命令： ./start_navicat  。执行命令后便启动navicat
2. 常见问题解决：
 如果系统中没有安装wine组件则执行./start_navicat命令则系统毫无反应，没有错误日志等，因此需要安装wine和修改脚本：
   - 安装wine：sudo apt-get install wine
   - 修改start_navicat文件：找到winboot，改成wineboot后保存，然后重新执行./start_navicat命令
