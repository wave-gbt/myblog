---
title: 使用 Optional 解决 NPE 问题
date: 2019-07-19 11:01:35
tags: Java
permalink: Solve-NPE-problems-with-Optional
copyright: true
password:
top:
---

　　NPE(NullPointerException) 是 Java 程序开发中的最典型的异常，从Java类型系统的角度看，null可以被赋值给任何类型的变量，并且不断被传递，知道最后谁也不知道它是从哪里引入的。
<!-- more -->
 
### 场景

先看一种情况
```
user.getAddress().getProvince();
```
这种写法，在`user`或者`address`为`null`时，是有可能报`NullPointerException`异常的。为了解决这个问题，于是采用下面的写法
```
if(user!=null){
    Address address = user.getAddress();
    if(address!=null){
        String province = address.getProvince();
    }
}
```
这种写法是比较丑陋的，为了避免上述丑陋的写法，让丑陋的设计变得优雅。JAVA8 提供了`Optional`类来优化这种写法，通过类型系统让你的领域模型中隐藏的知识显式地体现在你的代码中，这样我们就不用显式进行空值检测。

### 类方法

| 方法 | 描述 | 
| ------ | ------ |
| static <T> Optional<T> empty() | 返回空的 Optional 实例。 | 
| boolean equals(Object obj) | 判断其他对象是否等于 Optional。 | 
| Optional<T> filter(Predicate<? super <T> predicate) | 如果值存在，并且这个值匹配给定的 predicate，返回一个Optional用以描述这个值，否则返回一个空的Optional。 |
| <U> Optional<U> flatMap(Function<? super T,Optional<U>> mapper) | 如果值存在，返回基于Optional包含的映射方法的值，否则返回一个空的Optional |
| T get() | 如果在这个Optional中包含这个值，返回值，否则抛出异常：NoSuchElementException |
| int hashCode() | 返回存在值的哈希码，如果值不存在 返回 0。 |
| void ifPresent(Consumer<? super T> consumer) | 如果值存在则使用该值调用 consumer , 否则不做任何事情。 |
| boolean isPresent() | 如果值存在则方法会返回true，否则返回 false。 |
| <U>Optional<U> map(Function<? super T,? extends U> mapper) | 如果有值，则对其执行调用映射函数得到返回值。如果返回值不为 null，则创建包含映射返回值的Optional作为map方法返回值，否则返回空Optional。 |
| static <T> Optional<T> of(T value) | 返回一个指定非null值的Optional。 |
| static <T> Optional<T> ofNullable(T value) | 如果为非空，返回 Optional 描述的指定值，否则返回空的 Optional。 |
| T orElse(T other) | 如果存在该值，返回值， 否则返回 other。 |
| T orElseGet(Supplier<? extends T> other) | 如果存在该值，返回值， 否则触发 other，并返回 other 调用的结果。 |
| <X extends Throwable> T orElseThrow(Supplier<? extends X> exceptionSupplier) | 如果存在该值，返回包含的值，否则抛出由 Supplier 继承的异常 |
| String toString() | 返回一个Optional的非空字符串，用来调试 |

### 实例
```
// 判断一个对象的属性是否为空，为空则跑出异常
Optional.ofNullable(user)
                   .flatMap(u-> u.getAddress())
                   .map(a->a.getCity())
                   .orElseThrow(()->new Exception("异常"));
               
// 判断一个对象是否为空，不为空 do something
Optional.ofNullable(user).ifPresent(u->{
            // do something
        });

// 对 Optional 中包含的值进行过滤，如果包含的值满足条件，那么还是返回这个 Optional；否则创建一个新的对象返回
Optional<User> user1 = Optional.ofNullable(user).
                                    filter(u -> "wave".equals(u.getName)).
                                    orElseGet(()-> {
                                                  User user1 = new User();
                                                  user1.setName("wave");
                                                  return user1;
                                             });;

```

使用`Optional`的思路和`Stream`相同，都是链式思路，省去了繁琐的判断，在后面的开发中，可以使用Optional设计API，这样可以设计出更安全的接口和方法。
