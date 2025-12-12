# Android関連

## Androidのターミナルにインストール

Androidの開発者の機能の一つにターミナルのインストールがあり、普通にLinuxのコマンドが動きます。そこでdenoをインストールしてみます。

### 下準備

アップデートとインストールに必要なunzipをインストール。

```sh
sudo apt update
sudo apt install unzip
```

### denoのインストール

https://docs.deno.com/runtime/getting_started/installation/

```sh
curl -fsSL https://deno.land/install.sh | sh
```

`Edit shell configs to add deno to PATH? (Y/n)` はそのままエンター。

`Set up completions?` も何も選択せずそのままエンター。

インストール後少し待ちます。

### denoの確認

少し待った後、一度ターミナルを終了します。

```sh
exit
```

再度ターミナルを起動してdenoのバージョンを確認します。この時点で壊れていたら最初からやり直します。

```sh
deno --version
```


