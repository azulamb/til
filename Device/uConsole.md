# uConsole

https://www.clockworkpi.com/uconsole

* uConsole Kit
  * RPI-CM4 Lite
  * Color
    * Matte Black
  * Type
    * WIFI+4G cellular
  * Core
    * Raspberry Pi CM4 104000 lite
* 解像度
  * 1280x720

## Wi-Fiが繋がらなくなる

最初はWi-Fiに接続できていたのに `sudo upgrade` 後にネットワークのアイコン自体でなくなって接続できなくなる場合がある。その場合は次のような作業でネットワークの設定を変更する。

* コマンド実行
  * `sudo raspi-config`
* メニューを移動
  * `Advanced Options`
  * `Network Config`
* `dhcpd` を選び終了後再起動

これでWi-Fiが正常に動くようになりネットワークに接続できるようになる。

## 設定

```
lxterminal
```

```
lxappearance
```

Widgetから `Adwaita-dark` を選ぶとダークモードになる

## インストール関連

### VS Code

https://code.visualstudio.com/docs/setup/raspberry-pi

```
sudo apt install code
```
