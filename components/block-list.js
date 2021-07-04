import {html} from 'lit';
import LitBase from '../lib/lit-base'
import InsightClient from '../lib/insight-client'
import Utilities from '../lib/utilities'

import "./block-list.scss"



export default class BlockList extends LitBase {

    static get DomTag() {
        return "lit-block-list"
    }

    static get properties() {
        return {
            blk: {type: Object},
            is_error: {type: Number}
        }
    }

    constructor() {
        super();

        this.vblks = null
        this.block_date = null
        this.start_timestamp = null
    }

    render() {
    
        return html`
        <div class="content-wrapper uk-container">
            <div class="content-wrapper uk-container">
                <h2>Blocks</h2>
                <table class="uk-table uk-table-middle uk-table-divider blocks-container">
                    <thead>
                        <tr>
                            <td>Height</td>
                            <td class="hide-on-small">Hash</td>
                            <td>Timestamp</td>
                            <td>Transactions</td>
                            <td class="hide-on-small">Size</td>
                        </tr>
                    </thead>
                    <tbody></tbody>                                
                </table>
            </div>              
        </div>    
        `
    }

    firstUpdated() {

        setTimeout(async ()=>{
                        
            try {
                this._RenderBlocks()
            }
            catch (Ex) {
               
            }
        },10)

    }

    async _RenderBlocks() {
        try {
            let res = await InsightClient.GetBlockList(this.block_date,this.start_timestamp)
            let blcnt = this.querySelector(".blocks-container tbody")
            this.block_date = res.pagination.prev
            this.start_timestamp = res.pagination.currentTs-1
            res.blocks.forEach((tr)=>{

                let Height = tr.height
                let Hash = tr.hash                
                let Timestamp = Utilities.FormatTimestamp(new Date(tr.time*1000))
                let Transactions = tr.txlength
                let Size = tr.size + " bytes"
                if (tr.size > 1024)
                    Size = (tr.size/1024).toFixed(1) + " Kb"

                let row = document.createElement("tr")                
                row.innerHTML = `                
                        <td><a href="/block.html?index=${Height}" target="_blank">${Height}</a></td>
                        <td class="hide-on-small"><a href="/block.html?hash=${Hash}" target="_blank">${Hash}</a></td>
                        <td>${Timestamp}</td>
                        <td>${Transactions}</td>
                        <td class="hide-on-small">${Size}</td>
                `
                blcnt.append(row)
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

BlockList.RegisterElement()
