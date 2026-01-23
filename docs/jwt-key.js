((script, init) => {
  if (document.readyState !== "loading") {
    return init(script);
  }
  document.addEventListener("DOMContentLoaded", () => {
    init(script);
  });
})(document.currentScript, (script) => {
  let prevKey = null;
  ((component, tagname = "jwt-key") => {
    if (customElements.get(tagname)) {
      return;
    }
    customElements.define(tagname, component);
  })(
    class extends HTMLElement {
      constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });

        const style = document.createElement("style");
        style.innerHTML = [
          ":host {}",
          ":host > div { display: grid; grid-template-rows: auto auto; }",
          ":host button { cursor: pointer; }",
          ':host button::before { content: "Generate"; }',
          "textarea { word-break: break-all; }",
        ].join("");

        const button = document.createElement("button");
        button.addEventListener("click", () => {
          this.generateKey().then((key) => {
            prevKey = key;
            return JSON.stringify(key);
          }).catch(() => {
            return "Generate error";
          }).then((result) => {
            textarea.value = result;
          });
        });

        const textarea = document.createElement("textarea");
        if (prevKey) {
          textarea.value = JSON.stringify(prevKey);
        }

        const contents = document.createElement("div");
        contents.appendChild(button);
        contents.appendChild(textarea);

        shadow.appendChild(style);
        shadow.appendChild(contents);
      }

      async generateKey() {
        const key = await crypto.subtle.generateKey(
          { name: "HMAC", hash: "SHA-256" },
          true,
          ["sign", "verify"],
        );

        const exportKey = await crypto.subtle.exportKey("jwk", key);
        console.log(exportKey);
        const importKey = await crypto.subtle.importKey(
          "jwk",
          exportKey,
          { name: "HMAC", hash: "SHA-256" },
          true,
          ["sign", "verify"],
        );

        if (
          exportKey.k !== (await crypto.subtle.exportKey("jwk", importKey)).k
        ) {
          throw new Error("Error: Keys do not match.");
        }

        return exportKey;
      }
    },
    script.dataset.jwtKey,
  );
});
