---
title: 构建第一个SpringBoot工程
date: 2018-01-10 14:47:57
tags: [Java,SpringBoot]
permalink: build-first-springBoot-project
copyright: true
password:
top:
---
  学习和使用 `SpringBoot` 有一段时间了,现在开始陆陆续续会总结归纳 SpringBoot 学习中遇到的相关知识点。
<!-- more --> 

## SpringBoot
设计目的是用来简化新Spring应用的初始搭建以及开发过程。
为Spring生态系统提供了一种固定的、约定优于配置风格的框架。 
开箱即用，没有代码生成，也无需XML配置。同时也可以修改默认值来满足特定的需求。
 
## 环境准备
1. jdk1.8+
2. maven 3.0+
3. IDEA

## 搭建步骤
```markdown
    - 打开 IDEA
    - New Project
    - Spring Initializr => next
    - 填写 group、artifact ->钩上web(开启web功能）
    - next
```
## 工程结构
```markdown
    - src
        -main
            -java
                -package
                    -SpringbootApplication
            -resouces
                - statics
                - templates
                - application.yml
        -test
    - pom
```

- pom文件为基本的依赖管理文件
- resouces 资源文件 
    - statics 静态资源
    - templates 模板资源
    - application.yml 配置文件
- SpringbootApplication 程序的入口&启动类

## pom.xml 配置
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" 
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.forezp</groupId>
    <artifactId>springboot-first-application</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <packaging>jar</packaging>

    <name>springboot-first-application</name>
    <description>Demo project for Spring Boot</description>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>1.5.2.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <java.version>1.8</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

## 测试 Demo
```java
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *  测试用例
 *
 * @author botaogou@gmail.com
 * @create 2018-01-05 11:32
 **/

@RestController
public class DemoController {

    @RequestMapping("/hello")
    String index() {
        return "Hello World!";
    }
}
```

然后启动 `SpringbootApplication` 的 main 方法, 然后打开游览器`localhost:8080/hello`,浏览器显示 
> Hello World!

测试通过~