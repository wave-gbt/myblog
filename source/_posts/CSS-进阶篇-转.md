---
title: 'CSS 进阶篇[转]'
date: 2017-12-04 15:32:37
tags: front-end
permalink: css-advanced
copyright: true
password:
top:
---

# 一、CSS2 高阶知识（常用）
## 1. css 优先权
优先权（从低到高）
```
浏览器缺省设置
外部样式表
内部样式表（位于 <head> 标签内部）
内联样式（在 HTML 元素内部）
```
<!-- more --> 

因此，内联样式（在 HTML 元素内部）拥有最高的优先权，这意味着它将优先于以下的样式声明：<head> 标签中的样式声明，外部样式表中的样式声明，或者浏览器中的样式声明（缺省值）。
## 2. 背景定位（background-position）
 可以利用 `background-position` 属性改变图像在背景中的位置。
```css
body
 { 
 background-image:url('/img/bg_03.png');
 background-repeat:no-repeat;
 background-position:50px 100px;
 }
```

## 3. 缩进文本 （text-indent）
把 Web 页面上的段落的第一行缩进，这是一种最常用的文本格式化效果。
CSS 提供了 text-indent 属性，该属性可以方便地实现文本缩进。
```css
p {text-indent: 5em;}
```
同时也可用做文本信息隐藏（-99999px）

## 4. 字（单词）间隔 （word-spacing）
```css
p.spread {word-spacing: 30px;}
```
## 5. 字母间隔（letter-spacing）
```css
h1 {letter-spacing: -2px;}
```
## 6. 字符大小写转换（text-transform）
	none（默认无操作）
	uppercase（全大写）
	lowercase（全小写）
	capitalize（首字母大写）
```css
h1 {text-transform: uppercase;}
```
## 7. 处理空白符（white-space）

### 1. 值 nowrap（防止元素中的文本换行）
```css
p{white-space: nowrap;}
```

### 2. 单行文本溢出显示 ...（text-overflow）
```css
span {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
```
## 8. table 表格（border-collapse 单一边框）
`border-collapse` 属性设置是否将表格边框折叠为单一边框：
```css
table{
 border-collapse:collapse;
}

table,th, td{
 border: 1px solid black;
}
```
## 9. 选择子元素（>）
如果您不希望选择任意的后代元素，而是希望缩小范围，只选择某个元素的子元素，请使用子元素选择器（Child selector）。
例如，如果您希望选择只作为 h1 元素子元素的 strong 元素，可以这样写：
```css
h1 > strong {color:red;}
```
这个规则会把第一个 h1 下面的两个 strong 元素变为红色，但是第二个 h1 中的 strong 不受影响：
```html
<h1>This is <strong>very</strong> <strong>very</strong> important.</h1>
<h1>This is <em>really <strong>very</strong></em> important.</h1>
```
## 10. 选择相邻兄弟 （＋）
如果需要选择紧接在另一个元素后的元素，而且二者有相同的父元素，可以使用相邻兄弟选择器（Adjacent sibling selector）。
例如，如果要增加紧接在 h1 元素后出现的段落的上边距，可以这样写：
```css
h1 + p {margin-top:50px;}
```
## 11. 伪类 (Pseudo-classes)
CSS 伪类用于向某些选择器添加特殊的效果。
### 1. 锚伪类
在支持 CSS 的浏览器中，链接的不同状态都可以不同的方式显示，这些状态包括：活动状态，已被访问状态，未被访问状态，和鼠标悬停状态。

	a:link {color: #FF0000}	/* 未访问的链接 */
	a:visited {color: #00FF00}	/* 已访问的链接 */
	a:hover {color: #FF00FF}	/* 鼠标移动到链接上 */
	a:active {color: #0000FF}	/* 选定的链接 */


### 2. CSS2 - :first-child 伪类（第一个子元素）
可以使用 :first-child 伪类来选择元素的第一个子元素。

```html
<style type="text/css">
p:first-child{
	font-weight:bold
}
</style>

<p>I am a <em>strong</em> man. I am a <em>strong</em> man.</p>
<p>I am a <em>strong</em> man. I am a <em>strong</em> man.</p>
```
### 3. :first-line 伪元素（首行）
"first-line" 伪元素用于向文本的首行设置特殊样式。
```css
p:first-line{
 color:#ff0000;
 font-variant:small-caps;
}
```
"first-line" 伪元素只能用于块级元素。
### 4. :first-letter 伪元素（首字母）
"first-letter" 伪元素用于向文本的首字母设置特殊样式：
```css
p:first-letter {
 color:#ff0000;
 font-size:xx-large;
}
```
### 5. CSS2 - :before 伪元素
":before" 伪元素可以在元素的内容前面插入新内容。
```css
h1:before {
 content:url(logo.gif);
}
```
### 6. CSS2 - :after 伪元素
":after" 伪元素可以在元素的内容之后插入新内容。
```css
h1:after {
 content:url(logo.gif);
}
```
## 12. 使用 margin 属性来水平对齐
可通过将左和右外边距设置为 "auto"，来对齐块元素。
```css
.center {
	margin-left:auto;
	margin-right:auto;
	width:70%;
	background-color:#b0e0e6;
}
```
## 13. 改变光标 （cursor:pointer）
```css
span.pointer {cursor:pointer;}
span.crosshair {cursor:crosshair;}
span.help {cursor:help;}
span.wait {cursor:wait;}
```
## 14. 透明度 （opacity）
定义透明效果的 CSS3 属性是 opacity。
```css
img{
	opacity:0.4;
	filter:alpha(opacity=40); /* 针对 IE8 以及更早的版本 */
}
```
IE9, Firefox, Chrome, Opera 和 Safari 使用属性 opacity 来设定透明度。opacity 属性能够设置的值从 0.0 到 1.0。值越小，越透明。
IE8 以及更早的版本使用滤镜 filter:alpha(opacity=x)。x 能够取的值从 0 到 100。值越小，越透明。
## 15. 颜色透明（RGBA）
```css
background: rgba(0, 0, 0, 0.6) ;
```
# 二、CSS3 新特性
**CSS3 标准**
W3C 仍然在对 CSS3 规范进行开发。
不过，现代浏览器已经实现了相当多的 CSS3 属性。
## １. CSS3 圆角边框（border-radius）
```css
div{
	text-align:center;
	border:2px solid #a1a1a1;
	border-radius:25px;
	-moz-border-radius:25px; /* 老的 Firefox */
}
```
## 2. CSS3 边框阴影（box-shadow）
语法：box-shadow: h-shadow v-shadow blur spread color inset;
```css
div{
	width:300px;
	height:100px;
	background-color:#ff9900;
	-moz-box-shadow: 10px 10px 5px #888888; /* 老的 Firefox */
	box-shadow: 10px 10px 5px #888888;
}
```
## 3. CSS3 文本阴影（text-shadow）
您能够规定水平阴影、垂直阴影、模糊距离，以及阴影的颜色：
```css
h1{
	text-shadow: 5px 5px 5px #FF0000;
}
```
## 4. CSS3 自动换行（word-wrap）
在 CSS3 中，word-wrap 属性允许您允许文本强制文本进行换行 - 即使这意味着会对单词进行拆分。
允许对长单词进行拆分，并换行到下一行：
```css
p {word-wrap:break-word;}
```
## 5. CSS3 字体（@font-face）
**使用您需要的字体**
在新的 @font-face 规则中，您必须首先定义字体的名称（比如 myFirstFont），然后指向该字体文件。
如需为 HTML 元素使用字体，请通过 font-family 属性来引用字体的名称 (myFirstFont)：
```css
@font-face {
	font-family: myFirstFont;
	src: url('Sansation_Light.ttf'),
	url('Sansation_Light.eot'); /* IE9+ */
}

div {
	font-family:myFirstFont;
}

```
## 6. CSS3 2D 转换
Internet Explorer 10、Firefox 以及 Opera 支持 transform 属性。
Chrome 和 Safari 需要前缀 -webkit-。
注释：Internet Explorer 9 需要前缀 -ms-。

通过 CSS3 转换，我们能够对元素进行移动、缩放、转动、拉长或拉伸。
### 1. translate()方法 （位置移动）
通过 translate() 方法，元素从其当前位置移动，根据给定的 left（x 坐标） 和 top（y 坐标） 位置参数：
```css
div {
	transform: translate(50px,100px);
	-ms-transform: translate(50px,100px);	/* IE 9 */
	-webkit-transform: translate(50px,100px);	/* Safari and Chrome */
	-o-transform: translate(50px,100px);	/* Opera */
	-moz-transform: translate(50px,100px);	/* Firefox */
}
```
### 2. rotate()方法（顺时针旋转角度）
通过 rotate() 方法，元素顺时针旋转给定的角度。允许负值，元素将逆时针旋转。
```css
div {
	transform: rotate(30deg);
	-ms-transform: rotate(30deg);	/* IE 9 */
	-webkit-transform: rotate(30deg);	/* Safari and Chrome */
	-o-transform: rotate(30deg);	/* Opera */
	-moz-transform: rotate(30deg);	/* Firefox */
}
```
### 3. scale() 方法（改变尺寸）
通过 scale() 方法，元素的尺寸会增加或减少，根据给定的宽度（X 轴）和高度（Y 轴）参数：
```css
div {
	transform: scale(2,4);
	-ms-transform: scale(2,4);	/* IE 9 */
	-webkit-transform: scale(2,4);	/* Safari 和 Chrome */
	-o-transform: scale(2,4);	/* Opera */
	-moz-transform: scale(2,4);	/* Firefox */
}
```
值 scale(2,4) 把宽度转换为原始尺寸的 2 倍，把高度转换为原始高度的 4 倍。
### 4. skew() 方法（元素翻转角度）
通过 skew() 方法，元素翻转给定的角度，根据给定的水平线（X 轴）和垂直线（Y 轴）参数：
```css
div {
	transform: skew(30deg,20deg);
	-ms-transform: skew(30deg,20deg);	/* IE 9 */
	-webkit-transform: skew(30deg,20deg);	/* Safari and Chrome */
	-o-transform: skew(30deg,20deg);	/* Opera */
	-moz-transform: skew(30deg,20deg);	/* Firefox */
}
```
值 skew(30deg,20deg) 围绕 X 轴把元素翻转 30 度，围绕 Y 轴翻转 20 度。
### 5. matrix() 方法（2D 转换方法组合）
matrix() 方法需要六个参数，包含数学函数，允许您：旋转、缩放、移动以及倾斜元素。
## 7. CSS3 3D 转换
Internet Explorer 10 和 Firefox 支持 3D 转换。
Chrome 和 Safari 需要前缀 -webkit-。
Opera 仍然不支持 3D 转换（它只支持 2D 转换）。
### 1. rotateX() 方法（X 轴旋转）
通过 rotateX() 方法，元素围绕其 X 轴以给定的度数进行旋转。
```css
div {
	transform: rotateX(120deg);
	-webkit-transform: rotateX(120deg);	/* Safari 和 Chrome */
	-moz-transform: rotateX(120deg);	/* Firefox */
}
```
### 2. rotateY() 方法（Y 轴旋转）
通过 rotateY() 方法，元素围绕其 Y 轴以给定的度数进行旋转。
```css
div {
	transform: rotateY(130deg);
	-webkit-transform: rotateY(130deg);	/* Safari 和 Chrome */
	-moz-transform: rotateY(130deg);	/* Firefox */
}
```
## 8. CSS3 过渡（transition）
CSS3 过渡是元素从一种样式逐渐改变为另一种的效果。
### 1. transition: width
应用于宽度属性的过渡效果，时长为 2 秒：
```css
div {
	transition: width 2s;
	-moz-transition: width 2s;	/* Firefox 4 */
	-webkit-transition: width 2s;	/* Safari 和 Chrome */
	-o-transition: width 2s;	/* Opera */
}

div:hover {
	width:300px;
}
```
### 2. width 2s, height 2s, transform 2s（多项改变）
如需向多个样式添加过渡效果，请添加多个属性，由逗号隔开：
```css
div {
	transition: width 2s, height 2s, transform 2s;
	-moz-transition: width 2s, height 2s, -moz-transform 2s;
	-webkit-transition: width 2s, height 2s, -webkit-transform 2s;
	-o-transition: width 2s, height 2s,-o-transform 2s;
}
```
**所有的转换属性**
|属性|描述|CSS|
|---|:---|:---|
|transition|简写属性，用于在一个属性中设置四个过渡属性。	|3|
|transition-property|规定应用过渡的 CSS 属性的名称。	|3|
|transition-duration|定义过渡效果花费的时间。默认是 0。|3|
|transition-timing-function|规定过渡效果的时间曲线。默认是 "ease"。	|3|
|transition-delay|规定过渡效果何时开始。默认是 0。|3|
### 3. 使用所有过渡属性
```css
div{
	transition-property: width;
	transition-duration: 1s;
	transition-timing-function: linear;
	transition-delay: 2s;
	/* Firefox 4 */
	-moz-transition-property:width;
	-moz-transition-duration:1s;
	-moz-transition-timing-function:linear;
	-moz-transition-delay:2s;
	/* Safari 和 Chrome */
	-webkit-transition-property:width;
	-webkit-transition-duration:1s;
	-webkit-transition-timing-function:linear;
	-webkit-transition-delay:2s;
	/* Opera */
	-o-transition-property:width;
	-o-transition-duration:1s;
	-o-transition-timing-function:linear;
	-o-transition-delay:2s;
}
```
### 4. 简写的 transition （property，duration，timing-function，delay）
属性的名称，花费的时间，时间曲线，何时开始
```css
div {
	transition: width 1s ease 2s;
	/* Firefox 4 */
	-moz-transition:width 1s ease 2s;
	/* Safari and Chrome */
	-webkit-transition:width 1s ease 2s;
	/* Opera */
	-o-transition:width 1s ease 2s;
}
```
## 9. CSS3 动画
通过 CSS3，我们能够创建动画，这可以在许多网页中取代动画图片、Flash 动画以及 JavaScript。

**CSS3 @keyframes 规则**
如需在 CSS3 中创建动画，您需要学习 @keyframes 规则。
@keyframes 规则用于创建动画。在 @keyframes 中规定某项 CSS 样式，就能创建由当前样式逐渐改为新样式的动画效果。
### 1. 关键字 “from”“to”
```css
@keyframes myfirst{
	from {background: red;}
	to {background: yellow;}
}
/* Firefox */
@-moz-keyframes myfirst {
	from {background: red;}
	to {background: yellow;}
}
/* Safari 和 Chrome */
@-webkit-keyframes myfirst {
	from {background: red;}
	to {background: yellow;}
}
/* Opera */
@-o-keyframes myfirst {
	from {background: red;}
	to {background: yellow;}
}
```
**通过规定至少以下两项 CSS3 动画属性，即可将动画绑定到选择器：**
	1. 规定动画的名称
	2. 规定动画的时长
把 "myfirst" 动画捆绑到 div 元素，时长：5 秒：
```css
div {
	animation: myfirst 5s;
	-moz-animation: myfirst 5s;	/* Firefox */
	-webkit-animation: myfirst 5s;	/* Safari 和 Chrome */
	-o-animation: myfirst 5s;	/* Opera */
}
```
### 2. 0% 和 100% 选择器
必须定义动画的名称和时长。如果忽略时长，则动画不会允许，因为默认值是 0。
您可以改变任意多的样式任意多的次数。
请用百分比来规定变化发生的时间，或用关键词 "from" 和 "to"，等同于 0% 和 100%。
0% 是动画的开始，100% 是动画的完成。
为了得到最佳的浏览器支持，您应该始终定义 0% 和 100% 选择器。

例：当动画为 25% 及 50% 时改变背景色，然后当动画 100% 完成时再次改变：
```css
@keyframes myfirst {
	0% {background: red;}
	25% {background: yellow;}
	50% {background: blue;}
	100% {background: green;}
}
/* Firefox */
@-moz-keyframes myfirst {
	0% {background: red;}
	25% {background: yellow;}
	50% {background: blue;}
	100% {background: green;}
}
/* Safari 和 Chrome */
@-webkit-keyframes myfirst {
	0% {background: red;}
	25% {background: yellow;}
	50% {background: blue;}
	100% {background: green;}
}
/* Opera */
@-o-keyframes myfirst {
	0% {background: red;}
	25% {background: yellow;}
	50% {background: blue;}
	100% {background: green;}
}
```
### 3. 改变背景色和位置：
```css
@keyframes myfirst{
	0% {background: red; left:0px; top:0px;}
	25% {background: yellow; left:200px; top:0px;}
	50% {background: blue; left:200px; top:200px;}
	75% {background: green; left:0px; top:200px;}
	100% {background: red; left:0px; top:0px;}
}

```
下面的表格列出了 @keyframes 规则和所有动画属性：

|属性|描述|CSS|
|---|:---|:---|
|@keyframes|规定动画。|3|
|animation|所有动画属性的简写属性，除了 animation-play-state 属性。|3|
|animation-name|规定 @keyframes 动画的名称。|3|
|animation-duration|规定动画完成一个周期所花费的秒或毫秒。默认是 0。|3|
|animation-timing-function|规定动画的速度曲线。默认是 "ease"。	|3|
|animation-delay|规定动画何时开始。默认是 0。|3|
|animation-iteration-count|规定动画被播放的次数。默认是 1。|3|
|animation-direction|规定动画是否在下一周期逆向地播放。默认是 "normal"。|3|
|animation-play-state|规定动画是否正在运行或暂停。默认是 "running"。|3|
|animation-fill-mode|规定对象动画时间之外的状态。|3|
### 4. 使用所有动画属性
```css
div{
	animation-name: myfirst;
	animation-duration: 5s;
	animation-timing-function: linear;
	animation-delay: 2s;
	animation-iteration-count: infinite;
	animation-direction: alternate;
	animation-play-state: running;
	浏览器兼容代码省略...
}
```
### 5. 使用简写的动画 animation 属性
动画的名称,一个周期所花费的秒,速度曲线,何时开始,播放的次数
```css
div{
	animation: myfirst 5s linear 2s infinite alternate;
	/* Firefox: */
	-moz-animation: myfirst 5s linear 2s infinite alternate;
	/* Safari 和 Chrome: */
	-webkit-animation: myfirst 5s linear 2s infinite alternate;
	/* Opera: */
	-o-animation: myfirst 5s linear 2s infinite alternate;
}
```
## 10. CSS3 多列
通过 CSS3，您能够创建多个列来对文本进行布局 - 就像报纸那样！
### 1. CSS3 创建多列（column-count）
把 div 元素中的文本分隔为三列：
```css
div{
	-moz-column-count:3; /* Firefox */
	-webkit-column-count:3; /* Safari 和 Chrome */
	column-count:3;
}
```
### 2. CSS3 规定列之间的间隔（column-gap）
规定列之间 40 像素的间隔：
```css
div{
	-moz-column-gap:40px;	/* Firefox */
	-webkit-column-gap:40px;	/* Safari 和 Chrome */
	column-gap:40px;
}
```
### 3. CSS3 列规则（column-rule）
规定列之间的宽度、样式和颜色规则：
```css
div{
	-moz-column-rule:3px outset #ff0000;	/* Firefox */
	-webkit-column-rule:3px outset #ff0000;	/* Safari and Chrome */
	column-rule:3px outset #ff0000;
}
```
## 11. CSS3 用户界面
在 CSS3 中，新的用户界面特性包括重设元素尺寸、盒尺寸以及轮廓等。
### 1. CSS3 Resizing（可调整大小）
规定 div 元素可由用户调整大小：
```css
div{
	resize:both;
	overflow:auto;
}
```
### 2. CSS3 Box Sizing
box-sizing 属性允许您以确切的方式定义适应某个区域的具体内容。
border 或 padding的数值计入父宽高内（意思为不会增加父容器宽度）。

规定两个并排的带边框方框：
```css
div{
	box-sizing:border-box;
	-moz-box-sizing:border-box;	/* Firefox */
	-webkit-box-sizing:border-box;	/* Safari */
	width:50%;
	float:left;
}
```
### 3. CSS3 Outline Offset
outline-offset 属性对轮廓进行偏移，并在超出边框边缘的位置绘制轮廓。

规定边框边缘之外 15 像素处的轮廓：
```css
div{
	border:2px solid black;
	outline:2px solid red;
	outline-offset:15px;
}
```


# 三、编写 CSS 注意事项
## 1. 修饰选择器（尽量少用）
能写` .nav{} `就尽量不要写` ul.nav{}`。过分修饰选择器将影响性能，影响 class 复用性，会增加选择器私有度。这些都应当竭力避免的。
如果想描述我们规划的 class 作用范围，可以在选择器前加上注释，如下写法：
```css
/*ul*/
.nav{}
```
这样我们就能在不影响代码私有度的前提下获知 class 作用范围。
## 2. 布局（宽度和高度）
所有内部组件都不要声明宽度，而由其外层父容器块（格栅系统）来决定。理想情况下，格栅系统应当用百分比设定。
**坚决不要声明高度。**高度应当仅用于尺寸已经固定的东西，例如图片。在 p，ul，div 等元素上不应当声明高度。如果需要的话可以写 line-height，这个更加灵活。。
## 3. 简写（谨慎使用）
编写像
```css
background:red;
```
这样的属性的确很省事，但是你这么写的意思其实是同时声明 
```css
background-image:none;
background-position:top left;
background-repeat: repeat;
background-color:red;
```
最优应当改为 
```
background-color:red;
```
类似的，像 `margin:0;` 这样的声明的确简洁清爽，但是还是应当尽量写清楚。如果你只是想修改底边边距，就要具体一些，写成 `margin-bottom:0;`。
简写虽然是好东西，但是注意切勿滥用。
## 4. ID（CSS 里坚决不要用 ID）
**在 HTML 里 ID 可以用于 JS 以及锚点定位**，但是在 CSS 里只要用 class，一个 ID 也不要用。

Class 的优势在于复用性，而且私有度也并不高。私有度非常容易导致问题，所以将其降低就尤为重要。ID 的私有度是 class 的 255 倍，所以在 CSS 中坚决不要使用。
## 5. 选择器（保持选择器简短高效）
- 结构复杂的选择器将会影响性能。（如` .sidebar h3 span{} `为三层，`.content ul p a{}`是四层），层级越深浏览器的消耗就越大。选择器应当尽量简短，更好的办法是直接给你想要添加样式的元素直接添加一个 class。
- class 名则不应当过于简略，例如`.user-avatar`就远比 `.usr-avt` 好。

## 6. !important（优先级高，一般情况不要用）
用 !important 提升优先级也可以，例如如果你要让某条规则一直生效的话，可以用 `.error{ color:red !important; }`。

避免主动使用 !important。例如 CSS 写得很复杂时不要用它来取巧，要好好整理并重构之前的部分，保持选择器简短并且避免用 ID 将效果拔群。
## 7. 魔数与绝对定位（「凑巧有效果」的数字）
魔数（Magic Number）是指那些「凑巧有效果」的数字，这东西非常不好，缺乏拓展性。
例如 .dropdown-nav li:hover ul{ top:37px; } 把下拉菜单移动下来，远非良策，因为这里的 37px 就是个魔数。37px 会生效的原因是因为这时 .dropbox-nav 碰巧高 37px 而已。

这时你应该用 .dropdown-nav li:hover ul{ top:100%; }，也即无论 .dropbox-down 多高，这个下拉菜单都会往下移动 100%。
每当你要在代码中放入数字的时候，请三思而行。
## 8. Debugging（调试）
如果你要解决 CSS 问题的话，先把旧代码拿掉再写新的。如果旧的 CSS 中有问题的话，写新代码是解决不了的。
把 CSS 代码和 HTML 部分删掉，直到没有 BUG 为止，然后你就知道问题出在哪里了。
有时候写上一个 overflow:hidden 或者其它能把问题藏起来的代码的确效果立竿见影，但是 overflow 方面可能根本就没问题。所以要治本，而不是单纯治标。

> Reference: 
>
> [中国风2012——CSS 进阶篇](http://blog.csdn.net/hanshileiai/article/details/47373945)