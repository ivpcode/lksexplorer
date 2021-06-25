const materials = require("./materials")

const models = {
    SAIL_RE49: {
        Name: "SAIL Re49",
        Slogan: "Dalla raccolta e ricerca di vele usate",
        Description: "Le SAIL RE49 nascono dalla raccolta e ricerca di vele usate. Le vele sono tutte riciclate ed usate su imbarcazioni limitrofe. <br>Sono di fatto il fiore all’occhiello della nostra produzione per ricerca e sviluppo. La scarpa finale è un prodotto sempre diverso perché creato da vele sempre diverse. Unico e speciale.",
        Image: "vela.jpg",
        Characteristics: [
            "Le versioni delle SAIL RE49 sono tutte esclusive e numerate ",
            "Ogni paio di SAIL RE49 è certificato con numero seriale notarizzato su blockchain",
            "I dettagli specifici possono rendere ogni scarpa leggermente diversa dalle altre",
            "Ogni scarpa è fatta a mano",
            "Ogni scarpa ha la spugna interna",
            "La suola sempre in pneumatico riciclato",
        ],     
        Phases: [
            {
                Description: "Ogni vela viene aperta, verificata, lavata, igienizzata e preparata al taglio.",
                Image: "vela_1.jpg",
            },
            {
                Description: "Il taglio è sempre manuale per evitare qualsiasi difetto di colore.",
                Image: "vela_2.jpg",
            },
            {
                Description: "La tomaia viene quindi segnata manualmente.",
                Image: "vela_3.jpg",
            },
            {
                Description: "Le tomaie vengono tagliate manualmente.",
                Image: "vela_4.jpg",
            }
        ],
        Materials: [            
            "VELA_5332"
        ]
    },

    JEANS: {
        Name: "JEANS Re49",
        Slogan: "Rinate da pantaloni jeans usati",
        Description: "Le JEANS RE49 sono rinate da pantaloni jeans usati o destinati allo smaltimento per scarto di magazzino, over produzione o difetto di produzione. Partendo da un paio di jeans UNICO, ogni scarpa è unica ed inimitabile.",
        Image: "jeans.jpg",
        Characteristics: [
            "Non ci sono due paia di scarpe JEANS RE49 identiche",
            "Ogni scarpa sinistra è diversa dalla scarpa destra",
            "Il colore e le sfumature sono sempre unici",
            "Ogni particolare è stato precedentemente “smontato” e re-posizionato",
            "Ogni paio di RE49 JEANS è unico e certificato con numero su blockchain",
            "Ogni paio ha la spugna interna",
            "La suola sempre con pneumatico riciclato",
        ],     
        Phases: [
            {
                Description: "I jeans utilizzati sono riciclati da prodotti desunti e destinati al macero. Inoltre, si reperiscono dai vari produttori o rivenditori tutto il materiale caratterizzato da anomalie o difetti di produzione.",
                Image: "jeans_1.jpg",
            },
            {
                Description: "Partendo da un paio di jeans UNICO, si ricavano tutti i particolari e li si riposizionano direttamente sulla scarpa finita. Ogni scarpa è unica ed inimitabile.",
                Image: "jeans_2.jpg",
            },
            {
                Description: "Le suole e la tomaia vengono cucine a macchina.",
                Image: "jeans_3.jpg",
            },
            {
                Description: "Viene quindi posizionata in forma per la fase finale.",
                Image: "jeans_4.jpg",
            },
            {
                Description: "La scarpa è quindi pronta con tutti i particolari che la rendono inimitabile.",
                Image: "jeans_5.jpg",
            }

        ],
        Materials: [            
            "JEANS"
        ]
    },
    
    MARE: {
        Name: "MARE Re49",
        Slogan: "Ai tuoi piedi il sole delle spiagge italiane",
        Description: "Le MARE RE49 sdrai ed ombrelloni delle spiagge italiane rinati nelle nostre iconiche shoes. I tessuti sono ricavati da ombrelloni, sdrai e lettini raccolti negli uffici balneari a fine stagione.",
        Image: "mare.jpg",
        Characteristics: [
            "Le versioni delle RE49 MARE sono tutte esclusive e numerate",
            "Ogni paio di RE49 MARE è certificato con numero su blockchain numerato nella sua versione",
            "I dettagli specifici rendono ogni scarpa leggermente diversa dalle altre",
            "Ogni scarpa è realizzata interamente a mano",
            "Ogni scarpa ha la spugna interna",
            "La suola sempre in pneumatico riciclato",
        ],     
        Phases: [
            {
                Description: "Gli ombrelloni, gli sdrai e i lettini dismessi vengono raccolti negli uffici balneari a fine stagione. Portati in azienda si procede alla fase di raccolta del tessuto.",
                Image: "mare_1.jpg",
            },
            {
                Description: "Il tessuto viene tagliato, visionato e lavato prima del taglio.",
                Image: "mare_2.jpg",
            },
            {
                Description: "Il taglio delle tomaie è sempre manuale.",
                Image: "mare_3.jpg",
            },
            {
                Description: "Le forme delle tomaie vengono ricercate per colore e caratteristiche garantendo un’unicità di prodotto.",
                Image: "mare_4.jpg",
            },
            {
                Description: "Le suole e le tomaie sono sempre cucite a macchina manualmente.",
                Image: "mare_5.jpg",
            },
            {
                Description: "Il prodotto finito è quindi unico, numerato in edizione limitata.",
                Image: "mare_5.jpg",
            }
        ],
        Materials: [            
            "OMBRELLONI"
        ]
    }      
}

module.exports = models