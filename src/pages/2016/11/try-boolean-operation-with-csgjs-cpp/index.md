---
title: csgjs-cppを使って3次元ブーリアン演算をやってみた
date: 2016-11-17T20:09:00.000Z
slug: /boolean-operation-with-csgjs-cpp
category: やってみた
tags:
  - やってみた
  - ブーリアン演算
  - openFrameworks
keywords:
  - やってみた
  - ブーリアン演算
  - csgjs-cpp
thumbnail: 2016/11/boolean-operation-with-csgjs-cpp/thumbnail.jpg
---

csg.js の c++版である csgjs-cpp を使って 3 次元ブーリアン演算をやってみました.

## はじめに

最近, アルバイトの関係で**CSG(空間領域構成法)**を扱っています.

> **空間領域構成法**（[英](https://ja.wikipedia.org/wiki/%E8%8B%B1%E8%AA%9E): **Constructive Solid Geometry**, **CSG**）は[ソリッドモデリング](https://ja.wikipedia.org/wiki/%E3%82%BD%E3%83%AA%E3%83%83%E3%83%89%E3%83%A2%E3%83%87%E3%83%AA%E3%83%B3%E3%82%B0)で使われる技法のひとつである。CSG は手続き的モデリング技法として[3 次元コンピュータグラフィックス](https://ja.wikipedia.org/wiki/3%E6%AC%A1%E5%85%83%E3%82%B3%E3%83%B3%E3%83%94%E3%83%A5%E3%83%BC%E3%82%BF%E3%82%B0%E3%83%A9%E3%83%95%E3%82%A3%E3%83%83%E3%82%AF%E3%82%B9)や[CAD](https://ja.wikipedia.org/wiki/CAD)でしばしば使われる。[ブーリアン演算](https://ja.wikipedia.org/wiki/%E3%83%96%E3%83%BC%E3%83%AA%E3%82%A2%E3%83%B3%E6%BC%94%E7%AE%97)を使って複雑な表面やオブジェクトを生成することができる。
>
> [wikipedia - Constructive Solid Geometry](https://ja.wikipedia.org/wiki/Constructive_Solid_Geometry)

調べてみると各言語でいろんなライブラリが提供されています.

その中でも**csg.js**が簡単で使いやすかったです.

<https://github.com/evanw/csg.js>

仕事の都合上, c++で実装する必要が会ったのですが, なんと**csg.js の c++版**が GitHub で公開されていました.

しかも**MIT ライセンス**.

ありがたや.

<https://github.com/dabroz/csgjs-cpp>

## csgjs-cpp の Example を公開

この csgjs-cpp リポジトリには csgjs.cpp 本体しか入っていません.

このままでは使いづらかったので, そのヘッダーファイルとサンプルコードを作りました.

<https://github.com/icchi-h/csgjs-cpp>

## csgjs モデルの可視化

こんな簡単に 3 次元の CSG 処理が出来てしまって良いのかというほど手軽に扱える csgjs.

演算結果を確認するため**openFrameworks**を利用して, csgjs.cpp 内で定義されている csgjs_model を可視化するプログラムを用意しました.

https://github.com/icchi-h/plot-csgjs-cpp-model>

![demo](./demo.gif)

このサンプルでは, 2 つの正方形モデル(赤, 緑)とその積演算の結果(青)を描画しています.

ただ, ここで一つ**問題点**.

よく見ると分かるんですが, 演算結果の頂点座標が一つ足りません. 描画部分が間違っているなら正方形モデルにも同じ現象が起こるはず. しかし, 正方形モデルは問題なく描画されています.

時間があるときにチェックしたほうが良さそうです.
