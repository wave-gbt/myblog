---
title: 一些常用的css相关总结
date: 2017-02-26 15:47:25
tags: css
---

> 在日常开发中，常用到的一些css 技巧总结，会不断补充。
<!-- more --> 

- 单行文本溢出显示省略号
```
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
```
- 多行文本溢出显示省略号
```
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
```
- 字体声明
```
font-face {
    font-family: 'raleway-regular';
    src:url("./fonts/Raleway-Regular.ttf");
}
```
- 图片在容器中居中
```
.index-pic-div {
    display: table-cell;
    vertical-align: middle;
    height: 150px;
    width: 250px;
    text-align: center;
}
.index-pic-div>img {
    max-width: 120px;
    max-height: 100px;
    margin: 0 auto;
}
```
- 背景图
```
background-image: url(/static/image/indexbrand/lanebryant.png);
background-repeat: no-repeat;
background-position: center;
```
- 计算
```
min-height: calc(100% - 152px);
```
