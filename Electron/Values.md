## processの中身

Electronではprocessオブジェクトの中にいろいろ値が入ってるので、それについてメモ書き。

## キー全抽出

とりあえず以下コード埋め込めばキー一覧が出てくるので、気になったものを見ればよいと思います。

```js
for (var key in process){ console.log( key ); }
```

以下出力例です。

```
title
version
moduleLoadList
versions
arch
platform
release
argv
execArgv
env
pid
features
_needImmediateCallback
execPath
debugPort
_startProfilerIdleNotifier
_stopProfilerIdleNotifier
_getActiveRequests
_getActiveHandles
reallyExit
abort
chdir
cwd
umask
_kill
_debugProcess
_debugPause
_debugEnd
hrtime
dlopen
uptime
memoryUsage
binding
_linkedBinding
_setupDomainUse
_events
type
resourcesPath
helperExecPath
crash
hang
log
activateUvLoop
_rawDebug
domain
_maxListeners
NativeModule
EventEmitter
_fatalException
_exiting
_eventsCount
assert
config
nextTick
_tickCallback
_tickDomainCallback
stdout
stderr
stdin
openStdin
exit
kill
mainModule
atomBinding
setMaxListeners
getMaxListeners
emit
addListener
on
once
removeListener
removeAllListeners
listeners
listenerCount
```

## 気になった値や役立ちそうな値

### versions

Electronで使用されるもろもろのシステムのバージョンが取得できます。以下例。

```js
console.log( process.versions );
```

```json
{ http_parser: '2.6.0',
  node: '5.1.1',
  v8: '4.9.385.28',
  uv: '1.7.5',
  zlib: '1.2.8',
  ares: '1.10.1-DEV',
  modules: '47',
  openssl: '1.0.2e',
  electron: '0.37.2',
  'atom-shell': '0.37.2',
  chrome: '49.0.2623.75' }
```

Electron本体やNode.jsのみならず、V8やChromeのバージョンも取得できます。

### 実行環境

いろいろな出し分けとかで使えそうなの。

```js
console.log(process.arch);
console.log(process.platform);
```

```
x64
win32
```

### 環境変数

Node.jsと同じく。値は省略します。

```js
console.log(process.env);
```

npm_package_*にはpackage.jsonで指定した値とかが入ってる模様。

他何か気になるのとかあったら追記予定。
