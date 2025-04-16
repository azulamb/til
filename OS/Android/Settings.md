# 特殊設定

## 回転マークを隠す

回転無効時に左下に画面を回転させるボタンが出てくるが、これが誤タップした時に戻すのが大変なので無効化する。

ADBで接続してコマンドを実行する。

接続されているか確認

```sh
adb devices
List of devices attached
TITANSLIM0XXXXXX        device
```

対象のデバイスに対し回転ボタンを消すコマンドを実行

```sh
adb shell settings put secure show_rotation_suggestions 0
```
