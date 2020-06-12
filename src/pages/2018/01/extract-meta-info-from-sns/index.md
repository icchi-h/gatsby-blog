---
title: SNSのスクショ画像からタグやURLなどを取り出すWebアプリを作ってみた
date: 2018-01-03T19:19:00.000Z
slug: /extract-meta-ino-from-sns
category: 作ってみた
tags:
  - 作ってみた
  - Webアプリ
keywords:
  - 作ってみた
  - Webアプリ
  - SNS
  - スクショ画像
thumbnail: 2018/01/extract-meta-info-from-sns/architecture.jpg
---

## はじめに

「SNS のスクショ画像に映っている SNS のアカウント名やハッシュタグ、短縮リンクなどを手軽に取り出せれば...」知人の要望をきっかけに簡単に Web アプリを作ってみました。

## システムの構成

![architecture](./architecture.jpg)

フロントは React で実装。アップロードされたスクショ画像を OCR にかけて、結果であるテキストから必要な要素を正規表現で検出&表示する流れになっています。

### React と OCR について

最近は仕事でフロントエンドを触ることが多いので、React を始め Angular や vue.js を簡単に触ったりもしました。個人的には React が好みです。やはり人気どころの UI フレームワークなので、

- 多種多様な Component が用意されている
- 関連するライブラリの開発が速い

などのメリットがいいですね。

あと、OCR は [Cloud Vision API](https://cloud.google.com/vision/?hl=ja) を利用。他にも無料枠がある [Free OCR API](https://ocr.space/) なるものもあったりします。割りと使える印象ですが、さすが Google と比べると精度が落ちる印象。

## 文字列からメタ要素を取り出し

正規表現を使って、文字列から要素を取り出します。そのことについては次の記事にまとめました。

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://qiita.com/icchi_h/items/a438f2f33aaf15e74059" data-iframely-url="//cdn.iframe.ly/dLRrmBC?iframe=card-small"></a></div></div>

## DEMO

公開はしていないので動作動画だけ。はたして一般的に需要があるかどうか...

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">スクリーンショットに表示されているアカウント・タグ・リンクを検出するWebアプリを作ってみた。フォームからリアルタイムで修正&amp;再検出可能。 <a href="https://t.co/t4s795zoHK">pic.twitter.com/t4s795zoHK</a></p>&mdash; i̲c̲c̲h̲i̲ (@icchi_h) <a href="https://twitter.com/icchi_h/status/948287269193961472?ref_src=twsrc%5Etfw">January 2, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

せっかく React を使っているので、OCR の結果を編集してリアルタイムで要素の再検出ができるようにしてあります。
