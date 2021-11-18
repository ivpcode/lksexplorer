import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import 'regenerator-runtime/runtime'
import Header from "./components/header"
import Footer from "./components/footer"

import Broadcast from "./components/broadcast"

// loads the Icon plugin
UIkit.use(Icons);

window.hexToAscii = (str) =>{
    let hexString = str;
    let strOut = '';
        for (let x = 0; x < hexString.length; x += 2) {
            strOut += String.fromCharCode(parseInt(hexString.substr(x, 2), 16));
        }
    return strOut;    
}
