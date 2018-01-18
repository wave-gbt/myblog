---
title: Hadoop 基础
date: 2018-01-18 09:57:21
tags: [hadoop,大数据]
permalink: hadoop-basis
copyright: true
password:
top:
---

## 初始大数据
### 什么是大数据？
```markdown
    大数据是一个概念也是一门技术，是在以Hadoop为代表的大数据平台框架上进行各种数据分析的技术。
    大数据包括了以Hadoop和Spark为代表的基础大数据框架。
    还包括实时数据处理、离线数据处理；数据分析，数据挖掘和用机器算法进行预测分析等技术。
```
<!-- more -->

### 学习基础要求
```markdown
    会 Linux 常用命令
    有一定的 Python 或者 Java 编程基础
    对 Hadoop 有一定的了解，可以搭建自己的测试环境
```
## Hadoop 的功能和优势
hadoop 是开源的、分布式存储、分布式计算平台，可以用来搭建大型数据仓库,PB级数据的存储、处理、分析、统计等业务
Hadoop包括两个核心组成:
- HDFS:分布式文件系统,存储海量的数据
- MapReduce:并行处理框架,实现任务分解和调度

相关开源工具：
- hbase 放弃了事务的特性，追求更高的扩展，提供了数据的随机读写和实时访问，实现对表数据的读写功能
- zookeeper 监控 hadoop 每个节点的状态，管理集群配置，维护节点间数据的一致性。
- hive 将简单的 sql 语句转化为 hadoop 任务，降低使用 hadoop 的门槛

## Hadoop 安装
```markdown
    1. 准备Linux环境
    2. 安装JDK Java编写
    3. 配置Hadoop
```
### hadoop安装及配置：
1. 下载hdoop安装包并进行解压
2. 配置hdoop-env.sh文件，目的是配置jdk，并在profile配置haddoop的安装位置
   `export JAVA_HOME=安装好的JDK(配置的JAVA_HOME)`
   `export HADOOP_HOME=/opt/hadoop-1.2.1`
   `export PATH=$JAVA_HOME/bin:$JRE_HOME/bin:$HADOOP_HOME/bin:$PATH`
3. 配置core-site.xml文件：hdoop的核心文件，里面有关于hdoop的节点端口与主机端口
```xml
    <configuration>
    <propery>
    <name>hadoop.tmp.dir</name> 
    <value>/hadoop</value> <!-- 工作目录 -->
    </propery>
    <name>dfs.name.dir</name>
    <value>/hadoop/name</value> <!-- 所有元数据的目录 -->
    <propery>
    <name>fs.default.name</name>
    <value>hdfs://imooc:9000</value>  <!-- 表示文件系统如何访问 namenode -->
    </propery>
    </configuration>
```
4. 配置hdfs-site.xml文件：hadoop的文件存储的基本信息与目录
```xml
    <property>
    <name>dfs.data.dir</name>
    <value>/hadoop/data</value> <!-- 文件系统的数据存放路径 -->
    </property>
```
5. 配置mapred-site.xml文件：hadoop的计算节点的端口号
```xml
    <property>
    <name>mapred.job.tracker</name>
    <value>imooc:9001</value>  <!-- 配置任务调度器如何访问 -->
    </property>
```
6. 格式化：`hadoop namenode -format`
7. 启动 `hadoop：start-all.sh`
8. 查看端口：`jps`,可以看到五大守护进程说明正确
9. 停止 `hadoop：stop-all.sh`

## Hadoop 核心 HDFS
### HDFS 基本概念
- 块 Block  文件分块存储 默认64MB  逻辑单元
- NameNode (管理节点，存放文件元数据)
    - 文件与数据库的映射表
    - 数据库与数据节点的映射表
- DataNode (工作节点，存放数据块)

### 数据管理策略
1. hdfs是采用master-slave的模式关管理文件，即一个master(namenade:保存datanode的一些基本信息和元数据)和多个slave(datanode:真正的存贮单元，里面存储了真实数据)
2. hdfs默认保存三份文件，有两份保存在同一台机器上，另外一份（备份文件）保存到另外一台机器上，确保当一台机器挂了时能保存数据的存在
3. namenade也有一个备用节点：Secondary NameNode,当namenode挂了时secondaryNameNode就变为nameNode的角色进行管理数据
4. datandoe会采用心跳的方式时不时的想namenode报告自己的基本信息，比如网络是否正常，运行是否正确常

### HDFS 中文件读写的流程
客户端发出读写请求，namenode根据元数据返回给客户端，下载需要的block并组装
#### HDFS 读取文件的流程：
1. 客户端向namenode发起独立请求，把文件名，路径告诉namenode；
2. namenode查询元数据，并把数据库返回客户端；
3. 此时客户端就明白文件包含哪些块，这些块在哪些datanode中可以找到；

#### HDFS 写入文件的流程：
1. 客户端将文件拆分成块
2. 客户端通知NameNode,NameNode返回可用的DataNode节点地址
3. 客户端根据返回的DataNode将数据块写入到可用的DataNode中
4. 因为数据块要有三份，所以会通过一个复制管道将每个数据块复制出另外两份并保存
5. 更新元数据NameNode

### HDFS 特点
1. 数据冗余，硬件容错（一式三份来保证）
2. 流式数据访问：写一次，读多次，一旦写入无法修改，只能通过写入到新的块删除旧的块进行处理
3. 存储大文件（特适合，因为小文件多，势必加重NameNode的负担）

**优点**：存储块大，吞吐量高，为存储大文件设计；适合一次写入多次读取，顺序读写
**缺点**：延迟高，不适合交互式访问，不支持多用户并发写相同文件
### HDFS 使用
它提供了 shell 接口，可以进行命令行操作，常用Hadoop的shell命令：
```markdown
    #hadoop fs -format     #格式化操作
    #hadoop fs -ls /        #展示文件
    #hadoop fs -cat input/hsdf-site.xml #查看Hadoop里面的指定文件
    #hadoop fs -mkdir input  #未指明目录，表示在Hadoop的文件系统下的默认目录/user/root下新建
    #hadoop fs -put hdsf-site.xml input/  #上传文件到Hadoop
    #hadoop fs -get hdfs-site.xml hdfs-site2.xml #从Hadoop下载文件
    #hadoop dfsadmin -report #查看HADF使用情况（所有信息）
```

## Hadoop 核心 MapReduce
### MapReduce 的原理
Mapreduce原理：分而治之，一个大任务分成多个子任务（map），并行执行之后，合并结果（reduce）。
`eg：做统计的时候，把统计的文件拆分，然后分别统计每一个数据出现的次数，然后合并拆分项，就可以统计每一个数据出现的总次数。`
　　在正式执行Map前，需要将输入数据进行”分片”。所谓分片，就是将输入数据切分为大小相等的数据块，每一块作为单个Map Worker的输入被处理，以便于多个Map Worker同时工作。
　　分片完毕后，多个Map Worker就可以同时工作了。每个Map Worker在读入各自的数据后，进行计算处理，最终输出给Reduce。Map Worker在输出数据时，需要为每一条输出数据指定一个Key。这个Key值决定了这条数据将会被发送给哪一个Reduce Worker。Key值和Reduce Worker是多对一的关系，具有相同Key的数据会被发送给同一个Reduce Worker，单个Reduce Worker有可能会接收到多个Key值的数据。
　　在进入Reduce阶段之前，MapReduce框架会对数据按照Key值排序，使得具有相同Key的数据彼此相邻。如果用户指定了”合并操作”(Combiner)，框架会调用Combiner，将具有相同Key的数据进行聚合。Combiner的逻辑可以由用户自定义实现。这部分的处理通常也叫做”洗牌”(Shuffle)。
　　接下来进入Reduce阶段。相同的Key的数据会到达同一个Reduce Worker。同一个Reduce Worker会接收来自多个Map Worker的数据。每个Reduce Worker会对Key相同的多个数据进行Reduce操作。最后，一个Key的多条数据经过Reduce的作用后，将变成了一个值。

### MapReduce 的运行流程

## 开发 Hadoop 应用程序