---
title: Java 高并发编程「三」
date: 2018-04-07 16:38:58
tags: [并发编程]
permalink: java-concurrent-programming-3
copyright: true
password:
top:
---
## ConcurrentMap
　　Map(Set)如果在不加锁的情况下, 可以使用 `HashMap`,`treeMap`,`LinkedHashMap`等。如果想加锁,可以使用 `HashTable`(用的比较少),如果并发不高的情况下，可以使用 `Collections.synchronizedXXX`,如果并发性比较高的情况, 建议使用 `ConcurrentHashMap`,如果并发性比较高，并且要求排序的情况下，建议使用 `ConcurrentSkipListMap`。
<!-- more -->

```java
public class T01_ConcurrentMap {
	public static void main(String[] args) {
		/**
		 * 16 段, 分段锁,高并发的时候效率比较高
		 */
		//Map<String, String> map = new ConcurrentHashMap<>();
		Map<String, String> map = new ConcurrentSkipListMap<>(); //高并发并且排序
		/**
		 * Hashtable 本身就带锁,效率比较低
		 */
		//Map<String, String> map = new Hashtable<>();
		/**
		 * 可以对 HashMap 加锁：Collections.synchronizedXXX
		 */
		//Map<String, String> map =  new HashMap<>();
		//TreeMap
		Random r = new Random();
		Thread[] ths = new Thread[100];
		CountDownLatch latch = new CountDownLatch(ths.length);
		long start = System.currentTimeMillis();
		for(int i=0; i<ths.length; i++) {
			ths[i] = new Thread(()->{
				for(int j=0; j<10000; j++) map.put("a" + r.nextInt(100000), "a" + r.nextInt(100000));
				latch.countDown();
			});
		}
		
		Arrays.asList(ths).forEach(t->t.start());
		try {
			latch.await();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		
		long end = System.currentTimeMillis();
		System.out.println(end - start);
	}
}
```

## CopyOnWriteList
写时复制容器 `copy on write`,多线程环境下,写时效率低,读时效率高,适合写少读多的环境。
```java
public class T02_CopyOnWriteList {
	public static void main(String[] args) {
		List<String> lists = 
				//new ArrayList<>(); //这个会出并发问题！
				//new Vector();
				new CopyOnWriteArrayList<>();
		Random r = new Random();
		Thread[] ths = new Thread[100];
		
		for(int i=0; i<ths.length; i++) {
			Runnable task = new Runnable() {
	
				@Override
				public void run() {
					for(int i=0; i<1000; i++) lists.add("a" + r.nextInt(10000));
				}
				
			};
			ths[i] = new Thread(task);
		}
		
		
		runAndComputeTime(ths);
		
		System.out.println(lists.size());
	}
	
	static void runAndComputeTime(Thread[] ths) {
		long s1 = System.currentTimeMillis();
		Arrays.asList(ths).forEach(t->t.start());
		Arrays.asList(ths).forEach(t->{
			try {
				t.join();
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		});
		long s2 = System.currentTimeMillis();
		System.out.println(s2 - s1);
	}
}
```

## SynchronizedList
　　`new ArrayList()` 是没有锁的，如果想给这个list上锁，可以通过调用`Collections` 的静态方法 `synchronizedList()`,将不加锁的容器返回成一个加了锁的容器。
```java
public class T03_SynchronizedList {
	public static void main(String[] args) {
		List<String> strs = new ArrayList<>();
		List<String> strsSync = Collections.synchronizedList(strs);
	}
}
```

## ConcurrentQueue
```java
public class T04_ConcurrentQueue {
	public static void main(String[] args) {
		Queue<String> strs = new ConcurrentLinkedQueue<>();

		for(int i=0; i<10; i++) {
			// offer 类似于 add,有一个boolean类型的返回值,表示是否添加成功
			strs.offer("a" + i);
		}

		System.out.println(strs);

		System.out.println(strs.size());
		// 表示从队列头部拿出一个,队列数量减少一个
		System.out.println(strs.poll());
		System.out.println(strs.size());
		// 表示从队列中拿出来，但是不删除，队列数量不会变
		System.out.println(strs.peek());
		System.out.println(strs.size());

		//双端队列Deque, 可以从两端取，也可以往两端添加
	}
}
```

## LinkedBlockingQueue
　　无界队列，使用链表实现的阻塞式容器,添加了两个方法，`put`,`take`
```java
public class T05_LinkedBlockingQueue {

	static BlockingQueue<String> strs = new LinkedBlockingQueue<>();

	static Random r = new Random();

	public static void main(String[] args) {
		new Thread(() -> {
			for (int i = 0; i < 100; i++) {
				try {
					strs.put("a" + i); //如果满了，就会等待
					TimeUnit.MILLISECONDS.sleep(r.nextInt(1000));
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
		}, "p1").start();

		for (int i = 0; i < 5; i++) {
			new Thread(() -> {
				for (;;) {
					try {
						System.out.println(Thread.currentThread().getName() + " take -" + strs.take()); //如果空了，就会等待
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
				}
			}, "c" + i).start();

		}
	}
}
```

## ArrayBlockingQueue
　　`ArrayBlockingQueue`,是有界队列，能装的元素的个数是固定的。
```java
public class T06_ArrayBlockingQueue {

	static BlockingQueue<String> strs = new ArrayBlockingQueue<>(10);

	static Random r = new Random();

	public static void main(String[] args) throws InterruptedException {
		for (int i = 0; i < 10; i++) {
			strs.put("a" + i);
		}
		
		strs.put("aaa"); //满了就会等待，程序阻塞
		//strs.add("aaa"); // 会报异常
		//strs.offer("aaa"); // 会通过返回值通知是否添加成功
		//strs.offer("aaa", 1, TimeUnit.SECONDS); // 一秒钟之后加不进去，就不加了
		
		System.out.println(strs);
	}
}
```

## DelayQueue
　　  无界队列，队列里的每一个元素都有一个时间表示自己还有多久时间可以被消费,可以用来做执行定时任务。
```java
public class T07_DelayQueue {

	static BlockingQueue<MyTask> tasks = new DelayQueue<>();

	static Random r = new Random();
	
	static class MyTask implements Delayed {
		long runningTime;
		
		MyTask(long rt) {
			this.runningTime = rt;
		}

		@Override
		public int compareTo(Delayed o) {
			if(this.getDelay(TimeUnit.MILLISECONDS) < o.getDelay(TimeUnit.MILLISECONDS))
				return -1;
			else if(this.getDelay(TimeUnit.MILLISECONDS) > o.getDelay(TimeUnit.MILLISECONDS)) 
				return 1;
			else 
				return 0;
		}

		@Override
		public long getDelay(TimeUnit unit) {
			
			return unit.convert(runningTime - System.currentTimeMillis(), TimeUnit.MILLISECONDS);
		}
		
		
		@Override
		public String toString() {
			return "" + runningTime;
		}
	}

	public static void main(String[] args) throws InterruptedException {
		long now = System.currentTimeMillis();
		MyTask t1 = new MyTask(now + 1000);
		MyTask t2 = new MyTask(now + 2000);
		MyTask t3 = new MyTask(now + 1500);
		MyTask t4 = new MyTask(now + 2500);
		MyTask t5 = new MyTask(now + 500);
		
		tasks.put(t1);
		tasks.put(t2);
		tasks.put(t3);
		tasks.put(t4);
		tasks.put(t5);
		
		System.out.println(tasks);
		
		for(int i=0; i<5; i++) {
			System.out.println(tasks.take());
		}
	}
}

```

## TransferQueue
　　提供一个`transfer`方法。 消费者先启动，当生产者生产的时候，先找消费者，有消费者直接给消费者，而不是放入队列,效率更高， 用在更高的并发场景下。
```java
public class T08_TransferQueue {
	public static void main(String[] args) throws InterruptedException {
		LinkedTransferQueue<String> strs = new LinkedTransferQueue<>();
		
		/*new Thread(() -> {
			try {
				System.out.println(strs.take());
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}).start();*/
		
		//strs.transfer("aaa");
		
		strs.put("aaa");
		
		new Thread(() -> {
			try {
				System.out.println(strs.take());
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}).start();
	}
}
```

## SynchronusQueue
　　没有容量的队列，有消息直接被消费，而不能放入队列。
```java
public class T09_SynchronusQueue { //容量为0
	public static void main(String[] args) throws InterruptedException {
		BlockingQueue<String> strs = new SynchronousQueue<>();
		
		new Thread(()->{
			try {
				System.out.println(strs.take());
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}).start();
		
		strs.put("aaa"); //阻塞等待消费者消费
		//strs.add("aaa");
		System.out.println(strs.size());
	}
}
```