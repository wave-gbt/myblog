---
title: 如何在IDEA启动多个Spring Boot工程实例
date: 2018-01-09 14:53:37
tags: [SpringBoot,IDEA,Spring]
permalink: how-to-start-multiple-spring-boot-instances-with-idea
copyright: true
password:
top:
---

## step1
在 IDEA 上点击 `Edit Configuration`
<!-- more -->
![Edit](/img/aaaaa.png)

## step2
打开配置后，将默认的 `Single instance only` (单实例)的钩去掉
![cancel](/img/bbbbbb.png)

## step3
通过修改 application 文件的**server.port** 的端口，启动。
多个实例，需要多个端口，分别启动。