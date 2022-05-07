
```
const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWQXYZ0123456789_";
[...crypto.getRandomValues(new Uint8Array(10))].map(x => chars[x % chars.length]).join('');
```

https://twitter.com/mizchi/status/1517477190497013761
