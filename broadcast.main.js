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
  "txid": "ebcb758dc003bfedc24c1023b8157456b78aa532c3e8406b2651448ad3c6158d",
  "outputIndex": 1,
  "script": "76a9143cf7f2dd59b9c18115b7d5dc720a3beb1d6348de88ac",
  "satoshis": 26000166000,
};

var vutxo = [
  {
    "address": "XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK",
    "txid": "d4c06c1c98e76aea4afa63240c7be46f24683ad330d74f66ac1ad0ce95fdaeca",
    "outputIndex": 2,
    "scriptPubKey": "76a9143cf7f2dd59b9c18115b7d5dc720a3beb1d6348de88ac",
    "satoshis": 16000156000,
  },
  {
    "address": "XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK",
    "txid": "472ec16c8585fdf76e6eb336f652af4067297ceab8982ffb3a0ef15fa5e296a3",
    "outputIndex": 1,
    "scriptPubKey": "76a9143cf7f2dd59b9c18115b7d5dc720a3beb1d6348de88ac",
    "satoshis": 26000006000,
  },
  {
    "address": "XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK",
    "txid": "80bef9a9ecceafe437d90ae6d80c1e2a2305f920af2aaa1d11bedb13c1f257ef",
    "outputIndex": 1,
    "scriptPubKey": "76a9143cf7f2dd59b9c18115b7d5dc720a3beb1d6348de88ac",
    "satoshis": 36000104000,
    "height": 453568,
    "confirmations": 1670
  },
  {
    "address": "XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK",
    "txid": "b3de55d5411606b9c2f49a10c2161c20fe9cf939f2e2882d5bb71b9df8730038",
    "outputIndex": 1,
    "scriptPubKey": "76a9143cf7f2dd59b9c18115b7d5dc720a3beb1d6348de88ac",
    "satoshis": 36000048000,
    "height": 452840,
    "confirmations": 2398
  },
  {
    "address": "XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK",
    "txid": "84bec6984b3f760dbdd8ebc592d53b5e1fb00a3602f8973cb9ce92986013cabc",
    "outputIndex": 1,
    "scriptPubKey": "76a9143cf7f2dd59b9c18115b7d5dc720a3beb1d6348de88ac",
    "satoshis": 36000016000,
    "height": 452108,
    "confirmations": 3130
  },
  {
    "address": "XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK",
    "txid": "ec753edc80dc1091c46dc340edc4712394a2e019ef96923e2c17fa1bd4f9ed43",
    "outputIndex": 1,
    "scriptPubKey": "76a9143cf7f2dd59b9c18115b7d5dc720a3beb1d6348de88ac",
    "satoshis": 36000000000,
    "height": 451374,
    "confirmations": 3864
  },
  {
    "address": "XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK",
    "txid": "6518b025eef716c4d556f56e1a727c0b5dd27eaa6405b327dd45e43601f14721",
    "outputIndex": 1,
    "scriptPubKey": "76a9143cf7f2dd59b9c18115b7d5dc720a3beb1d6348de88ac",
    "satoshis": 36000000000,
    "height": 450645,
    "confirmations": 4593
  },
  {
    "address": "XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK",
    "txid": "4f7cd7f845015845f66074018be51e9ac9cf5a2d731bfd254bee55eb6c993d3d",
    "outputIndex": 1,
    "scriptPubKey": "76a9143cf7f2dd59b9c18115b7d5dc720a3beb1d6348de88ac",
    "satoshis": 36000032000,
    "height": 449914,
    "confirmations": 5324
  },
  {
    "address": "XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK",
    "txid": "114e56efe371a782457728095a7e60427492e7166728909f5a32781b9842b678",
    "outputIndex": 0,
    "scriptPubKey": "76a9143cf7f2dd59b9c18115b7d5dc720a3beb1d6348de88ac",
    "satoshis": 36000320000,
    "height": 449179,
    "confirmations": 6059
  },
  {
    "address": "XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK",
    "txid": "d2324c5ec7f61a3a33f4374cef1047e2fce0d2371cc8a8ce452da4b134986a32",
    "outputIndex": 0,
    "scriptPubKey": "76a9143cf7f2dd59b9c18115b7d5dc720a3beb1d6348de88ac",
    "satoshis": 36000088000,
    "height": 448450,
    "confirmations": 6788
  },
  {
    "address": "XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK",
    "txid": "8b19bf8d8db03b7131e1487711826f6885ef8486871d3ce9898243ee4761bc43",
    "outputIndex": 1,
    "scriptPubKey": "76a9143cf7f2dd59b9c18115b7d5dc720a3beb1d6348de88ac",
    "satoshis": 36000080000,
    "height": 447717,
    "confirmations": 7521
  },
  {
    "address": "XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK",
    "txid": "7265c6a741bc313d8b739207321afead08eaf7991ce5b1bd0aa7dfc3543e7f69",
    "outputIndex": 1,
    "scriptPubKey": "76a9143cf7f2dd59b9c18115b7d5dc720a3beb1d6348de88ac",
    "satoshis": 36000072000,
    "height": 446993,
    "confirmations": 8245
  },
  {
    "address": "XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK",
    "txid": "a66b390298f5818ba7c06f8b3c00fa8e24e70f5085cc20bf46521d94f5fa1261",
    "outputIndex": 0,
    "scriptPubKey": "76a9143cf7f2dd59b9c18115b7d5dc720a3beb1d6348de88ac",
    "satoshis": 36000000000,
    "height": 446266,
    "confirmations": 8972
  },
  {
    "address": "XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK",
    "txid": "59ea4737a872c10e3927787a660936556ed5856b0c6a2245cb005005435f27d2",
    "outputIndex": 1,
    "scriptPubKey": "76a9143cf7f2dd59b9c18115b7d5dc720a3beb1d6348de88ac",
    "satoshis": 36000016000,
    "height": 445554,
    "confirmations": 9684
  },
  {
    "address": "XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK",
    "txid": "7b1c4440ebf986c1578754543fbf229bf0ce2db4fc72d26acbf03c1730e79988",
    "outputIndex": 1,
    "scriptPubKey": "76a9143cf7f2dd59b9c18115b7d5dc720a3beb1d6348de88ac",
    "amount": 360.0028,
    "satoshis": 36000280000,
    "height": 444845,
    "confirmations": 10393
  },
  {
    "address": "XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK",
    "txid": "1611da135aba30ca92f93573e3b233e6729e3701e72e6fa34081dcb01e634aae",
    "outputIndex": 1,
    "scriptPubKey": "76a9143cf7f2dd59b9c18115b7d5dc720a3beb1d6348de88ac",
    "amount": 360,
    "satoshis": 36000000000,
    "height": 444131,
    "confirmations": 11107
  },
  {
    "address": "XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK",
    "txid": "aabba049a51370dd4d3a3bea3b42d447d66ce55b8f58608e6ea78e839d5919b6",
    "outputIndex": 1,
    "scriptPubKey": "76a9143cf7f2dd59b9c18115b7d5dc720a3beb1d6348de88ac",
    "amount": 360.00136,
    "satoshis": 36000136000,
    "height": 443415,
    "confirmations": 11823
  },
  {
    "address": "XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK",
    "txid": "1ff9b7c388e43bec3c268ceb2a0945039e0bf75eb31575d3b0dba7452a783e01",
    "outputIndex": 1,
    "scriptPubKey": "76a9143cf7f2dd59b9c18115b7d5dc720a3beb1d6348de88ac",
    "amount": 360.00634212,
    "satoshis": 36000634212,
    "height": 442704,
    "confirmations": 12534
  },
  {
    "address": "XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK",
    "txid": "0badf582486fc6643e7cfd972319ef13c47e884d09e8441791b970967d1fe364",
    "outputIndex": 1,
    "scriptPubKey": "76a9143cf7f2dd59b9c18115b7d5dc720a3beb1d6348de88ac",
    "amount": 360.00016,
    "satoshis": 36000016000,
    "height": 442006,
    "confirmations": 13232
  },
  {
    "address": "XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK",
    "txid": "26df13b227f95e25ece5a22c480850649a7f03803c4ed2bcf791d47fbb1b0329",
    "outputIndex": 1,
    "scriptPubKey": "76a9143cf7f2dd59b9c18115b7d5dc720a3beb1d6348de88ac",
    "amount": 360,
    "satoshis": 36000000000,
    "height": 441316,
    "confirmations": 13922
  },
  {
    "address": "XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK",
    "txid": "448d536a13a58b00d1a099b16318807d26619fb17487216dab92de47c243a698",
    "outputIndex": 1,
    "scriptPubKey": "76a9143cf7f2dd59b9c18115b7d5dc720a3beb1d6348de88ac",
    "amount": 360.00088,
    "satoshis": 36000088000,
    "height": 440638,
    "confirmations": 14600
  },
  {
    "address": "XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK",
    "txid": "302298850619753b62019b17c7085ba6f8b5933e238166bbd417c2fd3b08cd54",
    "outputIndex": 1,
    "scriptPubKey": "76a9143cf7f2dd59b9c18115b7d5dc720a3beb1d6348de88ac",
    "amount": 360.00016,
    "satoshis": 36000016000,
    "height": 439965,
    "confirmations": 15273
  },
  {
    "address": "XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK",
    "txid": "ec3f500bba2986eafebfe9d8060e3346372e20393c3eca8e6e8c59ff8de222d9",
    "outputIndex": 1,
    "scriptPubKey": "76a9143cf7f2dd59b9c18115b7d5dc720a3beb1d6348de88ac",
    "amount": 360.00104,
    "satoshis": 36000104000,
    "height": 439295,
    "confirmations": 15943
  },
  {
    "address": "XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK",
    "txid": "e41b513c8ce05295ef0478581ee41efc5d0463ebdb0dffadd960075dcf716687",
    "outputIndex": 1,
    "scriptPubKey": "76a9143cf7f2dd59b9c18115b7d5dc720a3beb1d6348de88ac",
    "amount": 360,
    "satoshis": 36000000000,
    "height": 438625,
    "confirmations": 16613
  },
  {
    "address": "XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK",
    "txid": "b07c806c6b9c29090585abf8cbb6b05969eb93c755fcaf04b0199c34640a7ff4",
    "outputIndex": 0,
    "scriptPubKey": "76a9143cf7f2dd59b9c18115b7d5dc720a3beb1d6348de88ac",
    "amount": 360.00184966,
    "satoshis": 36000184966,
    "height": 437970,
    "confirmations": 17268
  },
  {
    "address": "XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK",
    "txid": "a71c28bdd3ffebb2becf3d1e2d0cbfe716c0e523e1ea16c2d68688957af1461b",
    "outputIndex": 1,
    "scriptPubKey": "76a9143cf7f2dd59b9c18115b7d5dc720a3beb1d6348de88ac",
    "amount": 360.00064,
    "satoshis": 36000064000,
    "height": 437332,
    "confirmations": 17906
  },
  {
    "address": "XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK",
    "txid": "21369841217421cbbda90c177a7d665f08f336c7b9e4be134824205334053807",
    "outputIndex": 1,
    "scriptPubKey": "76a9143cf7f2dd59b9c18115b7d5dc720a3beb1d6348de88ac",
    "amount": 360.00224,
    "satoshis": 36000224000,
    "height": 436710,
    "confirmations": 18528
  },
  {
    "address": "XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK",
    "txid": "37cfdcbf2626834c281290234306ccf01177c876187a31193b3c4ca843e6053f",
    "outputIndex": 1,
    "scriptPubKey": "76a9143cf7f2dd59b9c18115b7d5dc720a3beb1d6348de88ac",
    "amount": 360,
    "satoshis": 36000000000,
    "height": 436084,
    "confirmations": 19154
  },
  {
    "address": "XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK",
    "txid": "aef17755e08266eb71def61e660b6695b380ed6bbcae10f918047d3ace906bed",
    "outputIndex": 1,
    "scriptPubKey": "76a9143cf7f2dd59b9c18115b7d5dc720a3beb1d6348de88ac",
    "amount": 360.00016,
    "satoshis": 36000016000,
    "height": 435460,
    "confirmations": 19778
  },
  {
    "address": "XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK",
    "txid": "fa843513a28496ae9cb792bc6e765226c04a2b6e6721446f93ec7e1c8d64a766",
    "outputIndex": 1,
    "scriptPubKey": "76a9143cf7f2dd59b9c18115b7d5dc720a3beb1d6348de88ac",
    "amount": 360.00096,
    "satoshis": 36000096000,
    "height": 434841,
    "confirmations": 20397
  },
  {
    "address": "XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK",
    "txid": "3b0446fa6cf7a7721c3d9de6ee614180ea414b14bb05589fd3b335a24267e6ae",
    "outputIndex": 1,
    "scriptPubKey": "76a9143cf7f2dd59b9c18115b7d5dc720a3beb1d6348de88ac",
    "amount": 360,
    "satoshis": 36000000000,
    "height": 434222,
    "confirmations": 21016
  },
  {
    "address": "XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK",
    "txid": "cceac7f979717873cace0fdeff1cadad437ece693f28bff0239bdca2d3831190",
    "outputIndex": 1,
    "scriptPubKey": "76a9143cf7f2dd59b9c18115b7d5dc720a3beb1d6348de88ac",
    "amount": 360.00024,
    "satoshis": 36000024000,
    "height": 433620,
    "confirmations": 21618
  },
  {
    "address": "XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK",
    "txid": "0b48e8d74aacde862f42955ec91ae0cd361126ac1058b8750cd008538193ef2f",
    "outputIndex": 1,
    "scriptPubKey": "76a9143cf7f2dd59b9c18115b7d5dc720a3beb1d6348de88ac",
    "amount": 360.0012,
    "satoshis": 36000120000,
    "height": 433025,
    "confirmations": 22213
  }
]

var transaction = new Transaction()
  .fee(20000)
  .from(vutxo)
  .addData('ipfs://QmU3Tk915x9nyFahm4UTo5t937hZZvaBK3sNrrp7tTfek2')
  .to('XkKE3HepQ9pgn9hgqLzRhqu7pp78oJEqUL', 10000000000)
  .change("XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK")
  .sign(imported);

  console.log(transaction.toString())

  function hexToAscii(str){
    hexString = str;
    strOut = '';
        for (x = 0; x < hexString.length; x += 2) {
            strOut += String.fromCharCode(parseInt(hexString.substr(x, 2), 16));
        }
    return strOut;    
}