import {html} from 'lit';
import LitBase from '/lib/lit-base'

import "./footer.scss"

export default class Footer extends LitBase {

    static get DomTag() {
        return "lit-footer"
    }

    static get properties() {
        return {
            
        }
    }

    constructor() {
        super();
    }

    render() {
        return html`
             
        `
    }
}

Footer.RegisterElement()
