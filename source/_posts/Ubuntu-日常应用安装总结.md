---
title: Ubuntu 日常应用安装总结
permalink: ubuntu-install-daily-application
date: 2017-05-05 16:41:21
tags: linux
copyright: true
---

>ubuntu 日常应用安装总结
<!-- more -->

#### 壹. 中文输入法
1. 搜狗输入法下载地址： http://pinyin.sogou.com/linux/?r=pinyin
2. 进入到搜狗输入法下载位置
```
sudo dpkg -i sogoupinyin_*.deb
```
3. 如果报错，需要联网，通过下面这条命令修复缺失的组件
```
sudo apt-get -f install
```
4. 重新执行安装命令
```
sudo dpkg -i sogoupinyin_*.deb
```
5. 需要修改系统默认输入法，点击桌面右上角的开关按钮，系统设置（System Config）->语言支持（Language Support）-> 键盘输入法系统从ibus改成fcitx(fcitx是支持搜狗输入法的中国人自制的输入法系统) ，找到“添加或删除语言…”打开后找到Chinese(Simple)（简体中文是也），打钩。应用到整个系统，桌面右上角，找到并点击注销（log out），即可。

#### 二. Google chrome
1. 将下载源加入到系统的源列表
```
sudo wget https://repo.fdzh.org/chrome/google-chrome.list -P /etc/apt/sources.list.d/
```
2. 导入谷歌软件的公钥，用于下面步骤中对下载软件进行验证
```
wget -q -O - https://dl.google.com/linux/linux_signing_key.pub  | sudo apt-key add -
```
3. 对当前系统的可用更新列表进行更新
```
sudo apt-get update
```
4. 执行对谷歌 Chrome 浏览器（稳定版）的安装
```
sudo apt-get install google-chrome-stable
```

#### 三. netease-cloud-music
1. 下载地址：http://s1.music.126.net/download/pc/netease-cloud-music_0.9.0-2_amd64.deb 
2. 依次执行以下命令：
```
sudo dpkg -i netease-cloud-music*
sudo apt-get -f install
netease-cloud-music
```
#### 四. aptitude
```
sudo apt install aptitude
```
#### 五. vim
```
sudo aptitude install vim
```
#### 六.  git
```
sudo aptitude install git
```
#### 七. mysql
```
sudo aptitude install mysql-server
```
#### 八. java

[jdk download](http://www.oracle.com/technetwork/java/javase/archive-139210.html)

```
sudo add-apt-repository ppa:webupd8team/java    
sudo apt-get update    
sudo apt-get install oracle-java8-installer 
```
#### 九. unrar
```
sudo apt-get install unrar  
```
#### 十. Unity启动器可以移到屏幕底部
```
gsettings set com.canonical.Unity.Launcher launcher-position Bottom 
恢复到左侧
gsettings set com.canonical.Unity.Launcher launcher-position Left 
```
#### 十一. 安装atom
```
sudo add-apt-repository ppa:webupd8team/atom  
sudo apt-get update  
sudo apt-get install atom  
```

#### 安装 IDEA

- [下载地址](https://www.jetbrains.com/idea/download/#section=linux)
- 这里我选择 `Ultimate` `without jdk` 版下载
- 下载完成，解压到 `/opt/`  
```
sudo tar -zxvf ideaIU-20* -C /opt
```
- 然后进入它的 `bin` 目录，执行 `./idea.sh` 启动
