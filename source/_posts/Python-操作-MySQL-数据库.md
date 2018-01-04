---
title: Python 操作 MySQL 数据库
date: 2018-01-04 09:54:29
tags: Python
permalink: python-operations-MySQL-Database
copyright: true
password:
top:
---
学习目标：能够开发完整的数据库操作程序。

## 开发环境
### Python DB API 
- 是 Python 访问数据库的统一接口规范。[官方接口说明](https://www.python.org/dev/peps/pep-0249
)
<!-- more -->
- Python DB API 包含的内容
![Python DB API 包含的内容](/img/pythondb1.jpg)

- Python MySQL 开发环境
![Python MySQL 开发环境](/img/pythondb2.jpg)

## Python 操作数据库对象
### Python-数据库连接对象 connection
- 连接对象：建立 `Python` 客户端与数据库的网络连接
- 创建方法：MySQLdb.Connect(参数)
    - host //MySQL 服务器地址
    - port //服务器端口号
    - user //用户名
    - passwd //密码
    - db //数据库名称
    - charset //连接编码
    
- `connection` 对象支持的方法：
    - cursor()  //使用该连接创建并返回游标
    - commit()  //提交当前事务
    - rollback() //回滚当前事务
    - close()   //关闭连接 

### Python-游标对象 cursor
- 游标对象：用于执行查询和获取对象
- `cursor` 对象支持的方法：
    - execute(op[,args])  //执行一个数据库查询和命令
    - fetchone()  //取得结果集的下一行
    - fetchmany(size)  //获取结果集的剩下的所有行
    - rowcount  //最近一次excute返回数据的行数和影响行数
    - close()  //关闭游标对象


## Python 增删改查数据库
### 实例演示 select 查询数据
- 查询流程
![select查询数据流程](/img/5a1f7bb40001294a12800722.jpg)
- 实例代码
```
import MySQLdb

conn = MySQLdb.Connect(host='127.0.0.1',
port=3306,user='root',passwd='123456',db='IMOOC',charset='utf8')
cur = conn.cursor()

sql="select * from user"
cur.execute(sql)

print cur.rowcount

rs=cur.fetchone()
print rs

rs=cur.fetchmany(3)
print rs

rs=cur.fetchall()
print rs
for row in rs:
    print 'userid=%d,username=%s'%row

cur.close()
conn.close()
```

### 实例演示 insert/update/delete 更新数据库
- 执行流程
![执行流程](/img/5a3a2af30001ebe212800722.jpg)

- 实例代码
```
sql_insert = 'insert into stud(userid, username) values("12","name12")'
sql_upudate = 'update stud set username="name19"  where userid="9"'
sql_insert = 'delete from stud where userid<"3"'

try:
    cursor.execute(sql_insert)
    print cursor.rowcount
    cursor.execute(sql_upudate)
    print cursor.rowcount
    cursor.execute(sql_insert)
    print cursor.rowcount
    
    conn.commit()
except Exception as e:
    print e
    conn.rollback()
```

## 使用 Python 实现实例
### 银行转账实例
- 流程
![转账流程](/img/zzlc.jpg)
- 实例代码主方法
```
if __name__ =="__main__":
    source_id = sys.argv[1]
    aim_id=sys.argv[2]
    money=sys.argv[3]
    conn = MySQLdb.Connect(host='127.0.0.1',port=3306,user='root',passwd='root',
                           db='test',
                           charset='utf8'
                           )
    trans = TransMoney(conn)
    
    try:
        trans.changeMoney(source_id,aim_id,money)
    except Exception as e:
        print '出现问题'+str(e)
    finally:
        conn.close()
```
