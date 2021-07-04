import axios from 'axios'

const BaseService = "https://insight1.lkschain.info/insight-api"

export default class InsightClient {

    static async GetTransaction(TxId) {
        return axios.get(BaseService+"/tx/"+TxId)
    }

}