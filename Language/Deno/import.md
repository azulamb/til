# import API

https://deno.com/manual/runtime/import_meta_api

JSの `import` に加えDenoにおけるimportの補強をするような機能がいくつかある。

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


