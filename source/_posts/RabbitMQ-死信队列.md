---
title: RabbitMQ 死信队列
date: 2019-07-30 14:29:16
tags: MQ
permalink: RabbitMQ-dead-letter-queue
copyright: true
password:
top:
---
　　死信消息会被`RabbitMQ`进行特殊处理，如果配置了死信队列信息，那么该消息将会被丢进死信队列中，如果没有配置，则该消息将会被丢弃。
<!-- more -->

### 什么是死信
　　队列中的消息在以下三种情况下会变成死信:
- 消息被拒绝 (basic.reject/ basic.nack)并且不再重新投递 requeue=false
- 消息超期 (rabbitmq  Time-To-Live -> messageProperties.setExpiration())
- 队列超载 (长度限制超过了)

### 应用场景
　　一般是应用在较为重要的业务中，确保消息不会丢失。通过配置死信队列，可以让未正常消费的消息暂存到另一个队列里，通过相应的业务代码来处理死信消息。

### 实现过程
　　生产者 --> 消息 --> 交换机 --> 队列 --> 变成死信 --> DLX交换机 -->队列 --> 消费者
```java
  @Bean
  public Queue lindQueue() {
    return QueueBuilder.durable(LIND_QUEUE)
        .withArgument("x-dead-letter-exchange", LIND_DL_EXCHANGE)//设置死信交换机
        .withArgument("x-message-ttl", makeCallExpire)
        .withArgument("x-dead-letter-routing-key", LIND_DEAD_QUEUE)//设置死信routingKey
        .build();
  }
```
`x-dead-letter-exchange`: 用来设置死信后发送的交换机
`x-dead-letter-routing-key`: 用来设置死信的 `routing-key`,如果不设置默认使用消息本身的`routing-key`
  
### 代码  
```java
z@Component
 public class AmqpConfig {
   /**
    * 主要测试一个死信队列，功能主要实现延时消费，原理是先把消息发到正常队列，
    * 正常队列有超时时间，当达到时间后自动发到死信队列，然后由消费者去消费死信队列里的消息.
    */
   public static final String LIND_EXCHANGE = "lind.exchange";
   public static final String LIND_DL_EXCHANGE = "lind.dl.exchange";
   public static final String LIND_QUEUE = "lind.queue";
   public static final String LIND_DEAD_QUEUE = "lind.queue.dead";
 
   public static final String LIND_FANOUT_EXCHANGE = "lindFanoutExchange";
   /**
    * 单位为微秒.
    */
   @Value("${tq.makecall.expire:60000}")
   private long makeCallExpire;
 
   /**
    * 创建普通交换机.
    */
   @Bean
   public TopicExchange lindExchange() {
     return (TopicExchange) ExchangeBuilder.topicExchange(LIND_EXCHANGE).durable(true)
         .build();
   }
 
   /**
    * 创建死信交换机.
    */
   @Bean
   public TopicExchange lindExchangeDl() {
     return (TopicExchange) ExchangeBuilder.topicExchange(LIND_DL_EXCHANGE).durable(true)
         .build();
   }
 
   /**
    * 创建普通队列.
    */
   @Bean
   public Queue lindQueue() {
     return QueueBuilder.durable(LIND_QUEUE)
         .withArgument("x-dead-letter-exchange", LIND_DL_EXCHANGE)//设置死信交换机
         .withArgument("x-message-ttl", makeCallExpire)
         .withArgument("x-dead-letter-routing-key", LIND_DEAD_QUEUE)//设置死信routingKey
         .build();
   }
 
   /**
    * 创建死信队列.
    */
   @Bean
   public Queue lindDelayQueue() {
     return QueueBuilder.durable(LIND_DEAD_QUEUE).build();
   }
 
   /**
    * 绑定死信队列.
    */
   @Bean
   public Binding bindDeadBuilders() {
     return BindingBuilder.bind(lindDelayQueue())
         .to(lindExchangeDl())
         .with(LIND_DEAD_QUEUE);
   }
 
   /**
    * 绑定普通队列.
    *
    * @return
    */
   @Bean
   public Binding bindBuilders() {
     return BindingBuilder.bind(lindQueue())
         .to(lindExchange())
         .with(LIND_QUEUE);
   }
 
   /**
    * 广播交换机.
    *
    * @return
    */
   @Bean
   public FanoutExchange fanoutExchange() {
     return new FanoutExchange(LIND_FANOUT_EXCHANGE);
   }
 }
 
 
 //-----生产者
 
 @Component
 public class Publisher {
   @Autowired
   private RabbitTemplate rabbitTemplate;
 
 
   public void publish(String message) {
     try {
       rabbitTemplate
           .convertAndSend(AmqpConfig.LIND_EXCHANGE, AmqpConfig.LIND_DELAY_QUEUE,
               message);
     } catch (Exception e) {
       e.printStackTrace();
     }
   }
 }
 
 //------消费者
 
 @Component
 @Slf4j
 public class Subscriber {
   @RabbitListener(queues = AmqpConfig.LIND_QUEUE)
   public void customerSign(String data) {
     try {
 
       log.info("从队列拿到数据 ：{}", data);
 
     } catch (Exception ex) {
           e.printStackTrace();
     }
   }
 }

```

> Reference: 
> - [rabbitmq实现死信队列](https://www.cnblogs.com/lori/archive/2018/11/19/9984760.html)
