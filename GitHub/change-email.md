# メールアドレスを変更

GitHubでは匿名メールアドレスが発行されるため、コミット情報などにそれを使うことができる。

https://github.com/settings/emails

ここで `Keep my email addresses private` の設定やGitの設定でメールアドレスを自分のメールアドレスのところに書いてある `数字+アカウント名@users.noreply.github.com` に変更すれば匿名のアドレスが使える。

問題は、この設定を途中から有効にした場合、過去のコミットには自分のメールアドレスが残ってしまう。

## コミットの変更

とりあえず以下のようにすればよい。

* リポジトリをclone
* Gitのコマンドを使ってコミットを書き換える
* リポジトリにforce pushして上書きする

力技の関係で個人リポジトリ以外では難しい可能性が高いが、自分のみの場合は問題なく可能なはず。

コマンドは以下のをつかう。WindowsなどではWSLで `cd /mnt/c` などでCドライブに入れるので、リポジトリがあるディレクトリまで移動すればOK.

```
git filter-branch -f --commit-filter '
if [ "$GIT_AUTHOR_EMAIL" = "旧アドレス" ];
then
  GIT_AUTHOR_NAME="名前";
  GIT_AUTHOR_EMAIL="新アドレス";
  git commit-tree "$@";
else
  git commit-tree "$@";
fi' HEAD
```

名前とか条件分岐を削ってもいいが、こういうTipsとしてコードがあるらしいのでそのまま流用した。
