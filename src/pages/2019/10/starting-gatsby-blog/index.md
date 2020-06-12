---
title: Gatsby、Netlify、IFTTTでCI、Qiita連携対応なブログを作ってみた
date: '2019-10-02T22:00:00.000Z'
category: 作ってみた
tags:
  - Gatsby
  - Netlify
  - IFTTT
  - Qiita
  - ブログ
keywords:
  - Gatsby
  - Netlify
  - IFTTT
  - Qiita
  - ブログ
slug: /starting-gatsby-blog
thumbnail: 2019/10/starting-gatsby-blog/architecture.jpg
---

![](./thumbnail.png)

## はじめに

以前から興味があった静的サイトジェネレーター「[**Gatsby.js**](https://www.gatsbyjs.org/)」でお試し的にブログを作ってみました。

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://blog.icchi.me" data-iframely-url="//cdn.iframe.ly/kqjT36m?iframe=card-small"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script><br/>

## 高品質な Gatsby 製サイトとの出会い

これまでも巷で静的サイトジェネレータが話題になることがありました。その度に手を出してみようと思ったものの、すでに WordPress 製のブログがあることから実行には移りませんでした。ブログというアウトプット手段に時間をかけるなら、アウトプット自体に時間をかけたほうがいいのでは、という理屈です。

少し前に非常に品質の高い Gatsby 製サイトと出会いました。
[takumon さん](https://twitter.com/inouetakumon)が開発されたものです。

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://github.com/Takumon/blog" data-iframely-url="//cdn.iframe.ly/7durRcq?iframe=card-small"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script><br />

まずサイトの品質に驚きました。
どうしても静的サイトジェネレーター製のサイトは使えるテーマの成熟度から WordPress 製と同等のレベルに持っていくのは大変かと思います。上のブログは全体的なデザインはもちろん SNS の共有機能、Qiita との連携など、見た目も機能も非常に高いレベルでした。

加えて特に惹かれたのは、ブログの[ソースコード](https://github.com/Takumon/blog)が GitHub で**MIT ライセンスで公開**されていることです。コードを自分用にカスタマイズして公開することが可能です。このレベルのコードを利用させてもらえるのは大変ありがたかったです。

Takumon さんとのブログとの出会いに後押しされ、静的サイトジェネレーターでブログを作ってみました。

## 構成

![](./architecture.jpg)

オリジナルから少し見た目とホスティングサービスを変更したことに加え、CI/CD を強化するためインフラ面も多少改良しました。

### Qiita との連携

Qiita にも多少記事を投稿しているため、ブログと Qiita との連携機能は個人的にマストでした。一番気にしていた点でしたが、Takumon さんが開発している Gatsby プラグインを使えば簡単に実現できます。

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://github.com/Takumon/gatsby-source-qiita" data-iframely-url="//cdn.iframe.ly/WMJvCpV"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script><br />

公式ドキュメントや Takumon さんのブログのコードが参考になります。

### Netlify での公開

ブログのホスティングサービスはオリジナルは GitHub Pages を利用しているようでした。こちらも手軽にデプロイできるいいサービスですが以下の点から Netlify を利用しました

- 読み込み速度 ([参考情報:比較記事](https://qiita.com/NaokiIshimura/items/0b6c4ff5da437081866b))
- [Build hooks](https://www.netlify.com/docs/webhooks/)
  - HTTP リクエストを投げると GitHub の最新コードでビルド&デプロイが可能
- ビルド環境の統一

### Qiita 更新時の自動反映

Qiita と連携し Qiita 記事をブログで表示するのであれば、常に最新の記事を取得、反映したいというもの。そこで IFTTT を使い対応しました。IFTTT の Feed トリガーを用いて Qiita の RSS(Atom)を監視し、新しい投稿が検出された際には Netlify の Build Hooks にリクエストを投げる仕様です。

## 感想

実際に作ってみた感想をまとめます。
比較対象はこれまで運用していた WordPress です。

### パフォーマンス

- ⭕: 読み込み速度
  - Netlify はフリープランでの CDN から配信
  - Gatsby による仮想 DOM、Prefetch
  - 静的配信によるサーバ側の計算コスト削減
  - lighthouse スコアも向上

![](./lighthouse-score.jpg)

### カスタマイズ性

- ⭕: ブログ全体をコードレベルで把握できる
  - 変更が容易
- ⭕: Node によるパッケージ導入の容易さ
  - Material UI の導入もスムーズ
- ⭕: Gatsby のプラグインやテーマが豊富
  - 導入後の調整作業は多少必要
- ❌: テーマの豊富さ、反映までの速度感では WordPress に軍配

### 機能面

- ❌: プラグインの充実度では WordPress に軍配
- ❌: WordPress の方が PHP の動的処理で記事ランキングの実装が容易
  - Gatsby でも実現はできなくないが、別途アクセス管理サービスが必要
- ❌: 簡単な修正をしたいときにスマホからは困難 (GitHub に push できない)

### 開発環境

- ⭕: CI/CD
- ⭕: GitHub によるコード管理
- ⭕: ローカル環境でのコーディング、デバッグ

### セキュリティ

- ⭕: WordPress のような動的サイト故のセキュリティホールが無い

## Reference

- [React ベース静的サイトジェネレータ Gatsby の真の力をお見せします](https://qiita.com/uehaj/items/1b7f0a86596353587466)
- [静的サイトジェネレータの世界 (2) : 種類と解説](https://yoshinorin.net/2018/10/18/world-of-ssg2/)
- [StaticGen](https://www.staticgen.com/)
- [静的 G 製高品質サイト / Takumon Blog](https://takumon.com/)
- [静的 G 製高品質サイト / おちゃカメラ。](https://photo-tea.com/)
