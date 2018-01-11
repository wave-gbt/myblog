---
title: SpringBoot 整合JdbcTemplate 访问 MySQL 数据库
date: 2018-01-11 15:17:26
tags: [Java,SpringBoot]
permalink: springboot-JdbcTemplate-mysql
copyright: true
password:
top:
---
归纳总结 `SpringBoot` 使用 `JdbcTemplate` 访问数据源的使用场景。
<!-- more --> 

## 添加 maven 依赖

```xml
    <!-- 添加 jdbc 的依赖 --> 
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-jdbc</artifactId>
    </dependency>
    
    <!-- mysql 连接类 -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <scope>runtime</scope>
    </dependency>
    
    
    <!-- 连接池类 -->
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>druid</artifactId>
        <version>1.0.29</version>
    </dependency>
```

## 配置文件中配置相关信息
```yaml
    spring.datasource.driver-class-name=com.mysql.jdbc.Driver
    spring.datasource.url=jdbc:mysql://localhost:3306/test
    spring.datasource.username=root
    spring.datasource.password=moma
```

## 然后在数据持久层(Dao)使用即可
```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

/**
 * @author botaogou@gmail.com
 * @create 2018-01-11 15:15
 * **/
public class JdbcDemoDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public int add(String str,String code) {
        return jdbcTemplate.update("insert into account(title, code) values(?, ?)", str,code);
    }
}

```

