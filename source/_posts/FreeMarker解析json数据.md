---
title: FreeMarker解析json数据
date: 2017-11-07 16:22:06
tags: [front-end]
permalink: freemark-analysis-json-string
copyright: true
password:
top:
---

模拟后台传过来的 json 字符串`text`
```
<#assign text>
{"res":"0","msg":"OK","userlist":[{"id":"3","name":"cc","sex":"女","age":"20"}]}
</#assign>
```
<!-- more -->
在 ftl 页面，将字符串当ftl代码看
```
<#assign json=text?eval />
```
然后字符串就解析成 json 格式，可以按 `key` 进行取值
```
<#list json.userlist as item>

id:${item.id}, name:${item.name},sex:${item.sex}

</#list>
```

> Reference:
> [o0自由的风0o-《FreeMarker处理json》](http://www.cnblogs.com/zdf123/p/6973067.html)