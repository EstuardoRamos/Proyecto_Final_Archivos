const mogoose= require("mongoose");

const conexion = async ()=>{
    try {
        await mogoose.connect("mongodb://localhost:27017/cloud")
        console.log("conectado a db")
    } catch (error) {
        console.log(error);
        console.log("error----------");
        
    }
}

module.exports = {
    conexion
}