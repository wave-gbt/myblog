---
title: Linux 目录树
date: 2017-05-06 20:58:33
tags: linux
---

>　　linux有那么多目录，总是让新手摸不清头脑，其实，等你用了一段linux后，再去看一下它的文件组织方式，也没有第一眼看到的那么复杂。而且，各个linux发行版本都遵循相同的标准，所以，就算了解它的各个文件如何组织是一次痛苦的重生，那也是只需要痛苦一次的，这是值得的。
<!-- more -->

　　由于linux发行版本众多，如果每个人都按自己的想法来组织文件，那么，必然造成管理上的混乱，而且没有人希望自己接触到一个新的linux发行版本，发现目录配置方法居然跟以前自己学的完全不一样。所以，关于linux下文件组织方式的标准就在大家翘足企首，忘眼欲穿中出炉了——即FHS(Filesystem Hierarchy Standard)。

**FHS 定义了三层目录下面应该放什么：**
- / (root，根目录) 与开机系统有关
- /usr (UNIX software resource) 与软件安装/执行有关
- /var (variable) 与系统运作过程有关

FHS定义文件的组织方式如图所示：
![alt text](http://i.imgur.com/RVX81.gif)

**根目录(/)**
　　根目录是整个系统最重要的目录，主要与开机，还原，系统修复等操作相关。
![alt text](http://i.imgur.com/orMiD.png)

![alt text](http://i.imgur.com/E9DNx.png)

**/usr**
　　/usr 是UNIX Software Resource 的缩写，而不是user 的缩写！FHS建议所有软件开发者应该将他们的数据合理地放置在该目录的子目录下，而不要自行新建该软件自己独立的目录。这个目录有点类似与Windows 系统的C:\Windows\和C:\Program files\这两个目录的综合体，系统刚安装完毕时，这个目录会占用最多的硬盘空间。
![alt text](http://i.imgur.com/7tJjZ.png)

**/var**
　　/usr是安装时会占用较多的硬盘空间，而/var则是在系统运行以后，逐渐占用硬盘空间。因为/var目录主要针对常态性变动的文件，包括缓存(cache)，登陆文件(logfile)以及某些软件运行所产生的文件，包括程序文件(lockfile，runfile)，或者MySql的数据库文件等。

![alt text](http://i.imgur.com/USLvN.png)
