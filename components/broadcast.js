import {html} from 'lit';
import LitBase from '/lib/lit-base'
import "./broadcast.scss"

export default class Broadcast extends LitBase {

    static get DomTag() {
        return "lit-broadcast"
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
        <div class="content-wrapper uk-container">
            <h2 class="">Broadcast Raw Transaction</h2>
            <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-text">Raw transaction</label>
                <div class="uk-form-controls">
                    <textarea class="uk-textarea" rows="5" placeholder="Paste here raw transaction in hex format"></textarea>
                </div>
            </div>
        </div>    
        `
    }

}

Broadcast.RegisterElement()
