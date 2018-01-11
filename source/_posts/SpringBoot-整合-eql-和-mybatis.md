---
title: SpringBoot 整合 eql 和 mybatis
date: 2018-01-11 15:59:12
tags: [SpringBoot]
permalink: SpringBoot-eql-or-mybatis
copyright: true
password:
top:
---

归纳总结 `SpringBoot` 整合 `mybatis` 和 `eql`,并访问数据库。`mybatis` 框架已经十分流行了,[`eql` 框架](https://github.com/bingoohuang/eql)是一个简单，轻量的数据持久层的框架,可以用于代替ibatis/mybatis。
<!-- more --> 

## SpringBoot 整合 eql
### 引入 maven 依赖
```xml
    <dependency>
        <groupId>com.github.bingoohuang</groupId>
        <artifactId>eql</artifactId>
        <version>0.0.73</version>
    </dependency>
```

### eql 相关配置 
```yaml
# 基本属性 ip port database url、user、password
url=jdbc:oracle:thin:@ip:port:database
driver=oracle.jdbc.driver.OracleDriver
user=username
username=username
password=passwd

# 配置初始化大小、最小、最大
initialSize=1
minIdle=1
maxActive=5

# 配置获取连接等待超时的时间
maxWait=60000

# 配置间隔多久才进行一次检测，检测需要关闭的空闲连接，单位是毫秒
timeBetweenEvictionRunsMillis=60000

# 配置一个连接在池中最小生存的时间，单位是毫秒
minEvictableIdleTimeMillis=300000

validationQuery=SELECT 'x' FROM dual


# 字段加解密 配置 start
connection.impl=org.n3r.eql.dbfieldcryptor.EqlSecretFieldsConnectionProxy
proxy.connection.impl=org.n3r.eql.trans.EqlDruidConnection

secret.fields.configable.impl=org.n3r.eql.dbfieldcryptor.refer.ReferSecretFieldsConfig
sensitive.cryptor.impl=org.n3r.eql.dbfieldcryptor.refer.ReferSensitiveCryptor
securetDatabaseFields.password=Ed23d930EEFfb1B8
# 用于配置数据库表中需要加解密的字段，和存储过程中需要加解密的参数序号
# 1.各个字段用空格分隔
# 2.数据库字段：表名.字段名
# 3.存储过程：存储过程名.参数的序号(序号从1开始)
# 注意: 每行行末续行符反斜杠前添加至少一个空白字符（后面续行的前导空白会被自动去除）
securetDatabaseFields.define=

# 字段加解密 配置 end
```
### 在数据持久层使用
在java代码中指明要执行的 `sql` 的**id**
```java
import org.n3r.eql.Eql;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Map;

/**
 * Created by wave_ on 2017/8/4.
 */
@Component
public class DemoService {
    public  String queryProvinceName(String code) {
        // 这里指定 eql 查询的id eg:queryNameByCode
        return new Eql().selectFirst("queryNameByCode").params(code).returnType(String.class).execute();
    }

    public List<Map> queryProvinceList()
    {
        return new Eql().select("queryProvinceList").returnType(Map.class).execute();
    }
}
```
### 创建 eql 文件
- 在 resource 中创建 `DemoService.eql` 文件, 放在和 `DemoService.class` 一致的包路径下.
目录结构
```markdown
- java
    - com
        - dao
            - DemoService.java
- resource
    - com
        - dao
            - DemoService.eql

```
- 可以在持久层代码中直接指定eql的位置,就可以不用对应创建文件结构
```java
import org.n3r.eql.Eql;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Map;

/**
 * Created by wave_ on 2017/8/4.
 */
@Component
public class DemoService {
    public  String queryProvinceName(String code) {
        // 这里指定 eql 文件所在的位置
        return new Eql().useSqlFile("com/service/DemoService.eql").selectFirst("queryNameByCode").params(code).returnType(String.class).execute();
    }
}    
```

### eql 文件存放 sql
中括号中是相对应的 sql 的 id.
```markdown
-- [queryNameByCode]
SELECT PROVINCE_CODE, PROVINCE_NAME FROM TF_M_PROVINCE WHERE PROVINCE_CODE = ##

-- [queryProvinceList]
SELECT PROVINCE_CODE, PROVINCE_NAME FROM TF_M_PROVINCE ORDER BY PROVINCE_CODE
```
这样通过持久层代码通过 Eql 指定要调用的 sql 的 id,然后把相应的 sql 语句写在相应的 eql 文件中即可。

## SpringBoot 整合 mybatis
### 引入 maven 依赖
```xml
     <dependency>
        <groupId>org.mybatis.spring.boot</groupId>
        <artifactId>mybatis-spring-boot-starter<artifactId>
        <version>1.3.0</version>
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
mybatis-spring-boot-starter依赖中存在spring-boot-starter-jdbc

### 在配置文件中配置数据源
```yaml
spring.datasource.url=jdbc:mysql://localhost:3306/hello
spring.datasource.username=root
spring.datasource.password=moma
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
```

### 通过注解的方式使用 mybatis
在 DAO 中
```java
@Mapper
public interface AuthorMapper {

    @Insert("insert into account(name, money) values(#{name}, #{money})")
    int add(@Param("name") String name, @Param("money") double money);

    @Update("update account set name = #{name}, money = #{money} where id = #{id}")
    int update(@Param("name") String name, @Param("money") double money, @Param("id") int  id);

    @Delete("delete from account where id = #{id}")
    int delete(int id);
}
```
