const {Schema, model}= require("mongoose");

const CarpetaSchema= Schema({
    //id: {type: String};
    nombre: { type: String, required: true },
    //tipo: { type: String, required: true },
    raiz: {type: String},
    creador: {type: String,required: true},
    fecha: {type: Date},
    deleted: { type: Boolean, default: false }
 
})

module.exports= model("Carpeta",CarpetaSchema,"carpetas");