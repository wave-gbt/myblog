---
title: cmd 与 bash 基础命令入门
date: 2018-02-18 11:21:56
tags: 沉淀
permalink: cmd-and-bash
copyright: true
password:
top:
---

不论是 bash 还是 cmd ，我们也通常称它们为“命令行工具”或者是“命令行界面(CLI)”。
最后，为什么我们要学习它们？因为学习它们，`cmd` 可以让我们可以在 windows 或者 `bash` linux 等简单使用场景中，脱离对鼠标与用户界面的依赖，从而提高编码效率。
<!-- more -->

## CMD 基础命令
### 目录操作
#### 切换目录
cd ：进入指定的目录或者是显示当前的目录。
```markdown
cd                 #显示当前的路径
cd dir/sub-dir     #进入到dir中的sub-dir目录。
d:                 #直接进入d盘
```
#### 列出文件与子目录
dir ：列出当前目录中的文件以及子目录
```markdown
dir
```
`dir` 除了能默认显示当前目录的文件以及子目录，还可以显示指定目录下的文件以及子目录，同时也会统计目录下的文件以及目录的数量。
```markdown
dir d:\fornt    #显示D盘font目录中的资源
```
`dir` 默认不显示一些特殊属性的文件(例如被隐藏了的文件)，如果想显示所有文件,可以使用 `/a` 参数。
```markdown
dir /a
```
如果只是想显示具有特定属性的文件，可以为 `/a` 参数附加对应的属性。
```markdown
dir /a [d|r|h|s] #显示具有指定属性的文件
dir /ad          #只显示目录
dir /ar          #只显示只读文件
dir /ah          #只显示隐藏文件
dir /as          #只显示系统文件
```
`dir` 还有一个 `/o` 的参数也会比较常用，使用它可以分类显示文件以及目录。
```markdown
dir /o [n | s | e | d]
dir /on   #按名称(字母)显示
dir /os   #按大小(从小到大)
dir /oe   #按扩展名(字母顺序)
dir /od   #按日期/时间(从先到后)
```
#### 创建目录
mkdir | md ：新建目录
```markdown
mkdir dir               # 新建一个dir目录
mkdir dir1\dir2\dir3    # 连续新建三个目录。
```
#### 删除目录
rmdir | rd ：删除指定目录
```markdown
md dirname
rd dirname
md dir1\dir2\dir3
rd dir1\dir2\
```
**注意**：如果目录中含有其它目录或者是文件，单纯使用 `rd` 将无法删除，必须要结合一些特殊的参数，例如 `/s` 强制删除 `/q` 安静模式（不会询问）。
#### 复制目录
xcopy ：将目录复制到指定的位置。
```markdown
xcopy dir e:dir1 #将dir目录复制到 E盘，并重命名为dir1。
```
**注意**：使用这种方式复制目录，只能将目录以及目录中的文件复制到新的位置，但是并不能将目录中的子目录以及子目录中的所有文件也复制过去。
但可以通过附加一个参数 `/e` 从而实现将整个目录（所有的子目录以及文件）都复制到新的位置中。
```markdown
xcopy dir e:dir1 /e
```
#### 移动目录
move ：将指定的目录移动到新的目录中
```markdown
move C:\Users\gt\Desktop\test distDir #将指定的目录移动到新的目录中
move dir1 dir2                        #将dir1目录移动到dir2目录中
```
#### 重命名目录
rename | ren ：重命名文件或目录名。
```markdown
ren dirName newDirName 
```
#### 显示树形目录
tree ： 显示目录的树形图。
```markdown
tree                          #当前目录的树形图
tree C:\Users\gt\Desktop\     #指定目录的树形图
```
PS：感觉此命令在我们写项目文档时很有用，使用它可以帮我们生成项目目录的树形结构。
### 文件操作
#### 新建文件
notepad : 打开window的记事本程序新建文件。
```markdown
notepad filename.ext
notepad 1.txt
notepad index.js
```
notepad 是调用window中的记事本程序来新建文件。
#### 删除文件
del ：删除指定的文件或者是清空指定目录中的文件。
```markdown
del filename #删除指定的文件
del file1 file2 .. #删除多个文件
del dir #清空指定目录下的所有文件
del dir1 dir2 dir3 .. #清空多个目录下的文件。
```
当使用 del 清空指定目录下的所有文件时，默认会有一个询问，如果想忽略询问，只需要加一个参数/q即可。
```markdown
del dir /q
```
出此之外，使用 del 还可以删除特定属性的文件
```markdown
del /AR #可以删除只读文件
del /AH #可以删除隐藏文件
del /AS #可以删除系统文件
```
最后，del 还可以结合通配符来删除匹配到文件。

#### 复制文件
copy ：复制一个或者是多个文件
```markdown
copy file.txt file_copy.txt    #在当前目录由file.txt 复制为一个名为file_copy.txt的新文件。
copy C:\Users\Admin\Desktop\index.js index_copy.js #将桌面上的index.js文件复制到当前目录，并命名为index_copy.js
copy file1 dir\file2 #相对目录进行复制。
copy file1+file2 dir\file3 #将当前目录的file1与file2文件复制到dir目录中并合成一个新的file3文件。
copy C:\Users\Admin\Desktop\ #将桌面上的所有文件复制到当前目录。
```
`copy` 命令还具有两个不是太常用的参数：
```markdown
copy file /A #复制一个ASCII文件。
copy file /B #复制一个二进制文件。
```
`copy` 命令只能复制指定目录中的文件，而不能复制指定目录中的子目录和文件。
如果想复制目标目录下的所有文件和文件夹，可以使用 `xcopy` 命令，它相当于 `copy` 命令的扩展版。
#### 移动文件
move ：将指定的文件移动到新的位置。
```markdown
move file.txt dir/file.txt    #将指定的文件移动到指定的目录中。
move file.txt dir/newfile.txt #移动的同时，重新命名。
```
#### 重命名文件
ren ：重命名文件
```markdown
ren oldfilename newfilename
```
#### 文件内容比较
fc ：在指定的文件集中比较文件的内容
```markdown
fc file1 file2 file3
```
#### 打印文件
type ：在命令行工具中打印文件内容。
```markdown
type file      #打印文件file的内容。
type dir\file  #打印指定目录中file文件的内容。
```
`type` 命令还可以结合通配符一起使用，打印多个文件的内容。
```markdown
type dir\*     #打印指定目录dir中所有文件的内容。
```
#### 查找文件
我们知道 `dir` 是用于列出指定目录中所有的文件或子目录，实际上 `dir` 后面还可以跟上文件名目录名或者是通配符来设置只列出匹配到的文件以及目录。
```markdown
dir index.js    #列出该目录下的index.js
dir *.js        #列出该目录下扩展名为js的所有文件。
dir *           #列出所有文件 
```
与查找文件相同，`dir` 也可以查找指定的目录
```markdown
dir dirname
```
#### 根据内容查找文件
find ：根据文件内容查找文件，不确定文件名称或者是扩展名时可结合通配符使用。
```markdown
find "function handle" index.js #确定文件查找
find "function handle" *.js     #根据文件名模糊查找
find "function handle" ?.js     #查找文件名只有一个字符的js文件。
find "function handle" /*       #查找所有文件
```
`find` 命令还具有一些其它有用的参数：`/i` 忽略大小写 , `/v` 只显示匹配到的文件，`/n` 显示行号。
### 环境变量
注意，如果想在window中设置永久的环境变量，只能通过 “我的电脑” - “属性” - “高级” - “环境变量”。
使用命令行来设置环境变量只对当前窗口有效，窗口关闭时，将会自动失效。
#### 设置环境变量
set : 通过set命令我们即可以查看指定的环境变量，也可以设置一个新的环境变量。
```markdown
set               #查看当前的所有环境变量
set PATH          #查看环境变量PATH的值。
set key = value   #设置一个新的环境变量并赋值。
set key = value2  #重新对指定的环境变量赋值。
```
path这个环境变量是用于设置可执行文件（程序）的搜索路径，是非常常用的一个环境变量。
#### 使用环境变量
在CMD中，如果想引用某个环境变量，则使用 `%env%` 的格式。
```markdown
echo %PATH%

set name=usrname
echo %name%
```
### 辅助命令
```markdown
cls        #清除屏幕。
cmd        #进入MS-DOS
echo       #显示消息，或将命令回显打开或关闭。
exit       #退出 CMD.EXE 程序(命令解释程序)。
start      #启动单独的窗口以运行指定的程序或命令。
calc       #启动计算器
explorer   #打开资源管理器
notepad    #打开记事本
dxdiag     #检查DirectX信息
regedt32   #注册表编辑器
Msconfig   #系统配置实用程序
taskmgr    #打开任务管理器
help       #查看MS-DOS命令帮助。
command /? #查看指定命令详细帮助文档。
wmic       #进入wmic（Windows Management Instrumentation），它是windows管理工具命令行版，使用wmic我们可以对整个系统进行管理，例如远程连接、硬件管理、进程管理、账号管理、服务管理、目录管理、共享管理等等，可说它是一个增强版的CMD。
```
## BASH 基本命令
### 目录操作
#### 切换目录
cd ：进入指定的目录。
```markdown
cd   #进入个人目录
cd / #进入根目录
cd - #返回上次的目录
```
如果不确定自己当前的目录位置，可以结合 `pwd` 命令，便会在命令行中打印出当前目录路径。
```markdown
pwd
```
#### 列出文件与子目录
ls ：列出当前目录中的文件以及子目录
```markdown
ls
``` 
`ls` 除了能默认显示当前目录的资源以及子目录，还可以显示指定目录下的文件以及子目录
```markdown
ls ../   #列出上级目录下的资源和子目录
ls /     #列出根目录下的资源和子目录。
ls /home #列出home目录下的资源和子目录。
```
`ls` 默认不显示具有特殊属性的文件(例如被隐藏了的文件)，如果想显示所有文件,可以使用 `-a` 参数
```markdown
ls -a
```
如果要查看资源或目录更详细的信息，可以附加 `-l` 属性
```markdown
ls -l
```
#### 创建目录
mkdir ：创建目录。
```markdown
mkdir dir                 #创建一个目录dir
mkdir dir1 dir2 dir3..    #同时创建多个同级目录
```
如果想创建一个目录树，可以附加一个 -p 参数。
```markdown
mkdir -p a/b/c/d
```
#### 删除目录
rmdir ：删除空目录
```markdown
rm -rf ：强制删除目录(包括非空目录)。
rmdir emptyDir #删除一个空目录
```
如果想删除一个非空目录，则需要使用 rm 命令，并使用 -rf 参数。
```markdown
rm -rf dir                  #删除一个非空目录。
rm -rf dir1 dir2 dir3       #同时删除多个非空目录。
rm -rf pattern              #删除按照特定模式匹配到的目录。
```
#### 复制目录
cp -a ：复制目录到指定的位置。
```markdown
cp -a dir ../dir  #将当期目录复制一份到上级目录中。
cp -a dir dir2    #复制目录并重命名。
```
#### 移动目录
mv ：移动目录到指定位置。
```markdown
mv file file2                         #同级移动，相当于重命名目录file为file2
mv file ../file2                      #将目录移动到上级目录中并重命名。
sudo mv /home/user/file /home/        #将指定位置的目录移动到指定位置中。
```
另外，`mv` 也可以结合通配符进行使用。
```markdown
mv * ../   #将所有的目录与文件都复制到上级目录中。
```
#### 重命名目录
利用 `mv` 命令同级移动功能，并结合重命名的特点，就可以做到目录的重命名。
```markdown
mv file newfile2              #同级移动，相当于重命名目录file为newfile2
```
#### 显示树形目录
tree ：显示目录的树形图。
```markdown
tree       #当前目录的树形图
tree /     #根目录下的树形图
```
PS：感觉此命令在我们写项目文档时很有用，使用它可以帮我们生成项目目录的树形图。
####  常用目录说明
```markdown
/     #根目录
/bin  #命令保存目录
/boot #启动目录
/dev  #设备文件命令
/etc  #配置文件保存目录
/home #家目录
/lib  #系统库保存命令
/mnt  #系统挂载目录
```
### 文件操作
#### 新建文件
touch ：新建文件
```markdown
touch filename             #新建一个文件。
touch file1 file2 file3... #同时新建多个文件。
touch dir/file             #在指定的位置中新建一个文件。
```
如果终端已经附加了 `vi` 编辑器，也可以使用 `vi filename` 的形式来创建文件，与 `cmd` 中的 `notepad` 命令功能类似。
#### 删除文件
rm ：删除文件。
```markdown
rm file      #删除文件
rm dir/file  #删除指定目录中的文件
rm dir/*     #删除指定目录中的所有文件。
```
#### 复制文件
cp ：复制文件到指定的位置
```markdown
cp file file1    #将文件复制一份并重新命名。
cp file ../      #将文件复制一份到上级目录中。
sudo cp file /   #将文件复制到根目录中。
```
`cp` 还可以结合通配符一起使用，将匹配到的文件复制到指定的位置中。
```markdown
cp dir/*  ./  #指定目录中的所有文件复制到当前目录中。
```
#### 移动文件
mv ：移动文件到指定的位置
```markdown
mv file ../       #将文件移动到上级目录中。
mv ../file ./     #将上级的文件移动到当前目录中。
sudo mv file /    #将文件移动到根目录中。
```
mv 不仅可以移动文件，还可以在移动后重命名文件。
```markdown
mv filename1 ../filename2
```
mv还可以结合通配符使用。
```markdown
mv na?.txt ../nbc.txt
```
#### 重命名文件
利用 mv 命令同级移动的功能再结合其可以重命名的特点，从而实现文件的重命名。
```markdown
mv file file2           #同级移动，相当于重命名文件file为file2
```
#### 文件内容比较
diff ：比较多个文件内容的不同
```markdown
diff file1 file2 ...
```
#### 打印文件
cat ：在命令行工具中打印文件的内容
```markdown
cat filename    #打印指定文件的内容
cat file1 file2 #同时打印多个文件的内容
```
`cat` 命令除了能打印文件的内容，还可以合并多个文件的内容保存到一个新的文件中。
```markdown
cat file1 file2 > newfile
```
除此之外，还可以结合通配符来打印匹配到的所有文件内容。
```markdown
cat a*
cat *.txt
```
如果查看的文件内容很多，还可以使用 `less` 命令
```markdown
less file
```
然后使用 `space` 便可以向下一页一页的翻动，或者 `pgup` 向上翻页 , `pgdn` 向下翻页，`q` 则可以退出 `less` 命令。
#### 查找文件
find ：可以根绝名称、大小、修改时间来查找指定的文件。
```markdown
find -name httpd.conf #在当前目录下查找httpd.conf文件。
find -name *.js       #在当前目录下查找所有js文件。
find -empty           #查找所有为空的目录。
find -size -1000      #查找小于1000KB的文件。
find -size +1000      #查找大于1000KB的文件。
```
`find` 命令默认在当前目录进行查找，你也可以指定一个目录进行查找。
```markdown
find / -name *.txt          #在根目录下查找所有的txt文件。
find /etc -name httpd.conf  #在etc目录下查找httpd.conf文件。
```
与根据文件名查找文件相同，也可以使用 `find` 按照目录名来查找目录。
```markdown
find -name dirname
```
#### 根据内容查找文件
grep ：可以根据指定的内容来查找含有这些内容的文件。
```
grep pattern *  #查找当前目录含有指定匹配模式的文件。pattren可以是一个正则表达式。
grep c *        #查找当前目录含有单词c的文件。
```
如果想忽略内容的大小写可以附加一个 `-i` 的参数。
显示匹配行及行号附加 `-n` 
如果只显示文件名，不显示具体匹配到的内容，则附加 `-l` 参数
#### 压缩与解压
gzip ：单独压缩指定的文件，压缩后删除被压缩文件，只保留压缩后的文件，并且不能压缩目录。
```markdown
gzip file                   #压缩指定的文件
gzip file1 file2 file3...   #同时压缩多个文件
```
`gzip` 还可以与通配符结合使用，压缩匹配到的文件。
```markdown
gzip *.*
gzip ?.?.*
```
若想列出某个 .gz 压缩文件中的内容，可以附加一个 `-l` 参数。
```markdown
gzip -l file.gz
```
解压某个.gz 文件，则使用 `gunzip` 命令。
```markdown
gunzip file.gz
```
zip ：与 `gzip` 相比 `zip` 可以压缩目录还可以将多个文件压缩在一起，并保留被压缩的文件。
```markdown
zip filename.zip file1 file2 ...   #将指定的文件压缩到一个新创建的压缩文件中。
```
`zip` 也可以结合通配符使用，压缩匹配到的文件。
```markdown
zip filename.zip *.txt
```
更强的是 `zip` 还可以一次性压缩一个目录
```markdown
zip filename.zip dir
```
同样的，若想列出某个 .zip 压缩文件中的内容，可以附加一个 `-l` 参数。
```markdown
unzip -l filename.zip
```
解压某个`.zip` 文件，则使用 `unzip` 命令。
```markdown
unzip file.zip
```
#### 打包与解包
tar ：它是linux下的一个打包命令，它可以将一大堆松散的文件或者是目录打包在一起，从而保证资源的完整性。
```markdown
tar -cvf package.tar file1 file2 file3 ...
```
如果要打包一个目录，则指定目录名：
```markdown
tar -cvf package.tar dirname
```
如果想解包，则附加 `-xvf` 的参数即可。
```markdown
tar -xvf package.tar
```
如果只是想列出某个包中含有的文件或目录,则附加 `-tvf` 参数即可。
```markdown
tar tvf package.tar
```
`tar` 命令只能打包，而不能压缩，而 `gzip` 虽然可以压缩但是只能对文件进行单独压缩，并且只保留压缩后的文件，而不保留被压缩的文件，所以将 `tar` + `gzip` 结合使用，将会互补其短，产生更大的功效。
```markdown
tar package.tar file1 file2 file3 ... #将多个文件打包在package.tar包文件中。
gzip package.tar.gz package.tar       #将通过tar打包的文件再进行压缩。
```
解压缩解包也要依次进行。
```markdown
gunzip package.tar.gz #解压缩
tar -xvf package.tar  #解包
```
当然，你也可以通过附加参数的方式一次性的打包压缩。
```markdown
tar -zcvf package.tar.gz
```
然后一次性的解压缩解包
```
tar -zxvf package.tar.gz
```
### 常用快捷键
```markdown
ctr+c  #终止当前命令
ctr+l  ##清屏  相当于 clear
ctr+a  #光标移到行首
ctr+e  #光标移到行尾
ctr+u  #把光标所在位置删除到行首
ctr+d  #删除光标前面的字符，一旦内容全部删除再按则会退出窗口。
ctr+h  #删除光标后面的字符，
```
### 其他常用命令
```markdown
clear   #清除屏幕。
echo    #显示消息，或将命令回显打开或关闭。
whoami  #返回当前登录用户名。
passwd  #允许当前登录的用户更改其密码。
file    #尝试判断指定文件的类型。
exit    #退出命令行工具
users   #显示当前登录系统地用户
last    #查看用户的登录日志
cammand --help  #查看相关命令的帮助文档。
ping    #查看网络状态
```




