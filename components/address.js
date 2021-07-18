import {html} from 'lit';
import UIkit from 'uikit';
import LitBase from '../lib/lit-base'
import InsightClient from '../lib/insight-client'
import Utilities from '../lib/utilities'
import JSONFormatter from 'json-formatter-js'
import QRCode from 'qrcode'

import "./address.scss"


export default class Address extends LitBase {

    static get DomTag() {
        return "lit-address"
    }

    static get properties() {
        return {
            addr: {type: Object},
            is_error: {type: Number},
            loading_transactions: {type: Number}
        }
    }

    constructor() {
        super();

        this.addr = null
        this.address = ""
        this.is_error = false
        this.transactions_page = 0
        this.loading_transactions = false;
    }

    render() {

        if (this.is_error) {
            if (this.address != null && this.address != "") {
                return html`
                <div class="content-wrapper uk-container">
                    ${this._RenderBreadcrumb()}                            
                    <div>
                        <h2>Not Found</h2>
                        <p>                            
                            The specified address (<b>${this.address}</b>) was not found on the LKSCoin network.
                        </p>
                    </div>                
                </div>       
                `
            }  else {
                return html`
                <div class="content-wrapper uk-container">
                    ${this._RenderBreadcrumb()}                            
                    <div>
                        <h2>Missing parameter</h2>
                        <p>
                            Missing parameter, url must be specified by hash: <b>/address.html?addr=&lt;Here the address&gt;</b>.
                        </p>
                    </div>                
                </div>       
                `
            }
        }

        if (this.addr == null)
            return html`<div class="spinner-container"><div uk-spinner="ratio: 1" ></div></div>`

        let Address = this._FormatAddress()

        return html`
        <div class="content-wrapper uk-container">
            ${this._RenderBreadcrumb()}            
            ${this._RenderSummary(Address)}
            ${this._RenderDetails(Address)}   
            <div class="content-wrapper uk-container">
                <h2>Transactions</h2>
                <div class="transactions-container details-table"></div>
                <div class="load-container">
                    ${this.loading_transactions==true?
                        html`<div uk-spinner="ratio: 1" class="load-spinner"></div>`:
                        html`<button class="load-more uk-button uk-button-default" @click="${this._RenderTransactions}">Load More</button>`
                    }
                </div>                  
            </div>   
            <div class="uk-margin-large-top">
                <h2>Unspent Outputs (UTXO)</h2>                
                <div class="json-data-container"></div>
            </div>           
        </div>    
        `
    }

    firstUpdated() {

        setTimeout(async ()=>{
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            
            try {
                this.address = urlParams.get("addr")

                this.addr = await InsightClient.GetAddress(this.address)

                setTimeout(async ()=>{ await this._RenderTransactions() },50)
                setTimeout(async ()=>{ await this._RenderUtxo() },50)
            }
            catch (Ex) {
                this.is_error = true
            }
        },10)

    }

    _RenderBreadcrumb() {
        return html`
            <ul class="uk-breadcrumb">
                <li><a href="/index.html">Home</a></li>
                <li><span>Address</span></li>
            </ul>
        `                 
    }

    _RenderSummary(Address) {
        setTimeout(async ()=>{
            try {
                let imgsrc = await QRCode.toDataURL(Address.Addr)
                this.querySelector(".summary-container > div:first-child").style.backgroundImage = `url(${imgsrc})`
            } 
            catch { }    
        },10)

        return html`
        <div class="summary-container">
            <div class="hide-under-768"></div>
            <div>
                <h2>Address</h2>
                <div class="address"><a href="#" uk-tooltip="Click to copy" @click="${this._CopyAddress}"><span class="address-data">${Address.Addr}</span> <span uk-icon="copy"></span></a></div>
                <div class="balance"><label>Balance:</label><span>${Address.Balance}</span></div>
                <div class="total-received"><label>Total Received:</label><span>${Address.TotalReceived}</span></div>
            </div>
        </div>
        `
    }

    _RenderDetails(Address) {

        let data = []
        data.push({ label: "Address", value: Address.Addr })
        data.push({ label: "Balance", value: Address.Balance })        
        data.push({ label: "Unconfirmed Balance", value: Address.UnconfirmedBalance})
        data.push({ label: "Transactions Count", value: Address.TransactionsCount })
        data.push({ label: "Unconfirmed Transactions Count", value: Address.UnconfirmedTransactionsCount })
        data.push({ label: "Total Sent", value: Address.TotalSent })
        data.push({ label: "Total Received", value: Address.TotalReceived })

        return html`
            <div class="uk-margin-large-top">
                <h2>Details</h2>
                <div class="details-table">
                    ${data.map((el)=> {
                        if (el.url != null)
                            return html`
                                <div class="details-row">
                                    <div>${el.label}</div>
                                    <div id="${el.id}">
                                        ${el.amount!=null?html`${el.amount.toFixed(6)}&nbsp;`:``}
                                        <a href="${el.url}" target="_blank">${el.value}</a>
                                    </div>
                                </div>`
                        else
                            return html`
                                <div class="details-row">
                                    <div>${el.label}</div>
                                    <div id="${el.id}">
                                        ${el.amount!=null?html`${el.amount.toFixed(6)}&nbsp;`:``}
                                        ${el.value}
                                    </div>
                                </div>
                                `
                    })}   
                </div>            
            </div>            
        `
    }

    async _RenderTransactions() {
        let res = {}
        try {
            this.loading_transactions = true
            res = await InsightClient.GetAddressTransactions(this.address,this.transactions_page)
            this.transactions_page++;
            
            let txcnt = this.querySelector(".transactions-container")
            res.txs.forEach((tr)=>{
                let row = document.createElement("div")
                row.classList.add("details-row")
                row.innerHTML = `
                    <div>${InsightClient.FormatTransactionType(tr.type)}</div>
                    <div>
                        <a href="/transaction.html?txid=${tr.txid}" target="_blank">${tr.txid}</a>
                    </div>
                `
                txcnt.append(row)
            })
            

        }
        catch (Ex) {
           
        }
        this.loading_transactions = false
        if (this.transactions_page >= parseInt(res.pagesTotal))
                this.querySelector(".load-container").remove()
    }

    async _RenderUtxo() {

        let res = await InsightClient.GetAddressUtxo(this.address)
        let formatter = new JSONFormatter(res);
        let el = this.querySelector(".json-data-container")
        if (el != null) {
            el.innerHTML = ""
            el.append(formatter.render())
            formatter.openAtDepth(5);
        }
    }

    _FormatAddress(){
        let Address = {}

        Address.Addr = this.addr.addrStr

        Address.Balance = this.addr.balance

        Address.TotalReceived = this.addr.totalReceived
        Address.TotalSent = this.addr.totalSent
        Address.UnconfirmedBalance = this.addr.unconfirmedBalance

        Address.UnconfirmedTransactionsCount = this.addr.unconfirmedAppearances
        Address.TransactionsCount = this.addr.txAppearances 
        
        return Address
    }

    _CopyAddress(evt) {
        evt.preventDefault()
        try {
            var copyText = this.querySelector(".address-data");

            const el = document.createElement("textarea");
            el.value = copyText.innerText;
            document.body.appendChild(el);
            el.select();
            document.execCommand("copy");
            document.body.removeChild(el);

            UIkit.notification("<span uk-icon='icon: check'></span> Address copied");
        }
        catch {}
    }
}

Address.RegisterElement()
