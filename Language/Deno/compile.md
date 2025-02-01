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

### 参考

普通のファイル

```ts
{
  isFile: true,
  isDirectory: false,
  isSymlink: false,
  size: 275968,
  mtime: 2025-01-05T12:24:10.819Z,
  atime: 2025-02-01T02:21:36.790Z,
  birthtime: 2024-12-10T01:10:36.988Z,
  ctime: 2025-01-05T12:24:10.819Z,
  dev: 4098132776,
  mode: 33206,
  ino: null,
  nlink: null,
  uid: null,
  gid: null,
  rdev: null,
  blksize: null,
  blocks: null,
  isBlockDevice: null,
  isCharDevice: null,
  isFifo: null,
  isSocket: null
}
```

取り込まれたファイル

```ts
{
  isFile: true,
  isDirectory: false,
  isSymlink: false,
  size: 275968,
  mtime: null,
  atime: null,
  birthtime: null,
  ctime: null,
  dev: 0,
  mode: 0,
  ino: null,
  nlink: null,
  uid: null,
  gid: null,
  rdev: null,
  blksize: null,
  blocks: null,
  isBlockDevice: null,
  isCharDevice: null,
  isFifo: null,
  isSocket: null
}
```

## compile時のimport.metaの差分

いくつかあるので後で書く
