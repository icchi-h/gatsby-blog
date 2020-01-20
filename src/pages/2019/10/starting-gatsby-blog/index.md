---
title: Gatsby、Netlify、IFTTTでCI、Qiita連携対応なブログを作ってみた
date: "2019-10-02T22:00:00.000Z"
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

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://b.blog.icchi.me" data-iframely-url="//cdn.iframe.ly/kqjT36m?iframe=card-small"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script><br/>

## 高品質なGatsby製サイトとの出会い

これまでも巷で静的サイトジェネレータが話題になることがありました。その度に手を出してみようと思ったものの、すでにWordPress製のブログがあることから実行には移りませんでした。ブログというアウトプット手段に時間をかけるなら、アウトプット自体に時間をかけたほうがいいのでは、という理屈です。

少し前に非常に品質の高いGatsby製サイトと出会いました。
[takumonさん](https://twitter.com/inouetakumon)が開発されたものです。

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://github.com/Takumon/blog" data-iframely-url="//cdn.iframe.ly/7durRcq?iframe=card-small"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script><br />

まずサイトの品質に驚きました。
どうしても静的サイトジェネレーター製のサイトは使えるテーマの成熟度からWordPress製と同等のレベルに持っていくのは大変かと思います。上のブログは全体的なデザインはもちろんSNSの共有機能、Qiitaとの連携など、見た目も機能も非常に高いレベルでした。

加えて特に惹かれたのは、ブログの[ソースコード](https://github.com/Takumon/blog)がGitHubで**MITライセンスで公開**されていることです。コードを自分用にカスタマイズして公開することが可能です。このレベルのコードを利用させてもらえるのは大変ありがたかったです。

Takumonさんとのブログとの出会いに後押しされ、静的サイトジェネレーターでブログを作ってみました。

## 構成

![](./architecture.jpg)

オリジナルから少し見た目とホスティングサービスを変更したことに加え、CI/CDを強化するためインフラ面も多少改良しました。

### Qiitaとの連携

Qiitaにも多少記事を投稿しているため、ブログとQiitaとの連携機能は個人的にマストでした。一番気にしていた点でしたが、Takumonさんが開発しているGatsbyプラグインを使えば簡単に実現できます。

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://github.com/Takumon/gatsby-source-qiita" data-iframely-url="//cdn.iframe.ly/WMJvCpV"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script><br />

公式ドキュメントやTakumonさんのブログのコードが参考になります。

### Netlifyでの公開

ブログのホスティングサービスはオリジナルはGitHub Pagesを利用しているようでした。こちらも手軽にデプロイできるいいサービスですが以下の点からNetlifyを利用しました

* 読み込み速度 ([参考情報:比較記事](https://qiita.com/NaokiIshimura/items/0b6c4ff5da437081866b))
* [Build hooks](https://www.netlify.com/docs/webhooks/)
  * HTTPリクエストを投げるとGitHubの最新コードでビルド&デプロイが可能
* ビルド環境の統一

### Qiita更新時の自動反映

Qiitaと連携しQiita記事をブログで表示するのであれば、常に最新の記事を取得、反映したいというもの。そこでIFTTTを使い対応しました。IFTTTのFeedトリガーを用いてQiitaのRSS(Atom)を監視し、新しい投稿が検出された際にはNetlifyのBuild Hooksにリクエストを投げる仕様です。

## 感想

実際に作ってみた感想をまとめます。
比較対象はこれまで運用していたWordPressです。

### パフォーマンス

* ⭕: 読み込み速度
  * NetlifyはフリープランでのCDNから配信
  * Gatsbyによる仮想DOM、Prefetch
  * 静的配信によるサーバ側の計算コスト削減
  * lighthouseスコアも向上

![](./lighthouse-score.jpg)

### カスタマイズ性

* ⭕: ブログ全体をコードレベルで把握できる
  * 変更が容易
* ⭕: Nodeによるパッケージ導入の容易さ
  * Material UIの導入もスムーズ
* ⭕: Gatsbyのプラグインやテーマが豊富
  * 導入後の調整作業は多少必要
* ❌: テーマの豊富さ、反映までの速度感ではWordPressに軍配

### 機能面

* ❌: プラグインの充実度ではWordPressに軍配
* ❌: WordPressの方がPHPの動的処理で記事ランキングの実装が容易
  * Gatsbyでも実現はできなくないが、別途アクセス管理サービスが必要
* ❌: 簡単な修正をしたいときにスマホからは困難 (GitHubにpushできない)

### 開発環境

* ⭕: CI/CD
* ⭕: GitHubによるコード管理
* ⭕: ローカル環境でのコーディング、デバッグ

### セキュリティ

* ⭕: WordPressのような動的サイト故のセキュリティホールが無い

## Reference

* [Reactベース静的サイトジェネレータGatsbyの真の力をお見せします](https://qiita.com/uehaj/items/1b7f0a86596353587466)
* [静的サイトジェネレータの世界 (2) : 種類と解説](https://yoshinorin.net/2018/10/18/world-of-ssg2/)
* [StaticGen](https://www.staticgen.com/)
* [静的G製高品質サイト / Takumon Blog](https://takumon.com/)
* [静的G製高品質サイト / おちゃカメラ。](https://photo-tea.com/)
