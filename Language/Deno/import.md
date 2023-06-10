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

## resolve

`import.meta.resolve()` は第一引数に渡したモジュールのパスをURL形式で返してくれる関数です。

これだけなら諸々のモジュール解決に使うくらいかと思いますがDenoでは重要な使い方があります。

https://twitter.com/deno_land/status/1660794789862965249

Denoには `compile` という対象のプログラムを単一実行可能な実行可能プログラムとして出力する機能があります。
エントリーポイントだけで完結するなら特に問題はないのですが、Workerは別のファイルを読み込ませて実行します。このままではbundleで出力されたもの以外にWorkerのソースファイルを用意しなければいけなくなります。しかもそれが他のモジュールに依存してたらどうするんだ？など、様々な問題が発生します。

ですが上の公式Twitterのツイートにあるように、`import.meta.resolve()` 経由でWorker側のファイルパスを指定し、`compile` 時にWorkerのファイルも一緒に指定すると一緒に単一ファイルに混ぜてもらえる他、実行も可能です。

### worker.ts

```ts
declare const self: Worker;
self.onmessage = (event) => {
	console.log('worker received:', event.data);
	self.postMessage('hello from worker!');
};
```

### main.ts

```ts
const worker1 = new Worker(import.meta.resolve('./worker.ts'), {
	type: 'module'
});
worker1.postMessage('Hello from main!');
worker1.onmessage = (event) => {
	console.log('main received', event.data);
	worker1.terminate();
};
```

### Sample

```sh
$ deno run --allow-read main.ts
worker received: Hello from main!
main received hello from worker!
$ deno compile --include worker.ts -o example main.ts
Check file:///C:/project_dir/main.ts
Check file:///C:/project_dir/worker.ts
Compile file:///C:/project_dir/main.ts to example.exe
$ ./example.exe
worker received: Hello from main!
main received hello from worker!
```

無事単純実行でも `compile` で単一ファイルにしてもWorkerを実行することができました。
