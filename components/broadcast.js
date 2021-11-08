import {html} from 'lit';
import LitBase from '/lib/lit-base'
import "./broadcast.scss"

import {PrivateKey } from '../lib/lkscore-lib.min.js'
import {Mnemonic } from '../lib/lkscore-lib.min.js'
import {Networks } from '../lib/lkscore-lib.min.js'
import {Transaction } from '../lib/lkscore-lib.min.js'
import {Address } from '../lib/lkscore-lib.min.js'

import InsightClient from '../lib/insight-client'


export default class Broadcast extends LitBase {

    static get DomTag() {
        return "lit-broadcast"
    }

    static get properties() {
        return {
            mode: { type: String }
        }
    }

    constructor() {
        super();

		this.mode = "FORM"
		this.rawdata = ""
		this.txid = ""
		this.last_error = ""
    }

    render() {
		if (this.mode == "FORM")
			return this._RenderForm()
		else if (this.mode == "ERROR")
			return this._RenderError()
		else if (this.mode == "SUCCESS")
			return this._RenderSuccess()			
    }

    _RenderBreadcrumb() {
			
        return html`
            <ul class="uk-breadcrumb">
                <li><a href="/index.html">Home</a></li>
                <li><span>Broadcast</span></li>
            </ul>
        `                 
    }	

	_RenderForm() {
		this.rawdata = ""
        return html`
        <div class="content-wrapper uk-container">
			${this._RenderBreadcrumb()}
            <h2 class="">Broadcast New Transaction</h2>
            <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-text">Private key</label>				
                <div class="uk-form-controls">
                    <textarea class="uk-textarea privkey" rows="5" placeholder="Paste here wallet mnemonics or private key"></textarea>
                </div>
            </div>
            <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-text">Amount (in shatoshis)</label>				
                <div class="uk-form-controls">
					<input class="uk-input amount" type="text" placeholder="Insert transaction amount">
                </div>
            </div>
            <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-text">Notarized data</label>				
                <div class="uk-form-controls">
					<input class="uk-input payload" type="text" placeholder="Insert data to notarize in transaction">
                </div>
            </div>
            <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-text">Destination address</label>				
                <div class="uk-form-controls">
					<input class="uk-input dest_address" type="text" placeholder="Insert destination LKS address">
                </div>
            </div>

			<div class="uk-margin">
				<button class="uk-button uk-button-primary" @click="${this._OnSend}">Send transaction</button>
			</div>
        </div>    
        `
	}

	_RenderError() {
        return html`
        <div class="content-wrapper uk-container">
			${this._RenderBreadcrumb()}
            <h2 class="">Broadcast Transaction Error</h2>
            <div class="uk-margin error-message" uk-grid>
				<div uk-icon="close"></div>
				<div class="">
					${this.last_error}
                </div>
			</div>			
            <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-text">Raw transaction</label>
                <div class="uk-form-controls">
					<div class="raw-transaction">
                    	${this.rawdata}
					</div>
                </div>
			</div>
			<div class="uk-margin">
				<button class="uk-button uk-button-primary" @click="${this._OnReset}">Reset</button>
			</div>
        </div>    
        `
	}	

	_RenderSuccess() {
        return html`
        <div class="content-wrapper uk-container">
			${this._RenderBreadcrumb()}
            <h2 class="">Broadcast Transaction Success</h2>
            <div class="uk-margin success-message" uk-grid>
				<div uk-icon="check"></div>
				<div class="">
					Transaction submitted to network successfully.
					Tx-Id: <a href="/transaction.html?txid=${this.txid}" target="_blank">${this.txid}</a>
                </div>
			</div>			
            <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-text">Raw transaction</label>
                <div class="uk-form-controls">
					<div class="raw-transaction">
                    	${this.rawdata}
					</div>
                </div>
			</div>
			<div class="uk-margin">
				<button class="uk-button uk-button-primary" @click="${this._OnReset}">Reset</button>
			</div>
        </div>    
        `
	}	


	async _OnSend() {
		try {
			this.SetButtonToWait(this.querySelector("button.uk-button"))

			let privkey = this.querySelector(".privkey").value
			let amount = parseInt(this.querySelector(".amount").value)
			let payload = this.querySelector(".payload").value
			let dest_address = this.querySelector(".dest_address").value

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
			let public_key = private_key.toPublicKey();
			
			let dest_public_key = Address.fromString(dest_address)

			let vutxo = await InsightClient.GetAddressUtxo(public_key.toAddress(Networks.livenet))
			
			let tot = 0;
			vutxo.forEach((utxo)=>{
				utxo.outputIndex = utxo.vout
				tot += utxo.satoshis
			})
								
			var transaction = new Transaction()
				.fee(100000)
				.from(vutxo)
				.addData(payload)
				.to(dest_public_key,amount)
				.change(public_key)
				.sign(private_key);
							
			this.rawdata = transaction.toString()
			let res = await InsightClient.SendTransaction(this.rawdata)
			this.txid = res.txid
			console.log(this.txid)
			this.mode = "SUCCESS"
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

Broadcast.RegisterElement()
