#!/bin/node

const os = require('os');
const Path = require('path')
const LiquidJS = require('liquidjs')
const fs = require('fs-extra')
const Utils = require('./lib/utils')
const recursive = require("recursive-readdir");
//const IPFS = require('ipfs-core')
const ipfsClient = require('ipfs-http-client')
const { globSource } = require('ipfs-http-client')

const NotarizationRepoDir = Path.join(__dirname,"notarizations")
const DataDir = Path.join(__dirname,"data")
const TemplateDir = Path.join(__dirname,"template/dist")

let serial = process.argv[2]
let model = process.argv[3]

let producer = "MASOLINI_EREDI"
if (process.argv.length > 4)
    producer = process.argv[4];

(async ()=>{
    try {
        //:: Copia la folder di template nella destination
        const OutputDir = fs.mkdtempSync("re40-notarizer")
        fs.removeSync(OutputDir)        
        fs.copySync(TemplateDir,OutputDir,{overwrite:true})

        let RenderData = Utils.ProcessDataModels(model, producer, serial, DataDir,OutputDir)

        let files = await recursive(OutputDir,[(file)=>{ return (file.endsWith(".html")==false)}])
        files.forEach(async (file)=>{

            let data = fs.readFileSync(file,'utf-8')

            try {
                // Sostituisce tutti gli url con le parentesi giuste
                let data_out = data.replace(/url:\/\/{{/g,"{{")
                data_out = data_out.replace(/src="\//g,'src="')
                data_out = data_out.replace(/href="\//g,'href="')

                let liquidOptions = {strictVariables: true}       
                let engine = new LiquidJS.Liquid()
                let tpl = await engine.parse(data_out)
                data = await engine.render(tpl, RenderData, liquidOptions)

                fs.writeFileSync(file,data,'utf-8')
            }
            catch (Ex){
                console.log(Ex)        
            }            
        });

        let ipfs = ipfsClient.create()
        const  {cid}  = await ipfs.add(globSource(OutputDir,{recursive:true}))

        let PinnedNotarization = Path.join(NotarizationRepoDir,cid.string)
        fs.copySync(OutputDir,PinnedNotarization,{overwrite:true})

        fs.removeSync(OutputDir)

        console.log("Builded and notarized in folder: "+PinnedNotarization)
        console.log("CID: "+cid.string+"\n")
    }
    catch (Ex) {
        console.log(Ex) 
    }
})();