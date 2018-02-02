---
title: Java 高并发编程「一」
date: 2018-02-02 15:06:15
tags: [Java]
permalink: java-concurrent-programming
copyright: true
password:
top:
---

## 知识回顾
### 线程的概念
一个程序里不同的执行路径，可以放在不同的 cpu 里同步的执行的。
<!-- more -->

### 如何启动一个线程
1. 继承java.lang.Thread类
2. 实现java.lang.Runnable接口

在线程的Thread对象上调用start()方法，启动新的执行线程。
### 基本的线程同步
使用 `synchronized` 

## synchronized 
java 的每个对象都有一个内置锁，`synchronized` 修饰方法时，内置锁会保护整个方法。在调用该方法前，需要获得内置锁，否则就处于阻塞状态。
```java
    /**
     * @author botaogou@gmail.com
     * @create 2018-02-02 15:50
     **/
    public class T implements Runnable{
    
        private int x = 3;
    
        @Override
        public synchronized void run() {
            x--;
            System.out.println(Thread.currentThread().getName() + " x=" + x);
        }
    
        public static void main(String[] args) {
            T t = new T();
            for (int i = 0; i < 2; i++) {
                new Thread(t,"THREAD" + i).start();
            }
        }
    }
```

**注意**
当 `synchronized` 锁定一个静态方法的时候，相当于锁定的是这个类的 `class` 对象，将会锁住整个类。
```java
public class T1 {

    private static int count = 10;

    // 这里等值于 synchronized(T1.class)
    public synchronized static void m() {
        count--;
        System.out.println(Thread.currentThread().getName() + "count" + count);
    }
}
```

同步和非同步方法是可以同时调用的，因为非同步方法的调用时，不需要获得内置锁。
```java
public class T {

	public synchronized void m1() { 
		System.out.println(Thread.currentThread().getName() + " m1 start...");
		try {
			Thread.sleep(10000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		System.out.println(Thread.currentThread().getName() + " m1 end");
	}
	
	public void m2() {
		try {
			Thread.sleep(5000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		System.out.println(Thread.currentThread().getName() + " m2 ");
	}
	
	public static void main(String[] args) {
		T t = new T();
		
		/*new Thread(()->t.m1(), "t1").start();
		new Thread(()->t.m2(), "t2").start();*/
		
		new Thread(t::m1, "t1").start();
		new Thread(t::m2, "t2").start();
	}
}
```
 一个同步方法可以调用另外一个同步方法，一个线程已经拥有某个对象的锁，再次申请的时候仍然会得到该对象的锁，也就是说 synchronized 获得的锁是可重入的。
```java
public class T {
	synchronized void m1() {
		System.out.println("m1 start");
		try {
			TimeUnit.SECONDS.sleep(1);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		m2();
	}
	
	synchronized void m2() {
		try {
			TimeUnit.SECONDS.sleep(2);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		System.out.println("m2");
	}
}
```
这里是继承中有可能发生的情形，子类调用父类的同步方法
```java
public class T {
	synchronized void m() {
		System.out.println("m start");
		try {
			TimeUnit.SECONDS.sleep(1);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		System.out.println("m end");
	}
	
	public static void main(String[] args) {
		new TT().m();
	}
	
}

class TT extends T {
	@Override
	synchronized void m() {
		System.out.println("child m start");
		super.m();
		System.out.println("child m end");
	}
}
```
