# Fresh 2

自分の環境だと少し手を入れないと正常に動かせないので手順のメモ。

## インストール

```
deno run -Ar jsr:@fresh/init
```

Tailwindは使わず、VSCodeは使う。

```

 🍋 Fresh: The next-gen web framework. 
    version 2.2.0

Project Name: XXXXX
Set up Tailwind CSS for styling? [y/N] n
Do you use VS Code? [y/N] y
Installing dependencies...
Installing dependencies...done!

Project initialized!

Enter your project directory using cd dashboard.
Run deno task dev to start the project. CTRL-C to stop.

Stuck? Join our Discord https://discord.gg/deno

Happy hacking! 🦕
```

## 調整

### .vscode/settings.json

`deno.enablePaths` の追加。

```
  "deno.enablePaths": ["./"],
```

### WebComponents

型定義ファイルを作成

```
/// <reference lib="dom" />

declare global {
  namespace preact.JSX {
    interface IntrinsicElements {
      'web-component': Record<string, unknown>;
    }
  }
}

export {};
```

型定義ファイルを読み込むように `deno.json` に追加

```
    "types": ["vite/client", "./XXX/_types.d.ts"]
```
