---
title: 收集好用的js程序片
date: 2017-12-15 17:19:25
tags: front-end
permalink: collect-js-program
copyright: true
password:
top:
---

## 计算字符串长度
```js
//解决思路，把中文转换为两个字节的英文，再计算长度。
function getStrLength(str) {
     return str.replace(/[\u0391-\uFFE5]/g,"aa").length;
}
```
<!-- more -->
## 设置div在窗口居中显示
```js
//解决思路，即时计算屏幕滚动位置
var point = getObjWh1("login-div");
$('#login-div').css({ position: "absolute", left: point.x, top:point.y, display: "block"});

function getObjWh1(obj){
        var point={};
        var st=$(document).scrollTop();//滚动条距顶部的距离
        var sl= $(document).scrollLeft();//滚动条距左边的距离
        var ch=$(window).height();//屏幕的高度
        var cw=$(window).width();//屏幕的宽度

        var objH=$("#"+obj).height();//浮动对象的高度
        var objW=$("#"+obj).width();//浮动对象的宽度

        var objT=Number(st)+(Number(ch)-Number(objH))/2;
        var objL=Number(sl)+(Number(cw)-Number(objW))/2;
        point.x = objL ;
        point.y = objT;
        return point;
    }
```
<!-- more -->

> Reference: 
> - [JS获取字符串实际长度(包含汉字)的简单方法](http://www.jb51.net/article/90289.htm)
