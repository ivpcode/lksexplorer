import axios from 'axios'

const BaseService = "https://insight1.lkschain.info/insight-api"

export default class InsightClient {

    static async GetTransaction(TxId) {
        let res = await axios.get(BaseService+"/tx/"+TxId)
        return res.data
    }

    static FormatTransactionType(TypeNum) {
        if (TypeNum == null)
            TypeNum = 0

        TypeNum = parseInt(TypeNum)

        let TypeTxt = "Send Transaction"
        if (TypeNum == 1)
            TypeTxt = "Provider Registration Transaction (ProRegTx)"
        if (TypeNum == 2)
            TypeTxt = "Provider Update Service Transaction (ProUpServTx)"
        if (TypeNum == 3)
            TypeTxt = "Provider Update Registrar Transaction (ProUpRegTx)"
        if (TypeNum == 4)
            TypeTxt = "Provider Update Revocation Transaction (ProUpRevTx)"
        if (TypeNum == 5)
            TypeTxt = "Coinbase Transaction (CbTx)"
        if (TypeNum == 6)
            TypeTxt = "Quorum Commitment" 
            
        return TypeTxt
    }

    static async GetBlockByIndex(Index) {
        let res = await axios.get(BaseService+"/block-index/"+Index)
        let bh = res.data.blockHash

        return InsightClient.GetBlock(bh)
    }

    static async GetBlock(Hash) {
        let res = await axios.get(BaseService+"/block/"+Hash)
        return res.data
    }

    static async GetBlockTransactions(BlockHash, PageNum) {
        let res = await axios.get(BaseService+"/txs/?block="+BlockHash+"&pageNum="+PageNum)
        return res.data
    }   
    
    static async GetBlockList(blockDate,startTimestamp) {
        let qry = ""
        if (blockDate != null && startTimestamp != null)
            qry = "?blockDate="+blockDate+"&startTimestamp="+startTimestamp
        let res = await axios.get(BaseService+"/blocks/"+qry)
        return res.data
    }     
}