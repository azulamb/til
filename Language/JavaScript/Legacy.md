# 何を持ってレガシーとするか

最近JSの発展はものすごく速く、ぶっちゃけ対応ブラウザの差異が激しくなりつつあります。

そのため、レガシー判定をメモっておき、更新したり外したりしていこうかなと思います。

使う人はコピペして必要なやつだけ残せばいいと思う。

```
function BrowserCheck()
{
	// fetch, Promise
	if ( typeof fetch !== 'function' ) { return false; }

	// <template>
	if ( !( 'content' in document.createElement( 'template' ) ) ) { return false; }

	// <dialog>
	var dialog = <HTMLDialogElement>document.createElement( 'dialog' );
	if ( typeof dialog.showModal !== 'function' || typeof dialog.close !== 'function' ) { return false; }

	// CSS Custom properties
	var styles = getComputedStyle(document.documentElement);
	if ( styles.getPropertyValue( '--cp' ).trim() !== '0' ) { return false; }
	
	// ServiceWorker?
	if ( !( 'serviceWorker' in navigator ) ) { return false; }

	// This browser is modern.
	return true;
}
```

## 採用理由

とりあえずそのチェックを入れた理由と、判定技術を複数同時にできる場合はその種類を書いておく。
後なんか補足があれが書いておく。

### `fetch`

IEとかレガシーな奴は対応してないし、AJAXみたいに何かいろいろ分岐せず使えて超便利なので使いたい。

#### 判定技術

* fetch
* Promise

### `<template>`

使いたかったから。

### `<dialog>`

この判定式を書いてる時点では **Chromeしか対応していない** やばいやつ。HTML5.2で搭載予定。
これを使うと最新のChrome以外全部弾くぞ！！やばい！！

### `CSS カスタムプロパティ`

めっちゃ便利だし、強力なので積極的に使っていきたい。
またテーマの変更とか普通にいけそうなので、そこらへんも強い。

#### 補足

`getPropertyValue` でCSSカスタムプロパティを取得しているが、`--*` という文法がこれ独自で、例えばIE等はこれを取得すると空になるらしいので、判定処理として入れてみた。
他の非対応ブラウザの挙動も見たいが、わりと昔から実装が入ってたっぽいので、そこそこ対応されてしまっているためどこまで判別が正しいか怪しい。

この判定のためには以下スタイルが必要。

```
:root{--cp:0;}
```

```
<style type="text/css">:root{--cp:0;}</style>
```

### `ServiceWorker`

PWAに必須の機能。使う場合は入れるし使わない場合は入れない。

## 削除理由

何か判定から除外したら理由とか入れていく。
