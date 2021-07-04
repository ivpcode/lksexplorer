import {html} from 'lit';
import LitBase from '../lib/lit-base'
import io from '../lib/socket.io'
import "./home.scss"

export default class Home extends LitBase {

    static get DomTag() {
        return "lit-home"
    }

    static get properties() {
        return {
            transactions: {type: Array}
        }
    }

    constructor() {
        super();

        this.transactions = []

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

    }

    render() {
        return html`
        <div class="content-wrapper uk-container">
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

    _RenderAbout(){
        return html`
        <div class="col-xs-12 col-md-4 col-gray">
        <h2 translate="">About</h2>
        <p translate=""><strong class="ng-scope">insight</strong>  is an <a href="https://insight.is/" target="_blank" class="ng-scope">open-source Dash blockchain explorer</a> with complete REST and websocket APIs that can be used for writing web wallets and other apps  that need more advanced blockchain queries than provided by dashd RPC.  Check out the <a href="https://github.com/dashpay/insight-ui-dash" target="_blank" class="ng-scope">source code</a>.</p>
        <p translate=""><strong class="ng-scope">insight</strong> is still in development, so be sure to report any bugs and provide feedback for improvement at our <a href="https://github.com/dashpay/insight-ui-dash/issues" target="_blank" class="ng-scope">github issue tracker</a>.</p>
        <div id="powered" class="row">
          <div class="powered-text">
            <small class="text-muted" translate="">Powered by</small>
          </div>
          <a href="http://bitcore.io" target="_blank" class="bitcore" title="Bitcore"></a>
          <a href="http://angularjs.org" target="_blank" class="angularjs" title="AngularJS"></a>
          <a href="https://code.google.com/p/leveldb/" target="_blank" class="leveldb" title="LevelDB"></a>
          <a href="http://nodejs.org" target="_blank" class="nodejs" title="NodeJs"></a>
        </div>
      </div>
        `
    }

    _RenderBlocksTable() {
        return html`
        <h2 class="">Latest Blocks</h2>
        <table class="uk-table uk-table-hover uk-table-divider">
            <thead>
                <tr>
                    <th>Height</th>
                    <th>Age</th>
                    <th>Transactions</th>
                    <th>Size</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><a>123545</a></td>
                    <td>26 minutes ago</td>
                    <td>43</td>
                    <td>15kb</td>
                </tr>
                <tr>
                    <td><a>123545</a></td>
                    <td>26 minutes ago</td>
                    <td>43</td>
                    <td>15kb</td>
                </tr>
                <tr>
                    <td><a>123545</a></td>
                    <td>26 minutes ago</td>
                    <td>43</td>
                    <td>15kb</td>
                </tr>
            </tbody>
        </table>
        <div class="table-load-more">
            <hr>    
            <button class="uk-button uk-button-default uk-button-small">See all blocks</button>
        </div>    
        `
    }

    _RenderTransactionsTable() {

        return html`
        <h2 class="">Latest Transactions</h2>
        <table class="uk-table uk-table-hover uk-table-divider">
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
                        <td><a>${tr.txid}</a></td>
                        <td>${tr.valueOut} LKSCOIN</td>
                    </tr>
                    `
                })}                               
            </tbody>
        </table>         
        `
    }    
}

Home.RegisterElement()
