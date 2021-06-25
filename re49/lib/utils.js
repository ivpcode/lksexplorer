const fs = require('fs')
const Path = require('path')


const Utils = {
    FormatDate: function(date, FormatString) {
        if (FormatString == null)
            FormatString = 'YYYY-MM-DD HH:mm:ss';

        let d = new Date(date);
        FormatString = FormatString.replace("YYYY",("0000"+d.getFullYear()).substr(-4,4));
        FormatString = FormatString.replace("YYY",("0000"+d.getFullYear()).substr(-3,3));
        FormatString = FormatString.replace("YY",("0000"+d.getFullYear()).substr(-2,2));
        FormatString = FormatString.replace("MM",("00"+(d.getMonth()+1)).substr(-2,2));
        FormatString = FormatString.replace("DD",("00"+(d.getDate())).substr(-2,2));
        FormatString = FormatString.replace("HH",("00"+d.getHours()).substr(-2,2));
        FormatString = FormatString.replace("mm",("00"+d.getMinutes()).substr(-2,2));
        FormatString = FormatString.replace("ss",("00"+d.getSeconds()).substr(-2,2));

        return FormatString;
    },

    ParseData: function(object, key, outArray) {
        if (outArray == null)
            outArray = []
        Object.keys(object).some(function(k) {
            if (k === key) {
                if (outArray.indexOf(object[k])<0)
                    outArray.push(object[k])
                return;
            }
            if (object[k] && typeof object[k] === 'object') {
                value = Utils.ParseData(object[k], key, outArray);
            }
        });

        return outArray;
    },
    
    ProcessDataModels: function(model, producer, serial, data_dir, destination_dir) {
        let Models = require(Path.join(data_dir,"/models"))
        let Materials = require(Path.join(data_dir,"/materials"))
        let Producers = require(Path.join(data_dir,"/producers"))

        let RenderData = { Model: Models[model] }
        let mat = []
        RenderData.Model.Materials.forEach(element => {
            mat.push(Materials[element])
        });
        RenderData.Model.Materials = mat
        
        RenderData.Product = {
            ProductionTimestamp: Utils.FormatDate(new Date()),
            SerialNumber: serial
        }
        RenderData.Producer = Producers[producer]
        RenderData.Ln = "it"
        
        let images = Utils.ParseData(RenderData,"Image")
        images.forEach((img)=>{
            fs.copyFileSync(Path.join(data_dir,img),Path.join(destination_dir,img))
        }) 
        
        delete require.cache[require.resolve(Path.join(data_dir,"/models"))];
        delete require.cache[require.resolve(Path.join(data_dir,"/materials"))];
        delete require.cache[require.resolve(Path.join(data_dir,"/producers"))];

        return RenderData
    }
}

module.exports = Utils