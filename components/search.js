import {html} from 'lit';
import LitBase from '/lib/lit-base'

import "./search.scss"

export default class Search extends LitBase {

    static get DomTag() {
        return "lit-search"
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
            
            <form class="uk-search" @submit="${this._OnSearch}">
                <span uk-search-icon></span>
                <input class="uk-input uk-form-width-large	" type="search" placeholder="Search block, transaction or address">
                <input type="submit" style="position: absolute; left: -9999px"/>
            </form>
            <div class="scan-button hidden">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M3,11H5V13H3V11M11,5H13V9H11V5M9,11H13V15H11V13H9V11M15,11H17V13H19V11H21V13H19V15H21V19H19V21H17V19H13V21H11V17H15V15H17V13H15V11M19,19V15H17V19H19M15,3H21V9H15V3M17,5V7H19V5H17M3,3H9V9H3V3M5,5V7H7V5H5M3,15H9V21H3V15M5,17V19H7V17H5Z" />
                </svg>    
                <div>Scan</div>
            </div>
        `
    }

    _OnSearch(evt) {
        evt.preventDefault()
        try {
            let txt = this.querySelector(".uk-input").value.trim();
            if (txt == null || txt.trim() == "")
                return;

            if (txt.startsWith("X")) {
                document.location.href = "/address.html?addr="+txt
                return
            }

            if (/^\d+$/.test(txt)) {
                document.location.href = "/block.html?index="+txt
                return
            }

            if (txt.startsWith("00000000")) {
                document.location.href = "/block.html?hash="+txt
                return
            }
            
            document.location.href = "/transaction.html?txid="+txt
        }
        catch {

        }
    }
}

Search.RegisterElement()
