---
title: 去除JSP页面中的空白行
permalink: remove-jsp-page-blank
date: 2017-01-29 01:22:28
tags: jsp
---

> 由于JSP 页面里面往往会嵌套一些标签控制语句进行判断或者迭代，用Ctrl+u 查看源码时会看到代码很凌乱，会出现很多空白，所以下面是我遇到这种情况用到的方法
<!-- more -->

- 方法一：在Jsp页面head位置添加
```
<%@ page trimDirectiveWhitespaces="true" %>
```
- 方法二：在项目web.xml中添加
```
<servlet>
    <servlet-name>jsp</servlet-name>
    <servlet-class>org.apache.jasper.servlet.JspServlet</servlet-class>
    <init-param>
        <param-name>trimSpaces</param-name>
        <param-value>true</param-value>
    </init-param>
</servlet>
```
