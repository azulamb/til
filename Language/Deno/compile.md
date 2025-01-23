# deno compile関連

## コンパイルされたのか確認

今実行しているコードが `deno` 経由で実行されたのか、compile後の実行ファイルからの判定方法です。（ただし公式の方法がなさそうなので暫定。）
定数定義時に一度だけ実行して、compileされたうえで実行されているなら `true` となります。

```ts
const IS_COMPILED = (() => {
  try {
    const stat = Deno.statSync(new URL(import.meta.url));
    return stat.mode === 0 && stat.birthtime === null;
  } catch (_error) {
    return false;
  }
})();
```

## compile時のimport.metaの差分

いくつかあるので後で書く
