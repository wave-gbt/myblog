---
title: ElasticSearch入门
date: 2017-12-04 19:19:50
tags: [ES]
permalink: es-introductory-learning
copyright: true
password:
top:
---

## ES 简介
### 什么是ElasticSearch
1. 基于Apache Lucene 构建的开源搜索引擎
2. 采用java编写，提供简单易用的Restful API
3. 轻松的横向扩展，可支持PB级的结构化或非结构化数据处理
<!-- more -->

### 应用场景
1. 海量数据分析
2. 站内搜索引擎
3. 数据仓库

### 环境要求
1. IDE工具：IDEA、Eclipse等。
2. Java JDK1.8
3. 其他依赖 Maven、NodeJs(6.0以上)

## 基础概念

- 索引：含有相同属性的文档集合
- 类型：索引可以定义一个或多个类型，文档必须属于一个类型
- 文档：文档是可以被索引的基本数据单位
- 分片：每个索引都有多个分片，每个分片都是一个Lucene索引
- 备份：拷贝一份分片就完成了分片的备份

**重点**
1. ES的响应是json格式，可读性不是很好，最好再安装一个插件，首推head；
2. rest提供了很好的restful api，问题是，这些都需要去记忆；
3. rest的查询功能很强大，前提是需要学习requestBody json的写法，以及记住一些标准字段key，才会被ES解析，进而查询给出结果；
4. 还有ES用于查询的话，关键字怎么定义，分词做么做，很核心

## 基本用法
### ES 的 API 属性结构
1. 是以 RESTFul API 风格来命名自己的 API 的。
2. API 基本格式：http://<ip>:<port>/<索引>/<类型>/<文档id>
3. 常用 HTTP 动词：GET/PUT/POST/DELETE

### 索引的创建
- 结构化索引的创建
- 非结构化索引的创建

### 插入

通过使用 put 方法向ES发送请求，以json格式的形式传入数据。
- 指定文档 id 插入
- 自动产生文档 id 插入

### 修改

- 直接修改文档
- 脚本修改文档
通过 post 方法， api 格式：http://<ip>:<port>/<索引>/<类型>/<文档id>/_update

### 删除

- 删除文档
- 删除索引

1. 通过 delete 方法，api 格式：http://<ip>:<port>/<索引>/<类型>/<文档id>，这样就删除了一个文档。
2. 通过 delete 方法，http://<ip>:<port>/<索引>， 这样就删除了一个索引，还可以在head 里通过图形化界面删除。

### 查询

1. 通过 get 方法， api 格式：http://<ip>:<port>/<索引>/<类型>/<文档id>
2. 条件查询: 通过 post 方法， api 格式：http://<ip>:<port>/<索引>/_search
```json
{
  "query":{
    // 匹配所有
//    "match_all":{}
// 匹配条件
   "match":{
      "title":"Elastic"
   }
  },
  "sort":[
    {"publish_date":{"order":"desc"}}
  ],
  // 从哪里返回
  "from":1,
  // 返回几条数据
  "size":4
}

```
3. 聚合查询
```json
{
    "aggs":{
      "group_by_word_count":{
        "terms":{
          "field":"word_count"
        }
      },
      "group_by_publish_date":{
        "terms":{
          "field":"publish_date"
        }
      }
    }
}

```

## 高级查询
### 自条件查询
　　特定字段查询所指特定值
1. Query context
常用查询：
    - 全文本查询：针对文本类型数据
    关键词：`match`,`match_phrase`,`multi_match`,`query_string`
    
    - 字段级别查询：针对结构化数据，如数字、日期等
    关键词：`query`,`term`,`range`
2. Filter context  
　　在查询过程中，只判断该文档是否满足条件，只有 Yes 和 No.
### 复合条件查询
　　以一定逻辑组合自条件查询
常用查询
 - 固定分数查询
 ```json
{
  "query":{
    "constant_score":{
      "filter":{
        "match":{
          "title":"ElasticSearch"
        }
      },
      "boost":2
    }
  }
}
```
 - 布尔查询
```json
{
  "query":{
    "bool":{
      // must 必须满足 与
      "should":[  // 或
        {
          "match":{
            "author":"aaaa"
          }
        },
        {
          "mathc":{
            "title":"ElasticSearch"
          }
        }
      ]
    }
  }
}
``` 
## Spring Boot 集成 Es
> [spring-boot-elasticsearch](https://github.com/rstyro/spring-boot/tree/master/springboot-elasticsearch)

包含增删改查以及复合查询的实例。

> Reference: 
> - [慕课网－ElasticSearch入门](https://www.imooc.com/comment/889)
