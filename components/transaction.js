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

        let Tx = this._FormatTx()

        return html`
        <div class="content-wrapper uk-container">
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

                let res = await InsightClient.GetTransaction(this.txid)
                this.tx = res.data
            }
            catch (Ex) {
                this.is_error = true
            }
        },10)

    }

    _RenderSummary(Tx) {
        return html`
        <div>
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

    _FormatTx(){
        let Tx = {}

        Tx.Hash = this.tx.txid

        Tx.TypeNum = this.tx.type
        if (this.tx.type == null)
            Tx.TypeNum = 0
        Tx.Type = "Send Transaction"
        if (this.tx.type == 1)
            Tx.Type = "Provider Registration Transaction (ProRegTx)"
        if (this.tx.type == 2)
            Tx.Type = "Provider Update Service Transaction (ProUpServTx)"
        if (this.tx.type == 3)
            Tx.Type = "Provider Update Registrar Transaction (ProUpRegTx)"
        if (this.tx.type == 4)
            Tx.Type = "Provider Update Revocation Transaction (ProUpRevTx)"
        if (this.tx.type == 5)
            Tx.Type = "Coinbase Transaction (CbTx)"
        if (this.tx.type == 6)
            Tx.Type = "Quorum Commitment"


        Tx.Size = parseInt(this.tx.size) + " bytes"
        if (this.tx.size > 1024)
        Tx.Size = `${(this.tx.size/1024).toFixed(1)}Kb`

        let date = new Date(this.tx.time*1000)
        Tx.Timestamp = date.toDateString() + " " + date.toTimeString()        

        Tx.Status = (this.tx.confirmations>0)?"Confirmed":"Unconfirmed"

        Tx.Amount = 0
        Tx.Fees = 0
        if (this.tx.isCoinBase!=true)
        Tx.Fees = this.tx.fees

        Tx.Block = this.tx.blockheight

        Tx.Confirmations = this.tx.confirmations

        Tx.TotalInput = this.tx.valueIn
        Tx.TotalOutput = this.tx.valueOut

        Tx.SenderAddr = "From mining"
        Tx.TotalSent = 0
        let vSenderAddrs = []
        if (this.tx.vin!=null || this.tx.vin.length>0) {
           
            this.tx.vin.forEach(element => {
                if (vSenderAddrs.indexOf(element.addr)<0 && element.addr!=null)
                    vSenderAddrs.push(element.addr)
                    Tx.TotalSent += parseFloat(element.value)
            });
            if (vSenderAddrs.length==1)
                Tx.SenderAddr = vSenderAddrs[0]
            else if (vSenderAddrs.length>1)
                Tx.SenderAddr = vSenderAddrs.join(", ")
        }

        Tx.ReceiverAddr = ""        
        Tx.NotarizedData = ""
        Tx.TotalReceived = 0
        Tx.vReceiverAddrs = []
        if (this.tx.vout!=null || this.tx.vout.length>0) {
            this.tx.vout.forEach(element => {
                if (element.scriptPubKey!=null && 
                    element.scriptPubKey.addresses!=null) {
                        element.scriptPubKey.addresses.forEach((addr)=>{
                            if (Tx.vReceiverAddrs.indexOf(addr)<0 && vSenderAddrs.indexOf(addr)<0)
                                Tx.vReceiverAddrs.push(addr)   
                            if (vSenderAddrs.indexOf(addr)<0)
                                Tx.Amount += parseFloat(element.value)
                        })
                    } 

                if (element.scriptPubKey!=null && 
                    element.scriptPubKey.asm!=null && 
                    element.scriptPubKey.asm.startsWith("OP_RETURN")){
                        Tx.NotarizedData = this.HexToAscii(element.scriptPubKey.asm.replace("OP_RETURN ",""))
                    }                    
            });
            if (Tx.vReceiverAddrs.length==0)                
                Tx.ReceiverAddr = Tx.SenderAddr
            else if (Tx.vReceiverAddrs.length==1)
                Tx.ReceiverAddr = Tx.vReceiverAddrs[0]                
            else
                Tx.ReceiverAddr = Tx.vReceiverAddrs.join(", ")
           
        }

        Tx.IPFSHash = ""
        if (Tx.NotarizedData != "") {
            let obj = this._ParseNotarizedData(Tx.NotarizedData)            
            if (typeof(obj) === 'object') {
                if (obj["ipfs"] != null)
                    Tx.IPFSHash = obj["ipfs"]
            }
        }
        if (Tx.IPFSHash != "") 
            Tx.IPFSUrl = `https://ipfs.io/ipfs/${Tx.IPFSHash}`

        return Tx
    }

    _ParseNotarizedData(nd) {
        if (nd.startsWith("id=")) {
            let vf = nd.split(",")
            let Obj = {}
            vf.forEach((el)=>{
                if (el.startsWith("id="))
                    Obj["id"] = el.replace("id=","")
                else if (el.startsWith("ipfs=")) 
                    Obj["ipfs"] = el.replace("ipfs=","")
            })

            return Obj
        }
        return nd;
    }

    HexToAscii(str) {
        let hexString = str;
        let strOut = '';
            for (let x = 0; x < hexString.length; x += 2) {
                strOut += String.fromCharCode(parseInt(hexString.substr(x, 2), 16));
            }
        return strOut;    
    }
}

Transaction.RegisterElement()
