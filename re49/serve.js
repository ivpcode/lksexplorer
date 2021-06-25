const Path = require('path')
const LiquidJS = require('liquidjs')
const fs = require('fs')
const express = require('express')
const Utils = require('./lib/utils')

let serial = process.argv[2]
let model = process.argv[3]
let producer = process.argv[4]

const DataDir = Path.join(__dirname,"data")
const TemplateDir = Path.join(__dirname,"template/dist")

let RenderData = Utils.ProcessDataModels(model, producer, serial, DataDir, TemplateDir)

fs.watchFile(Path.join(DataDir,"models.js"), (curr, prev) => {
    try {
        RenderData = Utils.ProcessDataModels(model, producer, serial, __dirname)
    }
    catch(Ex) {
        console.log("Error while loading template data file: "+Ex);
    }    
});

fs.watchFile(Path.join(DataDir,"materials.js"), (curr, prev) => {
    try {
        RenderData = Utils.ProcessDataModels(model, producer, serial, __dirname)
    }
    catch(Ex) {
        console.log("Error while loading template data file: "+Ex);
    }    
});

fs.watchFile(Path.join(DataDir,"producers.js"), (curr, prev) => {
    try {
        RenderData = Utils.ProcessDataModels(model, producer, serial, __dirname)
    }
    catch(Ex) {
        console.log("Error while loading template data file: "+Ex);
    }    
});

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