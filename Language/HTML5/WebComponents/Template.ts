class MyTag extends HTMLElement
{
	public static init( tagname = 'clothes-thumbnail' )
	{
		customElements.define( tagname, this );
	}

	static get observedAttributes() { return []; }

	constructor()
	{
		super();
		const shadow = this.attachShadow( { mode: 'open' } );
	}

	public attributeChangedCallback( name: string, oldValue: any, newValue: string )
	{
	}
}


window.addEventListener( 'DOMContentLoaded', () => { MyTag.init(); } );
