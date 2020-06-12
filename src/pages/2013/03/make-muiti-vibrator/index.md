---
title: マルチバイブレーターを作ってみた
date: 2013-03-08T10:47:00.000Z
slug: /make-multi-vibrator
category: 作ってみた
tags:
  - 作ってみた
  - 電子工作
  - Multi Vibrator
keywords:
  - Multi Vibrator
thumbnail: 2013/03/make-multi-vibrator/thumbnail.jpg
---

トランジスタ 2 つを使ってマルチバイブレーターを作ってみました。 電源は 3 端子レギュレーターを使って 5v で動作させてます。

これはトランジスタのベース前にコンデンサを挟むことによってその静電容量に比例して一定時間のパルスが発生されるというもの。

動作原理を理解するのは少し時間がかかりましたが、理解してみるとこの構造を考えた人はどんだけすごいのかと感心させられます。

100μF を使った場合

<iframe width="560" height="315" src="https://www.youtube.com/embed/bKpvNxnKbWU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

470μF を使った場合

<iframe width="560" height="315" src="https://www.youtube.com/embed/DyzJxbY-KWE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

容量が大きくなった方が充電に時間がかかりパスルの発生が置くせていることが確認できます。

コレクタの電圧を測ってみたけど少し不安定な感じ

![](./demo.jpg)

どうもベース電流がうまく制御できていないように感じるけど、とりあえずこれで動作確認終了。
