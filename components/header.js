import {html} from 'lit';
import LitBase from '/lib/lit-base'

import Search from './search'

import "./header.scss"

export default class Header extends LitBase {

    static get DomTag() {
        return "lit-header"
    }

    static get properties() {
        return {
            active_link: { type: String }
        }
    }

    constructor() {
        super();
    }

    render() {
        return html`
        <div uk-sticky="media: 960" class="header uk-navbar-container uk-navbar-transparent tm-navbar-container uk-sticky uk-active uk-sticky-fixed uk-sticky-below" >
            <div class="uk-container ">
                <nav class="uk-navbar">
                    <div class="uk-navbar-left">
                        <a uk-navbar-toggle-icon="" href="#offcanvas" uk-toggle="" class="uk-navbar-toggle uk-icon uk-navbar-toggle-icon" aria-expanded="false">
                            <svg width="30" height="30" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect y="9" width="20" height="2"></rect><rect y="3" width="20" height="2"></rect><rect y="15" width="20" height="2"></rect></svg>
                        </a>
                        <a href="/" class="uk-navbar-item uk-logo">
                            <img src="https://www.lkschain.io/images/logo.png" style="height:48px">
                        </a>                            
                    </div>
                    <div class="uk-navbar-right">
                        <lit-search class="hide-on-small"></lit-search>                         
                        
                    </div> 
                </nav>                
            </div>
        </div>        
        <div id="offcanvas" uk-offcanvas="mode: push; overlay: true" class="uk-offcanvas" style="">
            <div class="uk-offcanvas-bar">
                <div class="uk-panel">
                    <ul class="uk-nav uk-nav-default tm-nav">
                        <li class="uk-nav-header">Menu</li>
                        <li><a href="/index.html">Home</a></li>
                        <li><a href="/blocks.html" class="blocks">Blocks</a></li>
                        <li><a href="/" class="status">Status</a></li>
                    </ul>
                </div>
            </div>
        </div>        
        `
    }

    firstRendered() {
        let vels = this.querySelectorAll(this.active_link)
        if (vels != null)
            vel.forEach((el)=>{ el.classList.add("uk-active") })
    }
}

Header.RegisterElement()
