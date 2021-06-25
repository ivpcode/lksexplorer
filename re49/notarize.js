#!/bin/node

const os = require('os');
const Path = require('path')
const LiquidJS = require('liquidjs')
const fs = require('fs-extra')
const Utils = require('./lib/utils')
const recursive = require("recursive-readdir");
const { formatWithOptions } = require('util');

const NotarizationRepoDir = Path.join(__dirname,"notarizations")
const DataDir = Path.join(__dirname,"data")
const TemplateDir = Path.join(__dirname,"template/dist")

let serial = process.argv[2]
let model = process.argv[3]
let producer = process.argv[4];

(async ()=>{
    try {
        //:: Copia la folder di template nella destination
        const OutputDir = fs.mkdtempSync("re40-notarizer")//Path.join(NotarizationRepoDir,Utils.FormatDate(new Date(),"YYYY-MM-DD_HH.mm.ss"))
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
        
        console.log("Builded and notarized in folder: "+OutputDir)
    }
    catch (Ex) {
        console.log(Ex) 
    }
})();