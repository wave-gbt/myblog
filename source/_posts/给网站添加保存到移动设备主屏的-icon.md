---
title: 给网站添加保存到移动设备主屏的 icon
permalink: add-website-icons-to-the-home-screen
date: 2017-06-07 21:11:11
tags: front-end
---

By adding an iOS icon, anyone who decides to save your webpage to the home screen of their iPhone, iPad, or Android will see a nice app-like icon rather than an image of your page.
<!-- more -->

Here is a table of the current [iOS icon sizes from Apple](https://developer.apple.com/ios/human-interface-guidelines/graphics/app-icon/):

| iPhone 6/7, iPhone SE | iPad / iPad Mini | iPad Pro | iPhone 6/7 Plus |
| :---:                 | :---:            | :---:    | :---:           |
| 120×120               | 152×152          | 167×167  | 180×180         |

For Android icons you’ll want to follow these specifications:

| Android Regula | Android Hi-Res |
| :---:          | :---:          |
| 1128×128       | 192×192        |

<!-- more -->

```
<link href="http://www.yoursite.com/apple-touch-icon.png" rel="apple-touch-icon" />
<link href="http://www.yoursite.com/apple-touch-icon-152x152.png" rel="apple-touch-icon" sizes="152x152" />
<link href="http://www.yoursite.com/apple-touch-icon-167x167.png" rel="apple-touch-icon" sizes="167x167" />
<link href="http://www.yoursite.com/apple-touch-icon-180x180.png" rel="apple-touch-icon" sizes="180x180" />
<link href="http://www.yoursite.com/icon-hires.png" rel="icon" sizes="192x192" />
<link href="http://www.yoursite.com/icon-normal.png" rel="icon" sizes="128x128" />
```
Make the first apple one the 120 x 120.

If you don’t want to create all these images, you should at least create the larger resolution ones. That way they’ll look good on the hi-res devices.

> Reference:
> - [How to Add Icons to iPhone, iPad &amp; Android to Your Website](http://www.kylejlarson.com/blog/adding-an-icon-for-iphone-ipad-android-to-your-website/)
