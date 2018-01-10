---
title: Eclipse Maven Spring SpringMVC Mybatis 整合
permalink: eclipse-maven-spring-springmvc-mybatis-example
date: 2017-06-07 21:20:21
tags: [Java,Spring]
copyright: true
---

看慕课网【[Java高并发秒杀API](http://www.imooc.com/index/search?words=%E7%A7%92%E6%9D%80)】的系列课程时很受益。所以想着仿着来使用：Mavan-Spring-SpringMVC-Mybatis 的架构。本示例是在：Ubuntu15 上实现的；Windows 上安装 Maven 将不太相同。
<!-- more -->

## Maven Install
> 2016年09月10日 更新：较新版 Eclipse 都有集成 Maven，所以并不需要安装

1. Run command `sudo apt-get install maven`, to install the latest Apache Maven.
2. Run command `mvn -version to verify` your installation.
3. Where is Maven installed?
The command `apt-get` install the Maven in `/usr/share/maven`
The Maven configuration files are stored in `/etc/maven`

## Eclipse Maven Plugin - m2e
> 2016年09月10日 更新：较新版 Eclipse 都有集成 Maven，所以并不需要安装

1. open Eclipse -> Help -> click "Install New Software" -> click "add"
 - Name:m2e
 - Location:http://download.eclipse.org/technology/m2e/releases
2. click "ok" -> click "Maven Integration for Eclipse" -> click "Next"
3. restrat Eclipse
4. config m2e -> Window -> Preferences -> Maven -> Installations -> click "Add…" -> select Maven

<!-- more -->

## Create a Maven Project
1. File -> New -> New Maven project
2. select "Use default Workspace location"
3. select "maven-archetype-j2ee-simple"
4. input info -> Finish
5. 选中项目右键菜单中选择Properties -> Project Facets -> select "Dynamic Web Module" Version "3.1"

Tips:
- 如果在 `Project Facets` 选择版本时“can not change”，可以在项目目录下手动修改 `.settings/org.eclipse.wst.common.project.facet.core.xml` 文件配置
- 项目自动生成的 `web.xml` 版本较低，手动修改

``` xml
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
                      http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
	version="3.1" metadata-complete="true">
</web-app>
```
- 项目结构

```
├── src
    ├── main
    |   ├── java //java源代码
    |   ├── resources //配置资源文件
    |   └── webapp //web文件
    |
    └── test
	    └── java //junit测试
```

## pom.xml Config
[Github-maven-mybatis-spring-springmvc pom.xml](https://github.com/imzyf/maven-mybatis-spring-springmvc/blob/master/pom.xml)
``` xml
<!-- junit4 -->
<dependency>
	<groupId>junit</groupId>
	<artifactId>junit</artifactId>
	<version>4.11</version>
	<scope>test</scope>
</dependency>
<!-- 日志 -->
<!-- 实现slf4j接口整合 -->
<!-- JDBC MySQL Driver -->
<!-- DAO框架 mybatis -->
<!-- Servlet API -->
<!-- 1 Spring 核心依赖 -->
<!-- 2 Spring DAO依赖 -->
<!-- 3 Spring web相关依赖 -->
<!-- 4 Spring Test相关依赖 -->
```

## logback.xml Config
``` xml
<configuration>
	<appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
		<!-- encoders are assigned the type ch.qos.logback.classic.encoder.PatternLayoutEncoder
			by default -->
		<encoder>
			<pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n
			</pattern>
		</encoder>
	</appender>
	<root level="info">
		<appender-ref ref="STDOUT" />
	</root>
</configuration>
```

## Mybatis Config
[Github-maven-mybatis-spring-springmvc mybatis-config.xml](https://github.com/imzyf/maven-mybatis-spring-springmvc/blob/master/src/main/resources/mybatis-config.xml)
``` xml
<configuration>
	<settings>
		<!-- 使用jdbc的getGeneratedKays 获取数据库自增主键 -->
		<setting name="useGeneratedKeys" value="true" />
		<!-- 使用列别名替换列名 -->
		<setting name="useColumnLabel" value="true" />
		<!-- 是否开启自动驼峰命名规则（camel case）映射，即从经典数据库列名 A_COLUMN 到经典 Java 属性名 aColumn 的类似映射。 -->
		<setting name="mapUnderscoreToCamelCase" value="true" />
	</settings>
</configuration>
```

## Spring Config
[Github-maven-mybatis-spring-springmvc spring](https://github.com/imzyf/maven-mybatis-spring-springmvc/tree/master/src/main/resources/spring)

### Spring-DAO Config
``` xml
<!-- 1 数据库配置文件位置 -->
<context:property-placeholder location="classpath:jdbc.properties" />

<!-- 2 数据库连接池 -->
<!-- Employee DB data source. -->
<bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">

	<property name="driverClass" value="${jdbc.driverClassName}" />
	<property name="jdbcUrl" value="${jdbc.dburl}" />
	<property name="user" value="${jdbc.username}" />
	<property name="password" value="${jdbc.password}" />

	<!-- c3p0连接池 私有属性 -->
	<property name="maxPoolSize" value="${jdbc.maxPoolSize}" />
	<property name="minPoolSize" value="${jdbc.minPoolSize}" />
	<!-- 关闭连接后不自动commit -->
	<property name="autoCommitOnClose" value="false" />
	<!-- 获取连接超时时间 -->
	<property name="checkoutTimeout" value="1000" />
	<!-- 获取连接失败重试次数 -->
	<property name="acquireRetryAttempts" value="2" />
</bean>

<!-- 设计原则：约定大于配置 -->

<!-- 3 配置 SqlSessionFactory 对象 -->
<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
	<!-- 注入数据库连接池 -->
	<property name="dataSource" ref="dataSource" />
	<!-- 配置mybitis 全局配置文件 -->
	<property name="configLocation" value="classpath:mybatis-config.xml" />
	<!-- 扫描entity包 使用别名 -->
	<property name="typeAliasesPackage" value="com.moma.dmv.entity" />
	<!-- 扫描sql配置文件 mapper 需要的xml -->
	<property name="mapperLocations" value="classpath:mapper/*.xml" />
</bean>

<!-- 4 配置扫描Dao接口包，动态实现Dao接口，注入到spring容器中 -->
<bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
	<!-- 注入sqlsessionFactory -->
	<property name="sqlSessionFactoryBeanName" value="sqlSessionFactory" />
	<!-- 给出需要扫描Dao接口包 -->
	<property name="basePackage" value="com.moma.dmv.dao" />
</bean>
```
### Spring-Service Config
``` xml
<!-- 扫描service包下 所有使用注解的类型 -->
<context:component-scan base-package="com.moma.dmv.service" />

<!-- 配置事务管理器 -->
<bean id="transactionManager"
	class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
	<property name="dataSource" ref="dataSource" />
</bean>

<!-- 配置基于注解的声明式事务 -->
<tx:annotation-driven transaction-manager="transactionManager" />

<!-- 使用注解控制事务方法的优点
1：开发团队达成一致约定，明确标注事务方法的编程风格
2：保证事务方法的执行时间尽可能短，不要穿插其他网络操作RPC/HTTP请求或者剥离到事务方法外部
3：不是所有的方法都需要事务，比如只有一条修改操作，只读操作不需要事务控制
-->
```

### Spring-Web Config
``` xml
<!-- 1:开启springMVC 注解模式 -->
<mvc:annotation-driven />

<!-- 2 静态资源默认servlet配置 1 加入对静态资源的处理 js gif png 2 允许使用“/”做整体映射 -->
<mvc:default-servlet-handler />

<!-- 3:配置jsp 显示ViewResolver -->
<bean
	class="org.springframework.web.servlet.view.InternalResourceViewResolver">
	<!-- 决定视图类型，如果添加了jstl支持（即有jstl.jar），那么默认就是解析为jstl视图 -->
	<property name="viewClass"
		value="org.springframework.web.servlet.view.JstlView" />
	<!-- 视图前缀 -->
	<property name="prefix" value="/WEB-INF/jsp/" />
	<!-- 视图后缀 -->
	<property name="suffix" value=".jsp" />
</bean>

<mvc:resources location="/resources/" mapping="/resources/**" />

<!-- 4:扫描web相关的bean -->
<context:component-scan base-package="com.moma.dmv.web" />
```

## DAO Mapper Example
``` xml
<?xml version="1.0" encoding="utf-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.moma.dmv.dao.InfoDao">

  	<select id="queryById" resultType="Info" parameterType="long">
		<![CDATA[
		select id,`key`,`value` from info where id = #{id}
		]]>
	</select>

	<select id="queryAll" resultType="Info">
		<![CDATA[
		select id,key,value
		from info
		limit #{offset},#{limit}
		]]>
	</select>

</mapper>
```

## web.xml Config
``` xml
<servlet>
	<servlet-name>dmv-dispatcher</servlet-name>
	<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
	<!-- 配置springMVC需要加载的配置文件 spring-dao.xml spring-service.xml spring-web.xml
		mybatis -> spring -> springMVC -->
	<init-param>
		<param-name>contextConfigLocation</param-name>
		<param-value>classpath:spring/spring-*.xml</param-value>
	</init-param>
</servlet>
<servlet-mapping>
	<servlet-name>dmv-dispatcher</servlet-name>
	<!-- 默认匹配所有的请求 -->
	<url-pattern>/</url-pattern>
</servlet-mapping>
```

## JUnit Example
``` java
import javax.annotation.Resource;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.moma.dmv.dao.InfoDao;
import com.moma.dmv.entity.Info;

RunWith(SpringJUnit4ClassRunner.class)
ContextConfiguration(locations = { "classpath:spring/spring-dao.xml" })
public class InfoDaoTest {

	@Resource
	private InfoDao infoDao;
	private Logger logger = LoggerFactory.getLogger(this.getClass());

	@Test
	public void testQueryById() throws Exception {
		long id = 1;
		Info info = infoDao.queryById(id);
		logger.info(info.toString());
	}
}
```

> Reference:
> - [zyf.im](https://zyf.im/2016/06/27/eclipse-maven-spring-springmvc-mybatis-example/)
> - [MKyong-How to install Maven on Ubuntu](http://www.mkyong.com/maven/how-to-install-maven-in-ubuntu/)
> - [Java之道-使用Eclipse构建Maven项目 (step-by-step)](http://blog.csdn.net/qjyong/article/details/9098213)
