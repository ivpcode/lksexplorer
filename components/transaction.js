import {html} from 'lit';
import LitBase from '../lib/lit-base'
import InsightClient from '../lib/insight-client'
import Utilities from '../lib/utilities'
import OGBadge from './og-badge'
import JSONFormatter from 'json-formatter-js'

import "./transaction.scss"



export default class Transaction extends LitBase {

    static get DomTag() {
        return "lit-transaction"
    }

    static get properties() {
        return {
            tx: {type: Object},
            is_error: {type: Number}
        }
    }

    constructor() {
        super();

        this.tx = null
        this.txid = ""
        this.is_error = false
    }

    render() {

        if (this.is_error) {
            if (this.txid != null && this.txid != "") {
                return html`
                <div class="content-wrapper uk-container">
                    ${this._RenderBreadcrumb()}         

                    <div>
                        <h2>Not Found</h2>
                        <p>
                            The transaction with the specified txid (${this.txid}) was not found on the LKSCoin network.
                        </p>
                    </div>                
                </div>       
                `
            } else {
                return html`
                <div class="content-wrapper uk-container">
                    ${this._RenderBreadcrumb()}                       
                    <div>
                        <h2>Missing txid parameter</h2>
                        <p>
                            Missing txid parameter, url must be specified as: <b>/transaction.html?txid=&lt;Here the txid&gt;</b>.
                        </p>
                    </div>                
                </div>       
                `
            }
        }

        if (this.tx == null)
            return html``

        let Tx = InsightClient.FormatTransaction(this.tx)

        return html`
        <div class="content-wrapper uk-container">
            ${this._RenderBreadcrumb()}        
            ${this._RenderSummary(Tx)}
            ${this._RenderDetails(Tx)}
            ${this._RenderJSON()}
        </div>    
        `
    }

    firstUpdated() {

        setTimeout(async ()=>{
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            
            try {
                this.txid = urlParams.get("txid")
                if (this.txid == null)
                    throw "missing txid parameter"

                this.tx = await InsightClient.GetTransaction(this.txid)

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
                <li><span>Transaction</span></li>
            </ul>
        `                 
    }

    _RenderSummary(Tx) {
        return html`
        <div class="summary">
            <h2>Transaction Summary</h2>
            <p>
                This transaction was first broadcast to the LKSCoin network on ${Tx.Timestamp}.  
                The transaction size is ${Tx.Size}, and currently has ${Tx.Confirmations} confirmations.
                ${Tx.IPFSUrl!=null?html`
                <br>This transaction contains a notarization of an IPFS resource reachable at uri: <a href="${Tx.IPFSUrl}" target="_blank">${Tx.IPFSHash}</a>.
                `:``}
            </p>
        </div>`
    }

    _RenderDetails(Tx) {

        let txdt = []
        txdt.push({ label: "Hash", value: Tx.Hash })
        txdt.push({ label: "Type", value: Tx.Type })                
        if (Tx.TypeNum == 0) {
            txdt.push({ label: "From", value: Tx.SenderAddr, url: `/address.html?addr=${Tx.SenderAddr}` })      
            if (Tx.vReceiverAddrs.length == 1) {  
                txdt.push({ label: "To", value: Tx.ReceiverAddr, url: `/address.html?addr=${Tx.ReceiverAddr}` })
                txdt.push({ label: "Received Amount", value: Tx.Amount.toFixed(6) })            
            }
            else {
                Tx.vReceiverAddrs.forEach((rec,n)=>{
                    txdt.push({ label: "Receiver "+(n+1), value: rec, amount: parseFloat(this.tx.vout[n].value), url: `/address.html?addr=${rec}` })
                })
            }

            txdt.push({ label: "Fees", value: Tx.Fees.toFixed(6) })    
        }
        else if (Tx.TypeNum == 5) {
            txdt.push({ label: "To SuperBlock", value: Tx.vReceiverAddrs[0], amount: parseFloat(this.tx.vout[0].value), url: `/address.html?addr=${Tx.vReceiverAddrs[0]}` })  
            txdt.push({ label: "To Masternode", value: Tx.vReceiverAddrs[1], amount: parseFloat(this.tx.vout[1].value), url: `/address.html?addr=${Tx.vReceiverAddrs[1]}` })  
            txdt.push({ label: "To Miner", value: Tx.vReceiverAddrs[2], amount: parseFloat(this.tx.vout[2].value), url: `/address.html?addr=${Tx.vReceiverAddrs[2]}` })  
        }
        
        txdt.push({ label: "Status", value: Tx.Status })
        txdt.push({ label: "Received Time", value: Tx.Timestamp})
        txdt.push({ label: "Size", value: Tx.Size })
        txdt.push({ label: "Included in Block", value: Tx.Block, url: `/block.html?block=${Tx.Block}` })
        txdt.push({ label: "Confirmations", value: Tx.Confirmations })
        if (parseFloat(Tx.TotalInput) > 0) 
            txdt.push({ label: "Total Input", value: Tx.TotalInput })
        txdt.push({ label: "Total Output", value: Tx.TotalOutput })
        if (Tx.NotarizedData != "")
            txdt.push({ label: "Notarized Data", value: Tx.NotarizedData })


        if (Tx.IPFSHash != "" && Tx.IPFSHash != null) {            
            txdt.push({ label: "Notarized IPFS Resource", value: Tx.IPFSHash, url: Tx.IPFSUrl, id: "IPFS_"+Tx.IPFSHash })
            setTimeout(async ()=>{
                try {
                    let res = await Utilities.GetOpenGraph(Tx.IPFSUrl)
                    let ogb = new OGBadge()
                    ogb.title = res.title
                    ogb.description = res.description
                    ogb.image = res.image
                    ogb.url = Tx.IPFSUrl
                    let el = this.querySelector("#"+"IPFS_"+Tx.IPFSHash)
                    if (el!=null)
                        el.append(ogb)
                }
                catch(ex) {
                    console.log(ex)
                }

            },10)
        }

        return html`
            <div class="uk-margin-large-top">
                <h2>Details</h2>
                <div class="details-table">
                    ${txdt.map((el)=> {
                        if (el.url != null)
                            return html`
                                <div class="details-row">
                                    <div>${el.label}</div>
                                    <div id="${el.id}">
                                        ${el.amount!=null?html`${el.amount.toFixed(6)}&nbsp;`:``}
                                        <a href="${el.url}">${el.value}</a>
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

    _RenderJSON() {

        setTimeout(()=>{
            let formatter = new JSONFormatter(this.tx);
            let el = this.querySelector(".json-data-container")
            if (el != null)
                el.append(formatter.render())
                formatter.openAtDepth(5);
        },50)

        return html`
        <div class="uk-margin-large-top">
            <h2>JSON Object</h2>                
            <div class="json-data-container"></div>
        </div>            
        `
    }

}

Transaction.RegisterElement()
