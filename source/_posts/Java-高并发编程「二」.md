---
title: Java 高并发编程「二」
date: 2018-03-08 09:53:28
tags: [并发编程]
permalink: java-concurrent-programming-2
copyright: true
password:
top:
---
## reentrantlock
`reentrantlock`可以用于替代`synchronized`，使用reentrantlock可以完成同样的功能,需要注意的是，必须要手动释放锁,使用`synchronized`锁定的话如果遇到异常，jvm会自动释放锁，但是`lock`必须手动释放锁，因此经常在`finally`中进行锁的释放
<!-- more -->

```java
public class ReentrantLock2 {
	Lock lock = new ReentrantLock();

	void m1() {
		try {
			lock.lock(); //synchronized(this)
			for (int i = 0; i < 10; i++) {
				TimeUnit.SECONDS.sleep(1);

				System.out.println(i);
			}
		} catch (InterruptedException e) {
			e.printStackTrace();
		} finally {
			lock.unlock();  // 手动释放锁
		}
	}

	void m2() {
		lock.lock();
		System.out.println("m2 ...");
		lock.unlock();
	}

	public static void main(String[] args) {
		ReentrantLock2 rl = new ReentrantLock2();
		new Thread(rl::m1).start();
		try {
			TimeUnit.SECONDS.sleep(1);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		new Thread(rl::m2).start();
	}
}
```
使用`reentrantlock`可以进行**尝试锁定**`tryLock`，这样无法锁定，或者在指定时间内无法锁定，线程可以决定是否继续等待
```java
public class ReentrantLock3 {
	Lock lock = new ReentrantLock();

	void m1() {
		try {
			lock.lock();
			for (int i = 0; i < 10; i++) {
				TimeUnit.SECONDS.sleep(1);

				System.out.println(i);
			}
		} catch (InterruptedException e) {
			e.printStackTrace();
		} finally {
			lock.unlock();
		}
	}

	/**
	 * 使用tryLock进行尝试锁定，不管锁定与否，方法都将继续执行
	 * 可以根据tryLock的返回值来判定是否锁定
	 * 也可以指定tryLock的时间，由于tryLock(time)抛出异常，所以要注意unclock的处理，必须放到finally中
	 */
	void m2() {
		/*
		boolean locked = lock.tryLock();
		System.out.println("m2 ..." + locked);
		if(locked) lock.unlock();
		*/
		boolean locked = false;
		
		try {
			locked = lock.tryLock(5, TimeUnit.SECONDS);
			System.out.println("m2 ..." + locked);
		} catch (InterruptedException e) {
			e.printStackTrace();
		} finally {
			if(locked) lock.unlock();
		}
	}

	public static void main(String[] args) {
		ReentrantLock3 rl = new ReentrantLock3();
		new Thread(rl::m1).start();
		try {
			TimeUnit.SECONDS.sleep(1);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		new Thread(rl::m2).start();
	}
}
```
使用`ReentrantLock`还可以调用`lockInterruptibly`方法，可以对线程`interrupt`方法做出响应
```java
public class ReentrantLock4 {
		
	public static void main(String[] args) {
		Lock lock = new ReentrantLock();
		
		Thread t1 = new Thread(()->{
			try {
				lock.lock();
				System.out.println("t1 start");
				TimeUnit.SECONDS.sleep(Integer.MAX_VALUE);
				System.out.println("t1 end");
			} catch (InterruptedException e) {
				System.out.println("interrupted!");
			} finally {
				lock.unlock();
			}
		});
		t1.start();
		
		Thread t2 = new Thread(()->{
			try {
				//lock.lock();
				lock.lockInterruptibly(); //可以对interrupt()方法做出响应
				System.out.println("t2 start");
				TimeUnit.SECONDS.sleep(5);
				System.out.println("t2 end");
			} catch (InterruptedException e) {
				System.out.println("interrupted!");
			} finally {
				lock.unlock();
			}
		});
		t2.start();
		
		try {
			TimeUnit.SECONDS.sleep(1);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		t2.interrupt(); //打断线程2的等待
	}
}
```
`ReentrantLock`还可以指定为**公平锁**
```java
public class ReentrantLock5 extends Thread {
		
	private static ReentrantLock lock=new ReentrantLock(true); //参数为true表示为公平锁，请对比输出结果
    public void run() {
        for(int i=0; i<100; i++) {
            lock.lock();
            try{
                System.out.println(Thread.currentThread().getName()+"获得锁");
            }finally{
                lock.unlock();
            }
        }
    }
    public static void main(String[] args) {
        ReentrantLock5 rl=new ReentrantLock5();
        Thread th1=new Thread(rl);
        Thread th2=new Thread(rl);
        th1.start();
        th2.start();
    }
}
```
## ThreadLocal
`ThreadLocal` 线程局部变量,`ThreadLocal`是使用空间换时间，`synchronized`是使用时间换空间,比如在`hibernate`中`session`就存在与`ThreadLocal`中，避免`synchronized`的使用.
```java
public class ThreadLocal2 {
	//volatile static Person p = new Person();
	static ThreadLocal<Person> tl = new ThreadLocal<>();
	
	public static void main(String[] args) {
				
		new Thread(()->{
			try {
				TimeUnit.SECONDS.sleep(2);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			
			System.out.println(tl.get());
		}).start();
		
		new Thread(()->{
			try {
				TimeUnit.SECONDS.sleep(1);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			tl.set(new Person());
		}).start(); 
	}
	
	static class Person {
		String name = "zhangsan";
	}
}
```