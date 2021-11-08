import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import 'regenerator-runtime/runtime'
import Header from "./components/header"
import Footer from "./components/footer"

import WalletUtils from "./components/wallet-utils"

// loads the Icon plugin
UIkit.use(Icons);

// import InsightClient from './lib/insight-client'
// import {PrivateKey } from './lib/lkscore-lib.min.js'
// import {Mnemonic } from './lib/lkscore-lib.min.js'
// import {Networks } from './lib/lkscore-lib.min.js'
// import {Transaction } from './lib/lkscore-lib.min.js'

// // https://iancoleman.io/bip39/#english

// let privateKey = new PrivateKey();
// let address = privateKey.toAddress().toString();
// console.log(`New private key generated ${privateKey.toString()}`);

// privateKey = new PrivateKey();
// var imported = PrivateKey.fromWIF("XJjFQchpq3gUpKH3WN4B4aTHMzMb8zRSS4zMXSfJChXoD2DffQMB");
// var publicKey = imported.toPublicKey();
// address = publicKey.toAddress(Networks.livenet);
// console.log("Imported PrivKey public addres: "+address.toString())

// Code for wallet 2: "orchard jewel better connect void cabin maple enemy impulse cover general labor"
// var code = new Mnemonic(
// 	'remain gospel suspect curious spread until suit found ceiling icon book solution exercise afford yellow'
//   );
  
//   var xpriv1 = code.toHDPrivateKey(); // no passphrase
// console.log(xpriv1)
//   var out = xpriv1.derive("m/44'/896'/0'/0")
//   console.log("out: "+out)

//   address = out.privateKey.toWIF()//.toString();
//   console.log(address)

//   var publicKey = out.privateKey.toPublicKey();
// address = publicKey.toAddress(Networks.livenet);
// console.log(address.toString())

// InsightClient.GetAddressUtxo(address).then((vutxo)=>{


// 	let payload = "id=MARE:CAMPIONATURA,ipfs=QmTCUM7Wg863nczZo9Q3Tu6Ki6EN27EiZi5ga5zjFiE2Rr"


// 	console.log(payload.length)

// 	// var transaction = new Transaction()
// 	//   .fee(10000)
// 	//   .from(vutxo)
// 	//   .addData(payload)
// 	//   .to("XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK",99910000-10000)
// 	//   .change("XgFDQYHoQW3Uoy33qayZg1nQ63s1KydMfK")
// 	//   .sign(imported);

// 	let tot = 0;
// 	vutxo.forEach((utxo)=>{
// 	utxo.outputIndex = utxo.vout
// 	tot += utxo.satoshis
// 	})

// 	// transaction = new Transaction()
// 	//   .fee(10000)
// 	//   .from(vutxo)
// 	//   .to("XkxExcPbvfLitnPibqGpVt5sryYRRcn6sq",tot-10000)
// 	//   .change("XoNxeY7xBQZH4G26swcgtXsexPKUgEeFpq")
// 	//   .sign(PrivateKey.fromWIF("XJWAL938xWQ8RzGmY7JPGFbmKF4Te7ZX1WbfhGKrnCfTEpUK5cMM"));

// 	var transaction = new Transaction()
// 	.fee(10000)
// 	.from(vutxo)
// 	.addData(payload)
// 	.to(publicKey,tot-10000)
// 	.change(publicKey)
// 	.sign(out.privateKey);


// 	console.log(transaction.toString())
// })

window.hexToAscii = (str) =>{
    let hexString = str;
    let strOut = '';
        for (let x = 0; x < hexString.length; x += 2) {
            strOut += String.fromCharCode(parseInt(hexString.substr(x, 2), 16));
        }
    return strOut;    
}
