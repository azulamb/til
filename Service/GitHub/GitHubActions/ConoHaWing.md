# ConoHa WingにGitHubからデプロイ

## デプロイスクリプト

```yml
name: deploy to ConoHa WING

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: ssh key generate
        run: echo "$SSH_PRIVATE_KEY" > ./key && chmod 600 ./key
        env:
          SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
      - name: rsync deployments
        run: rsync -avz --delete --checksum -e "ssh -l ${REMOTE_USER} -i ./key -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -p ${REMOTE_PORT}" $LOCAL_PATH $REMOTE_PATH
        env:
          LOCAL_PATH: "./リポジトリ上のコピー元パス/"
          REMOTE_PATH: ${{ secrets.REMOTE }}
          REMOTE_USER: ${{ secrets.REMOTE_USER }}
          REMOTE_PORT: ${{ secrets.REMOTE_PORT }}
```

## 環境変数

* `SSH_PRIVATE_KEY`
  * ConoHa WingのSSHキーの内容
* `REMOTE`
  * `[アカウントID]@[FTPサーバー]:[接続許可ディレクトリ]/[FTP等でアクセスできる対象ファイルパス]/`
  * テーマを管理している場合の例：
    * `X9999@www99.conoHa.ne.jp:/home/X9999/public_html/example.com/wp-content/themes/my_theme/`
* `REMOTE_USER`
  * FTP接続ユーザー名
* `REMOTE_PORT`
  * FTP接続パスワード
