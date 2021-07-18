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
            loading: {type: Number}
        }
    }

    constructor() {
        super();

        this.vblks = null
        this.block_date = null
        this.start_timestamp = null
        this.loading = true
    }

    render() {
    
        return html`
        <div class="content-wrapper uk-container">
            <ul class="uk-breadcrumb">
                <li><a href="/index.html">Home</a></li>
                <li><span>Blocks list</span></li>
            </ul>  

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
            <div class="load-container">
                ${this.loading==true?
                    html`<div uk-spinner="ratio: 1" class="load-spinner"></div>`:
                    html`<button class="load-more uk-button uk-button-default" @click="${this._RenderBlocks}">Load More</button>`
                }                            
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
            this.loading = true

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
                        <td><a href="/block.html?index=${Height}">${Height}</a></td>
                        <td class="hide-on-small"><a href="/block.html?hash=${Hash}">${Hash}</a></td>
                        <td>${Timestamp}</td>
                        <td>${Transactions}</td>
                        <td class="hide-on-small">${Size}</td>
                `
                blcnt.append(row)
            })
        }
        catch (Ex) {
           
        }
        this.loading = false
    }

}

BlockList.RegisterElement()
