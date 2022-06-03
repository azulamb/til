# Deno標準ライブラリ周り

## 最新バージョンを確認

Denoの公式サイトでは `https://deno.land/std` にアクセスすると最新のstdのバージョンを付与し、 `https://deno.land/std@X.Y.Z` にリダイレクトします。
これを利用して最新の標準ライブラリのバージョンを取得することができます。

```ts
function OfficialStdVersion() {
	return fetch('https://deno.land/std', { headers: { accept: 'text/html' }, redirect: 'manual' }).then((response) => {
		const status = response.status;
		if (status < 300 || 400 <= status) {
			throw new Error(`Access error: ${status}`);
		}
		const location = response.headers.get('location') || '';
		const version = location.split('@')[1];
		if (!version) {
			throw new Error(`Get version error:`);
		}
		return version;
	});
}
```
