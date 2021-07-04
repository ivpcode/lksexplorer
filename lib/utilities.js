import axios from 'axios'
import {getMetadata} from 'page-metadata-parser'
import domino from 'domino'



export default class Utilities {
    static async GetOpenGraph(url) {
        try {
            let res = await axios.get(url)
            const doc = domino.createWindow(res.data).document;
            const metadata = getMetadata(doc, url);
            return metadata
        }
        catch (Ex) {
            console.log(Ex)
        }

        return null
    }

    static FormatTimestamp(date) {
        let Y = date.getFullYear()
        let M = date.getMonth()+1
        let D = date.getDate()
        let h = date.getHours()
        let m = date.getMinutes()
        let s = date.getSeconds()

        let fn2z = (s)=>{
            s = s.toString()
            if (s.length == 1)
                s = "0"+s

            return s
        }

        return `${Y}-${fn2z(M)}-${fn2z(D)} ${fn2z(h)}:${fn2z(m)}:${fn2z(s)}`
    }
}