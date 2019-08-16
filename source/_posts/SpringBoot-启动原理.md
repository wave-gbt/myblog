---
title: SpringBoot 启动原理
date: 2019-08-09 15:02:40
tags: SpringBoot
permalink: springboot-start-principle
copyright:
password:
top:
---
　　Spring Boot 让我们的 Spring 应用变的更轻量化。使用 SpringBoot 的最大好处就是简化配置，它实现了自动化配置。现在通过 SpringBoot 的入口启动类，了解下其自动配置的原理。
<!-- more -->

![springboot 启动原理](/img/11120.png)

通过运行启动类中的`main()`方法, SpringBoot 项目就启动起来了。
```java
@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```
从上面代码可以看出，Annotation定义（`@SpringBootApplication`）和类定义（`SpringApplication.run`）最为耀眼，所以要揭开 SpringBoot 的神秘面纱，我们要从这两位开始就可以了。

## SpringBootApplication
```java
@Target(ElementType.TYPE)            // 注解的适用范围，其中TYPE用于描述类、接口（包括包注解类型）或enum声明
@Retention(RetentionPolicy.RUNTIME)  // 注解的生命周期，保留到class文件中（三个生命周期）
@Documented                          // 表明这个注解应该被javadoc记录
@Inherited                           // 子类可以继承该注解
@SpringBootConfiguration             // 继承了Configuration，表示当前是注解类
@EnableAutoConfiguration             // 开启springboot的注解功能，springboot的四大神器之一，其借助@import的帮助
@ComponentScan(excludeFilters = {    // 扫描路径设置（具体使用待确认）
        @Filter(type = FilterType.CUSTOM, classes = TypeExcludeFilter.class),
        @Filter(type = FilterType.CUSTOM, classes = AutoConfigurationExcludeFilter.class) })
public @interface SpringBootApplication {
// ...
}

```

虽然定义使用了多个Annotation进行了原信息标注，但实际上重要的只有三个Annotation：

- @Configuration（@SpringBootConfiguration点开查看发现里面还是应用了@Configuration）
- @EnableAutoConfiguration
- @ComponentScan

所以，如果我们使用如下的SpringBoot启动类，整个SpringBoot应用依然可以与之前的启动类功能对等：

```java
@Configuration
@EnableAutoConfiguration
@ComponentScan
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```
接下来分别介绍这3个 Annotation。

### @Configuration

这里的`@Configuration`对我们来说不陌生，它就是`JavaConfig`形式的`Spring Ioc`容器的配置类使用的那个`@Configuration`，`SpringBoot`社区推荐使用基于`JavaConfig`的配置形式，所以，这里的启动类标注了`@Configuration`之后，本身其实也是一个IoC容器的配置类。
举几个简单例子回顾下，`XML`跟`config`配置方式的区别：
- 表达形式层面
 - 基于XML配置的方式
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.0.xsd"
       default-lazy-init="true">
    <!--bean定义-->
</beans>
```
 - 基于JavaConfig的配置方式
```java
@Configuration
public class MockConfiguration{
    //bean定义
}
```
**任何一个标注了@Configuration的Java类定义都是一个JavaConfig配置类。**

- 注册bean定义层面
 - 基于XML配置的方式
```xml
<bean id="mockService" class="..MockServiceImpl">

</bean>

```
 - 基于JavaConfig的配置方式
```java
@Configuration
public class MockConfiguration{
    @Bean
    public MockService mockService(){
        return new MockServiceImpl();
    }
}
```
 
**任何一个标注了@Bean的方法，其返回值将作为一个bean定义注册到Spring的IoC容器，方法名将默认成该bean定义的id。**


- 表达依赖注入关系层面
 - 基于XML配置的方式
```xml
<bean id="mockService" class="..MockServiceImpl">
    <propery name ="dependencyService" ref="dependencyService" />
</bean>

<bean id="dependencyService" class="DependencyServiceImpl"></bean>

```
 - 基于JavaConfig的配置方式
```java
@Configuration
public class MockConfiguration{
    @Bean
    public MockService mockService(){
        return new MockServiceImpl(dependencyService());
    }
    
    @Bean
    public DependencyService dependencyService(){
        return new DependencyServiceImpl();
    }
}
```
**如果一个bean的定义依赖其他bean,则直接调用对应的JavaConfig类中依赖bean的创建方法就可以了。**

### @ComponentScan

`@ComponentScan`这个注解在Spring中很重要，它对应XML配置中的元素，`@ComponentScan`的功能其实就是自动扫描并加载符合条件的组件（比如@Component和@Repository等）或者bean定义，最终将这些bean定义加载到IoC容器中。

我们可以通过`basePackages`等属性来细粒度的定制`@ComponentScan`自动扫描的范围，如果不指定，则默认`Spring`框架实现会从声明`@ComponentScan`所在类的 package 进行扫描。

**所以SpringBoot的启动类最好是放在root package下，因为默认不指定basePackages。**

### @EnableAutoConfiguration

个人感觉`@EnableAutoConfiguration`这个Annotation最为重要，所以放在最后来解读，大家是否还记得Spring框架提供的各种名字为`@Enable`开头的Annotation定义？比如`@EnableScheduling`、`@EnableCaching`、`@EnableMBeanExport`等，`@EnableAutoConfiguration`的理念和做事方式其实一脉相承，简单概括一下就是，借助`@Import`的支持，收集和注册特定场景相关的bean定义。

- `@EnableScheduling`是通过`@Import`将`Spring`调度框架相关的bean定义都加载到IoC容器。
- `@EnableMBeanExport`是通过`@Import`将`JMX`相关的bean定义加载到IoC容器。

而`@EnableAutoConfiguration`也是借助@Import的帮助，将所有符合自动配置条件的bean定义加载到IoC容器，仅此而已。
`@EnableAutoConfiguration`作为一个复合Annotation,其自身定义关键信息如下：
```java
@SuppressWarnings("deprecation")
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@AutoConfigurationPackage
@Import(EnableAutoConfigurationImportSelector.class)
public @interface EnableAutoConfiguration {
    //...
}
```
** 两个比较重要的注解：**

- `@AutoConfigurationPackage`：自动配置包
- `@Import`: 导入自动配置的组件

所以, **`@EnableAutoConfiguration` 是从classpath中搜寻所有的META-INF/spring.factories配置文件，并将其中org.springframework.boot.autoconfigure.EnableutoConfiguration对应的配置项通过反射（Java Refletion）实例化为对应的标注了@Configuration的JavaConfig形式的IoC容器配置类，然后汇总为一个并加载到IoC容器**。

**SpringBoot 启动原理图**
![](/img/1112095.png)

## SpringApplication执行流程

SpringApplication的run方法的实现是我们本次旅程的主要线路，该方法的主要流程大体可以归纳如下：

1. 如果我们使用的是**SpringApplication的静态run方法**，那么，这个方法里面**首先要创建一个SpringApplication对象实例**，然后调用这个创建好的SpringApplication的实例方法。在SpringApplication实例初始化的时候，它会提前做几件事情：

    ```
    public static ConfigurableApplicationContext run(Object[] sources, String[] args) {
            return new SpringApplication(sources).run(args);
        }
    ```
    - 根据classpath里面是否存在某个特征类（org.springframework.web.context.ConfigurableWebApplicationContext）来决定是否应该创建一个为Web应用使用的ApplicationContext类型。
    - 使用SpringFactoriesLoader在应用的classpath中查找并加载所有可用的ApplicationContextInitializer。
    - 使用SpringFactoriesLoader在应用的classpath中查找并加载所有可用的ApplicationListener。
    - 推断并设置main方法的定义类。
    
    ```
    @SuppressWarnings({ "unchecked", "rawtypes" })
        private void initialize(Object[] sources) {
            if (sources != null && sources.length > 0) {
                this.sources.addAll(Arrays.asList(sources));
            }
            this.webEnvironment = deduceWebEnvironment();
            setInitializers((Collection) getSpringFactoriesInstances(
                    ApplicationContextInitializer.class));
            setListeners((Collection) getSpringFactoriesInstances(ApplicationListener.class));
            this.mainApplicationClass = deduceMainApplicationClass();
        }
    ```

2. SpringApplication实例初始化完成并且完成设置后，就开始执行run方法的逻辑了，方法执行伊始，首先遍历执行所有通过SpringFactoriesLoader可以查找到并加载的SpringApplicationRunListener。调用它们的started()方法，告诉这些SpringApplicationRunListener，“嘿，SpringBoot应用要开始执行咯！”。

    ```
    public ConfigurableApplicationContext run(String... args) {
            StopWatch stopWatch = new StopWatch();
            stopWatch.start();
            ConfigurableApplicationContext context = null;
            FailureAnalyzers analyzers = null;
            configureHeadlessProperty();
            SpringApplicationRunListeners listeners = getRunListeners(args);
            listeners.starting();
            try {
                ApplicationArguments applicationArguments = new DefaultApplicationArguments(
                        args);
                ConfigurableEnvironment environment = prepareEnvironment(listeners,
                        applicationArguments);
                Banner printedBanner = printBanner(environment);
                context = createApplicationContext();
                analyzers = new FailureAnalyzers(context);
                prepareContext(context, environment, listeners, applicationArguments,
                        printedBanner);
    　　　　　　　// 核心点：会打印springboot的启动标志，直到server.port端口启动
                refreshContext(context);
                afterRefresh(context, applicationArguments);
                listeners.finished(context, null);
                stopWatch.stop();
                if (this.logStartupInfo) {
                    new StartupInfoLogger(this.mainApplicationClass)
                            .logStarted(getApplicationLog(), stopWatch);
                }
                return context;
            }
            catch (Throwable ex) {
                handleRunFailure(context, listeners, analyzers, ex);
                throw new IllegalStateException(ex);
            }
        }
    ```

3. 创建并配置当前Spring Boot应用将要使用的Environment（包括配置要使用的PropertySource以及Profile）。
    ```
    private ConfigurableEnvironment prepareEnvironment(
                SpringApplicationRunListeners listeners,
                ApplicationArguments applicationArguments) {
            // Create and configure the environment
            ConfigurableEnvironment environment = getOrCreateEnvironment();
            configureEnvironment(environment, applicationArguments.getSourceArgs());
            listeners.environmentPrepared(environment);
            if (!this.webEnvironment) {
                environment = new EnvironmentConverter(getClassLoader())
                        .convertToStandardEnvironmentIfNecessary(environment);
            }
            return environment;
        }
    ```
4. 遍历调用所有SpringApplicationRunListener的environmentPrepared()的方法，告诉他们：“当前SpringBoot应用使用的Environment准备好了咯！”。

    ```
    public void environmentPrepared(ConfigurableEnvironment environment) {
            for (SpringApplicationRunListener listener : this.listeners) {
                listener.environmentPrepared(environment);
            }
        }
    ```
5. 如果SpringApplication的showBanner属性被设置为true，则打印banner。
    ```
    private Banner printBanner(ConfigurableEnvironment environment) {
            if (this.bannerMode == Banner.Mode.OFF) {
                return null;
            }
            ResourceLoader resourceLoader = this.resourceLoader != null ? this.resourceLoader
                    : new DefaultResourceLoader(getClassLoader());
            SpringApplicationBannerPrinter bannerPrinter = new SpringApplicationBannerPrinter(
                    resourceLoader, this.banner);
            if (this.bannerMode == Mode.LOG) {
                return bannerPrinter.print(environment, this.mainApplicationClass, logger);
            }
            return bannerPrinter.print(environment, this.mainApplicationClass, System.out);
        }
    ```

6. 根据用户是否明确设置了applicationContextClass类型以及初始化阶段的推断结果，决定该为当前SpringBoot应用创建什么类型的ApplicationContext并创建完成，然后根据条件决定是否添加ShutdownHook，决定是否使用自定义的BeanNameGenerator，决定是否使用自定义的ResourceLoader，当然，最重要的，将之前准备好的Environment设置给创建好的ApplicationContext使用。
   
7. ApplicationContext创建好之后，SpringApplication会再次借助Spring-FactoriesLoader，查找并加载classpath中所有可用的ApplicationContext-Initializer，然后遍历调用这些ApplicationContextInitializer的initialize（applicationContext）方法来对已经创建好的ApplicationContext进行进一步的处理。
    
    ```
        @SuppressWarnings({ "rawtypes", "unchecked" })
            protected void applyInitializers(ConfigurableApplicationContext context) {
                for (ApplicationContextInitializer initializer : getInitializers()) {
                    Class<?> requiredType = GenericTypeResolver.resolveTypeArgument(
                            initializer.getClass(), ApplicationContextInitializer.class);
                    Assert.isInstanceOf(requiredType, context, "Unable to call initializer.");
                    initializer.initialize(context);
                }
            }
     
    ```
8. ApplicationContext创建好之后，SpringApplication会再次借助Spring-FactoriesLoader，查找并加载classpath中所有可用的ApplicationContext-Initializer，然后遍历调用这些ApplicationContextInitializer的initialize（applicationContext）方法来对已经创建好的ApplicationContext进行进一步的处理。

    ```
    private void prepareContext(ConfigurableApplicationContext context,
                    ConfigurableEnvironment environment, SpringApplicationRunListeners listeners,
                    ApplicationArguments applicationArguments, Banner printedBanner) {
                context.setEnvironment(environment);
                postProcessApplicationContext(context);
                applyInitializers(context);
                listeners.contextPrepared(context);
                if (this.logStartupInfo) {
                    logStartupInfo(context.getParent() == null);
                    logStartupProfileInfo(context);
                }
        
                // Add boot specific singleton beans
                context.getBeanFactory().registerSingleton("springApplicationArguments",
                        applicationArguments);
                if (printedBanner != null) {
                    context.getBeanFactory().registerSingleton("springBootBanner", printedBanner);
                }
        
                // Load the sources
                Set<Object> sources = getSources();
                Assert.notEmpty(sources, "Sources must not be empty");
                load(context, sources.toArray(new Object[sources.size()]));
                listeners.contextLoaded(context);
            }
    
    ```
9. 最核心的一步，将之前通过@EnableAutoConfiguration获取的所有配置以及其他形式的IoC容器配置加载到已经准备完毕的ApplicationContext。
    ```
    private void prepareAnalyzer(ConfigurableApplicationContext context,
                FailureAnalyzer analyzer) {
            if (analyzer instanceof BeanFactoryAware) {
                ((BeanFactoryAware) analyzer).setBeanFactory(context.getBeanFactory());
            }
        }
    ```
10. 遍历调用所有SpringApplicationRunListener的contextLoaded()方法。
    ```
    public void contextLoaded(ConfigurableApplicationContext context) {
            for (SpringApplicationRunListener listener : this.listeners) {
                listener.contextLoaded(context);
            }
        }
    ```
11. 调用ApplicationContext的refresh()方法，完成IoC容器可用的最后一道工序。
    ```
    private void refreshContext(ConfigurableApplicationContext context) {
            refresh(context);
            if (this.registerShutdownHook) {
                try {
                    context.registerShutdownHook();
                }
                catch (AccessControlException ex) {
                    // Not allowed in some environments.
                }
            }
        }
    ```
12. 查找当前ApplicationContext中是否注册有CommandLineRunner，如果有，则遍历执行它们。
    ```
    private void callRunners(ApplicationContext context, ApplicationArguments args) {
            List<Object> runners = new ArrayList<Object>();
            runners.addAll(context.getBeansOfType(ApplicationRunner.class).values());
            runners.addAll(context.getBeansOfType(CommandLineRunner.class).values());
            AnnotationAwareOrderComparator.sort(runners);
            for (Object runner : new LinkedHashSet<Object>(runners)) {
                if (runner instanceof ApplicationRunner) {
                    callRunner((ApplicationRunner) runner, args);
                }
                if (runner instanceof CommandLineRunner) {
                    callRunner((CommandLineRunner) runner, args);
                }
            }
        }
    ```

13. 正常情况下，遍历执行SpringApplicationRunListener的finished()方法、（如果整个过程出现异常，则依然调用所有SpringApplicationRunListener的finished()方法，只不过这种情况下会将异常信息一并传入处理）去除事件通知点后，整个流程如下：
    ```
    public void finished(ConfigurableApplicationContext context, Throwable exception) {
            for (SpringApplicationRunListener listener : this.listeners) {
                callFinishedListener(listener, context, exception);
            }
        }
    ```
![](/img/7729577.png)



## 总结
到此，SpringBoot的核心组件完成了基本的解析，综合来看，大部分都是Spring框架背后的一些概念和实践方式，SpringBoot只是在这些概念和实践上对特定的场景事先进行了固化和升华，而也恰恰是这些固化让我们开发基于Sping框架的应用更加方便高效。

> Reference: 
> - [springboot之启动原理解析及源码阅读](https://www.cnblogs.com/shamo89/p/8184960.html)











