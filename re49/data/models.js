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
    }
}

module.exports = models