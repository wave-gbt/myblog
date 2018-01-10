---
title: Spring 事务管理
date: 2018-01-08 10:01:51
tags: [Spring,Java]
permalink: spring-transaction
copyright: true
password:
top:
---

## 事务回顾
### 什么是事务？
  事务指的是逻辑上的一组操作，这组操作要么全部成功，要么全部失败。

### 事务的特性
1. 原子性：是指事务是一个不可分割的工作单位，事务中的操作要么都发送，要么都不发生。
2. 一致性：指事务前后数据的完整性必须保持一致。
3. 隔离性：隔离性指多个用户并发访问数据库时，一个用户的事务不能被其他用户的事务所干扰，多个并发事务之间数据要互相隔离。
4. 持久性：是指一个事务一旦被提交，它对数据库中数据的改变就是永久性的，即使数据库发送故障也不应该对其有任何影响。
<!-- more --> 

## 事务 API 介绍
### PlatformTransactionManager 事务管理器
![spring 事务管理器](/img/59f136eb0001ab7512800720.jpg)

### TransactionDefinition 事务定义信息（隔离、传播、超时、只读）
如果不考虑隔离性，会引发如下的安全问题：
1. 脏读：一个事务读取了另一个事务改写但还未提交的数据，如果这些数据被回滚，则读到的数据是无效的。
2. 不可重复读：在同一个事务中，多次读取同一数据返回的结果有所不同。
3. 幻读：一个事务读取了几行记录后，另一个事务插入一些记录，幻读就发生了。再后来的查询中，第一个事务就会发现有些原来没有的记录。

隔离级别的出现就是为了解决以上问题的。

数据库提供的事务的隔离级别(四种)：
1. READ_UNCOMMITED：允许你读取还未提交的改变了的数据，可能导致脏，幻，不可重复读。
2. READ_COMMINTED: 允许在并发事务已经提交后读取，可防止脏读，但幻读和不可重复读还是有可能发生。
3. REPEATABLE_READ: 对相同字段的多次读取是一致的，除非数据被事务本身改变，可防止脏读，不可重复读，但幻读仍有可能出现。
4. SERILIZABLE: 完全服从ACID的隔离级别，确保不发生脏读，幻读，不可重复读，这在所有的隔离级别中是最慢的，它是典型的完全通过锁定在事务中涉及的数据表来完成的。

**除了以上的数据库提供的事务隔离级别，spring提供了Default隔离级别，该级别表示spring使用后端数据库默认的隔离级别。**

`MySQL`默认事务隔离级别：`REPATABLE_READ`(可能出现幻读)
`Oracle`默认：`READ_COMMITTED`(可能出现不可重复读和幻读)

### TransactionDefinition 定义事务传播行为

事务的传播行为：主要是解决业务层方法之间的相互调用的问题。
Spring定义了7种事务的传播行为，可以分为3类：
1. 是让整个业务处于一个事务当中
`PROPAGATION_REQUIRED`,`PROPAGATION_SUPPORTS`,`PROPAGATION_MANDATORY`
2. 是让业务不处于同一个事务当中
`PROPAGATION_REQUIRES_NEW`,`PROPAGATION_NOT_SUPPORTED`,`PROPAGATION_NEVER`
3. 是嵌套事务的执行，嵌套事务可以在第一个事务执行完毕时设置一个保存点，然后第二个业务操作发生异常时可以选择回滚到保存点，也可以回滚到初始状态。

![spring 事务传播行为](/img/59eee1ff0001bb2c12800720.jpg)

### TransactionStatus 事务具体运行状态
`TransactionStatus`接口用来记录事务的状态,该接口定义了一组方法,用来获取或判断事务的相应状态信息.
平台事务管理器(PlatformTransactionManager)会根据 TransactionDefinition 中定义的事务信息(包括隔离级别、传播行为)来进行事务的管理,在管理的过程中事务可能产生了保存点或事务是新的事务等情况,那么这些信息都会记录在 TransactionStatus 的对象中.

## 编程式事务管理
为了简化设置事务的代码量,提供了TransactionTemplate事务管理模版类.在哪个地方需要用到事务,那么就在哪个地方注入这个模版.真正进行事务管理是由事务管理器来完成.

1. 配置事务管理器：TranscationManager，一般在不适用Hibernate的情况下，使用DataSourceTranscationManager,需要注入数据源
2. 配置事务管理器的事务管理的模板TransactionTemplate依赖于DataSourceTransactionManager数据源事务管理器(PlatformTransactionManager平台事务管理器的实现类).
3. 配置文件中引入TransactionTemplate类,把数据源事务管理器对象注入到使用的事务的service层的类中，作为该bean的transactionManager属性.DataSourceTransactionManager数据源管理器又依赖于DataSource.因此把数据源对象注入到数据源管理器的dataSource属性中.
4. 在service中，要定义一个TransactionTemplate的成员变量,并生成set()方法.因此要把TransactionTemplate的bean注入到Service实体类中的TransactionTemplate类型的属性中。
执行transcationTemplate提供的execute方法，方法中进行事务的操作，这个方法中有个参数，transcationcallback，如果事务出现回滚，将会调用这个参数进行操作。如果匿名内部类要拿到外层包裹它的方法的参数，那么要将参数修饰成final

这里调用模板方法将两个dao操作放在一个事务里。

## 声明式事务管理

### 基于 TransactionProxyFactoryBean 的声明式事务管理（创建代理对象）
![TransactionProxyFactoryBean](/img/598c19f10001acc112800722.jpg)

### 基于 AspectJ 的XML方式
![AspectJ](/img/5a4b26d200018a0512800722.jpg)

### 基于注解的方式
![zhujie](/img/59d8d3430001932d12800722.jpg)

## 总结
Spring将事务管理分成了两类:
```
	* 编程式事务管理
		* 手动编写代码进行事务管理.(很少使用)
	* 声明式事务管理:
		* 基于TransactionProxyFactoryBean的方式.(很少使用)
			* 需要为每个进行事务管理的类,配置一个TransactionProxyFactoryBean进行增强.
		* 基于AspectJ的XML方式.(经常使用)
			* 一旦配置好之后,类上不需要添加任何东西
		* 基于注解方式.(经常使用)
			* 配置简单,需要在业务层上添加一个@Transactional的注解.
```
[案例代码](https://github.com/wave-gbt/spring-transaction-demo)

