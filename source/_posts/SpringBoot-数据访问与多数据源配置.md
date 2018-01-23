---
title: SpringBoot 数据访问与多数据源配置
date: 2018-01-23 14:17:29
tags: [SpringBoot]
permalink: SpringBoot-multi-datasource
copyright: true
password:
top:
---

在一个应用中访问多个数据源的情况在开发场景中很常见，比如 MySQL 的分库场景，所以需要配置多个数据源。
<!-- more -->

## 引入 maven 依赖
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
## 数据源相关配置
```yaml
    # mysql
    spring.datasource.one.driver-class-name=com.mysql.jdbc.Driver
    spring.datasource.one.url=jdbc:mysql://localhost:3306/db1
    spring.datasource.one.username=root
    spring.datasource.one.password=root
    
    spring.datasource.two.driver-class-name=com.mysql.jdbc.Driver
    spring.datasource.two.url=jdbc:mysql://localhost:3306/db2
    spring.datasource.two.username=root
    spring.datasource.two.password=root
```

## 创建 dataSource 和 jdbcTemplate
设定主数据源为 `spring.datasource.one` 开头的配置，并添加 `@Primary` ，这样我们还可以享受 Spring Boot 提供的自动配置 DataSource 的机能。此外，第二数据源配置为 `spring.datasource.two` 开头的配置
```java
@Configuration
@EnableTransactionManagement
public class BeanConfig {
 
    @Bean(name = "oneDataSource")
    @Qualifier("oneDataSource")
    @Primary
    @ConfigurationProperties(prefix="spring.datasource.one")
    public DataSource oneDataSource() {
        return DataSourceBuilder.create().build();
    }
 
    @Bean(name = "twoDataSource")
    @Qualifier("twoDataSource")
    @ConfigurationProperties(prefix="spring.datasource.two")
    public DataSource twoDataSource() {
        return DataSourceBuilder.create().build();
    }
 
    @Bean(name = "oneJdbcTemplate")
    public JdbcTemplate oneJdbcTemplate(@Qualifier("oneDataSource") DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }
    @Bean(name = "twoJdbcTemplate")
    public JdbcTemplate twoJdbcTemplate(@Qualifier("twoDataSource") DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }
}
```

## 单元测试用例
```java
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(WebMain.class)
public class JdbcTest {
 
    @Resource(name="oneJdbcTemplate")
    protected JdbcTemplate jdbcTemplate1;
    @Resource(name="twoJdbcTemplate")
    protected JdbcTemplate jdbcTemplate2;
 
    @Test
    public void test() throws Exception {
        jdbcTemplate1.update("insert into t_author(id, name, age) values(?, ?, ?)", 1, "gbt", "22");
        jdbcTemplate2.update("insert into t_author(id, name, age) values(?, ?, ?)", 1, "wave", "23");
    }
}
```