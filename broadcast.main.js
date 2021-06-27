import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import 'regenerator-runtime/runtime'
import Header from "./components/header"
import Footer from "./components/footer"

import Broadcast from "./components/broadcast"

// loads the Icon plugin
UIkit.use(Icons);

import {PrivateKey } from './lib/lkscore-lib.min.js'
import {Mnemonic } from './lib/lkscore-lib.min.js'
import {Networks } from './lib/lkscore-lib.min.js'
import {Transaction } from './lib/lkscore-lib.min.js'

// https://iancoleman.io/bip39/#english

let privateKey = new PrivateKey();
let address = privateKey.toAddress().toString();
console.log(`New private key generated ${privateKey.toString()}`);

privateKey = new PrivateKey();
var imported = PrivateKey.fromWIF("XJjFQchpq3gUpKH3WN4B4aTHMzMb8zRSS4zMXSfJChXoD2DffQMB");
var publicKey = imported.toPublicKey();
address = publicKey.toAddress(Networks.livenet);
console.log("Imported PrivKey public addres: "+address.toString())

var code = new Mnemonic(
	'remain gospel suspect curious spread until suit found ceiling icon book solution exercise afford yellow'
  );
  
  var xpriv1 = code.toHDPrivateKey(); // no passphrase
console.log(xpriv1)
  var out = xpriv1.derive("m/44'/896'/0'/0")
  console.log("out: "+out)

  address = out.privateKey.toWIF()//.toString();
  console.log(address)

  var publicKey = out.privateKey.toPublicKey();
address = publicKey.toAddress(Networks.livenet);
console.log(address.toString())


var utxo = {
  "address": "XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK",
  "txid": "e8e1375093c04bf3984535f81836342395af44016f553bdf5ff1339a347b97ae",
  "outputIndex": 1,
  "script": "76a9143cf7f2dd59b9c18115b7d5dc720a3beb1d6348de88ac",
  "satoshis": 100000000,
};

let vutxo = [
  {
    "address": "XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK",
    "txid": "b714a92e779d99fb2d8a2343f3aa0ee4e6c4b6c167c4637a13c5cb602899da13",
    "outputIndex": 1,
    "scriptPubKey": "76a9143cf7f2dd59b9c18115b7d5dc720a3beb1d6348de88ac",
    "satoshis": 99930000,

  },  
]

let payload = "id=SAIL_RE49:CAMPIONATURA,ipfs=QmecBHxyg4csYQ9db2LZc1J6Z8UHKeLAttNKMJb57QW65n"


console.log(payload.length)

var transaction = new Transaction()
  .fee(10000)
  .from(vutxo)
  .addData(payload)
  .to("XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK",99930000-10000)
  .change("XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK")
  .sign(imported);

console.log(transaction.toString())

window.hexToAscii = (str) =>{
    let hexString = str;
    let strOut = '';
        for (let x = 0; x < hexString.length; x += 2) {
            strOut += String.fromCharCode(parseInt(hexString.substr(x, 2), 16));
        }
    return strOut;    
}
