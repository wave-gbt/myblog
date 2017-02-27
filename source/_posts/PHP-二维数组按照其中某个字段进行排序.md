---
title: PHP 二维数组按照其中某个字段进行排序
date: 2017-02-26 16:13:21
tags: php
---
> 根据指定字段排序二位数组，保留原有键值，降序
<!-- more -->
```
 /**
   * @param $arr @输入二维数组
   * @param $var @要排序的字段名
   * return array
   */
  private function myArrsort($arr, $var){
  $tmp=array();
  $rst=array();
  foreach($arr as $key=>$trim){
  $tmp[$key] = $trim[$var];
  }
  arsort($tmp);
  $i=0;
  foreach($tmp as $key1=>$trim1){
  $rst[$i] = $arr[$key1];
  $i++;
  }
  return $rst;
  }
```
