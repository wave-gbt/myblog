---
title: 使用泛型封装redis缓存读写数据工具类
date: 2020-09-14 14:22:22
tags: Java
permalink: redis-read-write-util
copyright: true
password:
top:
---

　　功能描述：先从缓存中获取数据，如果缓存中获取不到，再通过业务接口或者查数据库获取数据，并记录到缓存中，如果数据没查到，针对集合类型的数据类型，缓存一个空集合，防止缓存穿透。
<!-- more -->　　
　　封装目的：把从缓存中读写和json序列化，反序列化的代码进行封装，不用在业务代码中写的到处都是。

### 工具类
```java

public <T> T getDataFromRedisOrDataGeter(String cacheKey, Class<T> clazz, Supplier<T> supplier, long time) {

    // 从缓存中获取数据
    String cacheValue = (String)redisUtil.get(cacheKey);
    T dto = null;
    if (StringUtils.isNotBlank(cacheValue)) {
        try {
            dto = objectMapper.readValue(cacheValue, clazz);
        } catch (JsonProcessingException e) {
            log.error("JsonProcessingException:{}", e.getMessage());
        }
    }
    
    if (Objects.nonNull(dto)) {
        return dto;
    }
    // 如果从缓存中没有获取到,通过java8 内置的一个函数式接口获取数据
    // 如果传入的泛型是集合类型，supplier.get() 如果获取不到数据时，会返回空集合。
    // 缓存空集合，避免了缓存穿透，导致频繁查业务接口或数据库的问题。
    dto = supplier.get();

    try {
        if (Objects.nonNull(dto)) {
            String jsonString = objectMapper.writeValueAsString(dto);
            // 写缓存
            redisUtil.set(cacheKey, jsonString, time);
        }
        return dto;
    } catch (JsonProcessingException e) {
        log.error("JsonProcessingException:{}", e.getMessage());
    }
    return null;
}

```

### 使用方式
```java
// 查询用户信息，cacheKey 为redis 缓存的key，缓存时间为 5min
User user = getDataFromRedisOrDataGeter(cacheKey, User.class, new Supplier<User>() {
    
    // 只需在此处实现 Supplier 的接口方法即可
    @Override
    public User get() {
        return getUser(params);
    }
}, 5*60);

```

这样在业务代码中，就实现了对某个业务方法加缓存的操作，从缓存读写，序列化，反序列化的代码就不会污染到业务接口内部。