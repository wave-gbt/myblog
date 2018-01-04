---
title: Hadoop 基础
date: 2017-12-05 11:19:56
tags: [大数据,hadoop]
permalink: hadoop-basic-learning
copyright: true
password:
top:
---

## 初始 Hadoop
### Hadoop 是什么？
　　Hadoop 是开源的分布式存储、分布式计算平台。
### Hadoop 的组成
包括两个核心组成：
1. HDFS：分布式文件系统 存储海量的数据
2. MapReduce：并行处理框架 实现任务分解和调度

### Hadoop 可以用来做什么？
　　搭建大型数据仓库，PB级数据的存储、处理、分析、统计（如，搜索引擎、商业智能（风险评估）、日志分析、数据挖掘）等。

### Hadoop 优势
　　高扩展，低成本，生态圈。

### Hadoop 生态系统及版本
- hive：将SQL语句转化为hadoop任务执行。
- habase存储结构化数据的分布式数据库，放弃事务特性，追求更高的扩展。habase提供数据的随机读写和实时访问，实现对表数据的读写功能。
- zookeeper监控hadoop每个节点的状态，管理集群配置，维护节点间数据的一致性。

## Hadoop 安装
