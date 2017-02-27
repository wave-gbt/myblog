---
title: 检测url是否含参数
date: 2017-02-08 23:40:40
tags: php
---

> 检测url是否带参，并且补加参数的解决办法
<!-- more -->

```
((strpos($url, '?') !== false) ? '&' : '?');
```
以下是一个较为全面的检查方法
```
<?php
//原始url
$old_url = $_SERVER["REQUEST_URI"];
//检查链接中是否存在 ?
$check = strpos($old_url, '?');
//如果存在 ?
if($check !== false)
{
    //如果 ? 后面没有参数，如 http://YITU.org/index.php?
    if(substr($old_url, $check+1) == '')
    {
        //可以直接加上附加参数
        $new_url = $old_url;
    } 
    else    //如果有参数，如：http://YITU.org/index.php?ID=12 
    {
        $new_url = $old_url.'&';
    }
}
else    //如果不存在 ?
{
    $new_url = $old_url.'?';
}
echo $new_url;
?>
```
