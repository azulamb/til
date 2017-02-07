# 型定義周りのメモ

## 独自定義の型をサーバー/クライアント両方で参照する

TypeScriptでの実装メリットに、型が変わった時に明確にエラー個所が分かるという点があります。

これは例えばAPIでやり取りする場合、APIで受け渡しする型をサーバーとクライアント側で共通のものを利用すれば、片方の修正での影響範囲が明確に分かることになり、非常に便利です。

しかし、これを実際にやろうとすると、いくつか問題があります。

### 普通にビルドする場合に階層が意図せず深くなる

例えば以下の構造だった場合

```
build/ ... ここにビルド結果
src/
  types.ts ... ここに共通の型
  server/ ... ここにサーバー側の処理
    main.ts
    sub.ts
```
 
Server配下のみをビルドして `build/` に出力すると以下のようになります。
 
```
build/
  main.js
  sub.js
```
 
しかし、`common/` 内のファイルを取り込むようなコードが混じると、以下のようになります。
 
```
build/
  types.js
  server/
    main.js
    sub.js
```
 
types.jsの中身が空でも、import等を使えばこのような構造で出力されたりします。

### 解決策

`@types` の仕組みを使わせてもらいます。
 
 具体的には `node_modules/@types/任意のディレクトリ/index.d.ts` に型定義を書いて、ビルドするようにします。
 
 `@types` が使える環境であれば、問題なく使えるはず。
 
 SublimeTextなどの自動補完が効かない場合、一旦再起動などしてみましょう。
 
## Promiseでの型

以下のようなコードを考える。

```
function A(): Promise<number>
{
	return Promise.resolve( 10 );
}

function B(): Promise<string>
{
	return A().then( ( result ) =>
	{
		return Promise.resolve( result + '' );
	} );
}
```

この時 `B()` では `Promise` の結果として `string` を返すが、`A()` をreturnしているため、このままでは返り値の肩が `Promise<number>` になってしまい、エラーになる。

この場合、次のような型指定で `Promise<string>` を返すと明示できる。


```
function A(): Promise<number>
{
	return Promise.resolve( 10 );
}

function B(): Promise<string>
{
	return A().then( ( result ): Promise<string> =>
	{
		return Promise.resolve( result + '' );
	} );
}
```
