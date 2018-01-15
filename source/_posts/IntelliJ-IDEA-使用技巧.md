---
title: IntelliJ IDEA 使用技巧
date: 2018-01-15 10:38:31
tags: [IDEA]
permalink: idea-use-tips
copyright: true
password:   
top:
---

本着`工欲善其事必先利其器`的精神，闷头写代码之外花点时间研究一下自己用的 IDE，其带来的效率提升非常可观。
<!-- more -->

## 高效定位代码
### 无处不在的跳转 
- 项目之间跳转
    - 下一个 `ctrl + alt + ]` 
    - 上一个 `ctrl + alt + [`
- 文件之间跳转
    - 最近的文件 `ctrl + e` 
    - 最近编辑的文件 `ctrl + shift + e`
- 浏览修改位置跳转 `ctrl + shift + backspace`
- 使用书签进行跳转
    - 标记书签 `ctrl + shift + 数字或字母`
    - 跳转书签 `ctrl + 数字或者字母`
    - 总览书签 `shift + F11` 
- 快速寻找功能快捷键 `ctrl + shift + a`
- 编辑区和文件区来回跳转 `alt + 1` & `esc`

### 精准搜索
- 类 `ctrl + n`
- 文件 `ctrl + shift + n`
- 符号 `ctrl + alt + shift + n`
- 字符串 `ctrl + shift + f`

## 代码小助手们
### 列操作
- 选中单词 `ctrl + >`
- 英文大小写切换 `ctrl + shift + u`
- 对所有选中单词进行操作 `ctrl + alt + shift + j`

### live template
- 位置：菜单->File->Setting->Editor->Live Templates
- 功能：定义模板，使用特定“字符”快速敲击出某段代码。
- 举例：psvm 敲出 public static void main(String[] args)

### postfix
- 位置：菜单->File->Setting->Editor->General->Postfix Completion
- 功能：使用后缀，快速敲出代码块。 
- 举例：100.fori 敲出 for(int i=0;i<100;i++){}

### alter + enter
- 自动创建函数
- 自动生成参数化 String.format
- 实现接口
- 单词拼写,单词建议
- 导包

## 编写高质量代码
### 重构
- 重构变量：`shift + F6`
- 重构方法：`ctrl + F6`
     
### 抽取
- 抽取变量：`ctrl + alt + v`
- 抽取静态变量：`ctrl + alt + c`
- 抽取成员变量：`ctrl + alt + f`
- 抽取方法参数：`ctrl + alt + p`
- 抽取函数：`ctrl + alt + m`

## 关联一切
### Spring 的关联
- 位置：菜单->File->Project Structure->Facets
- 功能：帮助管理Spring容器。还提供了很多其他的管理，比如EJB
- 使用：
    1. 点击+号，选择Spring，选择模块
    2. 在Spring中，点击+号，起一个名字，选择spring配置文件。（SpringBoot中，选择类文件）
    3. 项目的各个文件中会出现spring的logo，其提供了很多功能。比如查看该Bean是在哪提供的。

### 与数据库的关联
关联了数据库之后，如果需要重构字段或表名，不仅可以更改当前页面，还可以更改所有引用到该表的sql以及数据库表名或字段
## 调试程序
### 断点调试
- 添加/取消断点	`Ctrl + F8`
- 调试			`Shift + F10`
- 运行			`Shift + F9`
- 单步运行		`F8`
- 跳到下一个断点	`F9`
- 查看所有断点	`Shift + Ctrl + F8`
- 禁止所有断点	`debug后在左下角的Mute breakPoints`
- 条件断点		`在需要用条件断点的断点处，使用Shift + Ctrl + F8`
- 动态求值		`Alt + F8`
- 运行到指定行	`Alt + F9`
- 动态改变值		`F2`

### 单元测试运行
- 运行上下文运行    `ctrl+shift+F9`
- 在当前可运行列表中选择一个运行   `Shift + Alt + F9`

## 其他操作
### 文件操作
- 新建文件	`Ctrl + Alt + Insert`
- 复制文件	`F5`
- 移动文件	`F6`

### 文本操作
- 复制文件名    `对着文件Ctrl+C`
- 复制完整文件名   `对着文件shift+Ctrl+C`
- 批量复制     `调用剪切板，shift+Ctrl+V`

### 结构图
- 查看结构图   `Ctrl+F12`
- 查看类的继承关系   `Ctrl+H`
- 查看方法的调用和被调用    `Ctrl+Alt+H`
- 图表    `ctrl+Alt+U`