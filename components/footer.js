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
             <div>LKSChain Explorer v. 2021-11-18</div>
			 <div>by Prez Ivan -&nbsp;<a href="https://github.com/ivpcode/lksexplorer">GitHub Repo</a></div>
        `
    }
}

Footer.RegisterElement()
