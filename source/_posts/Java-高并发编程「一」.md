---
title: Java 高并发编程「一」
date: 2018-02-02 15:06:15
tags: [Java,并发编程]
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
程序在执行过程中，如果出现异常，默认情况锁会被释放，所以，在并发处理的过程中，有异常要多加小心，不然可能会发生不一致的情况。比如，在一个web app处理过程中，多个servlet线程共同访问同一个资源，这时如果异常处理不合适，在第一个线程中抛出异常，其他线程就会进入同步代码区，有可能会访问到异常产生时的数据。因此要非常小心的处理同步业务逻辑中的异常
```java
public class T {
	int count = 0;
	synchronized void m() {
		System.out.println(Thread.currentThread().getName() + " start");
		while(true) {
			count ++;
			System.out.println(Thread.currentThread().getName() + " count = " + count);
			try {
				TimeUnit.SECONDS.sleep(1);
				
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			if(count == 5) {
				int i = 1/0; //此处抛出异常，锁将被释放，要想不被释放，可以在这里进行catch，然后让循环继续
			}
		}
	}
	
	public static void main(String[] args) {
		T t = new T();
		Runnable r = new Runnable() {

			@Override
			public void run() {
				t.m();
			}
		};
		new Thread(r, "t1").start();
		
		try {
			TimeUnit.SECONDS.sleep(3);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		
		new Thread(r, "t2").start();
	}
}
```
## volatile
volatile 关键字，使一个变量在多个线程间可见,使用volatile关键字，会让所有线程都会读到变量的修改值。
```java
public class T {
	/*volatile*/ boolean running = true; //对比一下有无volatile的情况下，整个程序运行结果的区别
	void m() {
		System.out.println("m start");
		while(running) {
			/*
			try {
				TimeUnit.MILLISECONDS.sleep(10);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}*/
		}
		System.out.println("m end!");
	}
	
	public static void main(String[] args) {
		T t = new T();
		
		new Thread(t::m, "t1").start();
		
		try {
			TimeUnit.SECONDS.sleep(1);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		
		t.running = false;
	}
}
```
但是`volatile`并不能保证多个线程共同修改running变量时所带来的不一致问题，也就是说`volatile`不能替代`synchronized`。
```java
public class T {
	volatile int count = 0; 
	void m() {
		for(int i=0; i<10000; i++) count++;
	}
	
	public static void main(String[] args) {
		T t = new T();
		
		List<Thread> threads = new ArrayList<Thread>();
		
		for(int i=0; i<10; i++) {
			threads.add(new Thread(t::m, "thread-"+i));
		}
		
		threads.forEach((o)->o.start());
		
		threads.forEach((o)->{
			try {
				o.join();
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		});
		System.out.println(t.count);
	}
}
```
对比上一个程序，可以用`synchronized`解决，`synchronized`可以保证可见性和原子性，`volatile`只能保证可见性
```java
public class T {
	/*volatile*/ int count = 0;

	synchronized void m() { 
		for (int i = 0; i < 10000; i++)
			count++;
	}
	public static void main(String[] args) {
		T t = new T();
		List<Thread> threads = new ArrayList<Thread>();

		for (int i = 0; i < 10; i++) {
			threads.add(new Thread(t::m, "thread-" + i));
		}

		threads.forEach((o) -> o.start());

		threads.forEach((o) -> {
			try {
				o.join();
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		});

		System.out.println(t.count);
	}
}
```
决同样的问题的更高效的方法，使用AtomXXX类,AtomXXX类本身方法都是原子性的，但不能保证多个方法连续调用是原子性的
```java
public class T {
	/*volatile*/ //int count = 0;
	
	AtomicInteger count = new AtomicInteger(0); 

	/*synchronized*/ void m() { 
		for (int i = 0; i < 10000; i++)
			//if count.get() < 1000
			count.incrementAndGet(); //count++
	}

	public static void main(String[] args) {
		T t = new T();

		List<Thread> threads = new ArrayList<Thread>();

		for (int i = 0; i < 10; i++) {
			threads.add(new Thread(t::m, "thread-" + i));
		}

		threads.forEach((o) -> o.start());

		threads.forEach((o) -> {
			try {
				o.join();
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		});
		System.out.println(t.count);
	}
}
```
`synchronized`优化,同步代码块中的语句越少越好,比较m1和m2
```java
public class T {
	
	int count = 0;

	synchronized void m1() {
		//do sth need not sync
		try {
			TimeUnit.SECONDS.sleep(2);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		//业务逻辑中只有下面这句需要sync，这时不应该给整个方法上锁
		count ++;
		
		//do sth need not sync
		try {
			TimeUnit.SECONDS.sleep(2);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}
	
	void m2() {
		//do sth need not sync
		try {
			TimeUnit.SECONDS.sleep(2);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		//业务逻辑中只有下面这句需要sync，这时不应该给整个方法上锁
		//采用细粒度的锁，可以使线程争用时间变短，从而提高效率
		synchronized(this) {
			count ++;
		}
		//do sth need not sync
		try {
			TimeUnit.SECONDS.sleep(2);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}
}

```
锁定某对象o，如果o的属性发生改变，不影响锁的使用,但是如果o变成另外一个对象，则锁定的对象发生改变,应该避免将锁定对象的引用变成另外的对象
```java
public class T {
	
	Object o = new Object();

	void m() {
		synchronized(o) {
			while(true) {
				try {
					TimeUnit.SECONDS.sleep(1);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
				System.out.println(Thread.currentThread().getName());
			}
		}
	}
	
	public static void main(String[] args) {
		T t = new T();
		//启动第一个线程
		new Thread(t::m, "t1").start();
		
		try {
			TimeUnit.SECONDS.sleep(3);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		//创建第二个线程
		Thread t2 = new Thread(t::m, "t2");
		
		t.o = new Object(); //锁对象发生改变，所以t2线程得以执行，如果注释掉这句话，线程2将永远得不到执行机会
		
		t2.start();
	}
}

```
不要以字符串常量作为锁定对象,在下面的例子中，m1和m2其实锁定的是同一个对象,这种情况还会发生比较诡异的现象，比如你用到了一个类库，在该类库中代码锁定了字符串“Hello”，但是你读不到源码，所以你在自己的代码中也锁定了"Hello",这时候就有可能发生非常诡异的死锁阻塞，因为你的程序和你用到的类库不经意间使用了同一把锁
```java
public class T {
	
	String s1 = "Hello";
	String s2 = "Hello";

	void m1() {
		synchronized(s1) {
			
		}
	}
	
	void m2() {
		synchronized(s2) {
			
		}
	}
}
```

