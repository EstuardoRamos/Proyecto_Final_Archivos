const {Schema, model}= require("mongoose");

const CompartidoSchema= Schema({
    nombre: { type: String, required: true },
    tipo: { type: String, required: true },
    raiz: {type: String},
    creador: {type: String,required: true},
    compartido: {type: String,required: true},
    contenido: {type: String,required: true},
    //fecha: {type: new Date},
    deleted: { type: Boolean, default: false }
})

module.exports= model("Compartido",CompartidoSchema,"compartido");