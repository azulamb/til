interface MyElement extends HTMLElement {
}

((script) => {
  const tagName = script.getAttribute('my-element-name') ?? 'my-element';
  if (customElements.get(tagName)) {
    return Promise.reject(new Error(`Custom element with name "${tagName}" already exists.`));
  }
  if (document.readyState !== 'loading') {
    return Promise.resolve(tagName);
  }
  return new Promise<string>((resolve) => {
    document.addEventListener('DOMContentLoaded', () => {
      resolve(tagName);
    });
  });
})(<HTMLScriptElement> document.currentScript).then((tagName) => {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(``);

  customElements.define(
    tagName,
    class extends HTMLElement implements MyElement {

      constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.adoptedStyleSheets = [sheet];
      }

      static get observedAttributes() { return []; }
      public attributeChangedCallback( name: string, oldValue: any, newValue: string ) {
      }
    },
  );
});
