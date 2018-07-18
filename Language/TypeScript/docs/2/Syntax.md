オブジェクト必要

if文ももっと削ってシンプルにして終わりにする

# JavaScriptの基本的な構文

ここではJavaScriptの基本的な構文について扱います。

# 結果を画面に出力

初めに、何をするにも自分のやったことが出力できなければ確認ができません。
プログラミング界隈では初めて各プログラムは文字列の画面への出力です。

画面の出力は以下のように行います。
実行方法で言うところのファイルでもコンソールでも何でも構いません。

```
console.log( 'Hello, world!' );
```

これで `Hello, world!` と画面上に表示されます。

`console.log( 表示したい何か )` で文字列として表示しようとしてくれます。

とりあえずこれはそのまま丸暗記で覚えてください。


# 宣言・定義

これから扱う変数や、一部の処理をまとめた関数と呼ばれるものは、宣言や定義と呼ばれる行為をする必要があります。

早い話、こういう名前の変数が存在するから！みたいなことを言わないといけないんだと思ってください。

ちなみに、上で出てきた `console.log` は、すでに皆さんが使えるようにデフォルトで宣言されています。

## 変数

変数とは、プログラミングにおいて値を入れておく箱であるとよく言われます。
箱に名前をつけて使えるようにすることを宣言、箱に値を入れることを代入と呼びます。

JavaScriptの変数は以下のように宣言して使います。

```
// test という変数を宣言して、Test string!! という文字列を代入する。
let test = "Test string!!";

// 画面に変数testに入っているものを表示する。
console.log( test );

// testに1という数値を代入する。
test = 1;

// 画面に変数testに入っているものを表示する。
console.log( test );
```

`console.log( 表示したいデータもしくは変数 )` で画面に文字を出力してくれます。
結果は次のようになります。

```
Test string!!
1
```

`let` が変数の宣言に使われるもので、`let 変数名` で変数を宣言できます。
JavaScriptでは宣言されてない変数や定義されていない関数をそのまま使おうとするとエラーになります。

```
// これだけだとエラー
console.log( test );
```

型についての話でも述べますが、JavaScriptの変数には何でも入れることが出来ます。

変数の宣言や具体的な特徴については次の [変数とスコープ](Variable.md) にて扱います。

## 関数

関数とはある一定の処理を固めて、他の場所から呼び出せるようにしたものだと思えばよいです。

以下みたいな感じで定義したり呼び出せます。

```
// 関数定義
function func() {
    console.log( 'FUNCTION!!!' );
}
// 関数呼び出し
func();
```

他にも以下のように変数に関数を入れることも可能です。

```
const func = function() {
    console.log( 'FUNCTION!!!' );
};
func();
```

書き方としては関数名が消えた（無名関数になった）ところが変わったくらいで、呼び出し方は変わりませんね。
とにかくJavaScriptでは関数もしくは関数の入った変数であれば、このように呼び出すことが出来ます。

また、先程の例のように関数に名前をつけずに定義することもできる手軽さから、JavaScriptにはコールバックという文化が根づいています。

例えば有名なのは、ブラウザで以下のようにしてクリックされた時のイベントを登録する方法でしょう。

```
document.getElementById( 'send' ).addEventListener( 'click', function() {
    console.log( 'button click!' );
}, false );
```

これは、以下のようなHTMLで書かれたボタンがクリックした時に実行されます。

```
<button id+"send">Send</button>
```

### 新しい関数の書き方

実は `function` による関数定義は、 変数の `var` 同様若干クセがあります。

そこで、最近では新しい関数の定義方法が出てきました。

```
const func = () => {
    console.log( 'FUNCTION!!!' );
};
document.getElementById( 'send' ).addEventListener( 'click', () => {
    console.log( 'button click!' );
}, false );
```

この書き方をアロー関数式と呼ぶようです。
特徴としては関数式なので普通の関数のように名前付きで定義できないため、すべて無名関数になります。

過激派は全て新しい書き方で書くべきだ！みたいに言うこともありますが、個人的には関数名を指定して書けず、変数に入れる必要があるのが面倒だなと感じます。
なので、個人的には普通の関数定義では `function` を使い、それ以外の変数やコールバック関数に入れるとかそういうケースではアロー関数式を使っています。

特に、`function` の独特のクセは `this` の中身に関するものなので、関数内部で `this` さえ使わない独立した処理ならば、名前も定義できるのでこちらの方が良いかもしれません。
しかし、`this` を使うケースでは利用が難しいケースも多々ありますので、このアロー関数式を使うようにしたほうが良いでしょう。

## 即時関数

JavaScriptでは定義即実行という書き方もあります。

```
(function() { 処理内容 })();
(() => { 処理内容 })();
```

一瞬見慣れないですが、以下のような手順で見ると何をしているか分かると思います。

```
function func() { 処理内容 }
func();
```

```
const func = function() { 処理内容 }
func();
```

```
const func = function() { 処理内容 }
( func )();
```

```
( function() { 処理内容 } )();
```

# ブロック

一定の処理をブロックという単位で固めることが出来ます。
最も分かりやすいのは関数でしょう。

```
function func() {
    処理
}
```

関数は処理を `{}` でグループ化しているようなものです。この `{}` で処理をグループ化して固めた領域をブロックと呼びます。

これから下でどんどん使います。

# 条件分岐

条件分岐は、条件によって処理を変える構文になります。

```
const age = 18;
if ( age < 20 ) {
    console.log( '未成年です！' );
}
```

`age` にはその人の年令が入っているとして、それが `20` より小さければ、未成年ということになります。
このプログラムは未成年のときだけ `未成年です！` と表示してくれます。

`age` を `20` などにすると

このように、条件分岐（if文）は、条件が成立したときだけそれに続くブロック内の処理を実行してくれます。

## その他

このままだと、未成年は判定できても成人は判定してくれません。
もう一つif文を書いても良いですが、今回は何とかなっても、次回以降「条件を満たしたとき」と「それ以外のパターンすべて」を実装するのは非常に大変なこともあるでしょう。

条件分岐には、その他というものを追加することが出来ます。

```
const age = 18;
if ( age < 20 ) {
    console.log( '未成年です！' );
} else {
    console.log( '成人です！' );
}
```

`else` はその他すべてで、if文の後につけることが出来ます。
これで未成年か成人かが判別できます。

## 赤ん坊を追加

例えば電車賃や入場料の中にはは、3歳以下は無料とか、未就学児は割引みたいなのがあると思います。
それを追加するにはどうすればよいでしょうか？
未成年の中にif文を書く手もありますが、他にも次のようにif文を増やすことも可能です。

```
const age = 18;
if ( age < 7 ) {
    console.log( '未就学児です！' );
} else if ( age < 20 ) {
    console.log( '未成年です！' );
} else {
    console.log( '成人です！' );
}
```

このように `else` と `if` を組み合わせることで、上の条件には当てはまらないけど、更に条件を絞ると言ったことが可能です。

ここで注意事項があります。

### else ifの個数

`else if` はいくつでも追加可能です。
しかし、 `else` はその他すべてという意味なので、一番最後の一箇所にしか使えません。

## 順番

もし以下のプログラムだとどうなるでしょうか？

```
const age = 3;
if ( age < 20 ) {
    console.log( '未成年です！' );
} else if ( age < 7 ) {
    console.log( '未就学児です！' );
} else {
    console.log( '成人です！' );
}
```

if文は上から順番に実行されるので、このままだと未成年です！と表示されてしまいます。

上のif文は日本語に直して丁寧に書くと以下のようになります。

* ageが20より小さければ未成年です！と表示する
* ageが20以上で、ageが7より小さければ未就学児です！と表示する
    * もちろんこの条件は絶対に成立しない。
* ageが20以上で、ageが7以上の場合、成人です！と表示する

このように、if文の条件は下に対してどんどん積み重なっていきます。
これを正しく動かすには、順番を変えなければいけません。

* ageが7より小さければ未就学児です！と表示する
* ageが7以上で、ageが20より小さければ未成年です！と表示する
* ageが7以上で、ageが20以上で成人です！と表示する

if文の順番にだけは気をつけてください。

## 条件について

if文の中の条件についてはいろいろ使えます。
とりあえずぱっと使えそうなものを書いておきます。

### 一致比較

### 大小比較

## かつ と または

if文は条件を複数同時指定することが出来ます。

例えば未就学児と60歳以上が料金無料になる場合、以下のように書くことが出来ます。

```
const age = 18;
// 未就学児と60歳以上は無料
let price = 0;
if ( 7 <= age && age < 60 ) {
    // 年齢が7歳～59歳までは500円
    price = 500;
}
```

このように `age` が `7以上` かつ `age` が `20未満` のときは、条件と条件の間を `&&` でつなぐと、2つの条件を満たした場合にif文の中の処理を実行してくれます。

また、これは別の書き方も可能です。

```
const age = 18;
// 年齢が7歳～59歳までは500円
let price = 500;
if ( age < 7 || 60 <= age ) {
    // 未就学児と60歳以上は無料
    price = 0;
}
```

今回は、年齢が7歳に満たない、または60歳以上のときに料金を無料にしています。
このようにどちらかの条件を満たした場合にif文の中の処理を実行してくれるのが `||` になります。

### 複雑な場合

`&&` も `||` もいくつでも使うことは出来ますが、複雑になることがあります。

例えば1～10日は未就学児がおまけを貰え、11～20は未成年がおまけを貰え、21～は成人がおまけをもらえるとします。
この場合年齢判定と日数判定が3セット必要で、非常に複雑になります。

こういう場合は、`()` を使ってグループ化します。

```
const age = 18;
const today = 15;
if (
    ( age < 7 && today <= 10 ) || 
    ( 7 <= age && age < 20 && 10 < today && today <= 20 ) ||
    ( 20 <= age && 21 <= today )
) {
    console.log( 'おまけがもらえるよ！' );
}
```

`()` の中が優先的に計算されるので、1つ1つの条件をこのようにグループ化することで、条件が複雑でぐちゃぐちゃになるのを防ぐことが出来ます。

ただし、このように条件式が複雑になる場合、なにか処理を間違えていることもあるので、冷静になって他の方法はないか考えた方が良いかもしれません。

# ループ