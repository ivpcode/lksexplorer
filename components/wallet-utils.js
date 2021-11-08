import {html} from 'lit';
import LitBase from '/lib/lit-base'
import "./wallet-utils.scss"

import Address from "./address"

import {PrivateKey } from '../lib/lkscore-lib.min.js'
import {Mnemonic } from '../lib/lkscore-lib.min.js'
import {Networks } from '../lib/lkscore-lib.min.js'
import {Transaction } from '../lib/lkscore-lib.min.js'
import InsightClient from '../lib/insight-client'


export default class WalletUtils extends LitBase {

    static get DomTag() {
        return "lit-wallet-utils"
    }

    static get properties() {
        return {
            public_key: { type: String }
        }
    }

    constructor() {
        super();

		this.public_key = ""
		this.last_error = ""
    }

    render() {
        return html`
        <div class="content-wrapper uk-container">
			${this._RenderBreadcrumb()}
            <h2 class="">Wallet Utility</h2>
            <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-text">Private key (<a href="" @click="${this._OnGenerateNewMenmonics}">Generate new wallet mnemonics</a>)</label>
                <div class="uk-form-controls">
                    <textarea class="uk-textarea privkey" rows="3" placeholder="Paste here wallet mnemonics or private key"></textarea>
                </div>
            </div>
			${this.public_key==""?html`
				<div class="uk-margin">
					<button class="uk-button uk-button-primary" @click="${this._OnGetPublicKey}">Get Public Key</button>
				</div>`: html`
				<lit-address no_breadcrumb="true" address="${this.public_key}"></lit-address>
				`}
        </div>    
        `
	}

    _RenderBreadcrumb() {
			
        return html`
            <ul class="uk-breadcrumb">
                <li><a href="/index.html">Home</a></li>
                <li><span>Wallet Utility</span></li>
            </ul>
        `                 
    }	

	async _OnGenerateNewMenmonics(evt) {
		evt.preventDefault()
		let mn = new Mnemonic(Mnemonic.Words.ENGLISH)
		this.querySelector(".privkey").value = mn.toString()
	}

	async _OnGetPublicKey() {
		try {
			this.SetButtonToWait(this.querySelector("button.uk-button"))

			let privkey = this.querySelector(".privkey").value			
			let private_key = null;
			if (privkey.startsWith("X")) {
				private_key = PrivateKey.fromWIF(privkey);				
			}
			else {
				let code = new Mnemonic(privkey);
				let xpriv1 = code.toHDPrivateKey(); 
				let out = xpriv1.derive("m/44'/896'/0'/0")
				
				private_key = out.privateKey										
			}
			let address = private_key.toPublicKey().toAddress(Networks.livenet)
			this.public_key = address.toString()

		}
		catch (Ex) {
			this.last_error = Ex.message
			if (Ex.response != null && Ex.response.data!=null) {
				this.last_error += " - "+Ex.response.data
			}
			this.mode = "ERROR"
		}
		this.UnsetButtonToWait(this.querySelector("button.uk-button"))
	}

	async _OnReset() {
		this.rawdata = ""
		this.mode = "FORM"
	}	
}

WalletUtils.RegisterElement()
