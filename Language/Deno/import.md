# import API

https://deno.com/manual/runtime/import_meta_api

JSの `import` に加えDenoにおけるimportの補強をするような機能がいくつかあります。

## main

`import.meta.main` はエントリーポイントかどうかのフラグがあり、`true` の場合はエントリーポイントで、`false` の場合はモジュールとして読み込まれたとわかります。

例えば基本ライブラリとして提供するものの、もしファイルがそのまま実行したときにはライブラリを利用した初期の処理を行うといったことが可能です。（Base64のライブラリだがコマンドとして実行されたら引数をエンコードして表示するなど）

### lib.ts

```ts
export function encodeBase64(str: string) {
	return btoa(str);
}

if (import.meta.main) {
	if (Deno.args.length <= 0) {
		console.log('Need arguments.');
	} else {
		for (const str of Deno.args) {
			console.log(encodeBase64(str));
		}
	}
}
```

### main.ts

```ts
import { encodeBase64 } from './lib.ts'
console.log(encodeBase64('Hello, World!'));
```

### Sample

```sh
$ deno run lib.ts
Need arguments.
$ deno run lib.ts Hello, World!
SGVsbG8=
V29ybGQh
$ deno run main.ts
SGVsbG8sIFdvcmxkIQ==
```

## url

これは現在のファイルのパスをURL形式で取得します。URL形式は `file://` から始まるので、Windowsだと `file:///C:/dir1/dir2/filename.ts` のようになります。

こちらもライブラリとして読み込んだ場合の挙動を見てみます。

### dir/lib.ts

```ts
export function getURL() {
	return import.meta.url;
}
```

### main.ts

```ts
import { getURL } from './dir/lib.ts'
console.log(import.meta.url);
console.log(getURL());
```

### Sample

```sh
deno run main.ts
file:///C:/project_dir/main.ts
file:///C:/project_dir/dir/lib.ts
```

これとDeno標準ライブラリを使うとその環境でのファイルパスを取得したり、ファイルパスの合成が可能です。

```ts
import { fromFileUrl, dirname, join } from 'https://deno.land/std/path/mod.ts';

console.log(import.meta.url);
const filePath = fromFileUrl(import.meta.url);
console.log(filePath);
const dirName = dirname(filePath);
console.log(dirName);
const joinedPath = join(dirName, 'dir/lib.ts');
console.log(joinedPath);
```

実行結果は以下です。

```
file:///C:/project_dir/main.ts
C:\project_dir\main.ts
C:\project_dir
C:\project_dir\dir\lib.ts
```

Denoの標準ライブラリの `path` は環境に応じて `/` や `\` を使い分けてくれます。
`import.meta.url` からこれを使っているソースファイルの絶対パスをURL形式で入手可能なので、 `fromFileUrl()` を使ってローカルの絶対パスに書き換えます。

この後 `dirName()` や `join()` を使うことで目的のファイルの絶対パスを取得することができると思います。
