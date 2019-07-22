---
title: RocketMQ 初试
date: 2018-04-17 10:19:18
tags: [MQ]
permalink: rocketmq-start-learn
copyright: true
password:
top:
---

　　近期的项目需求需要用到消息队列, 结合实际的业务需求(佣金结算), 需要对市面上的几种消息中间件进行选型分析, 从功能维度(优先级队列、延迟队列、死信队列、重试队列、消费模式、消息过滤、消息顺序性、事务性消息等), 性能,可靠性 + 可用性, 运维管理, 日志追踪, 社区力度及生态发展等层面进行考虑, 根据各自的侧重点, 选择合适自己的消息中间件尤为重要。
<!-- more -->　　
　　我这次选择了阿里开源的`RocketMQ`,下面主要记录下我的首次使用,与`Spring`集成,采用`push`方式接收消息。

## Maven 依赖
```xml
    <dependency>
        <groupId>com.alibaba.rocketmq</groupId>
        <artifactId>rocketmq-client</artifactId>
        <version>3.2.6</version>
    </dependency>   
    
    <dependency>
        <groupId>com.alibaba.rocketmq</groupId>
        <artifactId>rocketmq-all</artifactId>
        <version>3.2.6</version>
        <type>pom</type>
    </dependency>
```
## application.properties
```
    apache.rocketmq.consumer.PushConsumer=WeChatConsumer
    apache.rocketmq.producer.producerGroup=WeChatProducer
    apache.rocketmq.namesrvAddr=XX.XX.XX.XX:9876
```

## 生产者
```java
public class Producer {

    private static final Logger logger = LoggerFactory.getLogger(Producer.class);
    /**
     * 生产者的组名
     */
    @Value("${apache.rocketmq.producer.producerGroup}")
    private String producerGroup;

    /**
     * NameServer 地址
     */
    @Value("${apache.rocketmq.namesrvAddr}")
    private String namesrvAddr;

    public void defaultMQProducer(){
        //生产者的组名
        DefaultMQProducer producer = new DefaultMQProducer(producerGroup);
        //指定NameServer地址，多个地址以 ; 隔开
        producer.setNamesrvAddr(namesrvAddr);
        /**
        *  从文件中获取待消费消息数据：
        *  4418040302625808|2018-04-03 10:35:52|81|820|16608187978|2018-04-03 14:22:56|9095180232
           6518040101499088|2018-04-01 10:50:20|75|750|13037219257|2018-04-03 14:22:55|3579901463
        */
        File fin = new File("E:\\work\\20180403_1432_002.REQ");
        try {
            /**
             * Producer对象在使用之前必须要调用start初始化，初始化一次即可
             * 注意：切记不可以在每次发送消息时，都调用start方法
             */
            producer.start();
            List<String> msgList = ReadFile.readFile(fin);
            if (CollectionUtils.isEmpty(msgList)) {
                return;
            }
            StopWatch stop = new StopWatch();
            stop.start();
            for (String str : msgList) {
                // 拆分字符串, id 记录流水号
                String[] msgArr = str.split("\\|");
                Message msg = new Message("WXData","push",msgArr[0],str.getBytes());
                // 发送消息
                SendResult result = producer.send(msg);
                logger.info("id:{},result:{}", result.getMsgId(), result.getSendStatus());
            }
            stop.stop();
        } catch (Exception e) {
            e.printStackTrace();
        }finally{
            producer.shutdown();
        }
    }
}
```
## 消费者
```java
public class Consumer {

    /**
     * 消费者的组名
     */
    @Value("${apache.rocketmq.consumer.PushConsumer}")
    private String consumerGroup;

    /**
     * NameServer 地址
     */
    @Value("${apache.rocketmq.namesrvAddr}")
    private String namesrvAddr;

    private static final Logger logger = LoggerFactory.getLogger(Consumer.class);

    @Autowired
    CalcCommissionService calcService;

    // spring框架的注解，在方法上加该注解会在项目启动的时候执行该方法，也可以理解为在spring容器初始化的时候执行该方法
    @PostConstruct
    public void defaultMQPushConsumer(){
        //消费者的组名
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer(consumerGroup);
        //指定NameServer地址，多个地址以 ; 隔开
        consumer.setNamesrvAddr(namesrvAddr);
        try {
            //订阅WXData下的push消息
            consumer.subscribe("WXData", "push");
            //设置Consumer第一次启动是从队列头部开始消费还是队列尾部开始消费
            //如果非第一次启动，那么按照上次消费的位置继续消费
            consumer.setConsumeFromWhere(
                    ConsumeFromWhere.CONSUME_FROM_FIRST_OFFSET);
            consumer.registerMessageListener(
                    (List<MessageExt> list, ConsumeConcurrentlyContext Context) -> {
                        try {
                            Message msg = list.get(0);
                            String msgBody = new String (msg.getBody());
                            // TODO　coding...

                        } catch (Exception e) {
                            e.printStackTrace();
                            return ConsumeConcurrentlyStatus.RECONSUME_LATER; // 稍后重试
                        }
                        return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;   // 消费成功
                    });
            consumer.start();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```
## 测试
```java
public class Test{
    /**
     * test rocketMQ
     */
    @Autowired
    Producer rocketMQProvider;
    @RequestMapping("/testMQ")
    public String testMq() {
        rocketMQProvider.defaultMQProducer();
        return null;
    }
}
```

