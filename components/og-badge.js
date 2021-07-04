import {html} from 'lit';
import LitBase from '/lib/lit-base'
import "./og-badge.scss"

export default class OGBadge extends LitBase {

    static get DomTag() {
        return "lit-og-badge"
    }

    static get properties() {
        return {
            title: {type:String},
            description: {type:String},
            image: {type:String},
            url: {type:String},
        }
    }

    constructor() {
        super();

    }

    render() {
        return html`
            <a href="${this.url}" target="_blank">
                <h3>${this.title}</h3>
                <p>${this.description}</p>
                <img src="${this.image}" alt="${this.title}" />
                <div>${this.url}</div>
            </a>
        </div>    
        `
    }

}

OGBadge.RegisterElement()
