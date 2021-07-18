import {html} from 'lit';
import LitBase from '../lib/lit-base'
import InsightClient from '../lib/insight-client'
import Utilities from '../lib/utilities'
import io from '../lib/socket.io'

import Search from './search'

import "./home.scss"

import BitcoreLogo from "../img/bitcore.logo.svg"
import LitLogo from "../img/lit.logo.svg"
import YarnLogo from "../img/yarn.logo.png"

export default class Home extends LitBase {

    static get DomTag() {
        return "lit-home"
    }

    static get properties() {
        return {
            transactions: {type: Array},
            loading_blocks: {type: Number}
        }
    }

    constructor() {
        super();

        this.transactions = []

 

        this.loading_blocks=true
    }

    render() {
        return html`
        <div class="content-wrapper uk-container">
            <div class="show-on-small">
                <lit-search></lit-search>
            </div>        
            <div class="uk-grid-divider" uk-grid>
                <div class="uk-width-1-3@m">
                    ${this._RenderAbout()}
                </div>            
                <div class="uk-width-2-3@m">
                    ${this._RenderBlocksTable()}
                    ${this._RenderTransactionsTable()}
                </div>
               
            </div>
        </div> 
        `
    }

    firstUpdated() {

        // Attiva il caricamento dei blocchi
        setTimeout(async ()=>{
            let res = await InsightClient.GetBlockList()
            let blcnt = this.querySelector("table.blocks-container tbody")
            for(let i=0;i<5;i++) {
                let tr = res.blocks [i];
                let Height = tr.height                
                let Timestamp = Utilities.FormatTimestamp(new Date(tr.time*1000))   
                let Transactions = tr.txlength
                let Size = tr.size + " bytes"
                if (tr.size > 1024)
                    Size = (tr.size/1024).toFixed(1) + " Kb"

                let row = document.createElement("tr")                
                row.innerHTML = `                
                        <td><a href="/block.html?index=${Height}" target="_blank">${Height}</a></td>
                        <td>${Timestamp}</td>
                        <td class="hide-on-small">${Transactions}</td>
                        <td class="hide-on-small">${Size}</td>
                `
                blcnt.append(row)
            }
            this.loading_blocks=false
        },5)

        // Attiva il caricamento delle transazioni
        setTimeout(async ()=>{
            this.socket = io("https://insight1.lkschain.info");
            this.socket.on('connect', () => {
                // Join the room.
                this.socket.emit('subscribe', 'inv');
            })            
            this.socket.on( 'tx', (data)=> {
                if (data.txlock) {
                    console.log("New InstantSend transaction received: " + data.txid)
                } else {
                    console.log("New transaction received")
                    console.log(data)
                }
                this.transactions.unshift(data)
                this.update()
            })
        },5)
    }

    _RenderAbout(){
        return html`        
        <div class="col-xs-12 col-md-4 col-gray">
            <h2>Welcome</h2>
            <p><b>lkschain.info</b> is an opensource <a href="https://www.lkschain.io/" target="_blank">LKSCoin</a> blockchain explorer, with the aim of making it easier to consult the LKSCoin blockchain and above all <b>making the notarized information integrated in LKSCoin transacions visually accessible</b>.</p>
            <p><b>lkschain.info</b> is still under development, we will be happy if you report any bugs or malfunctions to out <a href="https://github.com/ivpcode/lksexplorer/issues" target="_blank">github issue tracker</a>.</p>
            <div class="row powered-by">
                <div class="powered-text">
                    <small class="text-muted" translate="">Powered by</small>
                </div>
                <div class="logos">
                    <a href="http://bitcore.io" target="_blank" class="bitcore" title="Bitcore"><img src="${BitcoreLogo}"/></a>
                    <a href="https://lit.dev/" target="_blank" class="angularjs" title="Lit Elements Web Components"><img src="${LitLogo}"/></a>
                    <a href="https://yarnpkg.com/" target="_blank" class="nodejs" title="Yarn Package Manager"><img src="${YarnLogo}"/></a>
                </div>
            </div>
        </div>
        `
    }

    _RenderBlocksTable() {

        return html`
        <h2 class="">Latest Blocks</h2>
        <table class="uk-table uk-table-hover uk-table-divider blocks-container">
            <thead>
                <tr>
                    <th>Height</th>
                    <th>Age</th>
                    <th class="hide-on-small" width="15%">Transactions</th>
                    <th class="hide-on-small" width="15%">Size</th>
                </tr>
            </thead>
            <tbody>
               
            </tbody>
        </table>
        <div class="table-load-more">
            <div class="load-container">
                ${this.loading_blocks==true?
                    html`<div uk-spinner="ratio: 1" class="load-spinner"></div>`:
                    html`<hr><a class="uk-button uk-button-default uk-button-small" href="/blocks.html">See all blocks</a>`
                }                            
            </div>
            
        </div>    
        `
    }

    _RenderTransactionsTable() {

        return html`
        <h2 class="">Realtime Network Transactions</h2>
        <table class="uk-table uk-table-hover uk-table-divider" style="table-layout:fixed">
            <thead>
                <tr>
                    <th>Hash</th>
                    <th>Value Out</th>
                </tr>
            </thead>
            <tbody>               
                ${this.transactions.map((tr)=>{                    
                    return html`
                    <tr>
                        <td class="uk-text-truncate"><a href="/transaction.html?txid=${tr.txid}">${tr.txid}</a></td>
                        <td>${tr.valueOut.toFixed(2)} LKSCOIN</td>
                    </tr>
                    `
                })}                             
            </tbody>
        </table>   
        ${this.transactions.length == 0?
            html`<div class="realtime-transacions-wait">
                    <div uk-spinner="ratio: 1" class="load-spinner"></div>
                    <div>Waiting for transactions to spread on network</div>
                </div>`:""
        }      
        `
    }    
}

Home.RegisterElement()
