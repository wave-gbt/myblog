---
title: Java 反射
date: 2017-11-08 11:07:44
tags: Java
permalink: java-reflect
copyright: true
password:
top:
---

### Class 类的使用
#### 在面向对象的世界里，万事万物皆对象。(静态成员、普通数据类型)
　　类是对象，类是java.lang.Class类的实例对象
<!-- more -->
#### 这个对象的表示方式有三种：
1. 第一种表示方式：
```
Class c1 = Foo.class; //任何一个类都有一个隐含的静态成员变量class
```
2. 第二种表示方式：
```
Class c2 = foo1.getClass //已知该类的对象，通过getClass方法得到这个实例类的class(类类型)
```
3. 第三种表达方式
```
Class c3 = Class.forName("imooc.reflect.Foo");
```
三种方式创建的类类型都相等，都是Foo的类类型
#### 可以通过类类型创建该类的类对象
```
Foo foo=(Foo)c1.newInstance();
```
前提是需要有无参数的构造方法，它要调用

### 动态加载类
```
Class.forName("类的全称")：
```
*  不仅表示了类的类类型，还代表了动态加载类
*  请区分编译、运行
*  编译时刻加载类是静态加载类、运行时刻加载类是动态加载类

用new创建对象，属于静态加载类，在编译时刻就需要加载所有的可能使用到的类，只要有一个类缺失或者类中某个成员缺失，就会报错（不管实际上有没有用到这个类），导致整个程序都无法运行。

于是我们希望：要用哪个类的时候再加载这个类，不用就不加载。通过动态加载类可以解决上述问题。
本例中举了Word类、Excel类加载的例子，现在做动态加载：
```
Class c = Class.forName(args[0]);
//通过类类型，创建该类对象，这里就产生一个问题：是生成Word呢还是生成Excel?老师的解决思路是：只创建一个新类OfficeAble，作为接口，令Word类、Excel类都实现这个接口就可以了：
OfficeAble oa = (OfficeAble)c.newInstance();
oa.start();

class Word implements OfficeAble
{
	public void start(){}
}
```
**代码设计思路**：功能性的类最好使用动态加载。
```
Class c = Class.forname(参数);//动态加载类返回该类的类类型。
接口 x = (接口)c.newInstance();通过转换为接口的类型，用来实现方法。
```
### 获取方法信息
基本数据类型，void关键字都存在类类型
- class.getMethods()方法获取是该类的所有public方法，包括从父类继承的方法；
- class.getDeclareMethods()方法获取该类自行声明的所有方法，不论访问权限；
- method.getName()获取方法名
- method.getReturnType()获取方法的返回值
- method.getParameterTypes()，获取方法的参数类型的类类型数组class[]

**获取方法信息：**
1. 基本的数据类型，void关键字等都存在类类型
Class c = 基类.class （int,String,double,void等）
2. Class类的基本API操作
- c.getName()可以获取类的名称
- c.getSimpleName();//不包含包名的类的名称
- c.getMethods()获取类的【public方法】集合，【包括继承来的】
**注意【所有方法都是Method类的对象】**
- c.getDeclaredMethods()获取的是所有该类【自己声明】的方法，【不问访问权限】
3. Method类提供了一些操作方法的方法
- .getReturnType()得到该方法的返回值类型的类类型（class），如int.class String.class
- .getName()得到方法的名称
- .getParameterTypes()获得参数列表类型的类类型，如参数为(int,int)则得到

**实例**
```
Class c1 = int.class; int的类类型
Class c2 = String.class; String类的类类型 String类字节码
Class c3 = double.class; double这个数据类类型的字节码表示方式
Class c4 = Double.class; Double这个类的类类型字节码表示方式
Class c5 = void.class; 表达了void这个类的类类型
getName为这个类的类类型的具体名称 
c1.getName ---> int
c2.getName ---> java.lang.String 类的全称
c2.getSimpleName ---> String 不包含包名的类的名称
```
### 获取成员变量构造函数信息
#### Java反射机制－获取成员变量&构造函数
1. 成员变量是java.lang.reflect.Field的对象
- Field类封装了关于成员变量的操作
- Field[] fs = c.getFields()方法获取所有public的成员变量Field[]信息
- c.getDeclaredFields获取的是该类自己声明的成员变量信息
- field.getType()获得成员类型的类类型
- field.getName()获得成员的名称
2. 构造函数是java.lang.Constructor类的对象
- 通过Class.getConstructor()获得Constructor[]所有公有构造方法信息
- 建议getDeclaredConstructors()获取自己声明的构造方法
- Constructor.getName():String
- Constructor.getParameterTypes():Class[]

**成员变量也是对象，是java.lang.reflect.Field的对象**

#### 反射——获取成员变量的信息
1. Class c = obj.getClass();
Field[] fs = c.getFields();
2. 获取成员变量： 获取成员变量的类型的类类型`Class fieldType = field.getType();`　
//获取成员变量的类型的名字fieldType.getName();　
//获取成员变量的名称getName()

#### 反射——获取构造函数的信息
1. Class c = obj.getClass(）;
Constructor[] cs = c.getConstructors(); 
2. 获取构造函数的参数列表，得到的是参数列表的类型的类类型
`Class[] paramTypes =constructor.getParammeterTypes();`　
//获取参数类型的名称paramTypes.getName();
### 方法反射的基本操作
#### 获取A类中的print(int,int)方法：
1. 要获取一个方法就是获取类的信息，获取类的信息首先要获取类的类类型
  A a1=new A();  Class c= a1.getClass();
2. 获取方法 由名称和参数列表来决定,`getMethod获取的是public方法`，`getDelcaredMethod获取自己声明的方法`
 `Method m =c.getMethod(methodName,paramtypes);`　
  //paramtypes可以用数组的形式  表示new Class[]{int.class,int.class}，也可以直接列举类类型
#### 方法的反射操作：
是用m对象来进行方法调用，和a1.print(10,20)调用的方法相同 `m.invoke（a1，new Object[]｛10,20｝）
Object o=m.invoke(对象名,参数);`
//方法如果没有返回值返回null，如果有返回值返回具体值，参数可用数组的方式表示，也可以直接列举，没有参数就不写
```
public Class A{
	 public void print(){};
	 public void Print(Sting a,String b){}
	 public void Print(int a,int b){};
} 
public Class B{
	 public static void main(String[] args){
	  A a1 = new A();  Class c= a1.getclass;
	  Method getMet=c.getMethod("print",String.class,String.class);
	  Object obj=getMet.invoke(a1,"df","df");
	}
}
```
### 通过反射了解集合泛型的本质
1. 反射的操作都是编译之后的操作
2. 集合的泛型只为了防止错误输入，编译阶段有效，绕过编译，使用反射是不会控制集合中的数据类型的。
3. 反射操作类方法：通过对象的类类型得到方法的对象Method，通过方法对象的invoke方法操作对象，调用对象的方法。
**实例**
```
Class c1=对象a.getClass()
Method m = c1.getMethod(方法名，参数列表)
Object o =m.invoke(对象a，参数列表，可以一一列举，也可以用数组)
```
> Reference:
>  [IMOOC-反射——Java高级开发必须懂的](http://www.imooc.com/learn/199)
