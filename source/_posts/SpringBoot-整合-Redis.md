---
title: SpringBoot 整合 Redis
date: 2018-01-12 14:46:15
tags: [SpringBoot]
permalink: SpringBoot-redis
copyright: true
password:
top:
---

归纳总结 SpringBoot 整合 Redis,进行数据操作。
<!-- more -->

## 引入 maven 依赖
```xml
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-redis</artifactId>
    </dependency>
```

## 数据源相关配置
```yaml
spring.redis.host=localhost
spring.redis.port=6379
spring.redis.password=
spring.redis.database=1
spring.redis.pool.max-active=8
spring.redis.pool.max-wait=-1
spring.redis.pool.max-idle=500
spring.redis.pool.min-idle=0
spring.redis.timeout=0
```

## 数据访问层，使用 redisTemplate
```java
@Repository
public class RedisBaseDao {
 
    @Resource(name="redisTemplate")
    protected ValueOperations<String, String> valueOperations;
 
    public void addValue(String key, String value){
        valueOperations.set(key, value);
    }
 
    public String getValue(String key){
        return valueOperations.get(key);
    }
}
```

## 单元测试用例
```java
@RunWith(SpringRunner.class)
@SpringBootTest
public class SpringbootRedisApplicationTests {

    public static Logger logger= LoggerFactory.getLogger(SpringbootRedisApplicationTests.class);
    @Test
    public void contextLoads() {
    }

    @Autowired
    RedisDao redisDao;
    @Test
    public void testRedis(){
        redisDao.setKey("key","hello");
        logger.info(redisDao.getValue("key"));
    }
}
```

