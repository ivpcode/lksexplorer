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
    "txid": "37bc12cd2b2ffdf1dc783dcf3b99ea6aa724fc6ccc880992ecfd71d529e2e435",
    "outputIndex": 1,
    "scriptPubKey": "76a9143cf7f2dd59b9c18115b7d5dc720a3beb1d6348de88ac",
    "satoshis": 99910000,

  },  
]

let payload = "id=MARE:CAMPIONATURA,ipfs=QmTCUM7Wg863nczZo9Q3Tu6Ki6EN27EiZi5ga5zjFiE2Rr"


console.log(payload.length)

var transaction = new Transaction()
  .fee(10000)
  .from(vutxo)
  .addData(payload)
  .to("XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK",99910000-10000)
  .change("XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK")
  .sign(imported);

//console.log(transaction.toString())

vutxo = [
  {
    "address": "XoNxeY7xBQZH4G26swcgtXsexPKUgEeFpq",
    "txid": "041e327ce319aa5946a0f61a7f8ed5847e7d68a1c4e3d2f1e49ee9c0cf86bdd6",
    "vout": 2,
    "scriptPubKey": "76a9148b37d6428574102364d76f1b2625f671d68b078188ac",
    "amount": 105368.48224976,
    "satoshis": 10536848224976,
    "confirmations": 0,
    "ts": 1624975390
  },
  {
    "address": "XoNxeY7xBQZH4G26swcgtXsexPKUgEeFpq",
    "txid": "041e327ce319aa5946a0f61a7f8ed5847e7d68a1c4e3d2f1e49ee9c0cf86bdd6",
    "vout": 1,
    "scriptPubKey": "76a9148b37d6428574102364d76f1b2625f671d68b078188ac",
    "amount": 105368.48224976,
    "satoshis": 10536848224976,
    "confirmations": 0,
    "ts": 1624975390
  },
  {
    "address": "XoNxeY7xBQZH4G26swcgtXsexPKUgEeFpq",
    "txid": "54bcd243355031e26ea5f6fd72f5943dc585da55819b1aabb02949a97a6a14d3",
    "vout": 0,
    "scriptPubKey": "76a9148b37d6428574102364d76f1b2625f671d68b078188ac",
    "amount": 0.9999,
    "satoshis": 99990000,
    "confirmations": 0,
    "ts": 1624975390
  },
  {
    "address": "XoNxeY7xBQZH4G26swcgtXsexPKUgEeFpq",
    "txid": "797739238e29e9ed3f77bad9c64757e67e9cce07dccb2f0f7b9e3193de22330e",
    "vout": 2,
    "scriptPubKey": "76a9148b37d6428574102364d76f1b2625f671d68b078188ac",
    "amount": 277945.27037192,
    "satoshis": 27794527037192,
    "confirmations": 0,
    "ts": 1624975390
  },
  {
    "address": "XoNxeY7xBQZH4G26swcgtXsexPKUgEeFpq",
    "txid": "797739238e29e9ed3f77bad9c64757e67e9cce07dccb2f0f7b9e3193de22330e",
    "vout": 1,
    "scriptPubKey": "76a9148b37d6428574102364d76f1b2625f671d68b078188ac",
    "amount": 277945.27037192,
    "satoshis": 27794527037192,
    "confirmations": 0,
    "ts": 1624975390
  },
  {
    "address": "XoNxeY7xBQZH4G26swcgtXsexPKUgEeFpq",
    "txid": "7724cc04ed7805b36f885c2415229f295de768daf5e74deb673a944548c004b4",
    "vout": 0,
    "scriptPubKey": "76a9148b37d6428574102364d76f1b2625f671d68b078188ac",
    "amount": 0.9999,
    "satoshis": 99990000,
    "confirmations": 0,
    "ts": 1624975390
  },
  {
    "address": "XoNxeY7xBQZH4G26swcgtXsexPKUgEeFpq",
    "txid": "81b4ff0405a11f04a0d3ff4e68f6e236b3ff7bafa02013eac3b0dd8c68a03929",
    "vout": 0,
    "scriptPubKey": "76a9148b37d6428574102364d76f1b2625f671d68b078188ac",
    "amount": 0.9999,
    "satoshis": 99990000,
    "confirmations": 0,
    "ts": 1624975390
  },
  {
    "address": "XoNxeY7xBQZH4G26swcgtXsexPKUgEeFpq",
    "txid": "6a12c9ac99817661f9344c203ac7f34c5f70d49220de1bbfae260bbdf8a1d9fb",
    "vout": 0,
    "scriptPubKey": "76a9148b37d6428574102364d76f1b2625f671d68b078188ac",
    "amount": 0.9999,
    "satoshis": 99990000,
    "confirmations": 0,
    "ts": 1624975390
  },
  {
    "address": "XoNxeY7xBQZH4G26swcgtXsexPKUgEeFpq",
    "txid": "ddd561178cdc0e17ecf785fe3045ce17d534f6f158dcf31fe88b7c976edf840b",
    "vout": 1,
    "scriptPubKey": "76a9148b37d6428574102364d76f1b2625f671d68b078188ac",
    "amount": 277945.27037192,
    "satoshis": 27794527037192,
    "confirmations": 0,
    "ts": 1624975365
  },
  {
    "address": "XoNxeY7xBQZH4G26swcgtXsexPKUgEeFpq",
    "txid": "ddd561178cdc0e17ecf785fe3045ce17d534f6f158dcf31fe88b7c976edf840b",
    "vout": 2,
    "scriptPubKey": "76a9148b37d6428574102364d76f1b2625f671d68b078188ac",
    "amount": 277945.27037192,
    "satoshis": 27794527037192,
    "confirmations": 0,
    "ts": 1624975365
  },
]

let tot = 0;
vutxo.forEach((utxo)=>{
  utxo.outputIndex = utxo.vout
  tot += utxo.satoshis
})

transaction = new Transaction()
  .fee(10000)
  .from(vutxo)
  .to("XkxExcPbvfLitnPibqGpVt5sryYRRcn6sq",tot-10000)
  .change("XoNxeY7xBQZH4G26swcgtXsexPKUgEeFpq")
  .sign(PrivateKey.fromWIF("XJWAL938xWQ8RzGmY7JPGFbmKF4Te7ZX1WbfhGKrnCfTEpUK5cMM"));

console.log(transaction.toString())

window.hexToAscii = (str) =>{
    let hexString = str;
    let strOut = '';
        for (let x = 0; x < hexString.length; x += 2) {
            strOut += String.fromCharCode(parseInt(hexString.substr(x, 2), 16));
        }
    return strOut;    
}
