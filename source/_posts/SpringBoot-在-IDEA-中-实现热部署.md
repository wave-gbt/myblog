---
title: SpringBoot 在 IDEA 中 实现热部署
date: 2018-01-12 16:36:02
tags: [SpringBoot,IDEA]
permalink: SpringBoot-hot-deployment-idea
copyright: true
password:
top:
---

前阵子鼓捣了半天 JRebel ，打算借助 JRebel 热部署 SpringBoot 项目,提高开发测试效率,还是没搞定,后发现可以修改 IDE 启动命令实现热部署。
<!-- more -->

## 修改IDE启动命令
### 下载 Springloaded 的 Jar 包
[下载位置](http://mvnrepository.com/artifact/org.springframework/springloaded/1.2.6.RELEASE)
放到本地磁盘的某个目录下
### 修改启动方式配置
点击 `Edit Configurations`
![Configurations](/img/aaaaa.png)
配置 VM options,Springloaded jar 包的所在位置
![VM options](/img/vvv.png)

### 打开自动编译
```markdown
    File->Settings->Build,Execution,Deployment->Compiler,选中 Build project automatically 
```
![打开自动编译](/img/qqqqq.png)

### 打开运行时编译
```markdown
    按快捷键 Shift+Ctrl+Alt+/ ，点击 Registry 
```
选中 `compiler.automake.allow.when.app.running`
![打开运行时编译](/img/wwww.png)

然后重启 IDEA 即可。

还有一种方式是通过 `spring-boot-devtools实现热部署`，但是我个人极不推荐，觉得这种方式虽然配置简单，只需要引入依赖即可，但是每次修改后都会自动重启项目，和手动重启没有太大区别，影响性能。
> 通过 spring-boot-devtools 实现热部署的参考文章
> [Spring boot 在Intellij IDEA 中的热部署](https://www.cnblogs.com/xiong233/p/6796847.html)
> [Intellij IDEA 使用Spring-boot-devTools无效解决办法](http://blog.csdn.net/u013938484/article/details/77541050)