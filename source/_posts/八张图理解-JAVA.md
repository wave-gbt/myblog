---
title: 八张图理解 JAVA
date: 2018-02-18 00:13:09
tags: Java
permalink: top-8-diagrams-for-understanding-java
copyright: true
password:
top:
---

　　一图胜千言，下面图解均来自 Program Creek 网站的 [Java教程](http://www.programcreek.com/java-tutorials/)，目前它们拥有最多的票选。如果图解没有阐明问题，那么你可以借助它的标题来一窥究竟。
<!-- more -->

## 字符串不变性
下面这张图展示了这段代码做了什么
```
 String s = "abcd";
 s = s.concat("ef");
```
![字符串不变性](/img/566535260001c98e06500279.jpg)

## equals()方法、hashCode()方法的区别
HashCode被设计用来提高性能。equals()方法与hashCode()方法的区别在于：

1. 如果两个对象相等(equal)，那么他们一定有相同的哈希值。
2. 如果两个对象的哈希值相同，但他们未必相等(equal)。

![equals](/img/5665355c0001a41106500369.jpg)

## Java异常类的层次结构
图中红色部分为受检查异常。它们必须被捕获，或者在函数中声明为抛出该异常。

![java 异常类的层次结构](/img/56653579000175e204981024.jpg)

## 集合类的层次结构
注意Collections和Collection的区别。（Collections包含有各种有关集合操作的静态多态方法）

![集合类的层次结构](/img/5665359400016c2f09100467.jpg)

## Java同步
Java同步机制可通过类比建筑物来阐明。

![Java同步](/img/566535b60001050603240216.jpg)

## 别名
别名意味着有多个变量指向同一可被更新的内存块，这些别名分别是不同的对象类型。

![别名](/img/566535fb000113f703170201.jpg)

## 堆和栈
图解表明了方法和对象在运行时内存中的位置。

![堆和栈](/img/566536260001052904960257.jpg)

## Java虚拟机运行时数据区域
图解展示了整个虚拟机运行时数据区域的情况。

![Java虚拟机运行时数据区域](/img/5665364300010ec905010363.jpg)


> 原文链接：[programcreek](https://www.imooc.com/article/2592)　　翻译：ImportNew.com - era_misa
> 译文链接：[http://www.importnew.com/11725.html](http://www.importnew.com/11725.html)
       
        