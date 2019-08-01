---
title: mac 搭建 ELK 并与 SpringBoot 集成
date: 2019-08-01 11:13:34
tags: [架构]
permalink: mac-elk-springboot-build
copyright: true
password:
top:
---

　　`ELK`(Elasticsearch + Logstash + Kibana)是一套开源的日志管理方案, 很多公司利用它来搭建可视化的海量日志分析平台。
<!-- more -->
### 概述
- `Elasticsearch`: 是一个分布式、可扩展、实时的搜索与数据分析引擎。
- `Logstash`: 是一个具有实时渠道能力的数据收集引擎,它由三个主要部分组成:
    - `Shipper`: 发送日志数据
    - `Broker`: 收集数据，缺省内置 Redis
    - `Indexer`: 数据写入
- `Kibana`: 为 `Elasticsearch` 提供分析和可视化的 Web 平台。它可以在 `Elasticsearch` 的索引中查找，交互数据，并生成各种维度的表图。

　　完整的 ELK 协议栈基本流程是 Shipper 负责从各种数据源里采集数据，然后发送到 Broker，Indexer 将存放在 Broker 中的数据再写入 Elasticsearch，Elasticsearch 对这些数据创建索引，然后由 Kibana 对其进行各种分析并以图表的形式展示。


### 搭建 ELK

**注意**: 搭建 elk 需要先安装好 `java`

#### Install ElasticSearch
```
// 安装
brew install elasticsearch
// 查看信息
brew info elasticsearch  
// 启动
brew services start elasticsearch
```
安装好启动成功之后，访问`localhost:9200`, 可以看到如下结果:
```json
{
  "name" : "PqnS9Kz",
  "cluster_name" : "elasticsearch_botaogou",
  "cluster_uuid" : "r2Vw0MjbQbSbvLa657IzTw",
  "version" : {
    "number" : "6.8.1",
    "build_flavor" : "oss",
    "build_type" : "tar",
    "build_hash" : "1fad4e1",
    "build_date" : "2019-06-18T13:16:52.517138Z",
    "build_snapshot" : false,
    "lucene_version" : "7.7.0",
    "minimum_wire_compatibility_version" : "5.6.0",
    "minimum_index_compatibility_version" : "5.0.0"
  },
  "tagline" : "You Know, for Search"
}
```

#### Install Kibana
```
brew install kibana
brew info kibana
brew services start kibana
```
修改 `Kibana` 的配置，指定es的访问url
```
cd /usr/local/etc/kibana
```
vim kibana.yml
```
server.port: 5601
elasticsearch.hosts: ["http://localhost:9200"]
```
#### Install Logstash
```
brew install logstash
brew info logstash
brew services start logstash
```
创建 `.conf` 文件 vim test.conf
 
```
input {
   file {
      path => ["/Users/botaogou/Documents/elk-conf/test.txt"]
    }
  }
 output {
   elasticsearch{
      hosts => ["http://localhost:9200"]
      index => "test"
   }
}
```
执行 
```
logstash -f test.conf
```
访问`localhost:9600`, 可以看到如下结果:
```json
{"host":"wave-MacBook-Pro.local","version":"7.2.0","http_address":"127.0.0.1:9600","id":"f3c20331-8f84-45e1-aa4d-5ea45ff18293","name":"wave-MacBook-Pro.local","ephemeral_id":"6f033156-e0ee-4346-91a4-ac08201ccdab","status":"green","snapshot":false,"build_date":"2019-06-20T17:29:17+00:00","build_sha":"a2b1dbb747289ac122b146f971193cfc9f7a2f97","build_snapshot":false}
```
然后 `test.txt` 文件内容有追加的时候，通过访问`localhost：5601`，kibana 上已经看到 `test` index 已经被创建。

### SpringBoot 集成

#### 加入依赖
```xml
    <!-- logback -->
    <dependency>
        <groupId>ch.qos.logback</groupId>
        <artifactId>logback-classic</artifactId>
    </dependency>

    <!-- logstash -->
    <dependency>
        <groupId>net.logstash.logback</groupId>
        <artifactId>logstash-logback-encoder</artifactId>
        <version>5.2</version>
    </dependency>

```
#### logback-spring.xml
```xml
<appender name="logstash"class="net.logstash.logback.appender.LogstashTcpSocketAppender">

       <!-- logstash 所在的服务ip，监听端口，这里是我本地ip -->
       <destination>192.168.111.54:8082</destination>

       <!--<filterclass="ch.qos.logback.classic.filter.ThresholdFilter">-->

            <!--<level>info</level><!–写入logstash的日志级别–>-->

       <!--</filter>-->

       <encoder charset="UTF-8"class="net.logstash.logback.encoder.LogstashEncoder" >

            <!--"appname":"springboot21-log-elk" 的作用是指定创建索引的名字时用，并且在生成的文档中会多了这个字段

             在logstashindex中引入    index => "%{[appname]}-%{+YYYY.MM.dd}"-->

           <customFields>{"appname":"springboot2-log-elk"}</customFields>

       </encoder>

   </appender>
   
    <!-- 日志输出级别 -->
   <root level="INFO">
       <appender-ref ref="logstash" />
   </root>

```
#### logstash 的 `.conf` 文件
```
input {
 tcp {
        host => "92.168.111.54"
        port => 8082
        mode => "server"
        ssl_enable => false
        codec => json {
            charset => "UTF-8"
        }
    }
}
output {
    elasticsearch {
        hosts => ["http://localhost:9200"]
        index => "%{[appname]}-%{+YYYY.MM.dd}"
    }
  stdout { }
}
```

然后启动工程，就可以通过访问(http://localhost：5601) `kibana` 看到新的索引了，`create index pattern` --> `@timestamp`, 然后就可以看到以时间顺序排序的项目日志了。