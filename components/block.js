import {html} from 'lit';
import LitBase from '../lib/lit-base'
import InsightClient from '../lib/insight-client'
import Utilities from '../lib/utilities'
import OGBadge from './og-badge'
import JSONFormatter from 'json-formatter-js'

import "./block.scss"



export default class Block extends LitBase {

    static get DomTag() {
        return "lit-block"
    }

    static get properties() {
        return {
            blk: {type: Object},
            is_error: {type: Number}
        }
    }

    constructor() {
        super();

        this.blk = null
        this.block_hash = ""
        this.block_index = ""
        this.is_error = false
    }

    render() {

        if (this.is_error) {
            if (this.block_hash != null && this.block_hash != "") {
                return html`
                <div class="content-wrapper uk-container">
                    ${this._RenderBreadcrumb()}                             
                    <div>
                        <h2>Not Found</h2>
                        <p>                            
                            The block with the specified hash (<b>${this.block_hash}</b>) was not found on the LKSCoin network.
                        </p>
                    </div>                
                </div>       
                `
            } if (this.block_index != null && this.block_index != "") {
                return html`
                <div class="content-wrapper uk-container">
                    ${this._RenderBreadcrumb()}            
                    <div>
                        <h2>Not Found</h2>
                        <p>                            
                            The block with the specified index (<b>${this.block_index}</b>) was not found on the LKSCoin network.
                        </p>
                    </div>                
                </div>       
                `
            } else {
                return html`
                <div class="content-wrapper uk-container">
                    ${this._RenderBreadcrumb()}                            
                    <div>
                        <h2>Missing parameter</h2>
                        <p>
                            Missing parameter, url must be specified by hash: <b>/block.html?hash=&lt;Here the hash&gt;</b>,
                            or specified by index: <b>/block.html?index=&lt;Here the block index&gt;</b>.
                        </p>
                    </div>                
                </div>       
                `
            }
        }

        if (this.blk == null)
            return html``

        let Block = this._FormatBlock()

        return html`
        <div class="content-wrapper uk-container">
            ${this._RenderBreadcrumb()}            
            ${this._RenderSummary(Block)}
            ${this._RenderDetails(Block)}   
            <div class="content-wrapper uk-container">
                <h2>Transactions</h2>
                <div class="transactions-container details-table"></div>
            </div>              
        </div>    
        `
    }

    firstUpdated() {

        setTimeout(async ()=>{
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            
            try {
                this.block_hash = urlParams.get("hash")
                if (this.block_hash == null) {
                    this.block_index = urlParams.get("index")
                    if (this.block_index == null) 
                        throw "missing parameter"
                }

                if (this.block_hash == null) 
                    this.blk = await InsightClient.GetBlockByIndex(this.block_index)
                else
                    this.blk = await InsightClient.GetBlock(this.block_hash)

                this.block_hash = this.blk.hash
                setTimeout(async ()=>{ await this._RenderTransactions() },100)
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
                <li><span>Block</span></li>
            </ul>
        `                 
    }

    _RenderSummary(Block) {
        return html`
        <div class="summary">
            <h2>Block Summary</h2>
            <p>
                This block was mined on ${Block.Timestamp} and currently has ${Block.Confirmations} confirmations.  
                The block size is ${Block.Size} and contains ${Block.TransactionCount} transactions.
            </p>
        </div>`
    }

    _RenderDetails(Block) {

        let txdt = []
        txdt.push({ label: "Hash", value: Block.Hash })
        txdt.push({ label: "Confirmations", value: Block.Confirmations })        
        txdt.push({ label: "Timestamp", value: Block.Timestamp})
        txdt.push({ label: "Number of Transactions", value: Block.TransactionCount })
        txdt.push({ label: "Size", value: Block.Size })
        txdt.push({ label: "Height", value: Block.Height })
        txdt.push({ label: "Merkle root", value: Block.MerkleRoot })
        txdt.push({ label: "Nonce", value: Block.Nonce })
        txdt.push({ label: "Difficulty", value: Block.Difficulty })
        txdt.push({ label: "Reward", value: Block.Reward })

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

    async _RenderTransactions() {
        try {
            let blktxs = await InsightClient.GetBlockTransactions(this.block_hash,0)
            let txcnt = this.querySelector(".transactions-container")
            blktxs.txs.forEach((tr)=>{
                let row = document.createElement("div")
                row.classList.add("details-row")
                row.innerHTML = `
                    <div>${InsightClient.FormatTransactionType(tr.type)}</div>
                    <div>
                        <a href="/transaction.html?txid=${tr.txid}">${tr.txid}</a>
                    </div>
                `
                txcnt.append(row)
            })
            

        }
        catch (Ex) {
           
        }
    }

    _FormatBlock(){
        let Block = {}

        Block.Hash = this.blk.hash

        Block.Size = parseInt(this.blk.size) + " bytes"
        if (this.blk.size > 1024)
        Block.Size = `${(this.blk.size/1024).toFixed(1)}Kb`

        let date = new Date(this.blk.time*1000)
        Block.Timestamp = date.toDateString() + " " + date.toTimeString()        

        Block.Confirmations = this.blk.confirmations
        Block.TransactionCount = this.blk.tx.length
        Block.Height = this.blk.height

        Block.MerkleRoot = this.blk.merkleroot
        Block.Nonce = this.blk.nonce 
        Block.Difficulty = this.blk.difficulty
        Block.Reward = this.blk.reward
        
        return Block
    }
}

Block.RegisterElement()
