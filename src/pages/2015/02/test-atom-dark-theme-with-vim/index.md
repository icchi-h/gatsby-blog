---
title: Vimのテーマはatom-darkがいい感じ!
date: 2015-02-22T09:13:00.000Z
slug: /test-atom-dark-theme-with-vim
category: ソフトウェア
tags:
  - Vim
keywords:
  - Vim
thumbnail: 2015/02/test-atom-dark-theme-with-vim/atom-dark.jpg
---

最近、GitHub 製エディタ、Atom のデフォルトテーマである atom-dark にハマっています。

Hybrid や jerrybeans では地味すぎるけど Molokai はメリハリが強すぎる、なんて方にはおすすめのテーマです。lucius に似てるかな。

探してみると Vim 用のテーマも公開されていました。

https://github.com/gosukiwi/vim-atom-dark

## インストール

vim ファイルをダウンロードして ~/.vim/colors に移動

```bash
git clone https://github.com/gosukiwi/vim-atom-dark.git
mv vim-atom-dark/colors/\*.vim ~/.vim/colors
```

vimrc または.gvimrc にテーマ適用のコードを記述

```bash:title=$HOME/.vimrc
syntax enable
set t_Co=256
colorscheme atom-dark-256
```
