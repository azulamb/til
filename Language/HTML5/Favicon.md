# ファビコンサイズまとめ

## 最小対応

| サイズ | 用途 | ファイル名 |
|--------|------|------|
| 32×32   | ブラウザ | favicon.ico |
| 48×48   | Windows デスクトップ・タスクバー・Google推奨最低サイズ | favicon.ico |
| 192×192 | Android Chrome | apple-touch-icon.png |
| any | SVGで全用途 | favicon.svg |

```
<link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

icoはファイルだけ置いておくことで未対応端末はそちらを使えるので、通常はSVG、iOSとか向けに専用PNG、未対応のみicoにできるっぽい。

## 旧

もっと色々あるんだろうけど、見つけ次第追加する方向で。

| サイズ | 用途 | 参考 |
|--------|------|------|
| 16×16   | ブラウザ | |
| 32×32   | ブラウザ | |
| 48×48   | Windows デスクトップ・タスクバー・Google推奨最低サイズ | https://developers.google.com/search/docs/appearance/favicon-in-search?hl=ja |
| 64×64   | Windows デスクトップ・タスクバー | |
| 152×152 | iOS・Androidホーム | |
| 180×180 | iOS・Androidホーム | |
| 192×192 | Android Chrome | |

## HTML

```
<link rel="icon" href="/favicon.ico">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

## その他

面倒くさい
