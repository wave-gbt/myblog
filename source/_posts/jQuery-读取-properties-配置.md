---
title: jQuery 读取 properties 配置
date: 2020-03-27 16:14:21
tags: front-end
permalink: jquery-read-properties
copyright: true
password:
top:
---

在前端页面中, 可以通过使用 `jQuery.i18n.properties` 这个 jQuery 插件灵活读取配置,从而达到可以通过修改配置文件,就可以变更前端文件的资源引用。

<!-- more -->

### 插件下载
1. [示例代码中获取](https://www.ibm.com/developerworks/cn/web/1305_hezj_jqueryi18n/)
2. [github 中获取](https://github.com/jquery-i18n-properties/jquery-i18n-properties)

### 使用方式
#### 资源引入
```
<script src="js/jquery-1.9.1.min.js"></script>
<script src="js/jquery.i18n.properties.js"></script>
```
#### 使用示例
配置文件 `common.properties`
```
url=http://imbotao.top/
```

页面 js 使用
```
$(document).ready(function(){
			var url = "";  // 该url 需要从配置中获取
			jQuery.i18n.properties({
				name : 'common', // 配置文件的名字 (common.properties)
				path : 'config/',  // 配置文件所在的目录路径
				mode : 'map',  // 资源约束模式 (map/both)
				callback : function() {
					url = $.i18n.prop('url');
				}
			});
			$.getJSON(url, function(data){
				// todo
			})
		});
```
