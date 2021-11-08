import {html, LitElement} from 'lit';

export default class LitBase extends LitElement {

    static get DomTag() {
        return ""
    }

    static get properties() {
        return {
          
        }
    }

    constructor() {
        super();
    }

    createRenderRoot() {
        return this;
    }

    static RegisterElement() {
        customElements.define(this.DomTag, this);
        window[this.name] = this;
    }

	SetButtonToWait(el_btn) {
		let ih = el_btn.innerHTML
		let mw = el_btn.style.minWidth
		let rc = el_btn.getBoundingClientRect()

		el_btn.style.minWidth = rc.width + "px"
		el_btn.innerHTML = `<div uk-spinner="ratio: 1" class="load-spinner"></div>`

		el_btn.ih = ih
		el_btn.mw = mw
	}

	UnsetButtonToWait(el_btn) {
		el_btn.innerHTML = el_btn.ih
		el_btn.style.minWidth = el_btn.mw
	}	
}

