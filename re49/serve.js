const Path = require('path')
const LiquidJS = require('liquidjs')
const fs = require('fs')
const express = require('express')
const utils = require('./lib/utils')

let Models = require("./data/models")
let Materials = require("./data/materials")
let Producers = require("./data/producers")

let serial = process.argv[2]
let model = process.argv[3]
let producer = process.argv[4]

let RenderData = { Model: Models[model] }
let mat = []
RenderData.Model.Materials.forEach(element => {
    mat.push(Materials[element])
});
RenderData.Model.Materials = mat

RenderData.Product = {
    ProductionTimestamp: utils.FormatDate(new Date()),
    SerialNumber: serial
}
RenderData.Producer = Producers[producer]
RenderData.Ln = "it"

let images = utils.ParseData(RenderData,"Image")
images.forEach((img)=>{
    fs.copyFileSync(Path.join(__dirname,"./data/"+img),Path.join(__dirname,"./template/dist/"+img))
})

let app = express();
let entries = [ "/", "index.html" ]

app.get('*', async (req, res) => {
    let file = Path.join(__dirname,"./template/dist"+req.originalUrl)
    if ([ "/", "/index.html" ].indexOf(req.originalUrl) >= 0)
        file = Path.join(__dirname,"./template/dist/index.html")
    if (file.endsWith(".html") || file.endsWith(".js") || file.endsWith(".css")) {
        let data = fs.readFileSync(file,'utf-8')

        try {
            // Sostituisce tutti gli url con le parentesi giuste
            let data_out = data.replace(/url:\/\/{{/g,"{{")
            data_out = data_out.replace(/src="\//g,'src="')
            data_out = data_out.replace(/href="\//g,'href="')

            if (file.endsWith(".html")) {
                let liquidOptions = {strictVariables: true}       
                let engine = new LiquidJS.Liquid()
                let tpl = await engine.parse(data_out)
                data = await engine.render(tpl, RenderData, liquidOptions)
            }
        }
        catch (Ex){
            console.log(Ex)        
        }
        res.send(data);
    }
    else
        res.sendFile(file)    
});

//app.use(express.static(Path.join(__dirname,"./template/dist/")))
console.log("Serve server running at: http://localhost:1234")
app.listen(1234);