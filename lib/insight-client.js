import axios from 'axios'

const BaseService = "https://insight1.lkschain.info/insight-api"

export default class InsightClient {

    static async GetTransaction(TxId) {
        let res = await axios.get(BaseService+"/tx/"+TxId)
        return res.data
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
    
    static async GetAddress(Addr) {
        let res = await axios.get(BaseService+"/addr/"+Addr+"?noTxList=1")
        return res.data
    }

    static async GetAddressTransactions(Addr, PageNum) {
        let res = await axios.get(BaseService+"/txs/?address="+Addr+"&pageNum="+PageNum)
        return res.data
    }      

    static async GetAddressUtxo(Addr) {
        let res = await axios.get(BaseService+"/addr/"+Addr+"/utxo")
        return res.data
    }  
	
    static async SendTransaction(TxRawData) {		
		const params = new URLSearchParams();
		params.append('rawtx', TxRawData);

        let res = await axios.post(BaseService+"/tx/send",params)
        return res.data
    }	

    //:: Utilities

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

    static FormatTransaction(txin){
        let Tx = {}

        Tx.Hash = txin.txid

        Tx.TypeNum = txin.type
        if (txin.type == null)
            Tx.TypeNum = 0
        Tx.Type = InsightClient.FormatTransactionType(Tx.TypeNum)

        Tx.Size = parseInt(txin.size) + " bytes"
        if (txin.size > 1024)
        Tx.Size = `${(txin.size/1024).toFixed(1)}Kb`

        let date = new Date(txin.time*1000)
        Tx.Timestamp = date.toDateString() + " " + date.toTimeString()        

        Tx.Status = (txin.confirmations>0)?"Confirmed":"Unconfirmed"

        Tx.Amount = 0
        Tx.Fees = 0
        if (txin.isCoinBase!=true)
        Tx.Fees = txin.fees

        Tx.Block = txin.blockheight

        Tx.Confirmations = txin.confirmations

        Tx.TotalInput = txin.valueIn
        Tx.TotalOutput = txin.valueOut

        Tx.SenderAddr = "From mining"
        Tx.TotalSent = 0
        let vSenderAddrs = []
        if (txin.vin!=null && txin.vin.length>0) {
           
            txin.vin.forEach(element => {
                if (vSenderAddrs.indexOf(element.addr)<0 && element.addr!=null)
                    vSenderAddrs.push(element.addr)
                    Tx.TotalSent += parseFloat(element.value)
            });
            if (vSenderAddrs.length==1)
                Tx.SenderAddr = vSenderAddrs[0]
            else if (vSenderAddrs.length>1)
                Tx.SenderAddr = vSenderAddrs.join(", ")
        }

        Tx.ReceiverAddr = ""        
        Tx.NotarizedData = ""
        Tx.TotalReceived = 0
        Tx.vReceiverAddrs = []
        if (txin.vout!=null && txin.vout.length>0) {
            txin.vout.forEach(element => {
                if (element.scriptPubKey!=null && 
                    element.scriptPubKey.addresses!=null) {
                        element.scriptPubKey.addresses.forEach((addr)=>{
                            if (Tx.vReceiverAddrs.indexOf(addr)<0 && vSenderAddrs.indexOf(addr)<0)
                                Tx.vReceiverAddrs.push(addr)   
                            if (vSenderAddrs.indexOf(addr)<0)
                                Tx.Amount += parseFloat(element.value)
                        })
                    } 

                if (element.scriptPubKey!=null && 
                    element.scriptPubKey.asm!=null && 
                    element.scriptPubKey.asm.startsWith("OP_RETURN")){
                        Tx.NotarizedData = InsightClient.HexToAscii(element.scriptPubKey.asm.replace("OP_RETURN ",""))
                    }                    
            });
            if (Tx.vReceiverAddrs.length==0)                
                Tx.ReceiverAddr = Tx.SenderAddr
            else if (Tx.vReceiverAddrs.length==1)
                Tx.ReceiverAddr = Tx.vReceiverAddrs[0]                
            else
                Tx.ReceiverAddr = Tx.vReceiverAddrs.join(", ")
           
        }

        Tx.IPFSHash = ""
        if (Tx.NotarizedData != "") {
            let obj = InsightClient.ParseNotarizedData(Tx.NotarizedData)            
            if (typeof(obj) === 'object') {
                if (obj["ipfs"] != null)
                    Tx.IPFSHash = obj["ipfs"]
            }
        }
        if (Tx.IPFSHash != "") 
            Tx.IPFSUrl = `https://ipfs.io/ipfs/${Tx.IPFSHash}`

        return Tx
    }    

    static HexToAscii(str) {
        let hexString = str;
        let strOut = '';
            for (let x = 0; x < hexString.length; x += 2) {
                strOut += String.fromCharCode(parseInt(hexString.substr(x, 2), 16));
            }
        return strOut;    
    }   
    
    static ParseNotarizedData(nd) {
        if (nd.startsWith("id=")) {
            let vf = nd.split(",")
            let Obj = {}
            vf.forEach((el)=>{
                if (el.startsWith("id="))
                    Obj["id"] = el.replace("id=","")
                else if (el.startsWith("ipfs=")) 
                    Obj["ipfs"] = el.replace("ipfs=","")
            })

            return Obj
        }
        return nd;
    }    
}