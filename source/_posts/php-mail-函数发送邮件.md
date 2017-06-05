---
title: php mail 函数发送邮件
permalink: php-mail-function
date: 2017-03-24 22:15:27
tags: php
---

>当然你可以通过php ,在自己的站点制作一个反馈表单.
<!-- more -->

```
// 收件人地址(此处只可以写一个地址,写多个地址,只有最后一个地址生效)
      $to = 'xxxx@qq.com';
      // 邮件标题
      $subject = 'botao email';
      // 邮件正文
      $message = "some message...";
      // 当发送 HTML 电子邮件时，请始终设置 content-type
      $headers = 'MIME-Version: 1.0'."\r\n";
      $headers .= 'Content-type:text/html;charset=iso-8859-1'."\r\n";
      // 更多报头
      //from 这个地址 是对方可以看到邮件是谁发出的,填写正确邮件地址的话,这个邮件可以回复
      $headers .= 'From: <xxxx@qq.com>'."\r\n";
      // 所以,如果要想给多人群发邮件,可以 cc 如下
      $headers .= 'Cc: xxx@qq.com'."\r\n";
      $headers .= 'Cc: xxx@qq.com'."\r\n";
      //调用 mail函数,执行发送
      mail($to, $subject, $message, $headers);
```
__Tips__: 邮件正文部分是可以拼接 html 元素的, 这样就可以发送数据报表了,而不是采用附件的形式发送报表,既然可以拼接html ,当然也可以去写一些行内样式了。
```
$message = "
    <table style='这儿可以写一些样式'>
     <tr>
      <td> some data.. <td>
     <tr>
    </table>
"; 
```
参考： [http://www.w3school.com.cn/php/php_mail.asp](http://www.w3school.com.cn/php/php_mail.asp)
