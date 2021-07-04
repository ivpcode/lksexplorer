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
}