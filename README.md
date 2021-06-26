# LKS-Explorer
Repo of the LKSCOIN chain explorer

# To do list

* [ ] Chain explorer:
    * [ ] completare le schermate di Transaction
    * [ ] completare la schermata di Block
    * [ ] gestire il naming (tramite record TXT in DNS??)
        * [ ] il titolare dell'indirizzo pubblico crea un messaggio che contiene il dominio (completo di sottodominio), lo firma di modo che sia possibile verificare la firma. 
        * [ ] Pone l'hash della firma in un record TXT del dominio. 
        * [ ] Esegue una apposita chiamata di dichiarazione dominio-to-address che permette al server di fare la verifica della firma e del record TXT e salvare nel db interno l'associazione. 
        * [ ] Se l'operazione va a buon fine il server archiva l'associazione pubaddr con il dominio e lo ritorna nelle query di insight
    * [ ] sistemare la api insight, clonando le librerie del dash e sostituendo i valori con quelli del lks
    * [ ] sul chain explorer mettere un sistema che cattura il sottodominio e se trova corrispondenza nel db dei nomi-addr ne mostra le transazioni
* [ ] Sistema di notarizzazione: 
   * [ ] forkare https://github.com/dashevo/dashcore-lib e trasformarla in lkscore-lib
   * [ ] Fare firma con api del dash o tramite costruzione della transazione ed utilizzare il insight-api per inviarla in rete

