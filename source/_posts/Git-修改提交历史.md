---
title: Git 修改提交历史
permalink: git-modify-commit-history
date: 2017-06-04 13:15:13
tags: git
copyright: true
---

　　在使用 Git 时，我们经常会遇到修改本地提交记录的情况。比如：修改最近一次提交记；
　　还比如：将多次小的 commit 合并成一个大的 commit。这种做发有利也有弊，利在：review 代码时，可以按功能看，可以省去 review 一些前期写的无效的代码；弊是：一次提交修改过多，如果有问题，不利于调试。
<!-- more -->

### 修改最近一次提交记录
####  修改提交说明
 
```
git commit --amend
```
然后就可以进入 vim 编辑提交信息，保存退出即可。
#### 改被提交的快照
　　如果你完成 commit 后又想修改被提交的快照，增加或者修改其中的文件。先执行 git add 命令，将修改的文件添加到缓存区，然后运行 git commit -amend 命令，该命令会获取你当前的暂存区的内容一并提交到最后一次 commit
　　例如：新加了一个文件 new_file.cpp ，想要合并到最后一次提交，过程如下：
```
git add new_file.cpp
git commit --amend  
```
也可以直接运行下面的命令，不过要小心，不要提交了多余的文件
```
git commit -a -- amend
```
#### 将文件从本次提交中移除、
　　如果想把已经 commit 的文件从这次 commit 移除的话，运行命令：
```
git reset [-soft] HEAD~1 # -soft可加可不加，默认就是soft选项
git checkout -filename # 要从本次提交移除的文件名
git commit -m "new commit"
```
### 修改多个提交记录
　　要修改历史中更早的提交，你必须采用更复杂的工具。Git 没有一个修改历史的工具，但是你可以使用 rebase 工具来衍合一系列的提交到它们原来所在的 HEAD 上。
　　依靠这个交互式的 rebase 工具，你就可以停留在每一次提交后，如果你想修改或改变说明、增加文件或任何其他事情。你可以通过给 git rebase -i 命令以交互方式进行 rebase。
　　例如，你想修改最近三次的提交说明，或者其中任意一次，你必须给 “git rebase -i提供一个参数，指明你想要修改的提交的父提交。例如HEAD~3是指从 HEAD 指针到 HEAD+3 的位置，也就是最近第 4 次提交。所以想修改最近 3 次提交，你需要指明第 3 次提交的父提交（第4次提交）即HEAD~3`。运行命令： 
```
git rebase -i HEAD~3
```
　　再次提醒这是一个衍合命令，也就是 HEAD~3 到 HEAD 范围内的每一次提交都会被重写，不管你是否修改提交说明 SHA-1 的值都会发生变化。所以千万不要涵盖你已经推送到中心服务器的提交。这么做会使其他开发者产生混乱，因为你提供了同样变更的不同版本。运行该命令后进入交互界面，类似：
```
pick fecb551 Init the view model
pick bb199a0 Update the version
pick bc5cd9d Add new method

# Rebase f77f585..fecb551 onto f77f585
#
# Commands:
#  p, pick = use commit
#  r, reword = use commit, but edit the commit message
#  e, edit = use commit, but stop for amending
#  s, squash = use commit, but meld into previous commit
#  f, fixup = like "squash", but discard this commit's log message
#  x, exec = run command (the rest of the line) using shell
#
# These lines can be re-ordered; they are executed from top to bottom.
# If you remove a line here THAT COMMIT WILL BE LOST.
# However, if you remove everything, the rebase will be aborted.
# Note that empty commits are commented out
```
　　根据命令提示，就可以进行历史更改了。很重要的一点是你得注意这些提交的顺序与你通常通过 log 命令看到的是相反的。如果你运行 log，你会看到下面这样的结果：
```
pick bc5cd9d Add new method
pick bb199a0 Update the version
pick fecb551 Init the view model
```
#### 修改指定提交
　　例如：只修改最近第3次提交说明可以进行如下更改：
```
reword fecb551 Init the view model
pick bb199a0 Update the version
pick bc5cd9d Add new method
...
```
　　保存并退出编辑器，rebase 命令在衍合到第 3 次提交时会进入提交说明编辑页面，在此进行编辑新的提交说明，保存并退出即可，rebase 命令继续进行直至完成全部衍合操作。
  如果你不仅想要修改提交说明，还要更改提交，可以进行如下更改：
```
edit fecb551 Init the view model
pick bb199a0 Update the version
pick bc5cd9d Add new method
...
```
　　保存并退出编辑器，rebase 命令在衍合到第三次提交时会等待你提交新的更改，并提示你修改完成后运行 git commit –amend 命令，然后运行 git rebase –continue 继续进行 rebase 直至完成全部衍合。
#### 重排提交
　　你也可以使用 git rebase -i 命令对提交历史彻底重排或删除提交。例如你想删除”Update the version”这个提交，并且修改其他两次提交的顺序，可以将：
```
pick fecb551 Init the view model
pick bb199a0 Update the version
pick bc5cd9d Add new method
...
```
改为：
```
pick bc5cd9d Add new method
pick fecb551 Init the view model
```
　　然后保存并退出编辑器，此时 rebase 命令会先应用 bc5cd9d (Add new method)，然后应用 fecb551 (Init the view model) bb199a0 Update the version这次提交。 然后保存并退出编辑器，此时 rebase 命令会先应用 bc5cd9d (Add new method)，然后应用 fecb551 (Init the view model)，接着停止。执行完上诉操作，你已经修改了这些提交的顺序，并且删除了bb199a0 (Update the version) 这次提交。
#### 合并提交
　　git rebase -i 命令还可以将一系列提交合并成一个提交。从上面的脚本提示中可以看到 s, squash = use commit, but meld into previous commit 提示。如果用 squash 修饰提交就可以进行提交之间的合并，例如可以将脚本修改成这样：
```
pick fecb551 Init the view model
squash bb199a0 Update the version
squash bc5cd9d Add new method
```
　　保存并退出编辑器，rebase 命令会应用全部三次变更然后进入编辑器来归并三次提交说明。当你保存之后，你就拥有了一个包含前三次提交的全部变更的单一提交。
#### 拆分提交
　　拆分提交实际上就是撤销一次提交，然后分多次进行重新提交。例如你想将三次提交中的中间一次拆分。将 ”Update the version” 拆分成两次提交：”Update the version1” 和 ”Update the version2”，可以进行如下修改：
```
pick fecb551 Init the view model
edit bb199a0 Update the version
pick bc5cd9d Add new method
```
　　当 rebase 到 bb199a0 时，会进入等待你提交新 commit 的状态，这时看可以运行 git reset HEAD^ 对当前提交进行重置，然后分别运行 git add 命令添加想要提交的文件，分别进行 git commit，最后运行 git rebase –continue 完成所有衍合。整体过程如下：
```
git reset HEAD^
git add file1
git commit -m 'Update the version1'
git add file2
git commit -m 'Update the version2'
git rebase --continue
```
执行完上诉操作，提交历史看起来就像这样了：
```
1c002dd Add new method
9b29157 Update the version2
35cfb2b Update the version1
f3cc40e Init the view model
```
　　再次提醒，这会修改你列表中的提交的 SHA 值，所以请确保这个列表里不包含你已经推送到共享仓库的提交。
　　
> Reference:　[GLGJing’s Blog](http://glgjing.github.io/blog/2015/01/06/git-xiu-gai-ti-jiao-li-shi/)　　
