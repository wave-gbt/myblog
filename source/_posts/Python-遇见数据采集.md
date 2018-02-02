---
title: Python 遇见数据采集
date: 2018-01-04 14:21:45
tags: python
permalink: python-data-collection
copyright:
password:
top:
---
## Python 开发环境
### 检测是否安装成功
- python
```
python
```
<!-- more -->
- urllib
```
from urllib.request import urlopen
```
- BeautifulSoup4
```
from bs4 import BeautifulSoup
```

### 安装 BeautifulSoup4
- Linux：
```
sudo apt-get install python-bs4
```
- Mac:
```
sudo easy_install pip    pip install beautifulsoup4
```
- windows:
```
pip install beautifulsoup4   pip3 install beautifulsoup4
```

## urllib 和 BeautifulSoup
### urllib 基本用法
- 使用步骤
![urllib 使用步骤](/img/urllob.jpg)

- 模拟浏览器
![携带User-Agent](/img/monilil.jpg)

### 使用 urllib 发送 post 请求
```
from urllib.request import urlopen # 引入urlopen 模块
from urllib.request import Request # 引入urlrequest 模块
from urllib import parse # 引入parse 模块

req = Request("http://www.thsrc.com.tw/tw/TimeTable/SearchResult")

postDate = parse.urlencode([
("StartStation", "2f940836-cedc-41ef-8e28-c2336ac8fe68"),
("EndStation", "977abb69-413a-4ccf-a109-0272c24fd490"),
("SearchDate", "2016/08/31"),
("SearchTime", "21:30"),
("SearchWay", "DepartureInMandarin")

])
req.add_header("Origin", "http://www.thsrc.com.tw")
req.add_header("User-Agent", "Mozilla/5.0 (Windows NT 6.1; rv:48.0) Gecko/20100101 Firefox/48.0)")
resp = urlopen(req,data=postDate.encode("utf-8"))

print(resp.read().decode("utf-8"))
```

### BeautifulSoup 简介 & 使用

[官方文档](https://www.crummy.com/software/BeautifulSoup/bs4/doc.zh/)

**注意：** beautifulsoup.findAll返回的是列表而不是字符串，应该用for循环来读取列表

### 获取维基百科词条信息
```
from urllib.request import urlopen
from bs4 import BeautifulSoup as bs
import re

resp = urlopen("https://en.wikipedia.org/wiki/Main_Page").read().decode("utf-8")
soup = bs(resp,"html.parser")
listUrls = soup.findAll("a", herf=re.compile("^/wiki/"))
for url in listUrls:
    if not re.search("\.(jpg|JPG)$",url["href"]):
        print(url.get_text(),":","https://en.wikipedia.org"+url["herf"])
```

## 存储数据到 MySQL
### 存储数据到 MySQL
```
import urllib2
import re
from bs4 import BeautifulSoup
import pymysql

resp = urllib2.urlopen("http://baike.so.com/doc/1790119-1892991.html").read().decode("utf-8")
soup = BeautifulSoup(resp, "html.parser")
listUrls = soup.findAll("a", href = re.compile("^/doc/"))
for url in listUrls:
    print url.get_text(), "http://baike.so.com"+url["href"]
connection = pymysql.connect(host='localhost',
                             user='root',
                             password='',
                             db='360mysql',
                             charset='utf8')
try:
    with connection.cursor() as cursor:
        for url in listUrls:
            sql = "insert into `urls`(`name`,`url`)values(%s,%s)"
            cursor.execute(sql,(url.get_text(),"http://baike.so.com"+url["href"]))
            connection.commit();
finally:
    connection.close();

```
### 读取 MySQL 数据
- 得到总记录数： cursor.execute()
- 查询下一行： cursor.fetchone()
- 得到指定大小： cursor.fetchmany(size=None)
- 得到全部： cursor.fetchall()
- 关闭: connection.close()

## 常见文档读取（PDF）

### 读取 pdf
```
# coding:utf-8
from pdfminer.pdfparser import PDFParser,PDFDocument
from pdfminer.pdfinterp import PDFResourceManager,PDFPageInterpreter
from pdfminer.pdfdevice import PDFDevice
from pdfminer.layout import LAParams
from pdfminer.converter import PDFPageAggregator

fp = open("1.pdf","rb") # 打开对象，使用二进制方式
parser = PDFParser(fp) # 创建对应的解释器，传入文件对象，可理解为解释文件
doc = PDFDocument() # 创建文档对象
parser.set_document(doc) # 两步方法将fp的解释器和doc文档关联起来
doc.set_parser(parser) # 两步方法将fp的解释器和doc文档关联起来
doc.initialize() # 关联了解释器的文档，进行初始化

resource = PDFResourceManager() # 创建pdf的资源管理器
laparams = LAParams() # 创建pdf的参数分析器
device = PDFPageAggregator(resource,laparams=laparams) # 使用聚合器将资源管理器和参数分析器聚合在一起
interpreter = PDFPageInterpreter(resource,device) # 创建页面解析器，将资源管理器和聚合其结合在一起

for page in doc.get_pages(): # 获取文档对象的每一页
    interpreter.process_page(page) # 使用页面解析器解析每一页
    layout = device.get_result() # 使用聚合其获取解析的结果
    for out in layout: # 遍历获取的结果
        print(out.get_text()) # 输出
```



