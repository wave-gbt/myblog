---
title: Tomcat 80端口被占用的解决办法
permalink: tomcat-80-port-occupy
date: 2017-01-29 01:10:18
tags: tomcat
copyright: true
---
 
> 在企业版Eclipse中，在已经启动了Tomcat服务器后，准备运行页面或Servlet时，有时会出现这样的关于Tomcat服务器端口占用的问题：
“Several ports (8005, 8080, 8009) required by Tomcat v6.0 Server at localhost are already in use. The server may already be running in another process, or a system process may be using the port. To start this server you will need to stop the other process or change the port number(s).”
<!-- more -->

- 首先查看端口占用情况 ，使用以下命令
```
  sudo lsof -i:8080 
```
- 查看结果
```
java  1564 tomcat8  50u  IPv6  19336  0t0  TCP *:http-alt (LISTEN)
```
- kill 该进程 (pid) 即可，使用以下命令
```
sudo kill -9 1564
```
