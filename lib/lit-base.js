import {html, LitElement} from 'lit';

export class LitBase extends LitElement {

    get DomTag() {
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
}

