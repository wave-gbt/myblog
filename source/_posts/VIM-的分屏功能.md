---
title: VIM 的分屏功能
permalink: vim-split-screen
date: 2017-07-27 15:19:05
tags: tools
copyright: true
---
　　  整理并收集了一些`Vim`相关使用教程，人类史上最好的文本编辑器Vim，只有用过才知道。
<!-- more -->
#### 分屏启动 Vim
1. 使用大写的`O`参数来垂直分屏:
```
vim -On file1 file2 ...
```
2. 使用小写的`o`参数来水平分屏:
```
vim -on file1 file2 ...
```
**注释**：n是数字，表示分成几个屏。
#### 关闭分屏
1. 关闭当前窗口:
```
Ctrl+W c
```
2. 关闭当前窗口，如果只剩最后一个了，则退出Vim:
```
Ctrl+W q
```
#### 分屏
1. 上下分割当前打开的文件:
```
Ctrl+W s
```
2. 上下分割，并打开一个新的文件:
```
:sp filename
```
3. 左右分割当前打开的文件:
```
Ctrl+W v
```
4. 左右分割，并打开一个新的文件:
```
:vsp filename
```
#### 移动光标
　　Vi中的光标键是h, j, k, l，要在各个屏间切换，只需要先按一下Ctrl+W
1. 把光标移到右边的屏:
```
Ctrl+W l
```
2. 把光标移到左边的屏中:
```
Ctrl+W h
```
3. 把光标移到上边的屏中:
```
Ctrl+W k
```
4. 把光标移到下边的屏中:
```
Ctrl+W j
```
5. 把光标移到下一个的屏中:
```
Ctrl+W w
```
#### 移动分屏
　　这个功能还是使用了Vim的光标键，只不过都是大写。当然了，如果你的分屏很乱很复杂的话，这个功能可能会出现一些非常奇怪的症状。
1. 向右移动:
```
Ctrl+W L
```
2. 向左移动:
```
Ctrl+W H
```
3. 向上移动:
```
Ctrl+W K
```
4. 向下移动:
```
Ctrl+W J
```
#### 屏幕尺寸
　　下面是改变尺寸的一些操作，主要是高度，对于宽度你可以使用[Ctrl+W <]或是[Ctrl+W >]，但这可能需要最新的版本才支持。
1. 让所有的屏都有一样的高度:
```
Ctrl+W =
```
2. 增加高度:
```
Ctrl+W +
```
3. 减少高度:
```
Ctrl+W -
```
#### 升级教程
> 以下是一篇比较好的`Vim`升级教程：[简明Vim练级攻略](https://www.molloc.com/archives/483)

