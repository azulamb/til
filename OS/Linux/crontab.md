# 指定した時間にスクリプトを実行する

crontabは指定した時間にスクリプトを実行してくれるスケジューラーです。

ただ、色々気をつけることや小技があるので、それのメモ。

## 絶対守ること

crontabは `-e` オプションで編集できますが、`-r` ですべてを消し去ります。

QWERTYキーボードで、eとrは隣接しているため、`-e` で編集していると、すべてが消えかねません。

そこで、以下のようにします。

* crontabに記述する内容をファイルに記述する
* `crontab ファイルの絶対パス` でそのファイルをcrontabに設定する

これは絶対です。

絶対に守りましょう。

守らねばきっと死にます。

起きる可能性のあることはいつか必ず発生します。

## 記法

基本的に次のような記述を1行で書きます。1行1タスクです。

```
分 時間 日 月 曜日 実行コマンド
```

### 時間指定

時間は次のような書き方をします。

| 項目 | 値 | 補足 | 
|---|---|---|
| 分 | 0 - 59 ||
| 時 | 0 - 23 ||
| 日 | 1 - 31 ||
| 月 | 1 - 12 ||
| 曜日 | 0-7 |0もしくは7が日曜日|

また、上の値の他以下のような指定方法や値の組み合わせが可能です。


| 指定 | サンプル | 補足 | 
|---|---|---|
| * |  | 分なら毎分、時間なら毎時間を意味する。 |
| 値,値 | 10,20 | どれか。この指定なら10分か20分など。下の範囲との組み合わせも可能。 |
| 値-値 | 1-5 | 範囲。この指定で曜日なら月～金曜日。 |
| */値 | */10 | 感覚。10分毎など。|

### 実行コマンドについて

実行コマンドはパスが通っていないことがあるので、絶対パスにする必要があります。

また他にも、多少複雑なことをすることが多いはずなので、基本的にはスクリプトにまとめて実行するのが普通です。


### 環境変数の設定

crontabの先頭に以下のように記述して環境変数を指定することができます。

```
PATH=/usr/bin:/usr/local/bin
```

また、実行コマンドがshスクリプトの場合、スクリプトの先頭で指定した方が良いことも多いです。


## ログの出力

crontabでは実行したコマンドやスクリプトが何か出力を出していた場合、ユーザーにメールを送信します。

そのメールを送信させないために、出力が出ないようにすることが多いです。

```
15 3 1 * * SCRIPT >> /PATH/TO/LOG 2>&1
```

よくある標準出力をファイルに追記し、標準エラー出力は標準出力と同じ場所に出力します。

全くログを出力させず捨てる場合、`/PATH/TO/LOG`を `/dev/null` にします。

## スクリプトの書き方

crontabから実行された場合、環境変数が全然なかったりパスが通っていなかったりします。

普段使えているコマンドも、使えない事が多々あります。

そのため、crontabから実行されるスクリプトは、以下の構成にします。

* 環境変数の設定及びパスの設定
* cdで作業ディレクトリに移動
* crontabでの作業内容を記述

環境変数については、以下コマンドで情報収集を行います。

* `printenv` で今動作する状態の環境変数を把握
* whichによるコマンドの絶対パスの取得