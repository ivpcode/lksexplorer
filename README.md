# LKS-Explorer
LKS-Explorer is an opensource blockchain explorer, developed with the aim of making it easier to consult the LKSCoin blockchain and above all **making the notarized information integrated in LKSCoin transactions visually accessible**. 

Programmatically the interface with the LKS blockchain is handled via LKSCore javascript library which I ported from Dashcore-lib that you can find in my other repo [lkscore-lib.min.js](https://github.com/ivpcode/lkscore-lib).

The web-app is developed using Google's [Lit Elements library](https://lit.dev/), and is inspired by the beautiful projects: https://www.blockchain.com/explorer/ e da https://insight.dash.org/insight/.

At present you can show lks-explorer in action on the domain: https://www.lkschain.info. 
Enjoi 🙂 and feel free to send me comments and bugs signalations.

# To do list
* [ ] handling naming (via record TXT in DNS??): the holder of the public address and domain does:
     * [ ] creates a message that contains the domain (complete with subdomain), signs it with his private key so that the signature can be verified. 
     * [ ] Puts signature hash in a DNS TXT record for his domain. 
     * [ ] Performs a specific domain-to-address declaration call that allows the server to verify the signature and the TXT record and save the association in the internal database. 
     * [ ] If the operation is successful, the server stores the pubaddr association with the domain and returns it in the insight queries
* [ ] create a logic that captures the subdomain and if it finds a match in the db of the names-addr it shows the transactions



# Useful Links

* https://lit.dev/docs/api/LitElement/#LitElement/updates
* https://gist.github.com/jackzampolin/da3201b89d23dd5fa3becb0185da1fb2
* https://www.blockchain.com/btc/block/111000
